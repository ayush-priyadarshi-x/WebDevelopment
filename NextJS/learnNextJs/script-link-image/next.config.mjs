/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "letsenhance.io",
        port: "",
      },
    ],
  },
};

export default nextConfig;
