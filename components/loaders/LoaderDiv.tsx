import React from "react";
import ContentLoader, { IContentLoaderProps } from "react-content-loader";

interface LoaderDivProps extends IContentLoaderProps {
  width?: number | string;
  height?: number | string;
  rx?: number | string;
  ry?: number | string;
}

const LoaderDiv: React.FC<LoaderDivProps> = ({
  width = "100%",
  height = 100,
  rx = 5,
  ry = 5,
  ...props
}) => {
  return (
    <ContentLoader height={height} width={width} {...props}>
      <rect rx={rx} ry={ry} width={width} height={height} />
    </ContentLoader>
  );
};

export default LoaderDiv;
