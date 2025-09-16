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

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const ActivationSimCardsGraph = () => {
  const [activeFilter, setActiveFilter] = useState("1M");

  const data = {
    labels: ["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"],
    datasets: [
      {
        label: "Activations",
        data: [40, 140, 180, 50],
        borderColor: "#FFFFFF",
        backgroundColor: "transparent",
        borderWidth: 1.5,
        tension: 0,
        stepped: false,
        pointRadius: 1, // hide dots
        pointHoverRadius: 4,
        pointHoverBackgroundColor: "#fff",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }, // hide legend
      tooltip: {
        enabled: true,
        backgroundColor: "#fff",
        titleColor: "#000",
        bodyColor: "#000",
        borderColor: "#ccc",
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // hide vertical grid lines
        },
        border: {
          display: false, // hides x-axis border line
        },
        ticks: {
          color: "rgba(255, 255, 255, 0.5)",
          font: {
            size: 10,
          },
        },
      },
      y: {
        grid: {
          color: "rgba(255,255,255,0.3)", // faint gridlines
          drawBorder: false,
        },
        border: {
          display: false, // hides y-axis border line
        },
        ticks: {
          color: "rgba(255, 255, 255, 0.5)",
          font: {
            size: 12,
          },
          stepSize: 50,
        },
      },
    },
  };

  const filters = ["1D", "1M", "1Y", "MAX"];

  return (
    <div
      className="h-full px-8 sm:px-16 pt-8 pb-16"
      style={{
        background: "linear-gradient(180deg, #10499E -38.93%, #ED174B 131.64%)",
      }}
    >
      <div className="[&_nav]:text-[14px] md:[&_nav]:text-[16px] [&_a]:text-[var(--color-white)] [&_span]:text-[var(--color-white)] [&_li]:text-[var(--color-white)] pb-4">
        <Breadcrumb />
      </div>

      <div className="border-2 border-[var(--color-white)] rounded-xl p-4 pb-6">
        <div className="w-full flex flex-col-reverse sm:flex-row sm:items-start sm:justify-between text-[var(--color-white)] mb-3 sm:mb-4 gap-3 sm:gap-0">
          {/* Title + Number */}
          <div className="text-left">
            <h2 className="text-[10px] sm:text-[12px]">
              {reportsLabels.activatedSim}
            </h2>
            <p className="text-[20px] sm:text-[30px]">1,250</p>
          </div>

          {/* Filters */}
          <div className="flex justify-between sm:justify-end gap-2 bg-[var(--color-white)] rounded-full px-2 p-1">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-3 py-1 text-[10px] sm:text-[12px] rounded-md transition cursor-pointer ${
                  activeFilter === filter
                    ? "font-semibold border border-[var(--color-orange)] rounded-xl text-[var(--color-black)]"
                    : "text-[var(--color-gray)]"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="w-full min-h-[370px]">
          <Line data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default ActivationSimCardsGraph;
