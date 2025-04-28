"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const data = [
  {
    name: "PF Participativo",
    valor: 25000,
    comissao: 750,
  },
  {
    name: "Migração",
    valor: 10000,
    comissao: 150,
  },
  {
    name: "PJ Empresarial",
    valor: 8000,
    comissao: 280,
  },
  {
    name: "Opcional",
    valor: 2000,
    comissao: 80,
  },
]

export function ApuracaoIndividualChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis
          yAxisId="left"
          orientation="left"
          stroke="#8884d8"
          tickFormatter={(value) =>
            new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
              notation: "compact",
              maximumFractionDigits: 1,
            }).format(value)
          }
        />
        <YAxis
          yAxisId="right"
          orientation="right"
          stroke="#82ca9d"
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
        <Bar yAxisId="left" dataKey="valor" name="Valor Produzido" fill="#8884d8" />
        <Bar yAxisId="right" dataKey="comissao" name="Comissão" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  )
}
