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

      <div className="bg-[#D9D9D9] flex flex-wrap items-center justify-center p-3 gap-4 min-h-[114px]">
        {[
          images.dashFoot1,
          images.dashFoot2,
          images.dashFoot3,
          images.dashFoot4,
          images.dashFoot5,
          images.dashFoot6,
          images.dashFoot7,
          images.dashFoot8,
        ].map((src, idx) => (
          <div
            key={idx}
            className="relative h-[28px] sm:h-[36px] md:h-[33px] lg:h-[50px] w-[40px] sm:w-[60px] md:w-[80px] lg:w-[100px]"
          >
            <Image
              src={src}
              alt={`logo-${idx}`}
              fill
              className="object-contain"
              priority
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default Dashboard;
