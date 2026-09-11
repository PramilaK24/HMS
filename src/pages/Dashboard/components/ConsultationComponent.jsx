import React, { useMemo } from 'react';
import { consultationLegend, dashboardSummary, getChartSegments } from '../dashboardUtils';

const ConsultationComponent = () => {
  const segments = useMemo(() => getChartSegments(consultationLegend), []);

  return (
    <section className="dashboard-panel dashboard-consultation-panel">
      <div className="dashboard-panel__header">
        <h2 className="dashboard-panel__title">Consultation</h2>
      </div>

      <div className="dashboard-consultation">
        <div className="dashboard-consultation__meta">
          <div className="dashboard-consultation__value">{dashboardSummary.consultationCost}</div>
          <div className="dashboard-consultation__subtitle">{dashboardSummary.consultationLabel}</div>
        </div>

        <div className="dashboard-ring" aria-label="Consultation ratio chart">
          <span className="dashboard-ring__value">62%</span>
        </div>
      </div>

      <ul className="dashboard-legend" aria-label="Consultation categories">
        {segments.map((segment) => (
          <li key={segment.label} className="dashboard-legend__item">
            <span className="dashboard-legend__left">
              <span className="dashboard-legend__dot" style={{ background: segment.color }} />
              {segment.label}
            </span>
            <span>{segment.value}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ConsultationComponent;
