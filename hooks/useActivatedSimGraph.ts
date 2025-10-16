import React, { useState, useEffect } from "react";
import { apiRequest } from "@/lib/apiRequest";
import {
  ActivatedSIMGraphDataMultipleReportData,
  ActivatedSIMGraphDataReportData,
  SimGraphReqParam,
} from "@/types/chart";

const useActivatedSIMGraph = ({ year = 0, filter = "" }: SimGraphReqParam) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [activatedSIMGraphData, setActivatedSIMGraphData] = useState<
    | ActivatedSIMGraphDataReportData
    | ActivatedSIMGraphDataMultipleReportData
    | null
  >(null);
  const [reloadFlag, setReloadFlag] = useState<boolean>(false);

  const reload = () => {
    setReloadFlag((cs) => !cs);
  };

  const getActivatedSIMGraph = async (params: SimGraphReqParam) => {
    setLoading(true);
    try {
      const { data } = await apiRequest.activatedSIMGraph(params);
      if (!data.success) throw data.message;
      setActivatedSIMGraphData(data.data.graphData);
    } catch (error) {
      setActivatedSIMGraphData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getActivatedSIMGraph({ year, filter });
  }, [reloadFlag, year, filter.trim()]);

  return [loading, activatedSIMGraphData, reload] as const;
};

export default useActivatedSIMGraph;
