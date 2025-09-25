import { useState, useEffect } from "react";
import { apiRequest } from "@/lib/apiRequest";
import {
  ActivationResponse,
  LastYearMonthlyData,
  LastYearMonthlyFirstTopUpData,
  NetworkData,
} from "@/types/activation";

const useDealerActivation = () => {
  const [loadingActivation, setLoadingActivation] = useState<boolean>(false);
  const [network, setNetwork] = useState<NetworkData>({});
  const [lastYearMonthlyData, setLastYearMonthlyData] =
    useState<LastYearMonthlyData>({});
  const [lastYearMonthlyFirstTopUpData, setLastYearMonthlyFirstTopUpData] =
    useState<LastYearMonthlyFirstTopUpData>({});
  const [reloadFlag, setReloadFlag] = useState<boolean>(false);

  const reloadActivationData = () => {
    setReloadFlag((cs) => !cs);
  };

  const getDealerRewardPoints = async () => {
    setLoadingActivation(true);
    try {
      const { data } = await apiRequest.getDealerActivation();
      if (!data.success) throw data.message;
      const activationData: ActivationResponse = data.data;

      setNetwork(activationData.network || {});
      setLastYearMonthlyData(activationData.lastYearMonthlyData || {});
      setLastYearMonthlyFirstTopUpData(
        activationData.lastYearMonthlyFirstTopUpData || {}
      );
    } catch (error) {
      setNetwork({});
      setLastYearMonthlyData({});
      setLastYearMonthlyFirstTopUpData({});
    } finally {
      setLoadingActivation(false);
    }
  };

  useEffect(() => {
    getDealerRewardPoints();
  }, [reloadFlag]);

  return {
    loadingActivation,
    network,
    lastYearMonthlyData,
    lastYearMonthlyFirstTopUpData,
    reloadActivationData,
  } as const;
};

export default useDealerActivation;
