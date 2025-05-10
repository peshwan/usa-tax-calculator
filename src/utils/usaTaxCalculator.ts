import { USATaxBracket, USATaxInput, USATaxResult, USState } from '../types';
import { usaFederalTaxBrackets, ficaTaxRates, usaStateTaxBrackets, usaStateStandardDeductions, standardDeductions as federalStandardDeductions } from '../data/usaTaxData';

// Calculate State Income Tax
export function calculateStateIncomeTax(grossIncome: number, state: USState, filingStatus: string): number {
  // Determine state-specific standard deduction
  const stateStdDeductionAmount = usaStateStandardDeductions[state]?.[filingStatus] ?? usaStateStandardDeductions[state]?.['single'] ?? 0;
  
  // For states that use federal AGI or have no standard deduction, this might need adjustment.
  // This is a simplified model; actual state deductions can be complex (e.g., itemized, credits instead of deductions).
  const stateTaxableIncome = Math.max(0, grossIncome - stateStdDeductionAmount);

  const stateBrackets = usaStateTaxBrackets[state]?.[filingStatus] || usaStateTaxBrackets[state]?.['single'] || [];
  
  if (!stateBrackets || stateBrackets.length === 0) {
    return 0; // No tax if state has no brackets defined (e.g., no income tax states)
  }

  let stateTax = 0;
  for (let i = 0; i < stateBrackets.length; i++) {
    const bracket = stateBrackets[i];
    const min = bracket.min;
    const max = bracket.max ?? Infinity; // Use nullish coalescing for Infinity

    if (stateTaxableIncome > min) {
      const taxableInThisBracket = Math.min(stateTaxableIncome, max) - min;
      const taxForBracket = taxableInThisBracket * (bracket.rate / 100);
      stateTax += taxForBracket;
      if (stateTaxableIncome <= max) break;
    }
  }
  return stateTax;
}

// Calculate Federal Income Tax
export function calculateFederalIncomeTax(income: number, filingStatus: string): {
  totalTax: number;
  brackets: { bracket: USATaxBracket; taxAmount: number }[];
} {
  const brackets = usaFederalTaxBrackets[filingStatus];
  let totalTax = 0;
  const taxBracketBreakdown: { bracket: USATaxBracket; taxAmount: number }[] = [];

  for (let i = 0; i < brackets.length; i++) {
    const bracket = brackets[i];
    const min = bracket.min;
    const max = bracket.max || Infinity;

    if (income > min) {
      const taxableInThisBracket = Math.min(income, max) - min;
      const taxForBracket = taxableInThisBracket * (bracket.rate / 100);
      
      totalTax += taxForBracket;
      taxBracketBreakdown.push({
        bracket,
        taxAmount: taxForBracket
      });

      if (income <= max) break;
    }
  }

  return { totalTax, brackets: taxBracketBreakdown };
}

// Calculate FICA Taxes (Social Security and Medicare)
export function calculateFICATaxes(income: number, isSelfEmployed: boolean): {
  socialSecurity: number;
  medicare: number;
  total: number;
} {
  const ssRate = isSelfEmployed
    ? ficaTaxRates.socialSecurity.selfEmployedRate
    : ficaTaxRates.socialSecurity.employeeRate;
  
  const medicareRate = isSelfEmployed
    ? ficaTaxRates.medicare.selfEmployedRate
    : ficaTaxRates.medicare.employeeRate;

  // Calculate Social Security tax (capped at wage base)
  const ssWageBase = ficaTaxRates.socialSecurity.wageBase;
  const socialSecurityTax = Math.min(income, ssWageBase) * ssRate;

  // Calculate Medicare tax (no cap, but additional rate for high earners)
  let medicareTax = income * medicareRate;
  const additionalThreshold = ficaTaxRates.medicare.additionalThreshold;
  
  if (income > additionalThreshold) {
    medicareTax += (income - additionalThreshold) * ficaTaxRates.medicare.additionalRate;
  }

  return {
    socialSecurity: socialSecurityTax,
    medicare: medicareTax,
    total: socialSecurityTax + medicareTax
  };
}

