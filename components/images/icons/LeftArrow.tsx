import * as React from 'react';

interface SVGProps extends React.SVGProps<SVGSVGElement> {}

const LeftArrow: React.FC<SVGProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={12}
    viewBox="0 0 16 12"
    fill="none"
    {...props}
  >
    <path
      d="M1.33203 5.9998H14.6654M1.33203 5.9998C1.33204 7.0978 6.33186 11 6.33186 11M1.33203 5.9998C1.33202 4.90181 6.3319 1 6.3319 1"
      stroke="#14181F"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default LeftArrow;
