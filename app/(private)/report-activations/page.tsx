import React from "react";
import ActivationDashboard from "./components/ActivationDashboard";
import SimCardGraph from "@/components/graph/SimCardGraph";

const ReportActivations = () => {
  return (
    <div>
      {/* <ActivationSimCardsGraph /> */}
      <SimCardGraph />
      <ActivationDashboard />
    </div>
  );
};

export default ReportActivations;
