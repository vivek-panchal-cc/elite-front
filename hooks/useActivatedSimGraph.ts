import React, { useState, useEffect } from "react";
import { apiRequest } from "@/lib/apiRequest";
import { ActivatedSIMGraphData } from "@/types/chart";

const useActivatedSIMGraph = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [activatedSIMGraphData, setActivatedSIMGraphData] =
    useState<ActivatedSIMGraphData | null>(null);
  const [reloadFlag, setReloadFlag] = useState<boolean>(false);

  const reload = () => {
    setReloadFlag((cs) => !cs);
  };

  const getActivatedSIMGraph = async () => {
    setLoading(true);
    try {
      const { data } = await apiRequest.activatedSIMGraph();
      if (!data.success) throw data.message;
      setActivatedSIMGraphData(data.data.graphData);
    } catch (error) {
      setActivatedSIMGraphData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getActivatedSIMGraph();
  }, [reloadFlag]);

  return [loading, activatedSIMGraphData, reload] as const;
};

export default useActivatedSIMGraph;
