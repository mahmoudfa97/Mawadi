import * as React from 'react';

export default function TopPages() {
    const topPages = [
        { path: "larkon/ecommerce.html", views: 465, exitRate: "4.4%" },
        { path: "larkon/dashboard.html", views: 426, exitRate: "20.4%" },
        { path: "larkon/chat.html", views: 254, exitRate: "12.9%" },
        { path: "larkon/auth-login.html", views: 3369, exitRate: "5.2%" },
        { path: "larkon/email.html", views: 985, exitRate: "64.2%" },
      ];
    
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Top Pages</h2>
              <button className="text-orange-500 text-sm">View All</button>
            </div>
            <div className="space-y-4">
              {topPages.map((page, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm truncate flex-1">{page.path}</span>
                  <span className="text-sm text-gray-500 mx-4">{page.views}</span>
                  <span className={`text-sm ${parseFloat(page.exitRate) > 20 ? "text-red-500" : "text-green-500"}`}>{page.exitRate}</span>
                </div>
              ))}
            </div>
          </div>
  );
}
