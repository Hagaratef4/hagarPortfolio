"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

type SafeImageProps = Omit<ImageProps, "onError"> & {
  placeholderClassName?: string;
};

export default function SafeImage({
  src,
  alt,
  className,
  placeholderClassName,
  fill,
  ...props
}: SafeImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={
          placeholderClassName ??
          [
            fill ? "absolute inset-0" : "",
            "flex items-center justify-center bg-neutral/40 text-charcoal/30",
          ]
            .filter(Boolean)
            .join(" ")
        }
      >
        <span className="font-serif text-sm tracking-widest uppercase">
          {alt}
        </span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      className={className}
      fill={fill}
      onError={() => setHasError(true)}
      {...props}
    />
  );
}
