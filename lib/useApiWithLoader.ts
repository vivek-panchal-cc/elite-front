import { useLoader } from "@/components/providers/loader-provider";

export const useApiWithLoader = () => {
  const { setIsLoading } = useLoader();

  const callWithLoader = async <T>(
    apiCall: () => Promise<T>,
    showLoader: boolean = true
  ): Promise<T> => {
    try {
      if (showLoader) {
        setIsLoading(true);
      }
      const result = await apiCall();
      return result;
    } finally {
      if (showLoader) {
        setIsLoading(false);
      }
    }
  };

  return { callWithLoader };
}; 