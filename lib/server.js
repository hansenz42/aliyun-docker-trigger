const Server = require('./app')
const logger = require('./logger')
const config = require('../config')

const server = new Server()

async function run() {
	try {
		await server.listen(config.port)
		logger.log(`Server Listen @ ${config.port}`)
		logger.log(`Server Name: ${config.serverName}`)
		logger.log(`Docker Mode: ${config.dockerMode}`)
	} catch (error) {
		logger.error(error.stack)
		throw error
	}
}

module.exports = {
	run,
}
