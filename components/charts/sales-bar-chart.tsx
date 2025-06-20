"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface SalesData {
  month: string
  sales: number
  orders: number
}

interface SalesBarChartProps {
  data: SalesData[]
}

export default function SalesBarChart({ data }: SalesBarChartProps) {
  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="sales" fill="#155E75" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
