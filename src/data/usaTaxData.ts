import { USATaxBrackets, USState } from '../types';

// USA Federal Income Tax Brackets for 2025-2026
export const usaFederalTaxBrackets: USATaxBrackets = {
  single: [
    { rate: 10, min: 0, max: 11925 },
    { rate: 12, min: 11926, max: 48475 },
    { rate: 22, min: 48476, max: 103350 },
    { rate: 24, min: 103351, max: 197300 },
    { rate: 32, min: 197301, max: 250525 },
    { rate: 35, min: 250526, max: 626350 },
    { rate: 37, min: 626351, max: null }
  ],
  married_joint: [
    { rate: 10, min: 0, max: 23850 },
    { rate: 12, min: 23851, max: 96950 },
    { rate: 22, min: 96951, max: 206700 },
    { rate: 24, min: 206701, max: 394600 },
    { rate: 32, min: 394601, max: 501050 },
    { rate: 35, min: 501051, max: 751600 },
    { rate: 37, min: 751601, max: null }
  ],
  married_separate: [
    { rate: 10, min: 0, max: 11925 },
    { rate: 12, min: 11926, max: 48475 },
    { rate: 22, min: 48476, max: 103350 },
    { rate: 24, min: 103351, max: 197300 },
    { rate: 32, min: 197301, max: 250525 },
    { rate: 35, min: 250526, max: 375800 },
    { rate: 37, min: 375801, max: null }
  ]
};

// USA State Income Tax Brackets (Example for CA and NY, single filing status)
// This needs to be expanded for all supported states and filing statuses
export const usaStateTaxBrackets: { [key in USState]?: USATaxBrackets } = {
  // No Income Tax States
  AK: { single: [], married_joint: [], married_separate: [] },
  FL: { single: [], married_joint: [], married_separate: [] },
  NV: { single: [], married_joint: [], married_separate: [] },
  NH: { single: [], married_joint: [], married_separate: [] }, // Taxes interest and dividends, phasing out. For wages, it's 0.
  SD: { single: [], married_joint: [], married_separate: [] },
  TN: { single: [], married_joint: [], married_separate: [] },
  TX: { single: [], married_joint: [], married_separate: [] },
  WA: { single: [], married_joint: [], married_separate: [] }, // No tax on wages, but 7% on high-earner capital gains. For wages, it's 0.
  WY: { single: [], married_joint: [], married_separate: [] },

  // Flat Tax States (using 'single' filing status as a base, rates apply to all income levels for simplicity here)
  AZ: { single: [{ rate: 2.50, min: 0, max: null }] },
  CO: { single: [{ rate: 4.40, min: 0, max: null }] },
  GA: { single: [{ rate: 5.49, min: 0, max: null }] }, // Note: Georgia is moving to flat tax, ensure this is the 2025 rate.
  ID: { single: [{ rate: 5.695, min: 0, max: null }] },
  IL: { single: [{ rate: 4.95, min: 0, max: null }] },
  IN: { single: [{ rate: 3.00, min: 0, max: null }] }, // Note: Indiana's rate is 3.15% for 2024, user specified 3.00% for 2025.
  IA: { single: [{ rate: 3.80, min: 0, max: null }] }, // Iowa consolidating to flat rate.
  KY: { single: [{ rate: 4.50, min: 0, max: null }] }, // Note: Kentucky's rate is 4.00% for 2024, user specified 4.50% for 2025.
  LA: { single: [{ rate: 1.85, min: 0, max: null }] }, // Louisiana moving to flat rate.
  MI: { single: [{ rate: 4.25, min: 0, max: null }] },
  MS: { single: [{ rate: 4.00, min: 0, max: null }] }, // Note: Mississippi phasing out income tax, 4.0% for 2025.
  NC: { single: [{ rate: 4.75, min: 0, max: null }] }, // Note: North Carolina's rate is 4.5% for 2024, user specified 4.75% for 2025.
  PA: { single: [{ rate: 3.07, min: 0, max: null }] },
  UT: { single: [{ rate: 4.65, min: 0, max: null }] },

  // Graduated Tax States (Examples, more detail needed for full accuracy)
  CA: {
    single: [
      { rate: 1, min: 0, max: 10412 }, { rate: 2, min: 10413, max: 24684 },
      { rate: 4, min: 24685, max: 38959 }, { rate: 6, min: 38960, max: 54081 },
      { rate: 8, min: 54082, max: 68350 }, { rate: 9.3, min: 68351, max: 349137 },
      { rate: 10.3, min: 349138, max: 418961 }, { rate: 11.3, min: 418962, max: 698271 },
      { rate: 12.3, min: 698272, max: null }
    ],
    // married_joint brackets are typically double 'single' brackets in CA.
  },
  NY: {
    single: [
      { rate: 4, min: 0, max: 8500 }, { rate: 4.5, min: 8501, max: 11700 },
      { rate: 5.25, min: 11701, max: 13900 }, { rate: 5.9, min: 13901, max: 21400 },
      { rate: 6.33, min: 21401, max: 80650 }, { rate: 6.85, min: 80651, max: 215400 },
      { rate: 9.65, min: 215401, max: 1077550 }, { rate: 10.3, min: 1077551, max: 5000000 },
      { rate: 10.9, min: 5000001, max: null }
    ],
  },
  // Placeholder for other graduated states - to be filled with actual 2025 bracket data
  AL: { single: [] }, AR: { single: [] }, CT: { single: [] }, DE: { single: [] },
  HI: { single: [] }, KS: { single: [] }, ME: { single: [] }, MD: { single: [] },
  MA: { single: [] }, MN: { single: [] }, MO: { single: [] }, MT: { single: [] },
  NE: { single: [] }, NJ: { single: [] }, NM: { single: [] }, ND: { single: [] },
  OH: { single: [] }, OK: { single: [] }, OR: { single: [] }, RI: { single: [] },
  SC: { single: [] }, VT: { single: [] }, VA: { single: [] }, WV: { single: [] },
  WI: { single: [] },
  // DC would also be here
};

