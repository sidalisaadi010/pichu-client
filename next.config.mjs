/** @type {import('next').NextConfig} */
const nextConfig = {
    output :'standalone',
    rewrites: async () => {
        return [
            {
                source: '/:path*',
                destination: '/:path*',
            },
        ];
    },
};

export default nextConfig;
