'use client';
import React from 'react';
import ProfileHeader from './components/ProfileHeader';
import RewardGraph from './components/RewardGraph';
import RewardPoints from './components/RewardPoints';
import RewardsTransactions from './components/RewardsTransactions';
function Reports() {
  return (
    <>
      <ProfileHeader />
      <RewardGraph />
      <RewardPoints />
      <RewardsTransactions />
    </>
  );
}

export default Reports;