// Calculate complete USA tax based on inputs
export function calculateUSATax(input: USATaxInput): USATaxResult {
  const { income, filingStatus, isSelfEmployed, state, deductions: fedDeductionInputs } = input;

  // Calculate Federal Deductions
  let totalFederalDeductions = 0;
  const federalDeductionBreakdown: { [key: string]: number } = {};

  if (fedDeductionInputs) {
    if (fedDeductionInputs.standardDeduction) {
      totalFederalDeductions = federalStandardDeductions[filingStatus] || 0;
      federalDeductionBreakdown['Federal Standard Deduction'] = totalFederalDeductions;
    } else {
      totalFederalDeductions = fedDeductionInputs.itemizedDeductions || 0;
      if (totalFederalDeductions > 0) federalDeductionBreakdown['Federal Itemized Deductions'] = totalFederalDeductions;
    }
    // Add other federal deductions if they reduce federal AGI
    // For simplicity, assuming 401k, HSA, Student Loan Interest are "above-the-line" or already handled
    // in a way that they reduce the income passed to this function if that's the desired model.
    // Or, if they are itemized/adjustments on Schedule 1, they'd be part of itemized or reduce AGI.
    // The current `DeductionInput` seems to mix federal pre-AGI and itemized.
    // Let's assume they reduce AGI for federal purposes here:
    if (fedDeductionInputs.retirement401k > 0) {
        totalFederalDeductions += fedDeductionInputs.retirement401k;
        federalDeductionBreakdown['401(k) Contribution'] = fedDeductionInputs.retirement401k;
    }
    if (fedDeductionInputs.hsaContribution > 0) {
        totalFederalDeductions += fedDeductionInputs.hsaContribution;
        federalDeductionBreakdown['HSA Contribution'] = fedDeductionInputs.hsaContribution;
    }
    if (fedDeductionInputs.studentLoanInterest > 0) {
        totalFederalDeductions += fedDeductionInputs.studentLoanInterest;
        federalDeductionBreakdown['Student Loan Interest'] = fedDeductionInputs.studentLoanInterest;
    }
  }
  
  const federalTaxableIncome = Math.max(0, income - totalFederalDeductions);

  // Calculate federal income tax
  const federalTaxResult = calculateFederalIncomeTax(federalTaxableIncome, filingStatus);
  const federalIncomeTax = federalTaxResult.totalTax;
  
  // Calculate State Income Tax
  // State tax is calculated on gross income MINUS state-specific deductions.
  // The calculateStateIncomeTax function now handles its own state-specific taxable income.
  const stateTax = calculateStateIncomeTax(income, state, filingStatus);

  // Calculate FICA taxes (based on original gross income)
  const ficaTaxes = calculateFICATaxes(income, isSelfEmployed);
  const socialSecurityTax = ficaTaxes.socialSecurity;
  const medicareTax = ficaTaxes.medicare;
  
  // Total tax and take-home pay
  const totalTax = federalIncomeTax + stateTax + socialSecurityTax + medicareTax;
  const takeHomePay = income - totalTax; // Take-home is based on original income
  const effectiveTaxRate = income > 0 ? (totalTax / income) * 100 : 0;
  
  // Deduction breakdown for results
  // The deductionBreakdown should reflect federal deductions applied.
  // State deductions are handled within calculateStateIncomeTax and aren't explicitly itemized here yet.
  return {
    federalIncomeTax,
    stateTax,
    socialSecurityTax,
    medicareTax,
    totalTax,
    effectiveTaxRate,
    takeHomePay,
    taxBracketBreakdown: federalTaxResult.brackets, // This is federal bracket breakdown
    deductions: {
        total: totalFederalDeductions, // This is total federal deductions
        breakdown: federalDeductionBreakdown // This is federal deduction breakdown
    }
  };
}