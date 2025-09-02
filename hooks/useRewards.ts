import React, { useState, useEffect } from "react";
import { apiRequest } from "@/lib/apiRequest";
import { RewardRecord } from "@/types/rewards";

const useRewards = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [company, setReward] = useState<RewardRecord[]>([]);
  const [reloadFlag, setReloadFlag] = useState<boolean>(false);

  const reload = () => {
    setReloadFlag((cs) => !cs);
  };

  const getRewards = async () => {
    setLoading(true);
    try {
      const { data } = await apiRequest.getRewards();
      if (!data.success) throw data.message;
      setReward(data.data || []);
    } catch (error) {
      setReward([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRewards();
  }, [reloadFlag]);

  return [loading, company, reload] as const;
};

export default useRewards;
