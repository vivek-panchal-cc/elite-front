import * as React from "react";

interface SVGProps extends React.SVGProps<SVGSVGElement> {}

const FilledHeart: React.FC<SVGProps> = (props) => (
  <svg
    width={14}
    height={13}
    viewBox="0 0 14 13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M10.15 0C8.932 0 7.763 0.573842 7 1.47357C6.237 0.573842 5.068 0 3.85 0C1.694 0 0 1.70736 0 3.89646C0 6.5673 2.38 8.7564 5.985 12.0649L7 13L8.015 12.0649C11.62 8.7564 14 6.5673 14 3.89646C14 1.70736 12.306 0 10.15 0Z"
      fill={props.fill || "#124A9F"}
    />
  </svg>
);

export default FilledHeart;
