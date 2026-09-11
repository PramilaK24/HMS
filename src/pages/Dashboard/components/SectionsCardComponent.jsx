import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { dashboardCards, sectionTabs } from '../dashboardUtils';

const SectionsCardComponent = () => {
  const [activeTab, setActiveTab] = useState(sectionTabs[0].id);
  const cards = dashboardCards[activeTab] || dashboardCards[sectionTabs[0].id];
  const selectedCard = cards.find((card) => card.active) || cards[0];

  return (
    <section className="w-full rounded-[18px] border border-[#0EFF7B1F] bg-[#071a14]/90 p-2 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.01)]">
      <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-3" aria-label="Dashboard sections">
        {sectionTabs.map((tab) => {
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              aria-pressed={isActive}
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-[12px] border px-3 py-3 text-[14px] font-medium transition-all duration-200 ${
                isActive
                  ? 'border-[#0EFF7B66] bg-[#0EFF7B1F] text-[#0EFF7B] shadow-[inset_0_0_0_1px_rgba(14,255,123,0.10)]'
                  : 'border-[#0EFF7B2E] bg-[#0A1411] text-white/80 hover:border-[#0EFF7B4D] hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="grid w-full grid-cols-1 gap-[18px] p-4 md:grid-cols-2 xl:grid-cols-4" aria-label="Key dashboard metrics">
        {cards.map((card) => {
          const isSelected = card.id === selectedCard.id;

          return (
            <article
              key={card.id}
              className={`flex min-h-[210px] flex-col justify-between rounded-[16px] border p-3 ${
                isSelected
                  ? 'border-[#0EFF7B4D] bg-[#071a14]/90 shadow-[inset_0_0_0_1px_rgba(14,255,123,0.08)]'
                  : 'border-[#0EFF7B1F] bg-[#071711]/80'
              }`}
            >
              <div className="flex min-h-[34px] flex-col items-start gap-1">
                <span className="text-[14px] leading-[1.2] text-white/70">{card.title}</span>
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#0EFF7B]">
                  <span className="text-[11px]">↑</span>
                  {card.delta}
                </span>
              </div>

              <div className="flex min-h-[80px] items-center">
                <div className="text-[32px] font-bold leading-none tracking-[-0.06em] text-[#0EFF7B]">
                  {card.value}
                </div>
              </div>

              <div className="mb-2">
                <button type="button" className="bg-transparent p-0 text-[12px] text-white/75">
                  {card.detail}
                </button>
              </div>

              <button
                type="button"
                className="mt-auto flex w-full items-center justify-center gap-2 rounded-[12px] border-b border-[#0EFF7B] bg-gradient-to-r from-[#025126] via-[#0D7F41] to-[#025126] px-3 py-[10px] text-[15px] font-semibold text-white shadow-[0_2px_12px_0_rgba(0,0,0,0.25)]"
              >
                {card.buttonText}
                <Icon icon="material-symbols:keyboard-arrow-down-rounded" className="h-[18px] w-[18px]" />
              </button>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default SectionsCardComponent;
