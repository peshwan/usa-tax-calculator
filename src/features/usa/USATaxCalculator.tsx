import React, { useState, useEffect } from 'react';
import { Card } from '../../components/Card';
import { InputField } from '../../components/InputField';
import { SelectField } from '../../components/SelectField';
import { ResultSummary } from '../../components/ResultSummary';
import { BracketVisualization } from '../../components/BracketVisualization';
import { calculateUSATax } from '../../utils/usaTaxCalculator';
import { filingStatusOptions, filingStatusDescriptions, stateOptions } from '../../data/usaTaxData';
import { USATaxInput, USATaxResult, USFilingStatus, USState, DeductionInput } from '../../types';

export const USATaxCalculator: React.FC = () => {
  const [inputs, setInputs] = useState<USATaxInput>({
    income: 0, // Default income to 0
    filingStatus: 'single',
    isSelfEmployed: false,
    state: 'CA',
    deductions: {
      standardDeduction: true,
      retirement401k: 0,
      hsaContribution: 0,
      studentLoanInterest: 0,
      itemizedDeductions: 0
    }
  });

  const initialZeroUSATaxResult: USATaxResult = {
    totalTax: 0,
    federalIncomeTax: 0,
    stateTax: 0,
    socialSecurityTax: 0,
    medicareTax: 0,
    takeHomePay: 0,
    effectiveTaxRate: 0,
    taxBracketBreakdown: [],
    deductions: {
      total: 0,
      breakdown: {},
    },
  };
  const [results, setResults] = useState<USATaxResult>(initialZeroUSATaxResult);
  const [showAdvanced, setShowAdvanced] = useState(false);

  useEffect(() => {
    const resultData = calculateUSATax(inputs);
    if (resultData) {
      setResults({
        ...initialZeroUSATaxResult, // Ensure all fields are present
        ...resultData, // Override with actual calculated data
        // Ensure taxBracketBreakdown is always an array, even if resultData.taxBracketBreakdown is null/undefined
        taxBracketBreakdown: resultData.taxBracketBreakdown || [],
        // Ensure deductions object and its breakdown are always present
        deductions: {
          ...initialZeroUSATaxResult.deductions,
          ...(resultData.deductions || {}),
          breakdown: {
            ...(initialZeroUSATaxResult.deductions?.breakdown || {}),
            ...(resultData.deductions?.breakdown || {}),
          }
        }
      });
    } else {
      // If calculation fails or income is 0 leading to null, reset to a default state
      // but ensure takeHomePay reflects the current (likely 0) income.
      setResults({
        ...initialZeroUSATaxResult,
        takeHomePay: inputs.income,
      });
    }
  }, [inputs]);

  const handleInputChange = (field: keyof USATaxInput, value: string | number | boolean) => {
    if (field === 'income') {
      let newIncome = 0;
      if (typeof value === 'string') {
        const cleaned = value.replace(/[^0-9]/g, '');
        if (cleaned === '') {
          newIncome = 0;
        } else {
          newIncome = parseInt(cleaned.substring(0, 12), 10);
          if (isNaN(newIncome)) newIncome = 0;
        }
      } else if (typeof value === 'number') {
        if (isNaN(value) || !isFinite(value)) {
            newIncome = 0;
        } else {
            const stringValue = String(Math.floor(value));
            newIncome = parseInt(stringValue.substring(0, 12), 10);
            if (isNaN(newIncome)) newIncome = 0;
        }
      }
      if (isNaN(newIncome) || !isFinite(newIncome)) { // Final fallback
        newIncome = 0;
      }
      setInputs(prev => ({ ...prev, income: newIncome }));
    } else {
      setInputs(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleDeductionChange = (field: keyof DeductionInput, value: string | number | boolean) => {
    setInputs(prev => ({
      ...prev,
      deductions: { ...prev.deductions, [field]: value }
    }));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
      <div className="lg:col-span-1 space-y-6 overflow-y-auto">
        <Card title="Basic Information">
          <InputField
            label="Annual Gross Income"
            type="number"
            value={inputs.income}
            onChange={(value) => handleInputChange('income', value)}
            min={0}
            step={1000}
            name="income"
            prefix="$"
            tooltip="Enter your total annual income before taxes and deductions"
          />

          <SelectField
            label="Filing Status"
            options={filingStatusOptions}
            value={inputs.filingStatus}
            onChange={(value) => handleInputChange('filingStatus', value as USFilingStatus)}
            name="filingStatus"
            tooltip={filingStatusDescriptions[inputs.filingStatus]}
          />

          <SelectField
            label="State"
            options={stateOptions}
            value={inputs.state}
            onChange={(value) => handleInputChange('state', value as USState)}
            name="state"
            tooltip="Select your state of residence for state tax calculation"
          />

          <InputField
            label="Self-employed"
            type="checkbox"
            value={inputs.isSelfEmployed}
            onChange={(value) => handleInputChange('isSelfEmployed', value)}
            name="isSelfEmployed"
            placeholder="I'm self-employed"
            tooltip="Check this if you're self-employed and pay both employer and employee portions of FICA taxes"
          />
        </Card>

        <Card>
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="w-full text-left flex items-center justify-between text-blue-600 hover:text-blue-700"
          >
            <span className="font-medium">Advanced Options</span>
            <span>{showAdvanced ? '−' : '+'}</span>
          </button>

          {showAdvanced && (
            <div className="mt-4 space-y-4">
              <InputField
                label="Use Standard Deduction"
                type="checkbox"
                value={inputs.deductions.standardDeduction}
                onChange={(value) => handleDeductionChange('standardDeduction', value)}
                name="standardDeduction"
                tooltip="Standard deduction is typically better for most taxpayers"
              />

              {!inputs.deductions.standardDeduction && (
                <InputField
                  label="Itemized Deductions"
                  type="number"
                  value={inputs.deductions.itemizedDeductions}
                  onChange={(value) => handleDeductionChange('itemizedDeductions', value)}
                  min={0}
                  step={100}
                  name="itemizedDeductions"
                  prefix="$"
                  tooltip="Total of all itemized deductions"
                />
              )}

              <InputField
                label="401(k) Contribution"
                type="number"
                value={inputs.deductions.retirement401k}
                onChange={(value) => handleDeductionChange('retirement401k', value)}
                min={0}
                max={22500}
                step={500}
                name="retirement401k"
                prefix="$"
                tooltip="Annual 401(k) contribution (max $22,500 for 2025)"
              />

              <InputField
                label="HSA Contribution"
                type="number"
                value={inputs.deductions.hsaContribution}
                onChange={(value) => handleDeductionChange('hsaContribution', value)}
                min={0}
                max={3850}
                step={50}
                name="hsaContribution"
                prefix="$"
                tooltip="Health Savings Account contribution"
              />

              <InputField
                label="Student Loan Interest"
                type="number"
                value={inputs.deductions.studentLoanInterest}
                onChange={(value) => handleDeductionChange('studentLoanInterest', value)}
                min={0}
                max={2500}
                step={100}
                name="studentLoanInterest"
                prefix="$"
                tooltip="Student loan interest paid (max $2,500 deduction)"
              />
            </div>
          )}
        </Card>
      </div>

      <div className="lg:col-span-2">
        {/* Results section is now always rendered as 'results' state is never null */}
        <div className="space-y-6">
            <ResultSummary
              income={inputs.income}
              totalTax={results.totalTax || 0}
              takeHomePay={results.takeHomePay || 0}
              effectiveTaxRate={results.effectiveTaxRate || 0}
              currency="$"
            />

            <Card>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Tax Components</h3>
                  <div className="mt-4 space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Federal Income Tax</span>
                      <span className="font-medium">${(results.federalIncomeTax || 0).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">State Tax</span>
                      <span className="font-medium">${(results.stateTax || 0).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Social Security Tax</span>
                      <span className="font-medium">${(results.socialSecurityTax || 0).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Medicare Tax</span>
                      <span className="font-medium">${(results.medicareTax || 0).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span className="font-medium">Total Tax</span>
                      <span className="font-bold">${(results.totalTax || 0).toFixed(2)}</span>
                    </div>
                  </div>

                  {results.deductions?.total > 0 && (
                    <div className="mt-6">
                      <h4 className="text-md font-medium text-gray-900 mb-2">Deductions</h4>
                      <div className="space-y-2 text-sm">
                        {results.deductions?.breakdown && Object.entries(results.deductions.breakdown).map(([key, value]) => (
                          <div key={key} className="flex justify-between">
                            <span className="text-gray-600">{key}</span>
                            <span className="font-medium">${value.toFixed(2)}</span>
                          </div>
                        ))}
                        <div className="flex justify-between pt-1 border-t">
                          <span className="font-medium">Total Deductions</span>
                          <span className="font-bold">${results.deductions.total.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  {results.taxBracketBreakdown && (
                    <BracketVisualization
                      brackets={results.taxBracketBreakdown}
                      totalTax={results.federalIncomeTax || 0}
                      currency="$"
                    />
                  )}
                </div>
              </div>
            </Card>
          </div>
        {/* Closing div for the always-rendered results section */}
      </div>
    </div>
  );
};