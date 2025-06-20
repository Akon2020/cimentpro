"use client";

import dynamic from "next/dynamic";

// Import dynamique pour éviter les erreurs SSR
const BarChart = dynamic(() => import("recharts").then((mod) => mod.BarChart), {
  ssr: false,
});
const Bar = dynamic(() => import("recharts").then((mod) => mod.Bar), {
  ssr: false,
});
const XAxis = dynamic(() => import("recharts").then((mod) => mod.XAxis), {
  ssr: false,
});
const YAxis = dynamic(() => import("recharts").then((mod) => mod.YAxis), {
  ssr: false,
});
const CartesianGrid = dynamic(
  () => import("recharts").then((mod) => mod.CartesianGrid),
  { ssr: false }
);
const Tooltip = dynamic(() => import("recharts").then((mod) => mod.Tooltip), {
  ssr: false,
});
const ResponsiveContainer = dynamic(
  () => import("recharts").then((mod) => mod.ResponsiveContainer),
  { ssr: false }
);
const PieChart = dynamic(() => import("recharts").then((mod) => mod.PieChart), {
  ssr: false,
});
const Pie = dynamic(() => import("recharts").then((mod) => mod.Pie), {
  ssr: false,
});
const Cell = dynamic(() => import("recharts").then((mod) => mod.Cell), {
  ssr: false,
});
const LineChart = dynamic(
  () => import("recharts").then((mod) => mod.LineChart),
  { ssr: false }
);
const Line = dynamic(() => import("recharts").then((mod) => mod.Line), {
  ssr: false,
});

interface ChartData {
  mois?: string;
  ventes?: number;
  commandes?: number;
  nom?: string;
  valeur?: number;
  couleur?: string;
}

interface BarChartComponentProps {
  data: ChartData[];
  dataKey: string;
  color?: string;
  height?: number;
}

export function BarChartComponent({
  data,
  dataKey,
  color = "#155E75",
  height = 300,
}: BarChartComponentProps) {
  return (
    <div style={{ width: "100%", height }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="mois" />
          <YAxis />
          <Tooltip
            formatter={(value: number) => [
              dataKey === "ventes"
                ? `${value.toLocaleString()} CDF`
                : value.toString(),
              dataKey === "ventes" ? "Ventes" : "Commandes",
            ]}
          />
          <Bar dataKey={dataKey} fill={color} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

interface PieChartComponentProps {
  data: ChartData[];
  height?: number;
}

export function PieChartComponent({
  data,
  height = 300,
}: PieChartComponentProps) {
  return (
    <div style={{ width: "100%", height }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            dataKey="valeur"
            label={({ nom, valeur }) => `${nom}: ${valeur}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.couleur || "#155E75"} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

interface LineChartComponentProps {
  data: ChartData[];
  dataKey: string;
  color?: string;
  height?: number;
}

export function LineChartComponent({
  data,
  dataKey,
  color = "#155E75",
  height = 300,
}: LineChartComponentProps) {
  return (
    <div style={{ width: "100%", height }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="mois" />
          <YAxis />
          <Tooltip
            formatter={(value: number) => [
              dataKey === "ventes"
                ? `${value.toLocaleString()} CDF`
                : value.toString(),
              dataKey === "ventes" ? "Ventes" : "Commandes",
            ]}
          />
          <Line
            type="monotone"
            dataKey={dataKey}
            stroke={color}
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
