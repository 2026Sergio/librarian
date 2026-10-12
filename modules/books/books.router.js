import { Router } from 'express';
const booksRouter = Router();
let books = [
    { id: '1', titulo: 'Cien años de soledad', autor: 'Gabriel García Márquez', stock: 5 }
];
booksRouter.get('/', (req, res) => {
    res.status(200).json(books);
});
booksRouter.get('/:id', (req, res) => {
    const book = books.find((b) => b.id === req.params.id);
    if (!book) {
        return res.status(404).json({ error: 'Libro no encontrado' });
    }
    res.status(200).json(book);
});
booksRouter.post('/', (req, res) => {
    if (req.headers.role !== 'admin') {
        return res.status(401).json({ error: 'No autorizado. Se requiere rol de admin para gestionar libros.' });
    }
    const { id, titulo, autor, stock } = req.body;
    if (!id || !titulo) {
        return res.status(400).json({ error: 'Faltan datos obligatorios (id, titulo)' });
    }
    const nuevoLibro = { id, titulo, autor: autor || 'Desconocido', stock: stock || 1 };
    books.push(nuevoLibro);
    res.status(201).json({ mensaje: 'Libro creado con éxito', libro: nuevoLibro });
});
export default booksRouter;