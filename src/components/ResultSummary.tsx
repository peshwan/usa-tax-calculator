import React from 'react';

interface ResultSummaryProps {
  income: number;
  totalTax: number;
  takeHomePay: number;
  effectiveTaxRate: number;
  currency: '£' | '$';
}

export const ResultSummary: React.FC<ResultSummaryProps> = ({
  income,
  totalTax,
  takeHomePay,
  effectiveTaxRate,
  currency,
}) => {
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency === '£' ? 'GBP' : 'USD',
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const percentageOfIncome = (amount: number): string => {
    return ((amount / income) * 100).toFixed(1) + '%';
  };

  return (
    <div className="bg-gradient-to-r from-blue-900 to-teal-800 rounded-lg text-white p-4 shadow-lg">
      <h3 className="text-lg font-semibold mb-1">Tax Summary</h3>
      
      <div className="grid grid-cols-2 gap-2">
        <div>
          <p className="text-blue-200 text-xs">Annual Income</p>
          <p className="text-lg sm:text-xl font-bold">{formatCurrency(income)}</p>
        </div>
        
        <div>
          <p className="text-blue-200 text-xs">Total Tax</p>
          <p className="text-lg sm:text-xl font-bold">{formatCurrency(totalTax)}</p>
          <p className="text-xs text-blue-300">{percentageOfIncome(totalTax)} of income</p>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-blue-700">
        <div className="flex justify-between items-end">
          <div>
            <p className="text-blue-200 text-xs">Take Home Pay</p>
            <p className="text-xl sm:text-2xl font-bold">{formatCurrency(takeHomePay)}</p>
            <p className="text-xs text-blue-300">{percentageOfIncome(takeHomePay)} of income</p>
          </div>
          <div className="text-right">
            <p className="text-blue-200 text-xs">Effective Tax Rate</p>
            <p className="text-lg sm:text-xl font-bold">{effectiveTaxRate.toFixed(2)}%</p>
          </div>
        </div>
      </div>
      
      <div className="mt-2 w-full bg-blue-700 rounded-full h-2">
        <div 
          className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full"
          style={{ width: `${100 - (totalTax / income) * 100}%` }}
        ></div>
      </div>
      <div className="flex justify-between text-xs text-blue-200">
        <span>Take Home Pay</span>
        <span>Tax</span>
      </div>
    </div>
  );
};