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
    <section className="w-full rounded-[18px] border border-[#0EFF7B1F] bg-[#0B120F]/90 p-[18px] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.01)]">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="m-0 text-[1.1rem] font-semibold text-white">Consultation</h2>
        <Button
          className="!min-h-[28px] !rounded-full !border !border-white/10 !bg-white/[0.02] !px-2.5 !py-1 !text-[0.72rem] !font-medium !normal-case !text-white/80 hover:!text-white"
          variant="text"
          endIcon={<Icon icon="akar-icons:arrow-up-right" width={16} height={16} />}
          size="small"
        >
          View details
        </Button>
      </div>

      <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
        <div className="flex-1">
          <div className="mb-2 flex flex-wrap items-center gap-2.5">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-[10px] border border-[#0EFF7B4D] bg-[#0EFF7B14] text-[#0EFF7B]" aria-hidden="true">
              <Icon icon="boxicons:hospital" width={20} height={20} />
            </span>
            <span className="text-[2.15rem] font-bold leading-none tracking-[-0.04em] text-white">
              {dashboardSummary.consultationCost}
            </span>
            <Chip
              label="+ 270"
              size="small"
              className="!h-6 !rounded-full !bg-[#0EFF7B1E] !text-[#0EFF7B] !font-semibold"
            />
          </div>

          <Typography className="!mb-[18px] !max-w-[260px] !text-[0.9rem] !leading-6 !text-white/60">
            {dashboardSummary.consultationLabel}
          </Typography>

          <ul className="m-0 flex list-none flex-col gap-3 p-0" aria-label="Consultation categories">
            {consultationLegend.map((segment) => (
              <li
                key={segment.label}
                className={`flex cursor-pointer items-center justify-between gap-2.5 text-[0.88rem] text-white/70 transition-colors ${activeSegment.label === segment.label ? 'text-white' : ''}`}
                onMouseEnter={() => setActiveSegment(segment)}
              >
                <span className="inline-flex items-center gap-2.5">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: segment.color }} />
                  {segment.label}
                </span>
                <span>{segment.value}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex min-w-0 flex-col items-center xl:min-w-[280px]">
          <div className="mb-2 flex w-full flex-col items-end">
            <span className="mb-2 text-[0.8rem] text-white/70">29 July 2025</span>
            <div className="inline-flex items-center gap-2 rounded-[14px] border border-[#0EFF7B1F] bg-[#0A120F] px-2.5 py-2 shadow-[0_8px_20px_rgba(0,0,0,0.18)]">
              <div>
                <div className="text-[0.82rem] font-semibold text-white">{activeSegment.label}</div>
                <div className="text-[0.7rem] text-[#0EFF7B]">15-20/per day (low)</div>
              </div>
            </div>
          </div>

          <div className="relative flex h-[220px] w-[220px] items-center justify-center" aria-label="Consultation chart">
            <svg viewBox="0 0 220 220" className="h-full w-full overflow-visible">
              <circle cx="110" cy="110" r={radius} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="18" />

              {segments.map((segment) => {
                const strokeLength = (segment.value / total) * circumference;
                const dashOffset = -cumulative;
                cumulative += strokeLength;

                return (
                  <Tooltip key={segment.label} title={`${segment.label}: ${segment.value}`} placement="top">
                    <g className="transition-transform duration-200 hover:brightness-110">
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
