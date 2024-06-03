const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser'); // Para analizar los cuerpos de las solicitudes POST

const app = express();
const port = 3000;

// Configurar EJS como motor de plantillas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Usar body-parser para manejar datos en las solicitudes POST
app.use(bodyParser.urlencoded({ extended: true }));


    // Conectar a la base de datos MongoDB

    mongoose.connect('mongodb+srv://admin:admin@cluster0.mdhbkvq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }).then(() => {
      console.log('Conectado a MongoDB');
    }).catch((err) => {
      console.error('Error al conectar a MongoDB', err);
    });
  
const { Schema } = mongoose;

const libroSchema = new Schema({
  titulo: String,
  autor: String,
});

const Libro = mongoose.model('Libro', libroSchema);

// Ruta raíz que muestra todos los libros
app.get('/', (req, res) => {
  Libro.find().then((libros) => {
    res.render('libros', { libros });
  }).catch((err) => {
    res.status(500).send('Error al encontrar los libros');
  });
});

// Mostrar un libro por ID
app.get('/libros/:id', (req, res) => {
  Libro.findById(req.params.id).then((libro) => {
    if (libro) {
      res.render('libro', { libro });
    } else {
      res.status(404).send('Libro no encontrado');
    }
  }).catch((err) => {
    res.status(500).send('Error al encontrar el libro');
  });
});

// Mostrar formulario para actualizar un libro
app.get('/libros/:id/editar', (req, res) => {
  Libro.findById(req.params.id).then((libro) => {
    if (libro) {
      res.render('editarLibro', { libro });
    } else {
      res.status(404).send('Libro no encontrado');
    }
  }).catch((err) => {
    res.status(500).send('Error al encontrar el libro');
  });
});

// Actualizar un libro
app.post('/libros/:id', (req, res) => {
  Libro.findByIdAndUpdate(req.params.id, {
    titulo: req.body.titulo,
    autor: req.body.autor
  }, { new: true }).then((libro) => {
    res.redirect('/');
  }).catch((err) => {
    res.status(500).send('Error al actualizar el libro');
  });
});

// Eliminar un libro
app.post('/libros/:id/eliminar', (req, res) => {
  Libro.findByIdAndDelete(req.params.id).then(() => {
    res.redirect('/');
  }).catch((err) => {
    res.status(500).send('Error al eliminar el libro');
  });
});

// Crear un nuevo libro
app.post('/libros', (req, res) => {
  const nuevoLibro = new Libro({
    titulo: req.body.titulo,
    autor: req.body.autor,
  });

  nuevoLibro.save().then(() => {
    res.redirect('/');
  }).catch((err) => {
    res.status(500).send('Error al crear el libro');
  });
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});