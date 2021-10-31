const express = require("express");
const server = express();
const bodyParcer = require("body-parser");
const db = require("./conexion/db");
db.initialize(function (dbCollection) {
    server.get('/', function (request, response) {
        console.log(request.params);
        console.log(request);
        dbCollection.find().toArray((error, result) => {
            if (error) {
                throw error;
            } else {
                response.json(result);
            }
        }

        );
    });

    server.get('/empleado/:id', function (request, response) {
        const idObj = request.params.id;
        const filtro = {
            "numeroDocumento": idObj
        };
        dbCollection.findOne(filtro, (error, result) => {
            if (error) {
                throw error;
            } else {
                response.json(result);
            }
        });

    });

    server.post("/empleado", function (request, response) {
        const empleadoTmp=request.body;
        dbCollection.insertOne(empleadoTmp,(error, result)=>{
            if (error) {
                throw error;
            } else {
                const filtro = {
                    "numeroDocumento": empleadoTmp.numeroDocumento
                };
                dbCollection.findOne(filtro, (error, result) => {
                    if (error) {
                        throw error;
                    } else {
                        response.json(result);
                    }
                });
            }
        });
        //response.send(empleado);
    });

    server.put("/empleado/:id", function (request, response) {
        ;

        if(request.params.id===
            request.body.numeroDocumento){
                const filtro = {
                    "numeroDocumento": request.body.numeroDocumento
                };
                dbCollection.updateOne(filtro,{$set:request.body},
                    (error, result)=>{
                        if(error){
                            throw error;
                        }else{
                            dbCollection.findOne(filtro, (error, result) => {
                                if (error) {
                                    throw error;
                                } else {
                                    response.json(result);
                                }
                            });
                        }
                    });
        }
    

    });

    server.delete("/empleado/:id", function (request, response) {
        
        const filtro = {
            "numeroDocumento": request.params.id
        };
        dbCollection.deleteOne(filtro,(error, result)=>{
            if(error){
                throw error;
            }else{
                response.send("Empleado Eliminado");
            }
        });

    });
}, function (error) {
    throw error
});
server.use(bodyParcer.json());

server.listen(3000, () => {
    console.log("Hola mundo, inicio servidor");
});