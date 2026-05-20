/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "i.postimg.cc" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      { protocol: "https", hostname: "ui-avatars.com" },
      { protocol: "https", hostname: "img.freepik.com" },
      { protocol: "https", hostname: "cdn.pixabay.com" },
    ],
  },
};

export default nextConfig;
