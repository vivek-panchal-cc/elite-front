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

export interface SimGraphReqParam {
  year: number;
  filter: string;
}
export interface ActivatedGraphData {
  Blue: number[];
  Bronze: number[];
  Silver: number[];
  Gold: number[];
  Platinum: number[];
  Diamond: number[];
}

export interface ActivatedSIMGraphDataReportData {
  Total: {
    quarter1: number;
    quarter2: number;
    quarter3: number;
    quarter4: number;
    total_of_Total: number;
  };
  totalActivation: number;
}

export interface ActivatedSIMGraphDataMultipleReportData {
  Total: {
    quarter1: (number | string)[];
    quarter2: (number | string)[];
    quarter3: (number | string)[];
    quarter4: (number | string)[];
    total_of_Total: number;
  };
  totalActivation: number;
}

// export interface ActivatedSIMGraphData {
//   graphData: ReportData | MultipleReportData;
// }
