import express from 'express';
const app = express();
app.get('/', (req, res) => res.send('Express.js: Hello World'));
app.listen(3000);
