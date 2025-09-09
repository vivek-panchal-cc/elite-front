import * as React from 'react';
interface SVGProps extends React.SVGProps<SVGSVGElement> {}

const Circle: React.FC<SVGProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={42}
    height={42}
    viewBox="0 0 42 42"
    fill="none"
    {...props}
  >
    <circle cx={21} cy={21} r={21} fill="white" />
    <circle cx={21} cy={21} r={21} fill="white" />
  </svg>
);
export default Circle;
