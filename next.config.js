/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
};

require("dotenv").config();
// module.exports = nextConfig

module.exports = {
    images: {
        domains: ["anh365.com", "sv3.anh365.com", "img.upanh.tv"],
    },

    env: {
        ACCESS_TOKEN_JWT: "kirldev",
    },

    nextConfig,
};
