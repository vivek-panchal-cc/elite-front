// import Image from "next/image";
import { AnalyticsCard } from "@/components/homepage/analytics-card";
import { MortgageCard } from "@/components/homepage/mortgage-card";
import { OffersCard } from "@/components/homepage/offers-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const DashboardContent = () => (
  <div className="space-y-6 mx-auto">
    {/* <div>
      <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
      <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your account.</p>
    </div> */}

    {/* Dashboard Grid */}
    <div className="py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#10499E] to-[#ED174B]"
    // style={{
    //   background: ;
    // }}
    >
      <div className="mx-auto max-w-7xl w-full grid grid-cols-1 lg:grid-cols-3 gap-6">
        <MortgageCard />

        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span className="text-sm">Transaction #1234</span>
                <span className="text-sm font-semibold">£150.00</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span className="text-sm">Transaction #1235</span>
                <span className="text-sm font-semibold">£75.50</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span className="text-sm">Transaction #1236</span>
                <span className="text-sm font-semibold">£200.25</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <AnalyticsCard />
      </div>
    </div>

    {/* Offers Section */}
    {/* <OffersCard /> */}

    {/* Additional Stats */}
    {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card>
        <CardContent className="p-6">
          <div className="text-2xl font-bold text-purple-600">1,234</div>
          <p className="text-sm text-gray-600">Total Customers</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="text-2xl font-bold text-blue-600">£45,678</div>
          <p className="text-sm text-gray-600">Monthly Revenue</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="text-2xl font-bold text-green-600">98.5%</div>
          <p className="text-sm text-gray-600">Customer Satisfaction</p>
        </CardContent>
      </Card>
    </div> */}
  </div>
)

export default function Home() {
  return (
    <div className="flex">
      {/* <Sidebar activeItem={activeItem} onItemSelect={setActiveItem} /> */}
      <main className="w-full mx-auto">
        {/* {renderContent(activeItem)} */}
        <div className="flex-1">
          <DashboardContent />
        </div>
      </main>
    </div>
  );
}
