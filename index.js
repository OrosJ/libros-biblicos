//express
const express = require('express');
const app = express();
const PORT = 3000; // puede cambiar

//array 
let librosBiblicos = [
    {id: 1 , nombre: 'Genesis', autor: 'Moises', anioPublicacion: 2020},
    {id: 2 , nombre: 'Exodo', autor: 'Moises', anioPublicacion: 2024},
    {id: 3 , nombre: 'Levitico', autor: 'Marcos', anioPublicacion: 1990},
    {id: 4 , nombre: 'Apocalipsis', autor: 'Juan', anioPublicacion: 2008},
    {id: 5 , nombre: 'Evangelio de Juan', autor: 'Juan', anioPublicacion: 1991},
    {id: 6 , nombre: 'Salmos', autor: 'David', anioPublicacion: 1991},
];
//manejo de JSON
app.use(express.json());
//endpoint 1 obtener todos los libros
app.get('/libros', (req, res) => {
    res.json(librosBiblicos);
});
// endpoint 2 obtener libro por ID
app.get('/libros/:id',(req, res) => {
    const idCapturado = parseInt(req.params.id);
    console.log(idCapturado);
    const libroEncontrado = librosBiblicos.find((libro) => libro.id === idCapturado);
    if (libroEncontrado) {
        res.json(libroEncontrado);
    } else {
        res.status(404).json({mensaje : 'Libro no encontrado'});
    }
});
// endpoint 3 Agregar un libro
app.post('/agregar-libro', (req, res) => {
    const nuevoLibro = req.body;
    console.log(nuevoLibro);
    librosBiblicos.push(nuevoLibro);
    res.status(201).json('este libro fue guardado exitosamente');
})
// endpoint 4 Actualizar el libro
app.put('/actualizar-libro/:id', (req, res) => {
    const idCapturado = parseInt(req.params.id);
    const indexLibroLocalizado = librosBiblicos.findIndex((libro) => libro.id === idCapturado);
    if (indexLibroLocalizado !== -1 ){
        librosBiblicos[indexLibroLocalizado] = req.body;
        res.json(librosBiblicos[indexLibroLocalizado]);
    } else {
        res.status(404).json({mensaje : 'Libro no encontrado'});
    }
});
// endpoint 5 Eliminar Libro
app.delete('/eliminar-libro/:id', (req, res) => {
    const id = parseInt(req.params.id);
    lBiblico = librosBiblicos.filter( libro => libro.id !== id);
    res.status(201).json({mensaje : 'se ha eliminado el libro'});
    console.log(lBiblico);
});
//endpoint 6 
app.get('/libros/publicacion/:anio', (req, res) => {
    const year =  parseInt(req.params.anio);
    const librosPublicados = librosBiblicos.filter( x => x.anioPublicacion === year);
    if (librosPublicados.length > 0) {
        res.json(librosPublicados);
    } else {
        res.status(404).json({mensaje : 'no se han encontrado libros publicados en ese año'});
    }
});
//PRACTICA
//endpoint bienvenida
app.get('/welcome', (req, res) => {
    const message = "BIENVENIDO Jose Oros, Estudiante";
    res.json(message);
});

//endpoint obtener libros por autor
app.get('/libros/autor/:autor', (req, res) => {
const autor = req.params.autor;
const librosAutor = librosBiblicos.filter( x => x.autor === autor);
if (librosAutor.length > 0) {
    res.json(librosAutor);
} else {
    res.status(404).json({mensaje : 'no se han encontrado libros publicados de ese autor' });
}
});

//endpoint cantidad total de Libros
app.get('/total-libros', (req, res) => {
    const total = librosBiblicos.length;
    res.json('El total de libros es de: ' + total);
});

//endpoint libros escritos por Juan
app.get('/libros-juan', (req, res) => {
    const librosJuan = librosBiblicos.filter( x => x.autor === 'Juan');
    if (librosJuan.length > 0) {
        res.json({
            mensaje: 'Libros escritos por Juan encontrados:',
            libros: librosJuan
        });
    } else {
        res.status(404).json({mensaje : 'No se encontraron libros escritos por Juan en el registro'});
    }
});

//endpoint obtener ordenar por nombre
app.get('/libros-ordenar', (req, res) => {
    res.json(librosBiblicos.sort((a,b) => a.autor.localeCompare(b.autor)));
    });
    
app.listen(PORT, () => {
    console.log("Servidor corriendo en el puerto http://localhost:" + PORT);
});