// State Standard Deductions for 2025 (Single filer, examples)
// This needs to be comprehensive and accurate for all states and filing statuses.
export const usaStateStandardDeductions: { [key in USState]?: { [key: string]: number } } = {
  // Values updated based on user feedback for 2025
  AL: { single: 3000, married_joint: 8500, married_separate: 3000 },
  AK: { single: 0, married_joint: 0, married_separate: 0 }, // No income tax
  AZ: { single: 15000, married_joint: 30000, married_separate: 15000 },
  AR: { single: 2410, married_joint: 4820, married_separate: 2410 },
  CA: { single: 5540, married_joint: 11080, married_separate: 5540 },
  CO: { single: 15000, married_joint: 30000, married_separate: 15000 },
  CT: { single: 0, married_joint: 0, married_separate: 0 }, // No standard deduction
  DE: { single: 3250, married_joint: 6500, married_separate: 3250 },
  FL: { single: 0, married_joint: 0, married_separate: 0 }, // No income tax
  GA: { single: 12000, married_joint: 24000, married_separate: 12000 },
  HI: { single: 4400, married_joint: 8800, married_separate: 4400 },
  ID: { single: 15000, married_joint: 30000, married_separate: 15000 },
  IL: { single: 0, married_joint: 5700, married_separate: 0 }, // Single: No SD (exemption $2,850). MFS: No SD.
  IN: { single: 0, married_joint: 2000, married_separate: 0 }, // Single: No SD (exemption $1,000). MFS: No SD.
  IA: { single: 0, married_joint: 0, married_separate: 0 },    // No SD (uses credits). MFS: No SD.
  KS: { single: 3605, married_joint: 8240, married_separate: 3605 },
  KY: { single: 3270, married_joint: 6540, married_separate: 3270 },
  LA: { single: 12500, married_joint: 25000, married_separate: 12500 },
  ME: { single: 15000, married_joint: 30000, married_separate: 15000 },
  MD: { single: 2700, married_joint: 5450, married_separate: 2700 },
  MA: { single: 0, married_joint: 8800, married_separate: 0 }, // Single: No SD. MFS: No SD.
  MI: { single: 5800, married_joint: 11600, married_separate: 0 }, // Single: $5800 (exemption). MFS: No SD.
  MN: { single: 14950, married_joint: 29900, married_separate: 14950 },
  MS: { single: 2300, married_joint: 4600, married_separate: 2300 },
  MO: { single: 15000, married_joint: 30000, married_separate: 15000 },
  MT: { single: 15000, married_joint: 30000, married_separate: 15000 }, // MFS table implies single SD is $15k.
  NE: { single: 8600, married_joint: 17200, married_separate: 8600 },
  NV: { single: 0, married_joint: 0, married_separate: 0 }, // No income tax
  NH: { single: 0, married_joint: 0, married_separate: 0 }, // No income tax on wages
  NJ: { single: 1000, married_joint: 2000, married_separate: 0 }, // Single: $1000 (exemption). MFS: No SD.
  NM: { single: 15000, married_joint: 30000, married_separate: 15000 },
  NY: { single: 8000, married_joint: 16050, married_separate: 8000 },
  NC: { single: 12750, married_joint: 25500, married_separate: 12750 },
  ND: { single: 15000, married_joint: 30000, married_separate: 15000 },
  OH: { single: 0, married_joint: 4800, married_separate: 0 }, // Single: No SD (exemption $2,400). MFS: No SD.
  OK: { single: 6350, married_joint: 12700, married_separate: 6350 },
  OR: { single: 2800, married_joint: 5600, married_separate: 2800 },
  PA: { single: 0, married_joint: 0, married_separate: 0 },    // No SD. MFS: No SD.
  RI: { single: 10900, married_joint: 21800, married_separate: 10900 },
  SC: { single: 15000, married_joint: 30000, married_separate: 15000 },
  SD: { single: 0, married_joint: 0, married_separate: 0 }, // No income tax
  TN: { single: 0, married_joint: 0, married_separate: 0 }, // No income tax
  TX: { single: 0, married_joint: 0, married_separate: 0 }, // No income tax
  UT: { single: 0, married_joint: 0, married_separate: 0 },    // No SD (uses credit). MFS: No SD.
  VT: { single: 7400, married_joint: 14850, married_separate: 7400 },
  VA: { single: 8500, married_joint: 17000, married_separate: 8500 },
  WA: { single: 0, married_joint: 0, married_separate: 0 }, // No income tax on wages
  WV: { single: 2000, married_joint: 4000, married_separate: 0 }, // Single: $2000 (exemption). MFS: No SD.
  WI: { single: 13560, married_joint: 25110, married_separate: 13560 },
  WY: { single: 0, married_joint: 0, married_separate: 0 }, // No income tax
};

