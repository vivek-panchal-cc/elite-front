"use client";

import LatestOffer from "./components/LatestOffer";
// import PrivateLayout from "../PrivateLayout";
import ProfileDashboard from "./components/ProfileHeader";
const Dashboard = () => {
  return (
    <>
      <ProfileDashboard />
      <LatestOffer />
      {/* <PrivateLayout>
      </PrivateLayout> */}
    </>
  );
};

export default Dashboard;
