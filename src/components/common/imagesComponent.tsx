import React from "react";

interface ImageComponentProps {
  src: string;
  alt?: string;
  width?: string;
  height?: string;
  className?: string;
}

const ImagesComponent: React.FC<ImageComponentProps> = ({
  src,
  alt,
  width,
  height,
  className,
}) => {
  return (
    <img
      src={src}
      alt={alt}
      style={{ width: width, height: height }}
      className={className}
    />
  );
};

export default ImagesComponent;
