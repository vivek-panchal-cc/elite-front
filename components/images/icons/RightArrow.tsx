import * as React from 'react';

interface SVGProps extends React.SVGProps<SVGSVGElement> {}

const RightArrow: React.FC<SVGProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={12}
    viewBox="0 0 16 12"
    fill="none"
    {...props}
  >
    <path
      d="M14.6654 6L1.33203 6"
      stroke="#14181F"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.6641 11C9.6641 11 14.6641 7.09796 14.6641 5.99997C14.6641 4.90197 9.66406 1 9.66406 1"
      stroke="#14181F"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default RightArrow;
