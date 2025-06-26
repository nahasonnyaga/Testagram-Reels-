import { useState } from 'react';
import Image from 'next/image';
import cn from 'clsx';
import type { ReactNode } from 'react';
import type { ImageProps } from 'next/image';

type NextImageProps = {
  alt: string;
  width?: string | number;
  height?: string | number;
  children?: ReactNode;
  useSkeleton?: boolean;
  imgClassName?: string;
  previewCount?: number;
  blurClassName?: string;
} & Omit<ImageProps, 'alt' | 'width' | 'height'>;

export function NextImage({
  src,
  alt,
  width,
  height,
  children,
  className,
  useSkeleton,
  imgClassName,
  previewCount,
  blurClassName,
  ...rest
}: NextImageProps): JSX.Element {
  const [loading, setLoading] = useState(!!useSkeleton);

  const handleLoad = (): void => setLoading(false);

  // Convert string width/height to number
  const numericWidth = typeof width === 'string' ? parseInt(width, 10) : width;
  const numericHeight =
    typeof height === 'string' ? parseInt(height, 10) : height;

  return (
    <figure style={{ width }} className={className}>
      <Image
        className={cn(
          imgClassName,
          loading
            ? blurClassName ??
                'animate-pulse bg-light-secondary dark:bg-dark-secondary'
            : previewCount === 1
            ? '!relative !h-auto !min-h-0'
            : 'object-cover'
        )}
        src={src}
        width={numericWidth}
        height={numericHeight}
        alt={alt}
        onLoadingComplete={handleLoad}
        layout='responsive'
        {...rest}
      />
      {children}
    </figure>
  );
}
