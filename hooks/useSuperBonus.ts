import { useState, useEffect } from "react";
import { apiRequest } from "@/lib/apiRequest";
import { TierReward } from "@/types/rewards";

const useSuperBonus = () => {
  const [loadingSuperBonus, setLoadingSuperBonus] = useState<boolean>(false);
  const [superBonusList, setSuperBonusList] = useState<TierReward | null>(null);
  const [reloadFlag, setReloadFlag] = useState<boolean>(false);

  const reloadSuperBonus = () => {
    setReloadFlag((cs) => !cs);
  };

  const getSuperBonus = async () => {
    setLoadingSuperBonus(true);
    try {
      const { data } = await apiRequest.getSuperBonus();
      if (!data.success) throw data.message;
      setSuperBonusList(data.data || null);
    } catch (error) {
      setSuperBonusList(null);
    } finally {
      setLoadingSuperBonus(false);
    }
  };

  useEffect(() => {
    getSuperBonus();
  }, [reloadFlag]);

  return { loadingSuperBonus, superBonusList, reloadSuperBonus } as const;
};

export default useSuperBonus;
