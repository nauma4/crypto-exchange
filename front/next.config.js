/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'out',
  resolve: {
    extensions: ['.js', '.jsx']
  },
}

module.exports = nextConfig
