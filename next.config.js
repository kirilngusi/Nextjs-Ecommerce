/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
};

require("dotenv").config();
// module.exports = nextConfig

module.exports = {
    images: {
        domains: ["mdbcdn.b-cdn.net"],
    },

    env: {
        ACCESS_TOKEN_JWT: "kirldev",
    },

    nextConfig,
};
