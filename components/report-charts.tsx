"use client"

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts"

interface VentesData {
  mois: string
  ventes: number
  commandes: number
  clients: number
}

interface ProduitsData {
  nom: string
  ventes: number
  pourcentage: number
  couleur: string
}

interface ClientsData {
  type: string
  nombre: number
  ca: number
}

export function SalesEvolutionChart({ data }: { data: VentesData[] }) {
  return (
    <div className="h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="mois" />
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" />
          <Tooltip />
          <Area
            yAxisId="left"
            type="monotone"
            dataKey="ventes"
            stackId="1"
            stroke="#155E75"
            fill="#155E75"
            fillOpacity={0.6}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export function ProductDistributionChart({ data }: { data: ProduitsData[] }) {
  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ nom, pourcentage }) => `${nom} (${pourcentage}%)`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="ventes"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.couleur} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export function ClientAnalysisChart({ data }: { data: ClientsData[] }) {
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

const ReportCharts = {
  SalesEvolutionChart,
  ProductDistributionChart,
  ClientAnalysisChart,
}

export default ReportCharts
