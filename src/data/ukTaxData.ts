import { UKNIRates } from '../types';

// UK National Insurance Contributions for 2025-2026
export const ukNIRates: UKNIRates = {
  A: [
    { min: 0, max: 125, employeeRate: 0, employerRate: 0 },
    { min: 125, max: 242, employeeRate: 0, employerRate: 0 },
    { min: 242, max: 967, employeeRate: 0.08, employerRate: 0.15 },
    { min: 967, max: null, employeeRate: 0.02, employerRate: 0.15 }
  ],
  B: [
    { min: 0, max: 125, employeeRate: 0, employerRate: 0 },
    { min: 125, max: 242, employeeRate: 0, employerRate: 0 },
    { min: 242, max: 967, employeeRate: 0.0185, employerRate: 0.15 },
    { min: 967, max: null, employeeRate: 0.02, employerRate: 0.15 }
  ],
  H: [
    { min: 0, max: 125, employeeRate: 0, employerRate: 0 },
    { min: 125, max: 242, employeeRate: 0, employerRate: 0 },
    { min: 242, max: 967, employeeRate: 0.08, employerRate: 0 },
    { min: 967, max: null, employeeRate: 0.02, employerRate: 0.15 }
  ]
};

// NI Category Options
export const niCategoryOptions = [
  { value: 'A', label: 'Category A (Standard)' },
  { value: 'B', label: 'Category B (Reduced Rate)' },
  { value: 'H', label: 'Category H (Apprentice under 25)' }
];

export const niCategoryDescriptions = {
  A: 'Standard rate for most employees.',
  B: 'Reduced rate for married women or widows who are entitled to pay reduced National Insurance.',
  H: 'Apprentices under 25 years old.'
};