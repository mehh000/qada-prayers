import React from 'react';
import { ArrowLeft, User } from 'lucide-react';

interface AuthTopBarProps {
  title: string;
  onBack: () => void;
  onProfileAction: () => void;
  profileTooltip: string;
}

export const AuthTopBar: React.FC<AuthTopBarProps> = ({
  title,
  onBack,
  onProfileAction,
  profileTooltip,
}) => {
  return (
    <header className="bg-white border-b border-[#E5EFE9] px-4 h-[56px] flex items-center justify-between shrink-0">
      <button
        type="button"
        onClick={onBack}
        aria-label="Go back"
        className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center text-[#1B4A32] hover:bg-[#F1F7F3] transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>

      <div className="flex items-center gap-2">
        {/* Delicate Mosque Silhouette Icon */}
        <svg
          width="19"
          height="19"
          viewBox="0 0 24 24"
          fill="none"
          className="text-[#2E6A4E]"
          aria-hidden="true"
        >
          <path
            d="M4 20V11L6.5 9L9 11V20M15 20V11L17.5 9L20 11V20M9 20V13C9 10.5 10.5 8.5 12 7.5C13.5 8.5 15 10.5 15 13V20M3 20H21M12 4V7.5M6.5 6.5V9M17.5 6.5V9"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="text-[16px] font-semibold text-[#113322] tracking-tight">
          {title}
        </span>
      </div>

      <button
        type="button"
        onClick={onProfileAction}
        title={profileTooltip}
        aria-label={profileTooltip}
        className="w-9 h-9 rounded-full bg-[#193B29] hover:bg-[#132E20] text-white flex items-center justify-center shadow-sm transition-colors cursor-pointer"
      >
        <User className="w-4 h-4" />
      </button>
    </header>
  );
};
