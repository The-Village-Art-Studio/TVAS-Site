import createNextIntlPlugin from 'next-intl/plugin';
 
const withNextIntl = createNextIntlPlugin();
 
import { NextConfig } from 'next';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseHostname = supabaseUrl ? new URL(supabaseUrl).hostname : undefined;

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
      },
      {
        protocol: 'https',
        hostname: supabaseHostname ?? 'bnkybmlnmgurhlebturf.supabase.co',
        pathname: '/storage/v1/object/public/tvas-assets/**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/storage/:path*',
        destination: `${supabaseUrl ?? 'https://bnkybmlnmgurhlebturf.supabase.co'}/storage/v1/object/public/tvas-assets/:path*`,
      },
    ];
  },
};
 
export default withNextIntl(nextConfig);
