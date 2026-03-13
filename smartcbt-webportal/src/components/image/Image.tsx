"use client";

import NextImage, { ImageProps as NextImageProps, StaticImageData } from "next/image";
import { useState } from "react";

const defaultImage = "/images/no-image.png";

type ImageProps = NextImageProps & {
  defaultSrc?: string | StaticImageData;
};

type ImageLoaderProps = {
  src: string;
  width: number;
};

function loader({ src, width }: ImageLoaderProps) {
  return [src].filter(Boolean).join("?");
}

const Image = ({ alt = "", src: source = defaultImage, defaultSrc, ...props }: ImageProps) => {
  const [src, setSrc] = useState(source);
  // const fillNoImage = isEmpty(src);
  // console.log("fillNoImage", fillNoImage);
  return (
    <NextImage
      // fill={fillNoImage}
      onError={() => setSrc(defaultSrc ?? defaultImage)}
      {...{ alt, loader, src, ...props }}
    />
  );
};

export default Image;
