import React from 'react';
import { Country } from '../types';

interface CountrySelectorProps {
  selectedCountry: Country;
  onSelectCountry: (country: Country) => void;
}

export const CountrySelector: React.FC<CountrySelectorProps> = () => {
  return (
    // The button has been removed as per user request.
    // If country selection functionality is needed in the future, this component can be updated.
    <></>
  );
};