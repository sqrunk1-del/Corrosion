const Corrosion = require('../lib/server'); // Points to the proxy engine
const proxy = new Corrosion({
    prefix: '/search/',
    codec: 'base64'
});

module.exports = (req, res) => {
    if (req.headers.upgrade === 'websocket') {
        // Vercel Serverless Functions have limited WebSocket support,
        // but this hooks it up just in case.
        return proxy.upgrade(req, req.socket, Buffer.alloc(0));
    }
    proxy.request(req, res);
};
