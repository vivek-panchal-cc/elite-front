import React from "react";
import ContentLoader from "react-content-loader";

const LoaderTopProduct: React.FC = () => {
  return (
    <ContentLoader
      speed={2}
      width="100%"
      height={70}
      viewBox="0 0 160 70"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      className="w-full max-w-[160px] sm:max-w-[200px]"
    >
      <rect x="0" y="5" rx="10" ry="10" width="60" height="60" />
      <rect x="70" y="15" rx="4" ry="4" width="80" height="12" />
      <rect x="70" y="40" rx="4" ry="4" width="50" height="12" />
    </ContentLoader>
  );
};

export default LoaderTopProduct;
