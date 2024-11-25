import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { SparkLineChart } from '@mui/x-charts/SparkLineChart';
import { areaElementClasses } from '@mui/x-charts/LineChart';

export type StatCardProps = {
  title: string;
  value: string;
  interval: string;
  trend: '↑' | '↓';
  data: string;
  icon: React.ReactNode
};
export default function StatCard({
  title,
  value,
  interval,
  trend,
  data,
  icon
}: StatCardProps) {



  return (
       <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center">
              {icon}
              <div className="ml-4">
                <p className="text-sm text-gray-500">{title}</p>
                <h3 className="text-xl font-semibold">{value}</h3>
                <p className={`text-sm text-${trend==='↑'? 'green' : 'red'}-500`}>{`${trend} ${data}% Last ${interval}`}</p>
              </div>
            </div>
          </div>
  );
}
