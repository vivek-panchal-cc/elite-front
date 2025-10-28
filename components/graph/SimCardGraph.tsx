"use client";
import React, { useEffect, useRef, useState } from "react";
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
import { cn } from "@/lib/utils";
import Arrow from "../images/svgs/Arrow";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const SimCardGraph = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
            <div className="w-full flex sm:items-start justify-between max-[425px]:flex-col-reverse text-[var(--color-white)] mb-3 sm:mb-4 gap-3 sm:gap-0">
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
                  className={`flex justify-between sm:justify-end gap-2 bg-[var(--color-white)] rounded-full px-2 p-1 transition-opacity h-[28px] sm:h-[35px] ${
                    loading ? "opacity-60 cursor-not-allowed" : ""
                  }`}
                >
                  {SIM_GRAPH_FILTER.map((filter) => (
                    <button
                      key={filter}
                      onClick={() => !loading && setActiveFilter(filter)}
                      disabled={loading}
                      className={`px-3 sm:py-1 text-[10px] sm:text-[12px] rounded-md transition ${
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
                  ref={dropdownRef}
                  className={`relative flex justify-between sm:justify-end gap-2 bg-[var(--color-white)] px-2 p-1 transition-opacity h-[28px] sm:h-[35px] ${
                    dropdownOpen ? "rounded-t-xl" : "rounded-full"
                  } ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
                >
                  <button
                    type="button"
                    onClick={() => !loading && setDropdownOpen((prev) => !prev)}
                    disabled={loading}
                    className={`relative w-full px-6 sm:py-2 text-[10px] sm:text-[12px] font-semibold text-[var(--color-black)] bg-[var(--color-white)] rounded-xl flex items-center justify-center transition ${
                      loading
                        ? "opacity-60 cursor-not-allowed"
                        : "cursor-pointer"
                    }`}
                  >
                    <span className="text-center">{selectedYear}</span>
                    <span
                      className={cn(
                        "absolute right-1 transition-transform duration-300",
                        dropdownOpen ? "rotate-270" : "rotate-90"
                      )}
                    >
                      <Arrow className="text-inherit" stroke="currentColor" />
                    </span>
                  </button>

                  {dropdownOpen && (
                    <ul className="absolute top-full left-0 mt-0 text-center bg-[var(--color-white)] rounded-b-xl shadow-lg w-full overflow-hidden z-10">
                      {years.map((year) => (
                        <li
                          key={year}
                          onClick={() => {
                            setSelectedYear(year);
                            setDropdownOpen(false);
                          }}
                          className={`px-3 py-1.5 text-[10px] sm:text-[12px] font-medium text-[var(--color-black)] cursor-pointer hover:bg-gray-100 transition ${
                            selectedYear === year
                              ? "bg-gray-100 font-semibold"
                              : ""
                          }`}
                        >
                          {year}
                        </li>
                      ))}
                    </ul>
                  )}
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
