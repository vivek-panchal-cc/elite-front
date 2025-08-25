"use client";
import React from "react";
import ContentLoader from "react-content-loader";

interface SkeletonCategoryProps {
  count?: number;
}

const LoaderCategory: React.FC<SkeletonCategoryProps> = ({ count = 5 }) => {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, idx) => (
        <ContentLoader
          key={idx}
          speed={2}
          width="100%"
          height={60}
          viewBox="0 0 1000 50"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="0" y="5" rx="25" ry="25" width="100%" height="45" />
        </ContentLoader>
      ))}
    </div>
  );
};

export default LoaderCategory;
