const express = require("express");
const cors= require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();

app.use(cors());
app.use(express.json());

const mongoUri= process.env.MONGODB_URI;
try {
    mongoose.connect(mongoUri);
    console.log("conexion exitosa con base de datos",mongoUri);

} catch (error) {
    console.error("falla de conexion con base de datos",error);
}

const libroSchema = new mongoose.Schema({
titulo: String,
autor: String
});
//crear nuevo libro
const Libro = mongoose.model("Libro",libroSchema);
app.post("/libro", async (req, res) => {

    const libro = new Libro({
        titulo: req.body.titulo,
        autor: req.body.autor
    })
    try {
        await libro.save();
        res.json(libro);
    } catch (error) {
        console.error("error al guardar el libro".error);
    }
})

//traer listado de libros
app.get("/libros", async (req, res)=>{
    try {
        const libros = await Libro.find();
        res.json(libros);
    } catch (error) {
        res.status().send("error al traer los libros ",error);
    }
})

module.exports =app;

