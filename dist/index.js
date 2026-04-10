import express from 'express';
const app = express();
const book = [];
app.post('/books', (req, res) => {
    console.log(req);
    res.send('Ok post teste');
});
app.get('/books', (req, res) => {
    res.send('Hello World');
});
app.listen(3000);
