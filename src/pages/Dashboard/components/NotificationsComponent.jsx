import React from 'react';
import { notificationItems } from '../dashboardUtils';

const NotificationsComponent = () => (
  <aside className="dashboard-panel dashboard-notifications-panel">
    <div className="dashboard-panel__header">
      <h2 className="dashboard-panel__title">Notifications & Alerts</h2>
      <button type="button" className="dashboard-panel__link">
        View all
      </button>
    </div>

    <div className="dashboard-notifications">
      {notificationItems.map((item) => (
        <div key={item.id} className="dashboard-notification">
          <span className="dashboard-notification__dot" aria-hidden="true" />
          <div className="dashboard-notification__text">{item.title}</div>
          <div className="dashboard-notification__time">{item.time}</div>
        </div>
      ))}
    </div>
  </aside>
);

export default NotificationsComponent;
