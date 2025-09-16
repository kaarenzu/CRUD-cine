import { ObjectId } from "mongodb";
import client from "../common/db.js";
import { Pelicula } from "./pelicula.js";

// constante global
const peliculaCollection = client.db('cine-db').collection('peliculas');

// MEtodo de inserción de un nuevo registo
async function handleInsertPeliculaRequest(req, res) {
    let data = req.body
    let pelicula = Pelicula

    pelicula.nombre = data.nombre
    pelicula.genero = data.genero
    pelicula.anioEstreno = data.anioEstreno

    await peliculaCollection.insertOne(pelicula)
        .then((data) => {
            if (data === null) {
                return res.status(400).send('Error al guardar registro')

            }
            return res.status(201).send(data)
        })

        .catch((e) => { return res.status(500).send({ error: e }) })
}

// Metodo para obtener los registros de la base de datos
async function handleGetPeliculasRequest(req, res) {
    await peliculaCollection.find({}).toArray()
        .then((data) => { return res.status(200).send(data) })
        .catch((e) => { return res.status(500).send({ error: e }) })
}

// Método para obtener un registro por su ID
async function handleGetPeliculaRequest(req, res) {

    let id = req.params.id
    try {
        let oid = ObjectId.createFromHexString(id)
        await peliculaCollection.findOne({ _id: oid })
            .then((data) => {
                if (data === null) return res.status(404).send(data)

                return res.status(200).send(data)
            })
            .catch((e) => {
                return res.status(500).send({ error: e.code })
            })

    } catch (e) {
        return res.status(400).send('Id mal formado')
    }



}

// Método para actualización de un registro
async function handleUpdatePeliculaByIdRequest(req, res) {
    let id = req.params.id

    let pelicula = req.body

    try {
        let oid = ObjectId.createFromHexString(id)

        let query = { $set: pelicula }

        await peliculaCollection.updateOne({ _id: oid }, query)
            .then((data) => {
                return res.status(200).send(data)
            })
            .catch((e) => {
                return res.status(500).send({ code: e.code })
            })

    } catch (error) {
        return res.status(400).send('Id mal formado')
    }
}

//Método para eliminar registro de la base de datos

async function handleDeletePeliculaByIdRequest(req, res) {
    let id = req.params.id

    try {
        let oid = ObjectId.createFromHexString(id)

        await peliculaCollection.deleteOne({ _id: oid })
            .then((data) => { return res.status(200).send(data) })
            .catch((e) => { return res.status(500).send({ code: e.code }) })
    } catch (error) {
        return res.status(400).send('Id mal formado')
    }
}



export default {
    handleInsertPeliculaRequest,
    handleGetPeliculasRequest,
    handleGetPeliculaRequest,
    handleDeletePeliculaByIdRequest,
    handleUpdatePeliculaByIdRequest
}