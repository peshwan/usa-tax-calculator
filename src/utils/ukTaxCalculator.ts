import { UKNIRate, UKTaxInput, UKTaxResult } from '../types';
import { ukNIRates } from '../data/ukTaxData';

// Calculate UK National Insurance contributions
export function calculateNationalInsurance(
  annualIncome: number, 
  niCategory: string,
  isEmployed: boolean
): {
  totalNI: number;
  employerNI: number | null;
  breakdown: { rate: UKNIRate; amount: number }[];
} {
  const weeklyIncome = annualIncome / 52;
  const rates = ukNIRates[niCategory];
  let totalWeeklyNI = 0;
  let totalWeeklyEmployerNI = 0;
  const breakdown: { rate: UKNIRate; amount: number }[] = [];

  // Calculate employee NI contributions
  for (let i = 0; i < rates.length; i++) {
    const rate = rates[i];
    const min = rate.min;
    const max = rate.max || Infinity;

    if (weeklyIncome > min) {
      const contributionAmount = Math.min(weeklyIncome, max) - min;
      const niForThisRate = contributionAmount * rate.employeeRate;
      
      if (niForThisRate > 0) {
        totalWeeklyNI += niForThisRate;
        breakdown.push({
          rate,
          amount: niForThisRate * 52 // Convert to annual
        });
      }

      // Calculate employer NI if employed
      if (isEmployed) {
        totalWeeklyEmployerNI += contributionAmount * rate.employerRate;
      }

      if (weeklyIncome <= max) break;
    }
  }

  // Convert to annual amounts
  const annualNI = totalWeeklyNI * 52;
  const annualEmployerNI = isEmployed ? totalWeeklyEmployerNI * 52 : null;

  return {
    totalNI: annualNI,
    employerNI: annualEmployerNI,
    breakdown
  };
}

// Calculate complete UK tax based on inputs
export function calculateUKTax(input: UKTaxInput): UKTaxResult {
  const { income, niCategory, isEmployed } = input;
  
  // Calculate National Insurance contributions
  const niResult = calculateNationalInsurance(income, niCategory, isEmployed);
  const nationalInsurance = niResult.totalNI;
  const employerContribution = niResult.employerNI;
  
  // Total contributions and take-home pay
  const totalContributions = nationalInsurance;
  const takeHomePay = income - totalContributions;
  const effectiveRate = (totalContributions / income) * 100;
  
  return {
    nationalInsurance,
    employerContribution,
    totalContributions,
    effectiveRate,
    takeHomePay,
    niBreakdown: niResult.breakdown
  };
}