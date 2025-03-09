"use client"

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip, Legend } from "recharts"

const data = [
  { name: "Problema", value: 25, color: "#f97316" },
  { name: "Melhoria", value: 15, color: "#3b82f6" },
  { name: "Suporte", value: 12, color: "#10b981" },
  { name: "Reclamação", value: 8, color: "#ef4444" },
]

export function TicketTypeChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <PieChart>
        <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={2} dataKey="value">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}

