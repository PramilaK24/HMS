import React from 'react';
import { Icon } from '@iconify/react';
import { notificationItems } from '../dashboardUtils';

const statusMap = {
  unread: { color: '#ff5d5d', icon: 'mdi:bell-ring-outline' },
  info: { color: '#0eff7b', icon: 'mdi:bell-outline' },
  success: { color: '#0eff7b', icon: 'mdi:check-circle-outline' },
};

const NotificationsComponent = () => (
  <aside className="dashboard-panel dashboard-notifications-panel">
    <div className="dashboard-panel__header">
      <h2 className="dashboard-panel__title">Notifications & Alerts</h2>
      <button type="button" className="dashboard-panel__link">
        View all
      </button>
    </div>

    <div className="dashboard-notifications">
      {notificationItems.map((item) => {
        const status = item?.status || 'info';
        const currentStatus = statusMap[status] || statusMap.info;

        return (
          <div key={item.id} className="dashboard-notification">
            <span className="dashboard-notification__icon" style={{ color: currentStatus.color }} aria-hidden="true">
              <Icon icon={currentStatus.icon} width={16} height={16} />
            </span>

            <div className="dashboard-notification__content">
              
              <div className="dashboard-notification__text">{item.title}</div>
              <div className="dashboard-notification__date">
                <span className="dashboard-notification__seen" aria-label="Seen">
                  <Icon icon="akar-icons:double-check" width={14} height={14} />
                </span>
                <p>{item.date || '29 July'}</p>
              </div>
            </div>

            <div className="dashboard-notification__actions">
              
              <span className="dashboard-notification__arrow" aria-hidden="true">
                <Icon icon="mdi:arrow-up" width={15} height={15} />
              </span>
            </div>
          </div>
        );
      })}
    </div>
  </aside>
);

export default NotificationsComponent;
