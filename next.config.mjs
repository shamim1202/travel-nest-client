/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  images: {
    domains: ["i.ibb.co", "i.ibb.co.com"], // <-- host image into imagebb
  },
};

export default nextConfig;
