"use client";

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

type Props = {
  data: { name: string; ingresos: number }[];
};

export default function MonthlyIncomeChart({ data }: Props) {
  return (
    <section className="p-6 border rounded-lg bg-white">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Ingresos por Mes</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="ingresos" stroke="#EF4444" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </section>
  );
}
