import express from 'express';
import 'dotenv/config';
import booksRouter from './modules/books/books.router.js';
const app = express();
app.use(express.json());
app.use((req, res, next) => {
    console.log('Role recibido en header: ', req.headers.role || 'ninguno');
    next();
});
app.use('/books', booksRouter);
app.listen({
    hostname: process.env.APP_HOSTNAME || 'localhost',
    port: process.env.APP_PORT || 3000
}, () => console.log(`Librarian App running on http://${process.env.APP_HOSTNAME || 'localhost'}:${process.env.APP_PORT || 5000}`));