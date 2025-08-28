import { useState } from "react";
import { apiRequest } from "@/lib/apiRequest";
import { toast } from "sonner";
import { useLoader } from "@/components/providers/loader-provider";

type FavouriteAction = "add" | "remove";

const useAddOrRemoveFavourite = () => {
  const { setIsLoading } = useLoader();
  const addOrRemoveFavourite = async (
    prodId: number,
    action: FavouriteAction
  ) => {
    // setIsLoading(true);
    try {
      const { data } = await apiRequest.addOrRemoveFavourite({
        prodId,
        action,
      });
      if (!data.success) throw new Error(data.message);
      toast.success(data.message);
      return true;
    } catch (error: any) {
      toast.error(error?.message || "Something went wrong");
    } finally {
      // setIsLoading(false);
    }
  };

  return { addOrRemoveFavourite };
};

export default useAddOrRemoveFavourite;
