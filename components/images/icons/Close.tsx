import * as React from "react";

interface SVGComponentProps extends React.SVGProps<SVGSVGElement> {}

const Close: React.FC<SVGComponentProps> = (props) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M13.7492 15.4516L8.00828 9.71075L2.26741 15.4516L0.566406 13.7506L6.30728 8.00975L0.566406 2.26887L2.26741 0.567871L8.00828 6.30875L13.7492 0.567871L15.4502 2.26887L9.70928 8.00975L15.4502 13.7506L13.7492 15.4516Z"
      fill="white"
    />
  </svg>
);

export default Close;
