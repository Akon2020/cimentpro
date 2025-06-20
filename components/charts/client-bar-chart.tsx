"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface ClientsData {
  type: string
  nombre: number
  ca: number
}

interface ClientBarChartProps {
  data: ClientsData[]
}

export default function ClientBarChart({ data }: ClientBarChartProps) {
  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="horizontal">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis dataKey="type" type="category" width={120} />
          <Tooltip />
          <Bar dataKey="ca" fill="#155E75" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
