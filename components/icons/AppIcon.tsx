import React from 'react';

export const AppIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 28 28" 
    fill="currentColor"
    stroke="currentColor" 
    {...props}
  >
    <path d="M12 9v11h9" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <circle cx="12" cy="6" r="2" />
  </svg>
);