
/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
protocol:'https',
hostname:'res.cloudinary.com',
port:'',
pathname:'/**'
      },
      {
protocol:'https',
hostname:'variety.com',
port:'',
pathname:'/**'
      },
      {
protocol:'https',
hostname:'encrypted-tbn2.gstatic.com',
port:'',
pathname:'/**'
      },
      {
protocol:'https',
hostname:'encrypted-tbn1.gstatic.com',
port:'',
pathname:'/**'
      },
      
{protocol:'https',
hostname:'upload.wikimedia.org',
port:'',
pathname:'/**'
      },
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'static.vecteezy.com',
        port: '',
        pathname: '/**',
      }
    ],
  },
  // Adding a temporary rewrite for tvshows.json to simulate an API route for client-side fetching
  // This is a workaround for the prototype environment.
  // In a real app, you'd create an actual API route in `src/app/api/tvshows/route.js`
  // that uses the `tvshow-service.js`.
  async rewrites() {
    return [
      {
        source: '/data/tvshows.json', // The path client tries to fetch
        destination: '/api/tvshows_data', // An internal path that Next.js will resolve
      },
    ]
  },
};

module.exports = nextConfig;
