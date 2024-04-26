const http = require('http');
const app = require('./app');
const config = require('./configs/server.json');

const server = http.createServer(app);

const host = config.HOST;
const port = config.PORT;

server.listen(port, host, () => {
  console.log(`server started - ${host}:${port}`);
});
