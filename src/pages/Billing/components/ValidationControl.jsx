import React from 'react';
import { Icon } from '@iconify/react';

export default function ValidationControl() {
  const rules = [
    { label: 'Payment method validation', icon: 'lucide:check-circle-2' },
    { label: 'No negative billing amounts', icon: 'lucide:ban' },
    { label: 'Duplicate bill prevention', icon: 'lucide:files' },
    { label: 'Refund handling', icon: 'lucide:circle-dollar-sign' }
  ];

  return (
    <div className="rounded-xl border border-text-accent/60 bg-[#08170f] p-5 shadow-[inset_0_0_14px_#00a04812]">
      <h3 className="text-xs font-bold uppercase tracking-wider text-text-highlight">
        VALIDATION & CONTROLS
      </h3>

      <ul className="mt-4 space-y-3.5 text-xs text-white/85">
        {rules.map((rule, idx) => (
          <li key={idx} className="flex items-center gap-3">
            <div className="flex size-7 items-center justify-center shrink-0 rounded-full border border-text-accent/30 bg-[#0b2919] text-white/80">
              <Icon icon={rule.icon} width="14" aria-hidden="true" />
            </div>
            <span>{rule.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
