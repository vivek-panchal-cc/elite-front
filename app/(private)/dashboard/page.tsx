"use client";

import Image from "next/image";
import LatestOffer from "./components/LatestOffer";
// import PrivateLayout from "../PrivateLayout";
import ProfileDashboard from "./components/ProfileHeader";
import { brandsFooter, images } from "@/components/images";
const Dashboard = () => {
  return (
    <>
      <ProfileDashboard />
      <LatestOffer />
      <div className="flex-wrap lg:h-[114px] flex items-center justify-center p-3 gap-6 dashboard-footer-brands">
        {/* <Image src={brandsFooter} alt="img" className="lg:h-[114px]" /> */}
      </div>
      {/* <PrivateLayout>
      </PrivateLayout> */}
    </>
  );
};

export default Dashboard;
