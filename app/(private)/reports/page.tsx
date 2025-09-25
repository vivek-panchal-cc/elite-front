"use client";
import React from "react";
import ProfileHeader from "./components/ProfileHeader";
import RewardGraph from "./components/RewardGraph";
import RewardPoints from "./components/RewardPoints";
import RewardsTransactions from "./components/RewardsTransactions";
import useDealerRewardPoints from "@/hooks/useDealerRewardPoints";
function Reports() {
  const { loadingRewards, points } = useDealerRewardPoints();
  return (
    <>
      <ProfileHeader loading={loadingRewards} points={points} />
      <RewardGraph loading={loadingRewards} points={points} />
      {/* <RewardPoints /> */}
      <RewardsTransactions />
    </>
  );
}

export default Reports;
