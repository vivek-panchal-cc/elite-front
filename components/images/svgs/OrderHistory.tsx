import * as React from "react";

interface SVGProps extends React.SVGProps<SVGSVGElement> {}

const OrderHistory: React.FC<SVGProps> = (props) => (
  <svg
    width={15}
    height={20}
    viewBox="0 0 15 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props} // ✅ Allows passing className, style, onClick, etc.
  >
    <path
      d="M3.75 14.375H8.75M3.75 11.25H11.25M3.75 8.125H11.25M4.375 3.125H1.875V18.125H13.125V3.125H10.625M4.375 1.875H10.625L9.84375 4.375H5.15625L4.375 1.875Z"
      stroke="inherit"
      strokeLinejoin="round"
    />
  </svg>
);

export default OrderHistory;
