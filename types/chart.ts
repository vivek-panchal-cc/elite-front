export interface Dataset {
  label: string;
  data: number[];
}

export interface ChartData {
  labels: string[];
  datasets: Dataset[];
}

export interface ChartApiResponse {
  data: ChartData;
}
