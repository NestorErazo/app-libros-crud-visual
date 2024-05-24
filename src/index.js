const app= require("./app");

const PORT= process.env.PORT ||3000;
 app.listen(PORT,() => {
    console.log("servidor corriendo en el puerto http://localhost:3000/");
    }
 )

