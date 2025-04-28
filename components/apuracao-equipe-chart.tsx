"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

const data = [
  { name: "PF Participativo", value: 120000 },
  { name: "Migração", value: 50000 },
  { name: "PJ Empresarial", value: 70000 },
  { name: "Opcional", value: 10000 },
]

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042"]

export function ApuracaoEquipeChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value) =>
            new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(Number(value))
          }
        />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}
