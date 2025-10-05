// next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // ⬇️ اجازه به دامنه‌های مجاز برای نمایش تصاویر
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.vercel.app',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
    // ⬇️ مسیر محلی تصاویر از فولدر public/images/
    unoptimized: true, // اگر با 404 یا optimize error مواجه شدی
  },

  reactStrictMode: true,
  swcMinify: true,
};

export default nextConfig;
