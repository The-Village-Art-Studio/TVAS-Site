import createNextIntlPlugin from 'next-intl/plugin';
 
const withNextIntl = createNextIntlPlugin();
 
import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
      },
      {
        protocol: 'https',
        hostname: 'bnkybmlnmgurhlebturf.supabase.co',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/storage/:path*',
        destination:
          'https://bnkybmlnmgurhlebturf.supabase.co/storage/v1/object/public/tvas-assets/:path*',
      },
    ];
  },
};
 
export default withNextIntl(nextConfig);
