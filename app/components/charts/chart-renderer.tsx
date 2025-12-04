"use client";

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Treemap,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Chart, Dataset } from "@/lib/types";

const COLORS = [
  "hsl(221, 83%, 53%)",
  "hsl(142, 76%, 36%)",
  "hsl(38, 92%, 50%)",
  "hsl(0, 84%, 60%)",
  "hsl(262, 83%, 58%)",
  "hsl(199, 89%, 48%)",
  "hsl(339, 82%, 51%)",
  "hsl(47, 96%, 53%)",
  "hsl(173, 80%, 40%)",
  "hsl(291, 64%, 42%)",
];

// Helper function for parsing numbers
function parseNumber(value: string | number): number {
  if (typeof value === "number") return value;
  const cleaned = String(value).replace(/[^0-9.-]/g, "");
  return parseFloat(cleaned);
}

interface ChartRendererProps {
  chart: Chart;
  data: Dataset;
}

export function ChartRenderer({ chart, data }: ChartRendererProps) {
  let chartData: Array<{ x: string | number; y: number }> = [];

  try {
    // Create a safe evaluation context with parseNumber available
    const fn = new Function(
      "data",
      "parseNumber",
      `return (${chart.javascriptFunction})(data);`
    );
    chartData = fn(data, parseNumber) || [];
  } catch (error) {
    console.error("Error executing chart function:", error);
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">{chart.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[250px] flex items-center justify-center text-muted-foreground">
            Error rendering chart
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!chartData || chartData.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">{chart.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[250px] flex items-center justify-center text-muted-foreground">
            No data available
          </div>
        </CardContent>
      </Card>
    );
  }

  const renderChart = () => {
    switch (chart.chartType) {
      case "barChart":
        return (
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis
                dataKey="x"
                tick={{ fontSize: 11 }}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "6px",
                }}
              />
              <Bar dataKey="y" fill={COLORS[0]} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        );

      case "lineChart":
        return (
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis
                dataKey="x"
                tick={{ fontSize: 11 }}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "6px",
                }}
              />
              <Line
                type="monotone"
                dataKey="y"
                stroke={COLORS[0]}
                strokeWidth={2}
                dot={{ fill: COLORS[0], r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        );

      case "pieChart":
        return (
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="y"
                nameKey="x"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label={({ x, percent }) =>
                  `${x}: ${(percent * 100).toFixed(0)}%`
                }
                labelLine={false}
              >
                {chartData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "6px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        );

      case "treemapChart":
        const treemapData = chartData.map((item, index) => ({
          name: String(item.x),
          size: item.y,
          fill: COLORS[index % COLORS.length],
        }));
        return (
          <ResponsiveContainer width="100%" height={250}>
            <Treemap
              data={treemapData}
              dataKey="size"
              aspectRatio={4 / 3}
              stroke="hsl(var(--background))"
            >
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "6px",
                }}
              />
            </Treemap>
          </ResponsiveContainer>
        );

      default:
        return (
          <div className="h-[250px] flex items-center justify-center text-muted-foreground">
            Unknown chart type: {chart.chartType}
          </div>
        );
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">{chart.title}</CardTitle>
      </CardHeader>
      <CardContent>{renderChart()}</CardContent>
    </Card>
  );
}
