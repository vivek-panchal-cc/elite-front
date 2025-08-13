import * as React from "react";

interface SVGComponentProps extends React.SVGProps<SVGSVGElement> {}

const Arrow: React.FC<SVGComponentProps> = (props) => (
  <svg
    width={7}
    height={11}
    viewBox="0 0 7 11"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M1 10L6 5.5L1 1"
      stroke="inherit"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default Arrow;
