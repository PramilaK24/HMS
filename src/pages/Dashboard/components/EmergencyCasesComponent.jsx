import React from 'react';
import { dashboardSummary } from '../dashboardUtils';

const EmergencyCasesComponent = () => (
  <section className="dashboard-panel dashboard-emergency-panel">
    <div className="dashboard-panel__header">
      <h2 className="dashboard-panel__title">Emergency cases</h2>
      <span className="dashboard-panel__muted">{dashboardSummary.emergencyDate}</span>
    </div>

    <div className="dashboard-emergency">
      <div className="dashboard-emergency__value">{dashboardSummary.emergencyCases}</div>
      <div className="dashboard-emergency__bar" aria-label="Emergency cases progress">
        <div className="dashboard-emergency__fill" />
      </div>
    </div>
  </section>
);

export default EmergencyCasesComponent;
