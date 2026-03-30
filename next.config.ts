import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      // TMDB movie & TV poster/backdrop images
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
        pathname: '/t/p/**',
      },
      // Unsplash (direct CDN — source.unsplash.com redirects here)
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      // Football-data.org team crests
      {
        protocol: 'https',
        hostname: 'crests.football-data.org',
      },
      // NewsAPI article images
      {
        protocol: 'https',
        hostname: '*.newsapi.org',
      },
      // YouTube thumbnails
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
      },
    ],
  },
}

export default nextConfig
