import React from 'react';
import { Icon } from '@iconify/react';

const ConfirmModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = "Confirm Action", 
  message = "Are you sure you want to proceed?", 
  confirmText = "Confirm", 
  cancelText = "Cancel" 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-[100] p-4">
      <div className="bg-[#111] border border-text-accent rounded-xl w-full max-w-md p-8 shadow-[0_0_40px_rgba(14,255,123,0.1)] relative flex flex-col items-center text-center">
        
        <button onClick={onClose} className="absolute top-5 right-5 w-7 h-7 flex items-center justify-center rounded-full bg-btn-solid text-text-highlight hover:opacity-80 transition">
          <Icon icon="lucide:x" className="w-4 h-4" />
        </button>

        <div className="w-16 h-16 rounded-full bg-btn-solid flex items-center justify-center mb-5 mt-2 shadow-[0_0_20px_rgba(2,81,38,0.5)]">
          <Icon icon="lucide:trash-2" className="w-8 h-8 text-text-highlight" />
        </div>

        <h2 className="text-xl font-medium text-white mb-3">{title}</h2>
        
        <p className="text-gray-300 text-sm mb-8 leading-relaxed max-w-sm">
          {message}
        </p>
        
        <div className="flex justify-center gap-4 w-full">
          <button 
            onClick={onClose} 
            className="flex-1 py-2.5 rounded-md border border-gray-600 text-gray-300 text-sm font-medium hover:bg-gray-800 transition"
          >
            {cancelText}
          </button>
          <button 
            onClick={() => {
              onConfirm();
              onClose();
            }} 
            className="flex-1 py-2.5 rounded-md bg-btn-solid text-white text-sm font-medium hover:opacity-90 transition"
          >
            {confirmText}
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default ConfirmModal;
