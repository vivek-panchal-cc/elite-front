import { useState, useEffect } from "react";
import { apiRequest } from "@/lib/apiRequest";
import { Card } from "@/types/payments";

const useCardList = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [card, setCards] = useState<Card[]>([]);
  const [reloadFlag, setReloadFlag] = useState<boolean>(false);

  const reload = () => {
    setReloadFlag((cs) => !cs);
  };

  const getCardList = async () => {
    setLoading(true);
    try {
      const { data } = await apiRequest.getCardList();
      if (!data.success) throw data.message;
      setCards(data.data || []);
    } catch (error) {
      console.error("Error fetching card:", error);
      setCards([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCardList();
  }, [reloadFlag]);

  return [loading, card, reload] as const;
};

export default useCardList;
