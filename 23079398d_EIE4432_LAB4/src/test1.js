//Content of test1.js under src folder:
import http from 'http';
http.createServer((req, res) => {
  res.end('Node.js: Hello World');
}).listen(3000);
