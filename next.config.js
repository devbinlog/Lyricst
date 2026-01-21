/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "placehold.it",
        port: '',
        pathname: "/*"
      },
      {
        protocol: "http",
        hostname: "i.maniadb.com",
        port: '',
        pathname: "/images/artist/*/*"
      },
      {
        protocol: "http",
        hostname: "i.maniadb.com",
        port: '',
        pathname: "/images/*"
      },
      {
        protocol: "http",
        hostname: "i.maniadb.com",
        port: '',
        pathname: "/images/*/*/*/*"
      },
      {
        protocol: "http",
        hostname: "www.maniadb.com",
        port: '',
        pathname: "/images/*/*/*"
      },
      {
        protocol: "https",
        hostname: "cdnimg.melon.co.kr",
        port: '',
        pathname: "/*/album/images/*/*/*/*.jpg"
      },
      {
        protocol: "https",
        hostname: "cdnimg.melon.co.kr",
        port: '',
        pathname: "/*/album/images/*/*/*/*.jpg/*/*/*/*/*/*"
      },
    ]
  }
}

module.exports = nextConfig
