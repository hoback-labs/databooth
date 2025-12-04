"use client";

import { ChartRenderer } from "./chart-renderer";
import { KPICard } from "./kpi-card";
import type { Dashboard, Dataset } from "@/lib/types";

interface DashboardViewProps {
  dashboard: Dashboard;
  data: Dataset;
}

export function DashboardView({ dashboard, data }: DashboardViewProps) {
  return (
    <div className="space-y-6">
      {/* KPIs */}
      {dashboard.kpis && dashboard.kpis.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-3">Key Metrics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {dashboard.kpis.map((kpi, index) => (
              <KPICard key={index} kpi={kpi} data={data} />
            ))}
          </div>
        </div>
      )}

      {/* Charts */}
      {dashboard.charts && dashboard.charts.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-3">Visualizations</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {dashboard.charts.map((chart, index) => (
              <ChartRenderer key={index} chart={chart} data={data} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
