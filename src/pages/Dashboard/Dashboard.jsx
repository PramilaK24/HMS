import React from 'react';
import SectionsCardComponent from './components/SectionsCardComponent';
import EmergencyCasesComponent from './components/EmergencyCasesComponent';
import NotificationsComponent from './components/NotificationsComponent';
import ConsultationComponent from './components/ConsultationComponent';

const Dashboard = () => (
  <main className="w-full min-h-[calc(100vh-82px)] bg-[radial-gradient(circle_at_top,_#0b1b17_0%,_#071611_35%,_#050d0a_100%)] p-4 text-white md:p-5">
    <h1 className="mb-3 text-3xl font-normal text-white">Overall Records</h1>
    <div className="flex w-full flex-col gap-[18px]">
      <SectionsCardComponent />

      <div className="grid gap-5 xl:grid-cols-[1.7fr_1fr]">
        <div className="flex flex-col gap-5">
          <EmergencyCasesComponent />
          <ConsultationComponent />
        </div>

        <NotificationsComponent />
      </div>
    </div>
  </main>
);

export default Dashboard;
