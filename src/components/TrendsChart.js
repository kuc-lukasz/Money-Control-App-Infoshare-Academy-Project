import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload[0]) {
    return null;
  }

  return (
    <div
      style={{
        backgroundColor: 'white',
        padding: '5px',
        border: '1px solid #156a77',
        opacity: '75%'
      }}
    >
      <p>{payload[0].payload.name}</p>
      <p>{`incomes : ${payload[0].value} PLN`}</p>
      <p>{`expenses : ${payload[1].value} PLN`}</p>
      <p>{`balance: ${payload[0].payload.balance} PLN`}</p>
    </div>
  );
};

export const TrendsChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="month"
          label={{ value: 'Months', position: 'insideBottomRight', offset: -5 }}
        />
        <YAxis
          label={{
            value: 'Value (PLN)',
            angle: -90,
            position: 'insideLeft',
            offset: 0
          }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend verticalAlign="top" height={36} />
        <Line
          type="monotone"
          dataKey="incomes"
          stroke="green"
          activeDot={{ r: 6 }}
        />
        <Line
          type="monotone"
          dataKey="expenses"
          stroke="red"
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
