import express from 'express';
const app = express();
app.use(express.json());

const books: string[] = [];

app.post('/books', (req, res) => {
    books.push(req.body);
    res.send('Ok post');
})

app.get('/books', (req, res) => {
    res.json(books);
})

app.delete('/books', (req, res) => {
    books.pop();
    res.send('Ok delete');
})

app.listen(3000);