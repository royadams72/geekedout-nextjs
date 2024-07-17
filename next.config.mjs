/** @type {import('next').NextConfig} */
// const path = require("path");
import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
// console.log("__direname=====", [path.join(__dirname, "styles")]);
const nextConfig = {
  // sassOptions: {
  //   includePaths: [path.join(__dirname, "./")],
  //   prependData: `@import "app/globals";`,
  // },
};

export default nextConfig;
