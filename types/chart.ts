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

export interface ActivatedGraphData {
  Blue: number[];
  Bronze: number[];
  Silver: number[];
  Gold: number[];
  Platinum: number[];
  Diamond: number[];
}

export interface ActivatedSIMGraphData {
  graphData: ActivatedGraphData;
}
