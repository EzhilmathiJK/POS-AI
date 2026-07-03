import React from 'react';
import { Icons } from '../../assets/icons';

const ActionModal = ({ 
  isOpen, 
  onClose, 
  type = 'success', 
  title, 
  message, 
  primaryAction, 
  secondaryAction 
}) => {
  if (!isOpen) return null;

  const typeConfig = {
    success: {
      icon: <Icons.Check className="text-[#078c22] text-[24px]" />,
      bgClass: 'bg-[#e6f4ea]',
      primaryColor: 'bg-[#078c22] hover:bg-[#05791d]',
    },
    delete: {
      icon: <Icons.Delete className="text-[#ff1e27] text-[24px]" />,
      bgClass: 'bg-[#ffe4e7]',
      primaryColor: 'bg-[#ff1e27] hover:bg-[#d6171f]',
    },
    submit: {
      icon: <Icons.Send className="text-[#078c22] text-[24px]" />,
      bgClass: 'bg-[#e6f4ea]',
      primaryColor: 'bg-[#078c22] hover:bg-[#05791d]',
    },
    cancel: {
      icon: <Icons.Delete className="text-[#ff1e27] text-[24px]" />,
      bgClass: 'bg-[#ffe4e7]',
      primaryColor: 'bg-[#ff1e27] hover:bg-[#d6171f]',
    }
  };

  const config = typeConfig[type];

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-[1px]">
      <div className="bg-white rounded-[10px] w-[380px] p-[25px] flex flex-col items-center shadow-xl translate-y-0 transition-all duration-300">
        {/* Icon Circle */}
        <div className={`w-[60px] h-[60px] rounded-full flex items-center justify-center mb-[16px] ${config.bgClass}`}>
          {config.icon}
        </div>

        {/* Text */}
        <h2 className="text-[18px] font-bold text-[var(--color-text)] mb-[8px] text-center">
          {title}
        </h2>
        <p className="text-[13px] text-[var(--color-text)] font-semibold opacity-70 text-center mb-[24px] leading-relaxed max-w-[300px]">
          {message}
        </p>

        {/* Buttons */}
        <div className={`w-full flex gap-[12px]`}>
          {secondaryAction && (
            <button
              onClick={secondaryAction.onClick || onClose}
              className="flex-1 h-[36px] rounded-[6px] border border-[var(--color-primary)] bg-white text-[var(--color-primary)] font-bold text-[13px] hover:bg-gray-50 transition-colors"
            >
              {secondaryAction.text || 'Cancel'}
            </button>
          )}
          {primaryAction && (
            <button
              onClick={primaryAction.onClick}
              className={`flex-1 h-[36px] rounded-[6px] text-white font-bold text-[13px] transition-colors flex items-center justify-center gap-[8px] ${config.primaryColor}`}
            >
              {type === 'delete' || type === 'cancel' ? <Icons.Delete className="text-[14px]" /> : null}
              {type === 'success' && !secondaryAction ? <Icons.Check className="text-[16px]" /> : null}
              {primaryAction.text}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActionModal;
