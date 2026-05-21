/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  trailingSlash: false,
  experimental: {
    typedRoutes: true
  }
};

export default nextConfig;
