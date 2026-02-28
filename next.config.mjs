import mdx from "@next/mdx";

const withMDX = mdx({
  extension: /\.mdx?$/,
  options: {},
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  transpilePackages: ["next-mdx-remote"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.google.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "cdninstagram.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "*.cdninstagram.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "tiktokcdn.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "*.tiktokcdn.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "behold.so",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "cdn2.behold.pictures",
        pathname: "**",
      },
    ],
  },
  sassOptions: {
    compiler: "modern",
    silenceDeprecations: ["legacy-js-api"],
  },
};

export default withMDX(nextConfig);
