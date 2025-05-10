import React from 'react';
import { Card } from '../components/Card';

export const Privacy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Card>
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        
        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-3">Information Collection and Use</h2>
            <p className="text-gray-700">
              Our tax calculator operates entirely in your browser. We do not collect, store, or transmit any of your personal or financial information. All calculations are performed locally on your device.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Data Security</h2>
            <p className="text-gray-700">
              Since all calculations are performed locally and no data is transmitted to our servers, your financial information remains completely private and secure.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Cookies and Tracking</h2>
            <p className="text-gray-700">
              We do not use cookies or any tracking mechanisms. Your usage of the calculator is completely anonymous.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Updates to This Policy</h2>
            <p className="text-gray-700">
              We may update this privacy policy from time to time. Any changes will be reflected on this page.
            </p>
          </section>

       
        </div>
      </Card>
    </div>
  );
};