"use client";

import Image from "next/image";
import LatestOffer from "./components/LatestOffer";
// import PrivateLayout from "../PrivateLayout";
import ProfileDashboard from "./components/ProfileHeader";
import { images } from "@/components/images";
const Dashboard = () => {
  return (
    <>
      <ProfileDashboard />
      <LatestOffer />
      <div className="bg-[#D9D9D9] flex-wrap lg:h-[114px] flex items-center justify-center p-3 gap-6">
        <Image src={images.stokeOffer} alt="img" />
        <Image src={images.stokeOffer} alt="img" />
        <Image src={images.stokeOffer} alt="img" />
        <Image src={images.stokeOffer} alt="img" />
      </div>
      {/* <PrivateLayout>
      </PrivateLayout> */}
    </>
  );
};

export default Dashboard;
