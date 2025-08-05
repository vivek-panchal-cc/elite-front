"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/ButtonUI";
import Image from "next/image";
import { dashboardLabels, altTextLabels } from "@/lib/labels";

interface Offer {
  id: string;
  title: string;
  price: string;
  image: string;
  category: string;
}

export function OffersCard() {
  const data = [
    {
      id: "1",
      title: dashboardLabels.popularOffer,
      price: "£20 + VAT",
      image: "/placeholder.svg?height=200&width=200",
      category: "Popular",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>{dashboardLabels.popularOffers}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gradient-to-r from-purple-400 to-purple-600 rounded-lg p-6 text-white">
            <div className="text-2xl font-bold mb-2">£20 + VAT</div>
            <div className="mb-4">
              <Image
                src="/placeholder.svg?height=120&width=120"
                alt={altTextLabels.product}
                width={120}
                height={120}
                className="rounded"
              />
            </div>
            <Button variant="secondary" size="sm">
              {dashboardLabels.viewOffer}
            </Button>
          </div>

          <div className="bg-blue-600 rounded-lg p-6 text-white flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl mb-2">📊</div>
              <div className="text-lg font-semibold">
                {dashboardLabels.offers}
              </div>
              <Button variant="secondary" size="sm" className="mt-4">
                {dashboardLabels.viewAll}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
