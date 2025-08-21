import * as React from "react";

type SVGProps = React.SVGProps<SVGSVGElement>;

const PrivacyMail: React.FC<SVGProps> = (props) => (
  <svg
    width={17}
    height={12}
    viewBox="0 0 17 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M1.87891 0C1.05078 0 0.378906 0.671875 0.378906 1.5C0.378906 1.97187 0.600781 2.41562 0.978906 2.7L7.77891 7.8C8.13516 8.06563 8.62266 8.06563 8.97891 7.8L15.7789 2.7C16.157 2.41562 16.3789 1.97187 16.3789 1.5C16.3789 0.671875 15.707 0 14.8789 0H1.87891ZM0.378906 3.5V10C0.378906 11.1031 1.27578 12 2.37891 12H14.3789C15.482 12 16.3789 11.1031 16.3789 10V3.5L9.57891 8.6C8.86641 9.13438 7.89141 9.13438 7.17891 8.6L0.378906 3.5Z"
      fill="inherit"
    />
  </svg>
);

export default PrivacyMail;
