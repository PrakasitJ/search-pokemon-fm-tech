"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";

const PLACEHOLDER = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='45' fill='%23f1f5f9' stroke='%23cbd5e1' stroke-width='2'/%3E%3Ctext x='50' y='55' font-family='Arial' font-size='40' text-anchor='middle' fill='%2394a3b8'%3E?%3C/text%3E%3C/svg%3E";

interface PokemonImageProps extends Omit<ImageProps, "onError"> {
  fallbackSrc?: string;
}

export default function PokemonImage({ src, fallbackSrc = PLACEHOLDER, alt, ...props }: PokemonImageProps) {
  const [error, setError] = useState(false);

  return (
    <Image
      {...props}
      src={error ? fallbackSrc : src}
      alt={alt}
      onError={() => setError(true)}
    />
  );
}
