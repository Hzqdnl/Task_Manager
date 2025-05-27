import React from 'react';
import {
    Bar,
    BarChart,
    CartesianGrid,
    LabelList,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import { chartData } from '../assets/data';

const Chart = () => {
  return (
     <ResponsiveContainer width="100%" height={500}>
      <BarChart
        data={chartData}
        margin={{ top: 30, right: 30, left: 10, bottom: 30 }}
      >
        {/* Grid with subtle lines */}
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />

        {/* Axis */}
        <XAxis 
          dataKey="name" 
          stroke="#6b7280"
          tick={{ fontSize: 14, fontWeight: 500 }}
        />
        <YAxis 
          stroke="#6b7280" 
          tick={{ fontSize: 14, fontWeight: 500 }}
        />

        {/* Tooltip and Legend */}
        <Tooltip
          contentStyle={{ backgroundColor: '#111827', borderRadius: 8, color: '#fff', border: 'none' }}
          labelStyle={{ color: '#d1d5db' }}
          itemStyle={{ color: '#f9fafb' }}
        />
        <Legend
          verticalAlign="top"
          height={36}
          iconType="circle"
          wrapperStyle={{ fontSize: '14px', fontWeight: '500', color: '#374151' }}
        />

        {/* Bar with gradient and label */}
        <Bar
          dataKey="total"
          fill="url(#colorUv)"
          radius={[8, 8, 0, 0]}
        >
          <LabelList dataKey="total" position="top" fill="#111827" fontSize={14} fontWeight={600} />
        </Bar>

        {/* Gradient for bar fill */}
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6366f1" stopOpacity={0.9} />
            <stop offset="100%" stopColor="#6366f1" stopOpacity={0.3} />
          </linearGradient>
        </defs>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Chart