// FICA Tax Rates and Thresholds for 2025
export const ficaTaxRates = {
  socialSecurity: {
    employeeRate: 0.062,
    employerRate: 0.062,
    selfEmployedRate: 0.124,
    wageBase: 176100,
  },
  medicare: {
    employeeRate: 0.0145,
    employerRate: 0.0145,
    selfEmployedRate: 0.029,
    additionalRate: 0.009,
    additionalThreshold: 200000,
  }
};

// Standard Deduction Amounts for 2025
export const standardDeductions = {
  single: 15000, // Updated for 2025
  married_joint: 30000, // Updated for 2025 (typically 2x single)
  married_separate: 15000 // Updated for 2025 (typically same as single)
};

// Filing Status Options
export const filingStatusOptions = [
  { value: 'single', label: 'Single' },
  { value: 'married_joint', label: 'Married Filing Jointly' },
  { value: 'married_separate', label: 'Married Filing Separately' }
];

export const filingStatusDescriptions = {
  single: 'For unmarried individuals or legally separated individuals.',
  married_joint: 'For married couples who file their tax returns together.',
  married_separate: 'For married couples who file their tax returns separately.'
};

// State Options
export const stateOptions = [
  { value: 'AL', label: 'Alabama' }, { value: 'AK', label: 'Alaska' },
  { value: 'AZ', label: 'Arizona' }, { value: 'AR', label: 'Arkansas' },
  { value: 'CA', label: 'California' }, { value: 'CO', label: 'Colorado' },
  { value: 'CT', label: 'Connecticut' }, { value: 'DE', label: 'Delaware' },
  { value: 'FL', label: 'Florida' }, { value: 'GA', label: 'Georgia' },
  { value: 'HI', label: 'Hawaii' }, { value: 'ID', label: 'Idaho' },
  { value: 'IL', label: 'Illinois' }, { value: 'IN', label: 'Indiana' },
  { value: 'IA', label: 'Iowa' }, { value: 'KS', label: 'Kansas' },
  { value: 'KY', label: 'Kentucky' }, { value: 'LA', label: 'Louisiana' },
  { value: 'ME', label: 'Maine' }, { value: 'MD', label: 'Maryland' },
  { value: 'MA', label: 'Massachusetts' }, { value: 'MI', label: 'Michigan' },
  { value: 'MN', label: 'Minnesota' }, { value: 'MS', label: 'Mississippi' },
  { value: 'MO', label: 'Missouri' }, { value: 'MT', label: 'Montana' },
  { value: 'NE', label: 'Nebraska' }, { value: 'NV', label: 'Nevada' },
  { value: 'NH', label: 'New Hampshire' }, { value: 'NJ', label: 'New Jersey' },
  { value: 'NM', label: 'New Mexico' }, { value: 'NY', label: 'New York' },
  { value: 'NC', label: 'North Carolina' }, { value: 'ND', label: 'North Dakota' },
  { value: 'OH', label: 'Ohio' }, { value: 'OK', label: 'Oklahoma' },
  { value: 'OR', label: 'Oregon' }, { value: 'PA', label: 'Pennsylvania' },
  { value: 'RI', label: 'Rhode Island' }, { value: 'SC', label: 'South Carolina' },
  { value: 'SD', label: 'South Dakota' }, { value: 'TN', label: 'Tennessee' },
  { value: 'TX', label: 'Texas' }, { value: 'UT', label: 'Utah' },
  { value: 'VT', label: 'Vermont' }, { value: 'VA', label: 'Virginia' },
  { value: 'WA', label: 'Washington' }, { value: 'WV', label: 'West Virginia' },
  { value: 'WI', label: 'Wisconsin' }, { value: 'WY', label: 'Wyoming' }
];