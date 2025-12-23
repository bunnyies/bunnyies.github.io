/** @type {import('next').NextConfig} */
const nextConfig = {
  // This tells Next.js to allow local development traffic without warnings
  experimental: {
    serverActions: {
      allowedOrigins: ["localhost:3000", "http://192.168.4.56:3000"],
    },
  },
};

export default nextConfig;