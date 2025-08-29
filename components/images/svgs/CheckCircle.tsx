import * as React from "react";

interface SVGProps extends React.SVGProps<SVGSVGElement> {}

const CheckCircle: React.FC<SVGProps> = (props) => (
  <svg
    width={96}
    height={96}
    viewBox="0 0 96 96"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    {...props}
  >
    <circle
      cx={48}
      cy={48}
      r={40}
      fill="none"
      stroke="#7BC67A"
      strokeWidth={6}
    />
    <path
      d="M30 50 L44 64 L66 38"
      fill="none"
      stroke="#7BC67A"
      strokeWidth={6}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default CheckCircle;
