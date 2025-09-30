import React, { useState, useEffect } from "react";
import { apiRequest } from "@/lib/apiRequest";
import { RewardRecord, RewardReqParams } from "@/types/rewards";

const useRewards = ({ cr_dr = "", is_dashboard = true }: RewardReqParams) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [company, setReward] = useState<RewardRecord[]>([]);
  const [reloadFlag, setReloadFlag] = useState<boolean>(false);

  const reload = () => {
    setReloadFlag((cs) => !cs);
  };

  const getRewards = async (params: RewardReqParams) => {
    setLoading(true);
    try {
      const { data } = await apiRequest.getRewards(params);
      if (!data.success) throw data.message;
      setReward(data.data || []);
    } catch (error) {
      setReward([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRewards({ cr_dr, is_dashboard });
  }, [reloadFlag, cr_dr?.trim()]);

  return [loading, company, reload] as const;
};

export default useRewards;
