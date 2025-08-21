import * as React from "react";

interface SVGProps extends React.SVGProps<SVGSVGElement> {}

const Mail: React.FC<SVGProps> = (props) => (
  <svg
    width={20}
    height={20}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M14.6654 4.0013C14.6654 3.26797 14.0654 2.66797 13.332 2.66797H2.66536C1.93203 2.66797 1.33203 3.26797 1.33203 4.0013V12.0013C1.33203 12.7346 1.93203 13.3346 2.66536 13.3346H13.332C14.0654 13.3346 14.6654 12.7346 14.6654 12.0013V4.0013ZM13.332 4.0013L7.9987 7.33464L2.66536 4.0013H13.332ZM13.332 12.0013H2.66536V5.33464L7.9987 8.66797L13.332 5.33464V12.0013Z"
      fill="inherit"
    />
  </svg>
);

export default Mail;
