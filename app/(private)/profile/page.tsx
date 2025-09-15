"use client";

import { useEffect, useState } from "react";
import PrivateLayout from "../PrivateLayout";
import ProfileHeader from "./(section)/ProfileHeader";
import { profileLabels } from "@/lib/labels";
import { SidebarNav } from "@/components/ui/SidebarNav";

import ProfileIcon from "@/components/images/svgs/Profile";
import OrderHistory from "@/components/images/svgs/OrderHistory";
import RepDetails from "@/components/images/svgs/RepDetails";
import Reward from "@/components/images/svgs/Reward";
import Branch from "@/components/images/svgs/Branch";
import Company from "@/components/images/svgs/Company";
import Favourite from "@/components/images/svgs/Favourite";
import Logout from "@/components/images/svgs/Logout";

import ProfileInfo from "./(section)/ProfileInfo";
import ProfileOrderHistory from "./(section)/ProfileOrderHistory";
import ProfileRepDetails from "./(section)/ProfileRepDetails";
import ProfileReward from "./(section)/ProfileReward";
import ProfileBranch from "./(section)/ProfileBranch";
import ProfileCompany from "./(section)/ProfileCompany";
import ProfileFavourite from "./(section)/ProfileFavorite";
import LogoutForm from "../../../components/pages/logout/Logout";
import Modal from "@/components/ui/Modal";

interface SidebarItem {
  title: string;
  icon?: React.ReactNode;
}

const sidebarNavItems: SidebarItem[] = [
  {
    title: profileLabels.profileInfo,
    icon: <ProfileIcon fill="currentColor" />,
  },
  {
    title: profileLabels.profileOrderHistory,
    icon: <OrderHistory stroke="currentColor" />,
  },
  { title: profileLabels.repDetails, icon: <RepDetails fill="currentColor" /> },
  { title: profileLabels.rewardWallet, icon: <Reward stroke="currentColor" /> },
  { title: profileLabels.myBranches, icon: <Branch stroke="currentColor" /> },
  { title: profileLabels.myCompany, icon: <Company fill="currentColor" /> },
  { title: profileLabels.myFavourite, icon: <Favourite fill="currentColor" /> },
  { title: profileLabels.profLogout, icon: <Logout fill="currentColor" /> },
];

const Profile: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isLogoutOpen, setLogoutOpen] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const renderActiveSection = () => {
    const mobileProps = { isMobile };
    switch (activeIndex) {
      case 0:
        return <ProfileInfo {...mobileProps} />;
      case 1:
        return <ProfileOrderHistory {...mobileProps} />;
      case 2:
        return <ProfileRepDetails {...mobileProps} />;
      case 3:
        return <ProfileReward {...mobileProps} />;
      case 4:
        return <ProfileBranch {...mobileProps} />;
      case 5:
        return <ProfileCompany {...mobileProps} />;
      case 6:
        return <ProfileFavourite {...mobileProps} />;
      case 7:
        return null;
      default:
        return null;
    }
  };

  const handleProfileInfo = () => {
    setActiveIndex(0);
    setLogoutOpen(false);
  };

  return (
    <>
      <ProfileHeader />
      {/* <PrivateLayout> */}
      <div className="max-w-7xl mx-auto w-full">
        <div className="items-center px-[40px] sm:px-[20px] md:px-[30px] lg:px-[60px]">
          <div className="flex-1 space-y-4 py-6">
            <h2 className="text-xl font-semibold mb-6">
              {profileLabels.myAccount}
            </h2>
            <div className="flex flex-col md:flex-row gap-4">
              {/* Sidebar */}
              <div className="w-full md:w-1/3">
                <SidebarNav
                  items={sidebarNavItems?.map((item, index) => ({
                    ...item,
                    renderContent:
                      isMobile && index === activeIndex
                        ? renderActiveSection()
                        : null,
                  }))}
                  activeIndex={activeIndex}
                  onItemSelect={(index: number) => {
                    setActiveIndex(index);
                    if (index === 7) {
                      setLogoutOpen(true);
                    }
                  }}
                />
              </div>
              {!isMobile && renderActiveSection()}
            </div>
          </div>
        </div>
      </div>
      {/* </PrivateLayout> */}
      <Modal
        isOpen={isLogoutOpen}
        onClose={() => setLogoutOpen(false)}
        classStyle=""
        isClose={false}
      >
        <LogoutForm setLogoutOpen={handleProfileInfo} />
      </Modal>
    </>
  );
};

export default Profile;
