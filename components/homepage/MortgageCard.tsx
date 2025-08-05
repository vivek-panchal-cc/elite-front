"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/ButtonUI";

interface MortgageData {
  amount: string;
  status: string;
  lastUpdated: string;
}

export function MortgageCard() {
  const data = {
    amount: "£498.32",
    status: "Active",
    lastUpdated: new Date().toISOString(),
  };

  return (
    <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
      <CardHeader>
        <CardTitle className="text-white">Hello Mortgages</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold mb-4">{data?.amount}</div>
        <Button
          variant="secondary"
          className="bg-white text-purple-600 hover:bg-gray-100"
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
}
