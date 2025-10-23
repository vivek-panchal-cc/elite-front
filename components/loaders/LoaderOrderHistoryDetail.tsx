"use client";

import React from "react";
import ContentLoader from "react-content-loader";

const LoaderOrderHistoryDetail: React.FC = ({}) => {
  return (
    <div>
      <ContentLoader
        speed={1.5}
        backgroundColor="#C7C7C7"
        foregroundColor="#ecebeb"
        width="100%"
        height="100%"
        viewBox="0 0 800 500"
        className="w-full"
      >
        {/* Header */}
        <rect x="10" y="10" rx="6" ry="6" width="30" height="30" />
        <rect x="50" y="15" rx="6" ry="6" width="180" height="20" />
        <rect x="680" y="10" rx="10" ry="10" width="100" height="30" />

        {/* Order info line */}
        <rect x="10" y="60" rx="6" ry="6" width="280" height="14" />

        {/* Product list header */}
        <rect x="10" y="100" rx="6" ry="6" width="380" height="20" />

        {/* Product list rows */}
        <rect x="10" y="130" rx="6" ry="6" width="780" height="50" />
        <rect x="10" y="190" rx="6" ry="6" width="780" height="50" />
        <rect x="10" y="250" rx="6" ry="6" width="780" height="50" />
        <rect x="10" y="310" rx="6" ry="6" width="780" height="50" />

        {/* Summary section */}
        <rect x="10" y="380" rx="6" ry="6" width="180" height="18" />
        <rect x="10" y="405" rx="6" ry="6" width="150" height="14" />
        <rect x="10" y="430" rx="6" ry="6" width="180" height="14" />
        <rect x="10" y="460" rx="6" ry="6" width="200" height="16" />

        <rect x="260" y="380" rx="6" ry="6" width="180" height="18" />
        <rect x="260" y="405" rx="6" ry="6" width="150" height="14" />
        <rect x="260" y="430" rx="6" ry="6" width="180" height="14" />
        <rect x="260" y="460" rx="6" ry="6" width="200" height="16" />
      </ContentLoader>
    </div>
  );
};

export default LoaderOrderHistoryDetail;
