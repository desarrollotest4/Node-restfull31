const mongoDb = require("mongodb");
const MongoClient = mongoDb.MongoClient;

const dbConnection="mongodb+srv://prueba:prueba@desarrollo.6juat.mongodb.net/test";
const dbName ="EmpleadosBD";
const collectionName="Empleado";

function initialize(successCallback, 
    failureCallback){
    MongoClient.connect(dbConnection,
        function(error, dbIntance){
            if(error){
                console.log("[MongoDb] Error"+error);
                //failureCallback(error);
            }else{
                const dbObject =dbIntance.db(dbName);
                const dbCollection = dbObject.collection(collectionName);
                console.log("[MongoDb] success");
                successCallback(dbCollection);
            }
    });
}
module.exports={initialize}
