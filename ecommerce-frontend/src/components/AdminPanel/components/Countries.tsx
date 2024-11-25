import * as React from 'react';

export default function CountryAnalytics() {
    
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
    <h2 className="text-lg font-semibold mb-4">Sessions by Country</h2>
    <div className="space-y-4">
      <div className="flex items-center">
        <img src="/placeholder.svg?height=20&width=30" alt="US Flag" className="mr-2" />
        <span className="flex-1">United States</span>
        <span className="text-gray-500">30%</span>
      </div>
      <div className="flex items-center">
        <img src="/placeholder.svg?height=20&width=30" alt="Canada Flag" className="mr-2" />
        <span className="flex-1">Canada</span>
        <span className="text-gray-500">20%</span>
      </div>
      <div className="flex items-center">
        <img src="/placeholder.svg?height=20&width=30" alt="Russia Flag" className="mr-2" />
        <span className="flex-1">Russia</span>
        <span className="text-gray-500">15%</span>
      </div>
    </div>
  </div>
  );
}
