import React, { useMemo, useState } from 'react';
import { Button, Chip, Tooltip, Typography } from '@mui/material';
import { Icon } from '@iconify/react';
import { consultationLegend, dashboardSummary, getChartSegments } from '../dashboardUtils';

const ConsultationComponent = () => {
  const segments = useMemo(() => getChartSegments(consultationLegend), []);
  const [activeSegment, setActiveSegment] = useState(consultationLegend[0]);

  const total = segments.reduce((sum, segment) => sum + segment.value, 0);
  const radius = 72;
  const circumference = 2 * Math.PI * radius;
  let cumulative = 0;

  return (
    <section className="dashboard-panel dashboard-consultation-panel">
      <div className="dashboard-panel__header">
        <h2 className="dashboard-panel__title">Consultation</h2>
        <Button
          className="consultation-view-button"
          variant="text"
          endIcon={<Icon icon="akar-icons:arrow-up-right" width={16} height={16} />}
          size="small"
        >
          View details
        </Button>
      </div>

      <div className="dashboard-consultation">
        <div className="dashboard-consultation__meta">
          <div className="dashboard-consultation__head">
            <span className="dashboard-consultation__icon" aria-hidden="true">
              <Icon icon="boxicons:hospital" width={20} height={20} />
            </span>
            <span className="dashboard-consultation__value">{dashboardSummary.consultationCost}</span>
            <Chip label="+ 270" size="small" className="dashboard-consultation__chip" />
          </div>

          <Typography className="dashboard-consultation__subtitle">
            {dashboardSummary.consultationLabel}
          </Typography>

          <ul className="dashboard-legend" aria-label="Consultation categories">
            {consultationLegend.map((segment) => (
              <li
                key={segment.label}
                className={`dashboard-legend__item ${activeSegment.label === segment.label ? 'is-active' : ''}`}
                onMouseEnter={() => setActiveSegment(segment)}
              >
                <span className="dashboard-legend__left">
                  <span className="dashboard-legend__dot" style={{ background: segment.color }} />
                  {segment.label}
                </span>
                <span>{segment.value}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="dashboard-chart-panel">
          <div className="dashboard-chart-meta">
            <span className="dashboard-chart-date">29 July 2025</span>
            <div className="dashboard-chart-callout">
              {/* <span className="dashboard-chart-callout__dot" style={{ background: activeSegment.color }} /> */}
              <div>
                <div className="dashboard-chart-callout__title">{activeSegment.label}</div>
                <div className="dashboard-chart-callout__subtitle">15-20/per day (low)</div>
              </div>
            </div>
          </div>

          <div className="dashboard-chart" aria-label="Consultation chart">
            <svg viewBox="0 0 220 220" className="dashboard-chart__svg">
              <circle
                cx="110"
                cy="110"
                r={radius}
                fill="none"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="18"
              />

              {segments.map((segment) => {
                const strokeLength = (segment.value / total) * circumference;
                const dashOffset = -cumulative;
                cumulative += strokeLength;

                return (
                  <Tooltip key={segment.label} title={`${segment.label}: ${segment.value}`} placement="top">
                    <g className="dashboard-chart__segment">
                      <circle
                        cx="110"
                        cy="110"
                        r={radius}
                        fill="none"
                        stroke={segment.color}
                        strokeWidth="18"
                        strokeLinecap="round"
                        strokeDasharray={`${strokeLength} ${circumference - strokeLength}`}
                        strokeDashoffset={dashOffset}
                        transform="rotate(-90 110 110)"
                        onMouseEnter={() => setActiveSegment(segment)}
                        style={{ cursor: 'pointer' }}
                      />
                    </g>
                  </Tooltip>
                );
              })}
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConsultationComponent;
