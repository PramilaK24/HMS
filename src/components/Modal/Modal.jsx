import { useEffect, useId, useRef } from 'react';
import { Icon } from '@iconify/react';
import Button from '../Button/Button';

export default function Modal({ open = false, onClose, title, children }) {
  const dialogRef = useRef(null);
  const titleId = useId();
  useEffect(() => {
    const dialog = dialogRef.current;
    const previousFocus = document.activeElement;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
    return () => {
      if (dialog.open) dialog.close();
      if (open && previousFocus instanceof HTMLElement) previousFocus.focus();
    };
  }, [open]);

  return (
    <dialog ref={dialogRef} aria-labelledby={titleId} onCancel={(event) => { event.preventDefault(); onClose?.(); }} onClick={(event) => { if (event.target === dialogRef.current) onClose?.(); }} className="m-auto w-[calc(100%_-_2rem)] max-w-lg rounded-xl border border-text-accent/40 bg-[#0e1711] p-0 text-white shadow-xl backdrop:bg-black/70">
      <div className="p-6">
        <div className="mb-5 flex items-center justify-between gap-4"><h2 id={titleId} className="text-lg font-medium">{title}</h2><Button onClick={onClose} aria-label="Close dialog" className="p-2"><Icon icon="solar:close-circle-linear" width="22" /></Button></div>
        {children}
      </div>
    </dialog>
  );
}
