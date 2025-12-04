export interface Filter {
  title: string;
  column: string;
}

export interface KPI {
  title: string;
  javascriptFunction: string;
}

export interface Chart {
  title: string;
  chartType: "barChart" | "lineChart" | "pieChart" | "treemapChart";
  javascriptFunction: string;
}

export interface Dashboard {
  filters: Filter[];
  kpis: KPI[];
  charts: Chart[];
}

export type DataRecord = Record<string, string>;
export type Dataset = DataRecord[];

export interface AnalysisState {
  data: Dataset | null;
  dashboard: Dashboard | null;
  isLoading: boolean;
  error: string | null;
}
