import React, { Component } from 'react';

import { DashboardRoutes } from '../routes';
import DashboardNavigation from './DashboardNavigation';


const Dashboard = props => (
  <div>
    <DashboardNavigation />
    <section>
      <DashboardRoutes {...props} />
    </section>
  </div>
);

export default Dashboard;
