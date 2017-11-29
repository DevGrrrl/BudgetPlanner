const http = require('http');
const router = require('./router');
const port = process.env.DB_PORT || 8000;

const server = http.createServer(router);
server.listen(port, () => process.stdout.write(`server is running on ${port}`));