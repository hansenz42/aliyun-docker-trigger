module.exports = {
	port: 80,
	dockerfilesdir: './dockerfiles',
	email: {
		transport: {
			host: 'smtp.qq.com',
			port: 465,
			secure: true,
			auth: {
				user: process.env.EMAIL_TRANSPORT_USER,
				pass: process.env.EMAIL_TRANSPORT_PASS,
			},
		},
		subscribers: process.env.EMAIL_SUBSCRIBERS,
	},
	dockerMode: process.env.DOCKER_MODE || 'compose',
	serverName: process.env.SERVER_NAME || 'aliyun-docker-trigger',
}
