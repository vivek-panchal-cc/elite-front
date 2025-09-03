import * as React from 'react';
interface SVGProps extends React.SVGProps<SVGSVGElement> {}

const DownArrow: React.FC<SVGProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={11}
    height={8}
    viewBox="0 0 11 8"
    fill="none"
    {...props}
  >
    <path d="M1 1L5.5 6L10 1" stroke="black" strokeWidth={1.5} strokeLinecap="round" />
  </svg>
);
export default DownArrow;
