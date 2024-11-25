import * as React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
export default function Performance() {
    const performanceData = [
        { month: "Jan", pageViews: 30, clicks: 10 },
        { month: "Feb", pageViews: 60, clicks: 15 },
        { month: "Mar", pageViews: 45, clicks: 20 },
        { month: "Apr", pageViews: 65, clicks: 25 },
        { month: "May", pageViews: 45, clicks: 30 },
        { month: "Jun", pageViews: 60, clicks: 15 },
        { month: "Jul", pageViews: 40, clicks: 10 },
        { month: "Aug", pageViews: 45, clicks: 8 },
        { month: "Sep", pageViews: 80, clicks: 30 },
        { month: "Oct", pageViews: 50, clicks: 20 },
        { month: "Nov", pageViews: 65, clicks: 25 },
        { month: "Dec", pageViews: 70, clicks: 35 },
      ];
  return (
    <div className="p-6">
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Performance</h2>
        <div className="flex space-x-2">
          <button className="px-3 py-1 text-sm rounded-full bg-gray-100">ALL</button>
          <button className="px-3 py-1 text-sm rounded-full">1M</button>
          <button className="px-3 py-1 text-sm rounded-full">6M</button>
          <button className="px-3 py-1 text-sm rounded-full">1Y</button>
        </div>
      </div>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={performanceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="pageViews" stroke="#ff6b6b" fill="#ff6b6b" fillOpacity={0.1} />
            <Area type="monotone" dataKey="clicks" stroke="#51cf66" fill="#51cf66" fillOpacity={0.1} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  </div>
  );
}
