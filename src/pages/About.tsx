import React from 'react';
import { Card } from '../components/Card';
import { Mail, Info } from 'lucide-react'; // Added Info icon, removed Phone, MapPin

export const About: React.FC = () => {
  const contactEmail = 'oliverr1988@gmail.com';

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Card>
        <div className="flex items-center mb-6">
          <Info className="text-blue-600 w-8 h-8 mr-3" />
          <h1 className="text-3xl font-bold">About This Tax Calculator</h1>
        </div>
        
        <div className="space-y-6 text-gray-700">
          <p>
            Welcome to our comprehensive tax calculator! This tool is designed to provide
            estimated tax calculations for individuals in the USA and the UK. Our goal is to
            offer a user-friendly interface to help you understand your potential tax liabilities
            based on the latest (2025) tax laws and data.
          </p>
          <p>
            Key features include:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-4">
            <li>Support for USA federal and state taxes.</li>
            <li>Calculations for different filing statuses.</li>
            <li>Detailed breakdown of tax components, including Social Security and Medicare.</li>
            <li>Visualization of tax brackets.</li>
            <li>Options for common deductions.</li>
          </ul>
          <p>
            This calculator is intended for informational and estimation purposes only.
            It should not be considered a substitute for professional tax advice. Tax laws are
            complex and can change, and individual circumstances vary greatly.
          </p>
          <p>
            We strive for accuracy, but please consult with a qualified tax professional
            for advice tailored to your specific financial situation.
          </p>
          
          <div className="pt-4 border-t border-gray-200">
            <h2 className="text-xl font-semibold mb-3">Contact Information</h2>
            <p>
              If you have any questions about the calculator's functionality, encounter any technical issues,
              or have suggestions for improvement, please feel free to reach out:
            </p>
            <div className="flex items-center space-x-3 mt-3">
              <Mail className="text-blue-600 w-5 h-5" />
              <a href={`mailto:${contactEmail}`} className="hover:text-blue-600">{contactEmail}</a>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};