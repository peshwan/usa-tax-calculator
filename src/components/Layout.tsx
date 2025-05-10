import React, { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface LayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  
  return (
    <div className="flex flex-col bg-gradient-to-b from-blue-50 to-teal-50 min-h-screen">
      <div className="flex-grow overflow-y-auto py-4">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
            {children}
        </div>
      </div>
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm">
                © 2025 <Link to="/" className="hover:text-blue-300 transition-colors">USA Tax Calculator</Link>. For informational purposes only. <br />
                Contact: <a href="mailto:oliverr1988@gmail.com" className="hover:text-blue-300 transition-colors">oliverr1988@gmail.com</a>
              </p>
            </div>
            <div className="flex space-x-6">
              <Link
                to="/privacy"
                className={`text-sm hover:text-blue-300 transition-colors ${
                  location.pathname === '/privacy' ? 'text-blue-300' : 'text-gray-300'
                }`}
              >
                Privacy Policy
              </Link>
              <Link
                to="/about"
                className={`text-sm hover:text-blue-300 transition-colors ${
                  location.pathname === '/about' ? 'text-blue-300' : 'text-gray-300'
                }`}
              >
                About
              </Link>
            </div>
            <div>
              <p className="text-sm text-gray-400">
                Please consult with a tax professional.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};