"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { dashboardLabels, monthLabels } from "@/lib/labels";

export function AnalyticsCard() {
  const data = [
    { name: monthLabels.jan, value: 400 },
    { name: monthLabels.feb, value: 300 },
    { name: monthLabels.mar, value: 600 },
    { name: monthLabels.apr, value: 800 },
    { name: monthLabels.may, value: 500 },
    { name: monthLabels.jun, value: 700 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>{dashboardLabels.analyticsOverview}</CardTitle>
      </CardHeader>
      <CardContent>
        {/* {isLoading ? (
          <div className="h-64 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
          </div>
        ) : ( */}
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#8b5cf6"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
        {/* )} */}
      </CardContent>
    </Card>
  );
}
