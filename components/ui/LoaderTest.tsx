"use client";

import React from "react";
import { Button } from "@/components/ui/ButtonUI";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { DefaultLoader } from "@/components/ui/Loader";
import { useLoader } from "@/components/providers/loader-provider";
import { useApiWithLoader } from "@/lib/useApiWithLoader";
import { loaderLabels } from "@/lib/labels";

export const LoaderTest: React.FC = () => {
  const { setIsLoading } = useLoader();
  const { callWithLoader } = useApiWithLoader();

  const handleTestLoader = async () => {
    await callWithLoader(async () => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 3000));
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{loaderLabels.globalLoaderTest}</CardTitle>
          <CardDescription>
            {loaderLabels.testLoaderDescription}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={handleTestLoader} className="w-full">
            {loaderLabels.testGlobalLoader}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{loaderLabels.loaderVariants}</CardTitle>
          <CardDescription>{loaderLabels.variantsDescription}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex flex-col items-center gap-2">
              <DefaultLoader variant="spinner" size="md" />
              <span className="text-xs text-muted-foreground">
                {loaderLabels.spinner}
              </span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <DefaultLoader variant="dots" size="md" />
              <span className="text-xs text-muted-foreground">
                {loaderLabels.dots}
              </span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <DefaultLoader variant="pulse" size="md" />
              <span className="text-xs text-muted-foreground">
                {loaderLabels.pulse}
              </span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <DefaultLoader variant="bars" size="md" />
              <span className="text-xs text-muted-foreground">
                {loaderLabels.bars}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{loaderLabels.loaderSizes}</CardTitle>
          <CardDescription>{loaderLabels.sizesDescription}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-around">
            <div className="flex flex-col items-center gap-2">
              <DefaultLoader size="sm" />
              <span className="text-xs text-muted-foreground">
                {loaderLabels.small}
              </span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <DefaultLoader size="md" />
              <span className="text-xs text-muted-foreground">
                {loaderLabels.medium}
              </span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <DefaultLoader size="lg" />
              <span className="text-xs text-muted-foreground">
                {loaderLabels.large}
              </span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <DefaultLoader size="xl" />
              <span className="text-xs text-muted-foreground">
                {loaderLabels.extraLarge}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
