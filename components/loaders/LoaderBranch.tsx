import { IsMobileProps } from "@/types/profile";
import React from "react";
import ContentLoader, { IContentLoaderProps } from "react-content-loader";

const LoaderBranch: React.FC<IsMobileProps & IContentLoaderProps> = ({
  isMobile = false,
  ...props
}) => {
  const DesktopLoader = () => (
    <ContentLoader
      speed={2}
      width={800}
      height={200}
      backgroundColor="var(--color-skeleton-base, #A9A9A9)"
      foregroundColor="var(--color-skeleton-highlight, #e5e7eb)"
      {...props}
    >
      {/* Header Section */}
      <rect x="0" y="20" rx="4" ry="4" width="150" height="24" />
      <rect x="450" y="15" rx="15" ry="15" width="80" height="25" />
      <rect x="550" y="15" rx="15" ry="15" width="80" height="25" />

      {/* Branch Details Grid */}
      <rect x="0" y="70" rx="3" ry="3" width="100" height="16" />
      <rect x="0" y="95" rx="3" ry="3" width="180" height="16" />
      <rect x="0" y="130" rx="3" ry="3" width="100" height="16" />
      <rect x="0" y="155" rx="3" ry="3" width="180" height="16" />

      <rect x="250" y="70" rx="3" ry="3" width="100" height="16" />
      <rect x="250" y="95" rx="3" ry="3" width="180" height="16" />
      <rect x="250" y="130" rx="3" ry="3" width="100" height="16" />
      <rect x="250" y="155" rx="3" ry="3" width="180" height="16" />

      <rect x="500" y="70" rx="3" ry="3" width="100" height="16" />
      <rect x="500" y="95" rx="3" ry="3" width="180" height="16" />
    </ContentLoader>
  );

  const MobileLoader = () => (
    <ContentLoader
      speed={2}
      width={400}
      height={300}
      backgroundColor="var(--color-skeleton-base, #A9A9A9)"
      foregroundColor="var(--color-skeleton-highlight, #e5e7eb)"
      {...props}
    >
      {/* Header Section */}
      <rect x="140" y="5" rx="15" ry="15" width="70" height="25" />
      <rect x="220" y="5" rx="15" ry="15" width="70" height="25" />
      <rect x="0" y="50" rx="4" ry="4" width="150" height="24" />

      {/* Branch Details Stack */}
      <rect x="0" y="100" rx="3" ry="3" width="100" height="16" />
      <rect x="0" y="125" rx="3" ry="3" width="180" height="16" />
      <rect x="0" y="160" rx="3" ry="3" width="100" height="16" />
      <rect x="0" y="185" rx="3" ry="3" width="180" height="16" />
      <rect x="0" y="220" rx="3" ry="3" width="100" height="16" />
      <rect x="0" y="245" rx="3" ry="3" width="180" height="16" />
    </ContentLoader>
  );

  return (
    <div className="flex flex-col divide-y-[2px] divide-[var(--table-border)]">
      {[1].map((item) => (
        <div
          key={item}
          className={`${
            isMobile ? "p-6 pt-3" : "p-6 pl-15"
          } flex flex-col gap-2`}
        >
          {isMobile ? <MobileLoader /> : <DesktopLoader />}
        </div>
      ))}
    </div>
  );
};

export default LoaderBranch;
