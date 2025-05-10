// Country types
export type Country = 'USA';

// USA Tax System Types
export type USFilingStatus = 'single' | 'married_joint' | 'married_separate';
export type USState =
  | 'AL' | 'AK' | 'AZ' | 'AR' | 'CA' | 'CO' | 'CT' | 'DE' | 'FL' | 'GA'
  | 'HI' | 'ID' | 'IL' | 'IN' | 'IA' | 'KS' | 'KY' | 'LA' | 'ME' | 'MD'
  | 'MA' | 'MI' | 'MN' | 'MS' | 'MO' | 'MT' | 'NE' | 'NV' | 'NH' | 'NJ'
  | 'NM' | 'NY' | 'NC' | 'ND' | 'OH' | 'OK' | 'OR' | 'PA' | 'RI' | 'SC'
  | 'SD' | 'TN' | 'TX' | 'UT' | 'VT' | 'VA' | 'WA' | 'WV' | 'WI' | 'WY';

export interface USATaxBracket {
  rate: number;
  min: number;
  max: number | null;
}

export interface USATaxBrackets {
  [key: string]: USATaxBracket[];
}

export interface DeductionInput {
  standardDeduction: boolean;
  retirement401k: number;
  hsaContribution: number;
  studentLoanInterest: number;
  itemizedDeductions: number;
}

export interface USATaxInput {
  income: number;
  filingStatus: USFilingStatus;
  isSelfEmployed: boolean;
  state: USState;
  deductions: DeductionInput;
}

export interface USATaxResult {
  federalIncomeTax: number;
  stateTax: number;
  socialSecurityTax: number;
  medicareTax: number;
  totalTax: number;
  effectiveTaxRate: number;
  takeHomePay: number;
  deductions: {
    total: number;
    breakdown: {
      [key: string]: number;
    };
  };
  taxBracketBreakdown: {
    bracket: USATaxBracket;
    taxAmount: number;
  }[];
}
// UK Tax System Types
export type UKNICategory = 'A' | 'B' | 'H';

export interface UKNIRateDetail {
  min: number;
  max: number | null;
  employeeRate: number;
  employerRate: number;
}

export interface UKNIRates {
  A: UKNIRateDetail[];
  B: UKNIRateDetail[];
  H: UKNIRateDetail[];
  // Or more generically: [key: string]: UKNIRateDetail[]; but specific keys are better for type safety
}

export interface UKNIBreakdownItem {
  rate: number; // This is the NI rate for the band
  amount: number; // This is the amount of NI paid in this band
  description: string; // e.g., "£0 - £242 @ 0%"
}

export interface UKTaxInput {
  income: number;
  niCategory: UKNICategory;
  isEmployed: boolean;
}

export interface UKTaxResult {
  nationalInsurance: number;
  employerContribution?: number;
  totalContributions: number; // This is typically just the employee's NI for "total tax" from employee perspective
  takeHomePay: number;
  effectiveRate: number;
  niBreakdown: UKNIBreakdownItem[];
}