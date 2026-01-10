import * as React from "react";

const BarCodeIcon: React.FC<React.SVGProps<SVGElement>> = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='24'
    height='24'
    fill='none'
    stroke='currentColor'
    strokeLinecap='round'
    strokeLinejoin='round'
    strokeWidth='2'
    className='lucide lucide-barcode-icon lucide-barcode'
    viewBox='0 0 24 24'
  >
    <path d='M3 5v14M8 5v14M12 5v14M17 5v14M21 5v14'></path>
  </svg>
);

export default React.memo(BarCodeIcon);
