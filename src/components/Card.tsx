import React, { ReactNode } from 'react';

interface CardProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ title, children, className = '' }) => {
  return (
    <div className={`bg-white/90 backdrop-blur-sm rounded-lg shadow-lg border border-gray-100 overflow-hidden ${className}`}>
      {title && (
        <div className="bg-gradient-to-r from-blue-800 to-teal-700 px-4 py-3">
          <h2 className="text-lg font-medium text-white">{title}</h2>
        </div>
      )}
      <div className="p-4">{children}</div>
    </div>
  );
};