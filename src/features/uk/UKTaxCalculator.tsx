import React, { useState, useEffect } from 'react';
import { Card } from '../../components/Card';
import { InputField } from '../../components/InputField';
import { SelectField } from '../../components/SelectField';
import { ResultSummary } from '../../components/ResultSummary';
import { BracketVisualization } from '../../components/BracketVisualization';
import { calculateUKTax } from '../../utils/ukTaxCalculator';
import { niCategoryOptions, niCategoryDescriptions } from '../../data/ukTaxData';
import { UKTaxInput, UKTaxResult, UKNICategory } from '../../types';

export const UKTaxCalculator: React.FC = () => {
  const [inputs, setInputs] = useState<UKTaxInput>({
    income: 50000,
    niCategory: 'A',
    isEmployed: true,
  });

  const [results, setResults] = useState<UKTaxResult | null>(null);

  // Calculate tax whenever inputs change
  useEffect(() => {
    if (inputs.income > 0) {
      const result = calculateUKTax(inputs);
      setResults(result);
    }
  }, [inputs]);

  const handleIncomeChange = (value: number) => {
    setInputs({ ...inputs, income: value });
  };

  const handleNICategoryChange = (value: string) => {
    setInputs({ ...inputs, niCategory: value as UKNICategory });
  };

  const handleEmploymentChange = (value: boolean) => {
    setInputs({ ...inputs, isEmployed: value });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
      <div className="lg:col-span-1 overflow-y-auto">
        <Card title="UK Tax Calculator">
          <div className="mt-2">
            <InputField
              label="Annual Gross Income"
              type="number"
              value={inputs.income}
              onChange={handleIncomeChange}
              min={0}
              step={1000}
              name="income"
              prefix="£"
              tooltip="Enter your total annual income before taxes"
            />

            <SelectField
              label="National Insurance Category"
              options={niCategoryOptions}
              value={inputs.niCategory}
              onChange={handleNICategoryChange}
              name="niCategory"
              tooltip={niCategoryDescriptions[inputs.niCategory]}
            />

            <InputField
              label="Employment Status"
              type="checkbox"
              value={inputs.isEmployed}
              onChange={handleEmploymentChange}
              name="isEmployed"
              placeholder="I am employed"
              tooltip="If checked, employer National Insurance contributions will be calculated"
            />
          </div>
        </Card>
      </div>

      <div className="lg:col-span-2">
        {results && (
          <div className="space-y-6">
            <ResultSummary
              income={inputs.income}
              totalTax={results.totalContributions}
              takeHomePay={results.takeHomePay}
              effectiveTaxRate={results.effectiveRate}
              currency="£"
            />

            <Card>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Contribution Components</h3>
                  <div className="mt-4 space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">National Insurance</span>
                      <span className="font-medium">£{results.nationalInsurance.toFixed(2)}</span>
                    </div>
                    {inputs.isEmployed && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Employer Contribution</span>
                        <span className="font-medium">£{results.employerContribution?.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between border-t pt-2">
                      <span className="font-medium">Total Employee Contribution</span>
                      <span className="font-bold">£{results.totalContributions.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <BracketVisualization
                    brackets={results.niBreakdown.map(item => ({
                      bracket: item.rate,
                      taxAmount: item.amount
                    }))}
                    totalTax={results.nationalInsurance}
                    currency="£"
                    isUK={true}
                  />
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};