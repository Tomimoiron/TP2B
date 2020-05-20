const mongoclient = require('mongodb').MongoClient;
const chalk = require('chalk');

const uri = "mongodb+srv://admin:betp2@cluster0-zdy6w.mongodb.net/test?retryWrites=true&w=majority";
const client = new mongoclient(uri, {useNewUrlParser:true, useUnifiedTopology:true});
/*
client.connect((err, result) =>{
    if(!err){
        console.log(chalk.blue('Cliente conectado'));
        let collection = result.db("sample_betp2").collection("inventors");
        collection.find().limit(20).toArray((err, result) => {
            console.log(result);
            // insertar un nuevo inventor
            const nuevoInventor = {
                first: "Pedro",
                last: "Perez",
                year: 1987
            }

            collection.insertOne(nuevoInventor, (error, result) => {
                if(!error){
                    console.log(chalk.yellow("Inventor insertado correctamente"));
                    //nuevoInventor.year = 2000;
                    // update de un campo
                    collection.updateOne({last: "Perez"}, {$set: {year: 2000}} , (err, result) => {
                        console.log(chalk.yellow("Inventor actualizado correctamente"));
                        collection.deleteOne({last: "Perez"}, (err, result) => {
                            console.log(chalk.yellow("Inventor eliminado correctamente"));
                        });
                    });
                }
            });
        });
    } else {
        console.log(chalk.red(err));
    }
});
*/

const inventor = {
    first: "Martin",
    last: "aaaaaaaa",
    year: 1109
}

client.connect()
    .then (function conectar(){
        return new Promise (resolve =>{
            console.log('BD Conectada');
            let collectionInventors = client.db('betp2_desafio').collection('inventors');
            resolve('Llego a conectarse')
        })})

    .then(function insertar(){
        return new Promise (async resolve =>{
            let collectionInventors = client.db('betp2_desafio').collection('inventors');
            console.log('Se intenta insertar un usuario');
            await collectionInventors.insertOne(inventor);
            console.log('Usuario insertado');
            resolve('Llego a insertar un inventor');
        })})


    .then (function encontrar(){
        return new Promise (async function (resolve,reject) {
            console.log('Se intenta buscar un usuario');
            let collectionInventors = client.db('betp2_desafio').collection('inventors');
            var user = await collectionInventors.findOne({first:"Martin"});
            console.log('La funcion devolvio el siguiente valor: ', user);
            if(user){
                resolve('Se encontro el usuario');            
            }else{
                reject('El usuario no existe y no quiero continuar con la ejecucion');
            }
        })})  
        
        
    .then(function modificar(){
        return new Promise (async resolve =>{
            console.log('Se intenta modificar un usuario');
            let collectionInventors = client.db('betp2_desafio').collection('inventors');
            await collectionInventors.updateOne({first: "Martin"},{$set: {first: "Perico"}});
            console.log('Usuario modificado');
            resolve('Llego a modificar el usuario');
        })})


    .then(function eliminar(){
        return new Promise (async resolve=>{
            console.log('Se intenta eliminar un usuario');
            let collectionInventors = client.db('betp2_desafio').collection('inventors');
            await collectionInventors.deleteOne({first: "Esteban"});
            console.log('Usuario Eliminado');
            client.close();
            console.log('Se cerro la conexion con la BD');
            console.log('Todas las funciones se ejecutaron con exito');
        })})     


    .catch(error=>{
        console.log('OCURRIO UN ERROR: ', error);
        console.log('Se cerro la conexion con la BD');
        client.close();
    })