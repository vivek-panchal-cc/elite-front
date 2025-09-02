import React, { useState, useEffect } from "react";
import { apiRequest } from "@/lib/apiRequest";
import { OfferResponse } from "@/types/product";

const useLatestOffer = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [latestOffer, setLatestOffer] = useState<OfferResponse[]>([]);
  const [reloadFlag, setReloadFlag] = useState<boolean>(false);

  const reload = () => {
    setReloadFlag((cs) => !cs);
  };

  const getLatestOffer = async () => {
    setLoading(true);
    try {
      const { data } = await apiRequest.getDealerLatestOffer();
      if (!data.success) throw data.message;
      setLatestOffer(data.data || []);
    } catch (error) {
      setLatestOffer([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getLatestOffer();
  }, [reloadFlag]);

  return [loading, latestOffer, reload] as const;
};

export default useLatestOffer;
