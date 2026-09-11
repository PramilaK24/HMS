import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { dashboardCards, sectionTabs } from '../dashboardUtils';

const SectionsCardComponent = () => {
  const [activeTab, setActiveTab] = useState(sectionTabs[0].id);
  const cards = dashboardCards[activeTab] || dashboardCards[sectionTabs[0].id];
  const selectedCard = cards.find((card) => card.active) || cards[0];

  return (
    <section className="dashboard-sections-panel">
      <div className="dashboard-sections" aria-label="Dashboard sections">
        {sectionTabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={`dashboard-section-tab ${activeTab === tab.id ? 'is-active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="dashboard-grid" aria-label="Key dashboard metrics">
        {cards.map((card) => (
          <article
            key={card.id}
            className={`dashboard-card ${card.id === selectedCard.id ? 'is-selected' : ''}`}
          >
            <div className="dashboard-card__header">
              <span className="dashboard-card__label">{card.title}</span>
              <span className="dashboard-card__badge">{card.delta}</span>
            </div>

            <div className="dashboard-card__body">
              <div className="dashboard-card__value">{card.value}</div>
            </div>

            <div className="dashboard-card__footer">
              <button type="button" className="dashboard-card__link">
                {card.detail}
              </button>
            </div>

            <button type="button" className="dashboard-card__button">
              {card.buttonText}
              <Icon icon="material-symbols:keyboard-arrow-down-rounded" />
            </button>
          </article>
        ))}
      </div>
    </section>
  );
};

export default SectionsCardComponent;
