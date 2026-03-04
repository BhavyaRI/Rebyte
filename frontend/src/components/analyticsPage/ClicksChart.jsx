  import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const ClicksChart = ({ data }) => {
  const chartData = data.map(item => ({
    date: item._id,
    clicks: item.count
  }));

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white shadow-lg rounded-lg p-3 border border-gray-200">
          <p className="text-sm font-medium text-gray-700">{label}</p>
          <p className="text-lg font-bold text-gray-900">
            {payload[0].value} clicks
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white shadow-sm rounded-xl p-6 w-full border border-gray-100">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-900">Clicks Over Time</h3>
        <p className="text-sm text-gray-500 mt-1">Track your link performance</p>
      </div>
      
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart
          data={chartData}
          margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
        >
          <defs>
            <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#000000" stopOpacity={0.08}/>
              <stop offset="95%" stopColor="#000000" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis 
            dataKey="date"
            tick={{ fill: '#6b7280', fontSize: 12 }}
            axisLine={{ stroke: '#d1d5db' }}
          />
          <YAxis 
            tick={{ fill: '#6b7280', fontSize: 12 }}
            axisLine={{ stroke: '#d1d5db' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="clicks"
            stroke="#000000"
            strokeWidth={2}
            fill="url(#colorClicks)"
            dot={{ fill: '#000000', r: 4, strokeWidth: 2, stroke: '#fff' }}
            activeDot={{ r: 6, fill: '#000000', strokeWidth: 2, stroke: '#fff' }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ClicksChart;