import * as React from "react";

type SVGProps = React.SVGProps<SVGSVGElement>;

const PrivacyPolicy: React.FC<SVGProps> = (props) => (
  <svg
    width={48}
    height={48}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M24 0C24.4313 0 24.8625 0.09375 25.2563 0.271875L42.9094 7.7625C44.9719 8.63438 46.5094 10.6688 46.5 13.125C46.4532 22.425 42.6282 39.4406 26.475 47.175C24.9094 47.925 23.0907 47.925 21.525 47.175C5.37192 39.4406 1.54692 22.425 1.50004 13.125C1.49067 10.6688 3.02817 8.63438 5.09067 7.7625L22.7532 0.271875C23.1375 0.09375 23.5688 0 24 0ZM24 6.2625V41.7C36.9375 35.4375 40.4157 21.5719 40.5 13.2563L24 6.2625Z"
      fill="white"
    />
  </svg>
);

export default PrivacyPolicy;
