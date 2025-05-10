import React from 'react';
import { USATaxBracket, UKNIRateDetail } from '../types';

interface BracketVisualizationProps {
  brackets: Array<{
    bracket: USATaxBracket | UKNIRateDetail;
    taxAmount: number;
  }>;
  totalTax: number;
  currency: '£' | '$';
  isUK?: boolean;
}

export const BracketVisualization: React.FC<BracketVisualizationProps> = ({
  brackets,
  totalTax,
  currency,
  isUK = false
}) => {
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency === '£' ? 'GBP' : 'USD',
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const getPercentage = (amount: number): number => {
    if (totalTax === 0) {
      return 0; // Avoid division by zero if there's no total tax
    }
    return (amount / totalTax) * 100;
  };

  const getBracketColor = (index: number): string => {
    const colors = [
      'bg-blue-500', 'bg-teal-500', 'bg-indigo-500', 
      'bg-purple-500', 'bg-pink-500', 'bg-red-500',
      'bg-orange-500', 'bg-yellow-500', 'bg-green-500'
    ];
    return colors[index % colors.length];
  };

  const getBracketLabel = (bracket: USATaxBracket | UKNIRateDetail, isUK: boolean): string => {
    if (isUK) {
      const ukBracket = bracket as UKNIRateDetail;
      const min = ukBracket.min;
      const max = ukBracket.max || '∞';
      return `${ukBracket.employeeRate * 100}% (£${min} - £${max})`;
    } else {
      const usBracket = bracket as USATaxBracket;
      const min = usBracket.min;
      const max = usBracket.max || '∞';
      return `${usBracket.rate}% ($${min.toLocaleString()} - $${max === '∞' ? '∞' : max.toLocaleString()})`;
    }
  };

  return (
    <div className="mt-6">
      <h3 className="text-lg font-medium text-gray-900 mb-2">Tax Breakdown</h3>
      
      {brackets.length > 0 && totalTax > 0 ? (
        <>
          <div className="w-full h-8 flex rounded-md overflow-hidden mb-2">
            {brackets.map((item, index) => (
              item.taxAmount > 0 && ( // Only render bar if there's tax in this bracket
                <div
                  key={index}
                  className={`${getBracketColor(index)} h-full`}
                  style={{ width: `${getPercentage(item.taxAmount)}%` }}
                  title={`${getBracketLabel(item.bracket, isUK)}: ${formatCurrency(item.taxAmount)}`}
                ></div>
              )
            ))}
          </div>
          
          <div className="space-y-2">
            {brackets.map((item, index) => (
              item.taxAmount > 0 && ( // Only render legend item if there's tax in this bracket
                <div key={index} className="flex items-center">
                  <div className={`w-4 h-4 ${getBracketColor(index)} rounded-sm mr-2`}></div>
                  <div className="flex-1">
                    <p className="text-sm">
                      {getBracketLabel(item.bracket, isUK)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{formatCurrency(item.taxAmount)}</p>
                    <p className="text-xs text-gray-500">{getPercentage(item.taxAmount).toFixed(1)}% of total tax</p>
                  </div>
                </div>
              )
            ))}
          </div>
        </>
      ) : (
        <p className="text-sm text-gray-500 mt-2">
          No federal income tax applicable at this income level for this filing status, or no breakdown available.
        </p>
      )}
    </div>
  );
};