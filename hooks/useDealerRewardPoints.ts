import { useState, useEffect } from "react";
import { apiRequest } from "@/lib/apiRequest";
import { RewardInfo } from "@/types/dealer";

const useDealerRewardPoints = () => {
  const [loadingRewards, setLoadingRewards] = useState<boolean>(false);
  const [points, setPoints] = useState<RewardInfo>({} as RewardInfo);
  const [reloadFlag, setReloadFlag] = useState<boolean>(false);

  const reloadRewardPoints = () => {
    setReloadFlag((cs) => !cs);
  };

  const getDealerRewardPoints = async () => {
    setLoadingRewards(true);
    try {
      const { data } = await apiRequest.getDealerRewardPoints();
      if (!data.success) throw data.message;
      setPoints(data.data || []);
    } catch (error) {
      setPoints({} as RewardInfo);
    } finally {
      setLoadingRewards(false);
    }
  };

  useEffect(() => {
    getDealerRewardPoints();
  }, [reloadFlag]);

  return { loadingRewards, points, reloadRewardPoints } as const;
};

export default useDealerRewardPoints;
