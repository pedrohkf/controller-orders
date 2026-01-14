import * as React from "react";

const SvgIcon: React.FC<React.SVGProps<SVGElement>> = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='24'
    height='24'
    fill='none'
    stroke='currentColor'
    strokeLinecap='round'
    strokeLinejoin='round'
    strokeWidth='2'
    className='lucide lucide-circle-alert-icon lucide-circle-alert'
    viewBox='0 0 24 24'
  >
    <circle cx='12' cy='12' r='10'></circle>
    <path d='M12 8v4M12 16h.01'></path>
  </svg>
);

export default React.memo(SvgIcon);
