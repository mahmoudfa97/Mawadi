
import * as React from 'react';

export default function Conversions() {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
    <h2 className="text-lg font-semibold mb-4">Conversions</h2>
    <div className="relative pt-1">
      <div className="flex mb-2 items-center justify-between">
        <div>
          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-orange-600 bg-orange-200">Returning Customer</span>
        </div>
        <div className="text-right">
          <span className="text-xs font-semibold inline-block text-orange-600">65.2%</span>
        </div>
      </div>
      <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-orange-200">
        <div style={{ width: "65.2%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-orange-500"></div>
      </div>
    </div>
  </div>
  );
}
