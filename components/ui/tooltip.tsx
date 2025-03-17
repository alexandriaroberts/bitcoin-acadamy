'use client';

import type React from 'react';
import { useState } from 'react';

interface TooltipProps {
  children: React.ReactNode;
  content: string;
}

export function Tooltip({ children, content }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className='relative inline-block'>
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {children}
      </div>
      {isVisible && (
        <div className='absolute z-10 px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-md shadow-sm -top-10 left-1/2 transform -translate-x-1/2'>
          {content}
        </div>
      )}
    </div>
  );
}

export const TooltipProvider = ({ children }: { children: React.ReactNode }) =>
  children;
export const TooltipTrigger = ({
  children,
  asChild,
}: {
  children: React.ReactNode;
  asChild?: boolean;
}) => <>{children}</>;
export const TooltipContent = ({ children }: { children: React.ReactNode }) => (
  <>{children}</>
);
export const TooltipRoot = Tooltip;
