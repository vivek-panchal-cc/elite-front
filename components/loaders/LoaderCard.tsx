import React from "react";
import ContentLoader from "react-content-loader";

interface LoaderCardProps {
  width?: number | string;
  height?: number | string;
  speed?: number;
  className?: string;
}

const LoaderCard: React.FC<LoaderCardProps> = ({
  width = "100%",
  height = 200, // taller to fit buttons
  speed = 2,
  className = "",
}) => {
  return (
    <ContentLoader
      speed={speed}
      width={width}
      height={height}
      viewBox="0 0 400 200"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      className={className}
    >
      {/* Card Type */}
      <rect x="16" y="16" rx="4" ry="4" width="120" height="20" />

      {/* Last 4 digits */}
      <rect x="16" y="46" rx="4" ry="4" width="180" height="16" />

      {/* Expiry */}
      <rect x="16" y="70" rx="3" ry="3" width="100" height="14" />

      {/* Buttons Row */}
      <rect x="16" y="100" rx="6" ry="6" width="80" height="32" />
      <rect x="110" y="100" rx="6" ry="6" width="100" height="32" />
      <rect x="220" y="100" rx="6" ry="6" width="80" height="32" />

      {/* Optional Expired Badge */}
      <rect x="16" y="140" rx="4" ry="4" width="120" height="20" />
    </ContentLoader>
  );
};

export default LoaderCard;
