"use client";

import { useState } from "react";
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
  { title: "Profile Information", icon: <ProfileIcon fill="currentColor" /> },
  { title: "Order History", icon: <OrderHistory stroke="currentColor" /> },
  { title: "My Rep Details", icon: <RepDetails fill="currentColor" /> },
  { title: "My Rewards/Elite Wallet", icon: <Reward stroke="currentColor" /> },
  { title: "My Branches", icon: <Branch stroke="currentColor" /> },
  { title: "My Company", icon: <Company fill="currentColor" /> },
  { title: "My Favourites", icon: <Favourite fill="currentColor" /> },
  { title: "Log Out", icon: <Logout fill="currentColor" /> },
];

const Profile: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isLogoutOpen, setLogoutOpen] = useState<boolean>(false);

  const renderActiveSection = () => {
    switch (activeIndex) {
      case 0:
        return <ProfileInfo />;
      case 1:
        return <ProfileOrderHistory />;
      case 2:
        return <ProfileRepDetails />;
      case 3:
        return <ProfileReward />;
      case 4:
        return <ProfileBranch />;
      case 5:
        return <ProfileCompany />;
      case 6:
        return <ProfileFavourite />;
      case 7:
        return null;
      default:
        return null;
    }
  };

  return (
    <>
      <ProfileHeader />
      <PrivateLayout>
        <h2 className="text-xl font-semibold mb-6">
          {profileLabels.myAccount}
        </h2>
        <div className="flex flex-col md:flex-row gap-4">
          {/* Sidebar */}
          <div className="w-full md:w-1/3">
            <SidebarNav
              items={sidebarNavItems}
              activeIndex={activeIndex}
              onItemSelect={(index: number) => {
                setActiveIndex(index);
                if (index === 7) {
                  setLogoutOpen(true);
                }
              }}
            />
          </div>
          {renderActiveSection()}
        </div>
      </PrivateLayout>
      <Modal
        isOpen={isLogoutOpen}
        onClose={() => setLogoutOpen(false)}
        classStyle=""
        isClose={false}
      >
        <LogoutForm setLogoutOpen={setLogoutOpen} />
      </Modal>
    </>
  );
};

export default Profile;
