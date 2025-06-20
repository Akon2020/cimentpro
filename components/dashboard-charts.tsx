"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

interface SalesData {
  month: string
  sales: number
  orders: number
}

interface ProductData {
  name: string
  value: number
  color: string
}

interface SalesChartProps {
  data: SalesData[]
}

interface ProductChartProps {
  data: ProductData[]
}

export function SalesChart({ data }: SalesChartProps) {
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

export function ProductChart({ data }: ProductChartProps) {
  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" labelLine={false} outerRadius={80} fill="#8884d8" dataKey="value">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

// Export par défaut pour l'import dynamique
const Charts = {
  SalesChart,
  ProductChart,
}

export default Charts
