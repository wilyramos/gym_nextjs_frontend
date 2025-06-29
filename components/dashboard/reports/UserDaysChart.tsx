// app/components/dashboard/reports/UserDaysChart.tsx
'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

type Props = {
  data: { name: string; dias: number }[];
};

export default function UserDaysChart({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="dias">
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={entry.dias > 0 ? '#10B981' : '#EF4444'}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
