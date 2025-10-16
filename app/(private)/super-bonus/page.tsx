import React from 'react';
import SuperBonusDashboard from './components/SuperBonusDashboard';
import SimCardGraph from '@/components/graph/SimCardGraph';

const SuperBonus = () => {
  return (
    <div>
      {/* <SuperBonusSimCardGraph /> */}
      <SimCardGraph />
      <SuperBonusDashboard />
    </div>
  );
};

export default SuperBonus;
