import React from "react";
import ContentLoader, { IContentLoaderProps } from "react-content-loader";

const LoaderTopCategory: React.FC<IContentLoaderProps> = (props) => (
  <ContentLoader
    speed={2}
    width={90}
    height={110}
    viewBox="0 0 90 110"
    backgroundColor="#e0e0e0"
    foregroundColor="#c7c7c7"
    className="mx-auto"
    {...props}
  >
    <circle cx="45" cy="45" r="45" />
    <rect x="15" y="95" rx="4" ry="4" width="60" height="10" />
  </ContentLoader>
);
export default LoaderTopCategory;
