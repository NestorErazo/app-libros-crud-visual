const request= require("supertest");
const app = require ("../src/app");
const mongoose = require("mongoose");


describe("Endpoint de libros", () => {

    test("deberia obtener una lista de libros",async()=>{
        const res = await request(app).get("/libros");
        
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBe(true);
    });
  test("deberia crear nuevo libro",async()=>{
    const res = await request(app).post("/libro").send({titulo:"libro prueba", autor : "libro prueba"});
    expect(res.statusCode).toEqual(200);
    expect(res.body.titulo).toEqual("libro prueba");
    });
    afterAll(async()=>{
await mongoose.connection.close();
    });
});