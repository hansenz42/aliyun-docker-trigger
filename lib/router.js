const Router = require('koa-router')

const runScript = require('./run_script')
const email = require('./email')

const json = require('../package.json')

const DEPLOY_TIME = new Date()
const router = new Router()

router.get('/', async (ctx) => {
    ctx.body = [
        '[Service]',
        `[Deploy] @ ${DEPLOY_TIME}`,
        `[Request] @ ${new Date()}`,
        `[Version] @ ${json.version}`,
    ].join('\n')
    ctx.response.status = 200
})

router.post('/', async (ctx) => {
    const {
        push_data: {
            tag,
        },
        repository: {
            name,
            namespace,
            region,
        },
    } = ctx.request.body

    // 不等待容器更新完成，但确保 email 在更新后发送
    runScript.createOrUpdateContainers(region, namespace, name, tag)
        .then(() => email.send(name, tag))
        .catch(error => console.error('Error:', error))

    // 立即返回响应
    ctx.response.status = 200
})

module.exports = router
