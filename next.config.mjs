/** @type {import('next').NextConfig} */
// const path = require("path");
import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
// console.log("__direname=====", [path.join(__dirname, "styles")]);
const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "i.annihil.us",
        port: "",
        pathname: "**",
      },
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
    ],
  },
};
// i.scdn.co;
export default nextConfig;
