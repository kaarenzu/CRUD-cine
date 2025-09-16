import { ObjectId } from "mongodb";
import client from '../common/db.js'
import { Actor } from "./actor.js";

// constante global 
const actorCollection = client.db('cine-db').collection('actor');
const peliculaCollection = client.db("cine-db").collection("peliculas");


// Metodo para insertar registros en la base de batos

async function handleInsertActorRequest(req, res) {
    let data = req.body

    try {
        const pelicula = await peliculaCollection.findOne({ nombre: data.nombrePelicula })

        if (!pelicula) {
            return res.status(404).send('Película no encontrada')
        }

        const actor = {
            idPelicula: pelicula._id.toString(),
            nombre: data.nombre,
            edad: data.edad,
            estaRetirado: data.estaRetirado,
            premio: data.premio
        }

        const result = await actorCollection.insertOne(actor)
        return res.status(201).send(result)

    } catch (e) {
        return res.status(500).send({ e: rror.message })
    }

}

//Metodo para obtener registros de la db
async function handleGetActoresRequest(req, res) {
    await actorCollection.find({}).toArray()
        .then((data) => { return res.status(200).send(data) })
        .catch((e) => { return res.status(500).send({ error: e }) })
}

// MEtodo para obtener un registro por su id
async function handleGetActorByIdRequest(req, res) {
    let id = req.params.id
    try {
        let oid = ObjectId.createFromHexString(id)
        await actorCollection.findOne({ _id: oid })
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

// MEtodo para obtener todos los actores de una pelicula
async function handleGetActoresByPeliculaIdRequest(req, res) {
    const peliculaId = req.params.pelicula; // _id de la película desde la URL

    try {
        const oid = ObjectId.createFromHexString(peliculaId);

        await actorCollection
            .find({ idPelicula: oid.toString() }) // buscar actores que tengan ese idPelicula
            .toArray()
            .then((data) => {
                if (data.length === 0) return res.status(404).send({ mensaje: 'No se encontraron actores para esta película' });
                return res.status(200).send(data);
            })
            .catch((e) => {
                return res.status(500).send({ error: e.message });
            });
    } catch (error) {
        return res.status(400).send({ mensaje: 'Id de película mal formado' });
    }
}

export default {
    handleInsertActorRequest,
    handleGetActoresRequest,
    handleGetActorByIdRequest,
    handleGetActoresByPeliculaIdRequest
};