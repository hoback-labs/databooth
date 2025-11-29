"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { KPI, Dataset } from "@/lib/types";

function parseNumber(value: string | number): number {
  if (typeof value === "number") return value;
  const cleaned = String(value).replace(/[^0-9.-]/g, "");
  return parseFloat(cleaned);
}

function formatValue(value: unknown): string {
  if (typeof value === "number") {
    if (Number.isInteger(value)) {
      return value.toLocaleString();
    }
    return value.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });
  }
  return String(value);
}

interface KPICardProps {
  kpi: KPI;
  data: Dataset;
}

export function KPICard({ kpi, data }: KPICardProps) {
  let value: unknown = "—";

  try {
    const fn = new Function(
      "data",
      "parseNumber",
      `return (${kpi.javascriptFunction})(data);`
    );
    value = fn(data, parseNumber);
  } catch (error) {
    console.error("Error executing KPI function:", error);
    value = "Error";
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {kpi.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{formatValue(value)}</div>
      </CardContent>
    </Card>
  );
}
