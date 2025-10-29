import {
  ActivatedSIMGraphDataReportData,
  ActivatedSIMGraphDataMultipleReportData,
} from "@/types/chart";

type GraphData =
  | ActivatedSIMGraphDataReportData
  | ActivatedSIMGraphDataMultipleReportData;

export const formatGraphData = (data: GraphData) => {
  const total = data.Total;

  const isMonthly =
    "January" in total &&
    "December" in total &&
    Object.keys(total).some((key) =>
      [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ].includes(key)
    );

  if (isMonthly) {
    const monthsOrder = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const labels = monthsOrder.filter((m) => m in total);
    const dataPoints = labels.map((m) =>
      Number(total[m as keyof typeof total])
    );

    return { labels, data: dataPoints };
  }

  if (Array.isArray(total.quarter1)) {
    const mergedData = [
      ...(Array.isArray(total.quarter1) ? total.quarter1 : [total.quarter1]),
      ...(Array.isArray(total.quarter2) ? total.quarter2 : [total.quarter2]),
      ...(Array.isArray(total.quarter3) ? total.quarter3 : [total.quarter3]),
      ...(Array.isArray(total.quarter4) ? total.quarter4 : [total.quarter4]),
    ].map((val) => Number(val));

    const quarterLabels = ["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"];
    const labelCounts = [
      Array.isArray(total.quarter1) ? total.quarter1.length : 1,
      Array.isArray(total.quarter2) ? total.quarter2.length : 1,
      Array.isArray(total.quarter3) ? total.quarter3.length : 1,
      Array.isArray(total.quarter4) ? total.quarter4.length : 1,
    ];

    const labels: string[] = [];
    labelCounts.forEach((count, i) => {
      for (let j = 0; j < count; j++) {
        labels.push(j === 0 ? quarterLabels[i] : "");
      }
    });

    return { labels, data: mergedData };
  }

  return {
    labels: ["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"],
    data: [total.quarter1, total.quarter2, total.quarter3, total.quarter4].map(
      Number
    ),
  };
};
