/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    async rewrites() {
      return [
        {
          source: '/api/notes',  // URL frontend yang akan dipanggil
          destination: 'http://localhost:8000/api/notes',  // URL API Laravel
        },
      ]
    },
  };
  
  export default nextConfig;