"use client"

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface VentesData {
  mois: string
  ventes: number
  commandes: number
  clients: number
}

interface SalesAreaChartProps {
  data: VentesData[]
}

export default function SalesAreaChart({ data }: SalesAreaChartProps) {
  return (
    <div className="h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="mois" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="ventes" stackId="1" stroke="#155E75" fill="#155E75" fillOpacity={0.6} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
