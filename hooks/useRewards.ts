import React, { useState, useEffect } from "react";
import { apiRequest } from "@/lib/apiRequest";
import { RewardRecord, RewardReqParams } from "@/types/rewards";

const useRewards = ({
  cr_dr = "",
  is_dashboard = true,
  search = "",
}: RewardReqParams) => {
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
    if (search === "") {
      getRewards({ cr_dr, is_dashboard, search });
      return;
    }
    const timeOut = setTimeout(() => {
      getRewards({ cr_dr, is_dashboard, search });
    }, 1000);
    return () => clearTimeout(timeOut);
  }, [reloadFlag, cr_dr?.trim(), search?.trim()]);

  return [loading, company, reload] as const;
};

export default useRewards;
