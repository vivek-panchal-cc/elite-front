import {
  ActivatedSIMGraphDataMultipleReportData,
  ActivatedSIMGraphDataReportData,
} from "@/types/chart";

type GraphData =
  | ActivatedSIMGraphDataReportData
  | ActivatedSIMGraphDataMultipleReportData;

export const formatGraphData = (data: GraphData) => {
  const quarters = data.Total;

  // If quarters are arrays → multiple data points per quarter
  if (Array.isArray(quarters.quarter1)) {
    // Merge all quarter arrays sequentially
    const mergedData = [
      ...(Array.isArray(quarters.quarter1)
        ? quarters.quarter1
        : [quarters.quarter1]),
      ...(Array.isArray(quarters.quarter2)
        ? quarters.quarter2
        : [quarters.quarter2]),
      ...(Array.isArray(quarters.quarter3)
        ? quarters.quarter3
        : [quarters.quarter3]),
      ...(Array.isArray(quarters.quarter4)
        ? quarters.quarter4
        : [quarters.quarter4]),
    ].map((val) => Number(val));

    // Build labels:
    // Example: ["Quarter 1", "", "", "Quarter 2", "", "", "Quarter 3", "", "", "Quarter 4"]
    const quarterLabels = ["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"];
    const labelCounts = [
      Array.isArray(quarters.quarter1) ? quarters.quarter1.length : 1,
      Array.isArray(quarters.quarter2) ? quarters.quarter2.length : 1,
      Array.isArray(quarters.quarter3) ? quarters.quarter3.length : 1,
      Array.isArray(quarters.quarter4) ? quarters.quarter4.length : 1,
    ];

    const labels: string[] = [];
    labelCounts.forEach((count, i) => {
      for (let j = 0; j < count; j++) {
        labels.push(j === 0 ? quarterLabels[i] : ""); // only label first point of each quarter
      }
    });

    return { labels, data: mergedData };
  }

  // Else simple numeric values per quarter
  return {
    labels: ["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"],
    data: [
      quarters.quarter1,
      quarters.quarter2,
      quarters.quarter3,
      quarters.quarter4,
    ],
  };
};
