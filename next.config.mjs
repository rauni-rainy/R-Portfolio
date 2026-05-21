/**
 * PERFORMANCE CHECKLIST FOR VERCEL DEPLOYMENT
 * ===========================================
 * Before going live, verify the following Core Web Vitals (CWV) targets:
 * 
 * 1. LCP (Largest Contentful Paint): < 2.5s
 *    - Ensure hero images or main text load immediately.
 *    - Priority hints (priority=true) on critical next/image components.
 * 
 * 2. CLS (Cumulative Layout Shift): < 0.1
 *    - Ensure fonts are preloaded (Next.js handles this with next/font).
 *    - Set fixed width/height on images or use aspect-ratio.
 * 
 * 3. INP (Interaction to Next Paint): < 200ms
 *    - Ensure animations (Framer Motion/Lenis) don't block the main thread.
 *    - Code-split heavy interactive components.
 * 
 * 4. General:
 *    - Run `npm run analyze` to check bundle sizes.
 *    - Check for strict CSP warnings in the browser console.
 *    - Verify SEO (Sitemap & Robots.txt) using Lighthouse.
 *    - Verify OG Image renders correctly when sharing on social media.
 */

import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' https://va.vercel-scripts.com;
  style-src 'self' 'unsafe-inline';
  img-src 'self' blob: data: https://images.unsplash.com https://avatars.githubusercontent.com;
  font-src 'self';
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
  upgrade-insecure-requests;
`;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Note: 'output: export' is removed since we are using Middleware and dynamic OG images (which require a Node server/serverless functions)
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      }
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: cspHeader.replace(/\n/g, ''),
          },
        ],
      },
    ];
  },
};

export default withBundleAnalyzer(nextConfig);
