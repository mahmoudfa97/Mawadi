import React, { useState } from "react";
const StaticOffers: React.FC = () => {
  return (
    <div className="space-y-3 border rounded-lg p-4">
    <h3 className="font-semibold">Available offers :</h3>
    <ul className="space-y-2 text-sm">
      <li className="flex gap-2">
        <span className="text-green-500">🏦</span>
        Bank Offer: 10% instant discount on Bank Debit Cards, up to $30 on orders of $50 and above
      </li>
      <li className="flex gap-2">
        <span className="text-green-500">🏦</span>
        Bank Offer: Grab our exclusive offer now and save 20% on your next purchase! Don't miss out, shop today!
      </li>
    </ul>
  </div>
  );
};

export default StaticOffers;
