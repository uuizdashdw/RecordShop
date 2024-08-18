/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'contents.sixshop.com',
				port: '',
				pathname: '/**',
			},
		],
	},
};

export default nextConfig;
