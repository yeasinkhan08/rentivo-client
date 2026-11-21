"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function MonthlyChart({ title, data, dataKey, label, color }) {
  return (
    <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-sm">
      <h2 className="text-lg font-semibold">{title}</h2>

      <div className="mt-4 h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#94a3b855" />
            <XAxis dataKey="month" tick={{ fill: "#94a3b8", fontSize: 12 }} />
            <YAxis
              allowDecimals={false}
              tick={{ fill: "#94a3b8", fontSize: 12 }}
            />
            <Tooltip
              formatter={(value) => [value, label]}
              contentStyle={{ borderRadius: 12 }}
            />
            <Bar dataKey={dataKey} fill={color} radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
