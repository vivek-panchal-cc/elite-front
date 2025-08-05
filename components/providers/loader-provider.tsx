"use client";

import React, { createContext, useContext, useMemo, useState } from "react";
import DefaultLoader from "../ui/Loader";
import { loaderLabels } from "@/lib/labels";

interface LoaderContextType {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const LoaderContext = createContext<LoaderContextType>({
  isLoading: false,
  setIsLoading: () => {},
});

export const useLoader = () => {
  const context = useContext(LoaderContext);
  if (!context) {
    throw new Error("useLoader must be used within a LoaderProvider");
  }
  return context;
};

interface LoaderProviderProps {
  children: React.ReactNode;
}

export const LoaderProvider: React.FC<LoaderProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  const value = useMemo(() => ({ isLoading, setIsLoading }), [isLoading]);

  return (
    <LoaderContext.Provider value={value}>
      {isLoading && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-transparent backdrop-blur-md">
          <div className="flex flex-col items-center gap-6 p-8 rounded-2xl bg-card/80 border shadow-2xl">
            <div className="relative">
              <DefaultLoader size="xl" variant="spinner" />
              <div className="absolute inset-0 rounded-full bg-primary/10 animate-ping"></div>
            </div>
            <div className="text-center">
              <p className="text-lg font-medium text-foreground animate-pulse">
                {loaderLabels.loading}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {loaderLabels.pleaseWait}
              </p>
            </div>
          </div>
        </div>
      )}
      {children}
    </LoaderContext.Provider>
  );
};

export default LoaderProvider;
