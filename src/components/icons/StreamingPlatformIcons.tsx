import type { SVGProps } from 'react';

type BrandIconProps = SVGProps<SVGSVGElement> & { size?: number };

const iconProps = (size: number) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  xmlns: 'http://www.w3.org/2000/svg',
  'aria-hidden': true,
});

export function SpotifyIcon({ size = 24, ...props }: BrandIconProps) {
  return (
    <svg {...iconProps(size)} {...props}>
      <circle cx="12" cy="12" r="11" fill="currentColor" />
      <path d="M6.4 8.8c3.9-1.15 8.05-.86 11.48.85M7.1 12.05c3.3-.92 6.95-.68 9.9.75M7.72 15.12c2.72-.68 5.6-.48 8.05.63" stroke="white" strokeWidth="1.65" strokeLinecap="round" />
    </svg>
  );
}

export function AppleMusicIcon({ size = 24, ...props }: BrandIconProps) {
  return (
    <svg {...iconProps(size)} {...props}>
      <path fill="currentColor" d="M19.4 3.08 8.2 5.3a1.5 1.5 0 0 0-1.2 1.47v9.05a3.7 3.7 0 0 0-1.52-.32C3.56 15.5 2 16.73 2 18.25S3.56 21 5.48 21 9 19.77 9 18.25V9.08l9-1.78v6.52a3.7 3.7 0 0 0-1.52-.32c-1.92 0-3.48 1.23-3.48 2.75S14.56 19 16.48 19 20 17.77 20 16.25V3.57a.5.5 0 0 0-.6-.49Z" />
    </svg>
  );
}

export function YouTubeMusicIcon({ size = 24, ...props }: BrandIconProps) {
  return (
    <svg {...iconProps(size)} {...props}>
      <circle cx="12" cy="12" r="10.5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="6.3" fill="currentColor" />
      <path d="m10.35 8.9 5.05 3.1-5.05 3.1V8.9Z" fill="white" />
    </svg>
  );
}

export function TidalIcon({ size = 24, ...props }: BrandIconProps) {
  return (
    <svg {...iconProps(size)} {...props} fill="currentColor">
      <path d="m4.5 5 3 3-3 3-3-3 3-3Zm7.5 0 3 3-3 3-3-3 3-3Zm7.5 0 3 3-3 3-3-3 3-3ZM8.25 8.75l3 3-3 3-3-3 3-3Zm7.5 0 3 3-3 3-3-3 3-3ZM12 12.5l3 3-3 3-3-3 3-3Z" />
    </svg>
  );
}
