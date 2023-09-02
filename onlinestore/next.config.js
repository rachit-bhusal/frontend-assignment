/** @type {import('next').NextConfig} */

module.exports = {
	experimental: {
		serverActions: true,
	},
	images: {
		remotePatterns: [
			{
				hostname: 'fakestoreapi.com',
			},
		],
	},
};
