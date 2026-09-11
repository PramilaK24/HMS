import React from 'react';
import SectionsCardComponent from './components/SectionsCardComponent';
import EmergencyCasesComponent from './components/EmergencyCasesComponent';
import NotificationsComponent from './components/NotificationsComponent';
import ConsultationComponent from './components/ConsultationComponent';
import './Dashboard.scss';

const Dashboard = () => (
  <main className="dashboard-page">
    <h1 className="dashboard-title">Overall Records </h1>
    <div className="dashboard-shell">
      <SectionsCardComponent />

      <div className="dashboard-lower">
        <div className="dashboard-lower__stack">
          <EmergencyCasesComponent />
          <ConsultationComponent />
        </div>

        <NotificationsComponent />
      </div>
    </div>
  </main>
);

export default Dashboard;
