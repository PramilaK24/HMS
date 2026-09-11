import React from 'react';
import { Icon } from '@iconify/react';
import { dashboardSummary } from '../dashboardUtils';

const EmergencyCasesComponent = () => (
  <section className="dashboard-panel dashboard-emergency-panel">
    <div className="dashboard-panel__header">
      <h2 className="dashboard-panel__title">Emergency cases</h2>
      {/* <button type="button" className="dashboard-emergency__icon-button" aria-label="Open emergency cases">
        <Icon icon="akar-icons:arrow-up-right" width={18} height={18} />
      </button> */}
      <span  className="dashboard-emergency__icon-button" aria-label="Open emergency cases">
        <Icon icon="akar-icons:arrow-up-right" width={18} height={18} />
      </span>
    </div>

    <div className="dashboard-emergency__date-row">
      <span style={{marginRight: '10px'}}>{dashboardSummary.emergencyDate}</span>
      {/* <span className="dashboard-emergency__date-check" aria-hidden="true">
        <Icon icon="mdi:check" width={14} height={14} />
      </span> */}
      <button type="button" className="dashboard-emergency__date-check" aria-label="Open emergency cases">
        <Icon icon="akar-icons:chevron-down" width='2em' height='2em' />
      </button>
    </div>

    <div className="dashboard-emergency">
      <div className="dashboard-emergency__readout">
        <span className="dashboard-emergency__symbol" aria-hidden="true">
          <Icon icon="boxicons:hospital" width={24} height={24} />
        </span>
        <span className="dashboard-emergency__value">{dashboardSummary.emergencyCases}</span>
      </div>

      <div className="dashboard-emergency__bar" aria-label="Emergency cases progress">
        <div className="dashboard-emergency__fill" />
      </div>
    </div>
  </section>
);

export default EmergencyCasesComponent;
