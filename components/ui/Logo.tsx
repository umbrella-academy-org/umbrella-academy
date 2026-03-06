import { Umbrella } from "lucide-react";

interface LogoProps {
  variant?: 'light' | 'dark';
  inverted?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  subTitle?: string;
  showBackground?: boolean;
}

export function Logo({
  variant = 'light',
  inverted,
  size = 'md',
  className = '',
  subTitle,
  showBackground = false
}: LogoProps) {
  const isDark = inverted ?? variant === 'dark';

  const iconSizes = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-16 h-16"
  };

  const umbrellaSizes = {
    sm: "w-5 h-5",
    md: "w-6 h-6",
    lg: "w-10 h-10"
  };

  const textSizes = {
    sm: {
      main: "text-base",
      sub: "text-[10px]"
    },
    md: {
      main: "text-lg",
      sub: "text-xs"
    },
    lg: {
      main: "text-2xl",
      sub: "text-sm"
    }
  };

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <div className={`${iconSizes[size]} ${showBackground ? 'bg-white shadow-md shadow-black/5' : 'bg-transparent'} rounded-lg flex items-center justify-center shrink-0`}>
        <Umbrella className={`${umbrellaSizes[size]} text-[#525252]`} />
      </div>
      <div className="flex flex-col leading-tight">
        <span className={`${textSizes[size].main} font-bold ${isDark ? 'text-white' : 'text-amber-900'} tracking-wide `}>
          Umbrella
        </span>
        <span className={`${textSizes[size].sub} font-medium text-[#525252] tracking-wider `}>
          {subTitle || "Academy"}
        </span>
      </div>
    </div >
  );
}