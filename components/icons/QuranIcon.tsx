
import React from 'react';

export const QuranIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <path d="M20 3c-1.1 0-2 .9-2 2v14a2 2 0 0 0 2 2h2"/>
    <path d="M4 5v14a2 2 0 0 0 2 2h12"/>
    <path d="M4 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/>
  </svg>
);
