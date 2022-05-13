/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,


  async rewrites() {
    return [
      {
        source: '/:folder/:id',
        destination: '/api/?folder=:folder&id=:id',
      },
    ]
  },


}

module.exports = nextConfig
