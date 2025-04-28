"use client"

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Jan",
    meta: 200000,
    realizado: 180000,
  },
  {
    name: "Fev",
    meta: 200000,
    realizado: 220000,
  },
  {
    name: "Mar",
    meta: 220000,
    realizado: 240000,
  },
  {
    name: "Abr",
    meta: 250000,
    realizado: 187500,
  },
]

export function DashboardChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis
          tickFormatter={(value) =>
            new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
              notation: "compact",
              maximumFractionDigits: 1,
            }).format(value)
          }
        />
        <Tooltip
          formatter={(value) =>
            new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(Number(value))
          }
        />
        <Legend />
        <Bar dataKey="meta" name="Meta" fill="#8884d8" />
        <Bar dataKey="realizado" name="Realizado" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  )
}
