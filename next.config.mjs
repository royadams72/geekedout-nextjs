/** @type {import('next').NextConfig} */
import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const nextConfig = {
  reactStrictMode: false,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.scdn.co",
        port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "www.gamerpower.com",
        port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "comicvine.gamespot.com",
        port: "",
        pathname: "**",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
