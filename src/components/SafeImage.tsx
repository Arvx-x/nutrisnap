"use client";

import * as React from "react";

type SafeImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  fallbackSrc?: string;
};

export default function SafeImage({ fallbackSrc = "/placeholder-meal.svg", onError, src, ...rest }: SafeImageProps) {
  const [currentSrc, setCurrentSrc] = React.useState<string>((src as string) || fallbackSrc);

  return (
    <img
      {...rest}
      src={currentSrc}
      onError={(e) => {
        if (currentSrc !== fallbackSrc) {
          setCurrentSrc(fallbackSrc);
        }
        if (onError) onError(e);
      }}
    />
  );
}


