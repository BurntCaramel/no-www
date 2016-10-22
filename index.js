const Hapi = require('hapi')
const URL = require('url')

function startRedirectServer(prefixURL) {
    const server = new Hapi.Server()
    server.connection({
        port: process.env.PORT || 80
    })

    const urlObject = URL.parse(prefixURL)
    if (!urlObject.pathname || urlObject.pathname === '') {
        urlObject.pathname = '/'
    }

    prefixURL = URL.format(urlObject)

    server.route({
        method: 'GET',
        path: '/{p*}',
        handler(request, reply) {
            reply.redirect(prefixURL + (request.params.p || ''))
        }
    })

    server.start()

    // Prevent exit
    process.stdin.resume()
}

module.exports = startRedirectServer
