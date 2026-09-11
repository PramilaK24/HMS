import React from 'react';
import { Icon } from '@iconify/react';
import { notificationItems } from '../dashboardUtils';

const statusMap = {
  unread: { color: '#ff5d5d', icon: 'mdi:bell-ring-outline' },
  info: { color: '#0eff7b', icon: 'mdi:bell-outline' },
  success: { color: '#0eff7b', icon: 'mdi:check-circle-outline' },
};

const NotificationsComponent = () => (
  <aside className="w-full rounded-[18px] border border-[#0EFF7B1F] bg-[#0B120F]/90 p-[18px] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.01)]">
    <div className="mb-4 flex items-center justify-between gap-3">
      <h2 className="m-0 text-[1.1rem] font-semibold text-white">Notifications & Alerts</h2>
      <button type="button" className="border-none bg-transparent text-[0.72rem] font-medium text-[#0EFF7B]">
        View all
      </button>
    </div>

    <div className="flex flex-col gap-2">
      {notificationItems.map((item) => {
        const status = item?.status || 'info';
        const currentStatus = statusMap[status] || statusMap.info;

        return (
          <div key={item.id} className="grid grid-cols-[18px_1fr_auto] items-start gap-3 border-b border-white/5 py-2.5 last:border-b-0">
            <span className="mt-1 inline-flex items-center justify-center text-[16px]" style={{ color: currentStatus.color }} aria-hidden="true">
              <Icon icon={currentStatus.icon} width={16} height={16} />
            </span>

            <div className="flex flex-col gap-1">
              <div className="text-[0.82rem] leading-[1.45] text-white">{item.title}</div>
              <div className="flex items-center gap-1.5 text-[0.72rem] font-medium text-white/70">
                <span className="inline-flex items-center justify-center" aria-label="Seen">
                  <Icon icon="akar-icons:double-check" width={14} height={14} />
                </span>
                <p className="m-0">{item.date || '29 July'}</p>
              </div>
            </div>

            <span className="mt-0.5 inline-flex items-center justify-center text-[#0EFF7B]" aria-hidden="true">
              <Icon icon="mdi:arrow-up" width={15} height={15} />
            </span>
          </div>
        );
      })}
    </div>
  </aside>
);

export default NotificationsComponent;
