const express = require("express");
const server = express();

const empleado={
    "primerNombre": "juan",
    "SegundoNombre": "Alberto"
};

server.get('/', function(request, response){
    response.send("Servicio get raiz");
});

server.get('/empleado', function(request, response){
    response.send(empleado);
});

server.listen( 3000,() =>{
        console.log("Hola mundo, inicio servidor");
    });