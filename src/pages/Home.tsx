import React from 'react';
import { CountrySelector } from '../components/CountrySelector';
import { USATaxCalculator } from '../features/usa/USATaxCalculator';
import { Country } from '../types';

export const Home: React.FC = () => {
  const selectedCountry: Country = 'USA';

  return (
    <div className="max-w-6xl mx-auto px-4 py-4"> {/* Restored py-4 for consistent padding */}
      <header className="text-center mb-6 md:mb-8"> {/* Responsive margin */}
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-2"> {/* Responsive font size */}
          2025-2026 USA Tax Calculator
        </h1>
        <h2 className="text-base sm:text-lg text-gray-600"> {/* Responsive font size */}
          Accurate tax calculations for the USA tax system
        </h2>
      </header>

      <CountrySelector 
        selectedCountry={selectedCountry} 
        onSelectCountry={() => {}} 
      />

      <div className="mt-8">
        <USATaxCalculator />
      </div>
    </div>
  );
};