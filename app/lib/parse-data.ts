import Papa from "papaparse";
import type { Dataset } from "./types";

export function parseCSV(csvString: string): Dataset {
  const result = Papa.parse(csvString, {
    header: true,
    skipEmptyLines: true,
  });

  if (!result.data || !result.data.length) {
    return [];
  }

  // Clean up empty columns and limit to 1000 rows
  return (result.data as Dataset)
    .map((row) => {
      const cleaned = { ...row };
      delete cleaned[""];
      return cleaned;
    })
    .slice(0, 1000);
}

export function stringifyData(dataset: Dataset, delimiter = ","): string {
  return Papa.unparse(dataset, { delimiter });
}

export function getSampleData(dataset: Dataset, sampleSize = 10): Dataset {
  if (dataset.length <= sampleSize) return dataset;

  const sample: Dataset = [];
  const step = Math.floor(dataset.length / sampleSize);

  for (let i = 0; i < sampleSize && i * step < dataset.length; i++) {
    sample.push(dataset[i * step]);
  }

  return sample;
}
