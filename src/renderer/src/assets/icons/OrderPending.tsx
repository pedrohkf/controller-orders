import * as React from "react";

const OrderPendingIcon: React.FC<React.SVGProps<SVGElement>> = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='24'
    height='24'
    fill='none'
    stroke='currentColor'
    strokeLinecap='round'
    strokeLinejoin='round'
    strokeWidth='2'
    className='lucide lucide-clipboard-clock-icon lucide-clipboard-clock'
    viewBox='0 0 24 24'
  >
    <path d='M16 14v2.2l1.6 1M16 4h2a2 2 0 0 1 2 2v.832M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h2'></path>
    <circle cx='16' cy='16' r='6'></circle>
    <rect width='8' height='4' x='8' y='2' rx='1'></rect>
  </svg>
);

export default React.memo(OrderPendingIcon);
