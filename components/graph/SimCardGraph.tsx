"use client";
import React, { useState } from "react";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import Breadcrumb from "@/components/ui/Breadrumb";
import { reportsLabels } from "@/lib/labels";
import useActivatedSIMGraph from "@/hooks/useActivatedSimGraph";
import {
  buildGraphDataset,
  buildGraphOptions,
  getLastNYears,
  SIM_GRAPH_FILTER,
} from "@/lib/constants/all";
import { formatGraphData } from "@/lib/helpers/formatGraphData";
import LoaderDiv from "../loaders/LoaderDiv";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const SimCardGraph = () => {
  const [activeFilter, setActiveFilter] = useState("1M");
  const years = getLastNYears(2);
  const [selectedYear, setSelectedYear] = useState(years[0]);
  const filterType = activeFilter === "1M" ? "month" : "quarter";
  const [loading, activatedSIMGraphData, reload] = useActivatedSIMGraph({
    year: selectedYear,
    filter: filterType,
  });
  const { labels, data: chartData } = activatedSIMGraphData
    ? formatGraphData(activatedSIMGraphData)
    : { labels: [], data: [] };
  const numericChartData = chartData.map((item) =>
    Array.isArray(item)
      ? Number(item[0])
      : typeof item === "number"
      ? item
      : Number(item)
  );
  const data = buildGraphDataset(labels, numericChartData);

  return (
    <div
      className="h-full"
      style={{
        background: "linear-gradient(180deg, #10499E -38.93%, #ED174B 131.64%)",
      }}
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="mx-auto gap-6 pt-8 py-12 lg:pt-10 lg:py-16 px-12 lg:px-[60px]">
          <div className="[&_nav]:text-[14px] md:[&_nav]:text-[16px] [&_a]:text-[var(--color-white)] [&_span]:text-[var(--color-white)] [&_li]:text-[var(--color-white)] pb-4">
            <Breadcrumb />
          </div>

          <div className="border-2 border-[var(--color-white)] rounded-xl p-4 pb-6">
            <div className="w-full flex flex-col-reverse sm:flex-row sm:items-start sm:justify-between text-[var(--color-white)] mb-3 sm:mb-4 gap-3 sm:gap-0">
              <div className="text-left">
                <h2 className="text-[10px] sm:text-[12px]">
                  {reportsLabels.activatedSim}
                </h2>
                <p className="text-[20px] sm:text-[30px]">
                  {loading ? (
                    <LoaderDiv
                      height={30}
                      width={100}
                      backgroundColor="#9d588e"
                      className="mt-2"
                    />
                  ) : (
                    activatedSIMGraphData?.totalActivation
                  )}
                </p>
              </div>
              <div className="flex flex-row sm:flex-row sm:items-center sm:justify-end gap-2">
                <div
                  className={`flex justify-between sm:justify-end gap-2 bg-[var(--color-white)] rounded-full px-2 p-1 transition-opacity ${
                    loading ? "opacity-60 cursor-not-allowed" : ""
                  }`}
                >
                  {SIM_GRAPH_FILTER.map((filter) => (
                    <button
                      key={filter}
                      onClick={() => !loading && setActiveFilter(filter)}
                      disabled={loading}
                      className={`px-3 py-1 text-[10px] sm:text-[12px] rounded-md transition ${
                        loading ? "cursor-not-allowed" : "cursor-pointer"
                      } ${
                        activeFilter === filter
                          ? "font-semibold border border-[var(--color-orange)] rounded-xl text-[var(--color-black)]"
                          : "text-[var(--color-gray)]"
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
                <div
                  className={`flex justify-between sm:justify-end gap-2 bg-[var(--color-white)] rounded-full px-2 p-1 transition-opacity ${
                    loading ? "opacity-60 cursor-not-allowed" : ""
                  }`}
                >
                  <select
                    value={selectedYear}
                    disabled={loading}
                    onChange={(e) =>
                      !loading && setSelectedYear(Number(e.target.value))
                    }
                    className="px-3 py-1 text-[10px] sm:text-[12px] rounded-md font-semibold border border-[var(--color-white)] text-[var(--color-black)] bg-transparent cursor-pointer focus:outline-none disabled:cursor-not-allowed"
                  >
                    {years.map((year) => (
                      <option
                        key={year}
                        value={year}
                        className="text-[var(--color-black)]"
                      >
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="relative w-full min-h-[370px] flex items-center justify-center">
              {loading ? (
                <div className="absolute inset-0 flex items-center justify-center bg-[var(--color-white)]/20 backdrop-blur-sm rounded-xl">
                  <div className="w-10 h-10 border-4 border-[var(--color-white)] border-t-[var(--color-orange)] rounded-full animate-spin"></div>
                </div>
              ) : (
                <Line data={data} options={buildGraphOptions} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimCardGraph;
