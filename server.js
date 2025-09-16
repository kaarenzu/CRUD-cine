import express, { urlencoded } from 'express'
import cors from 'cors'
import client from './src/common/db.js'
import peliculaRoutes from './src/pelicula/routes.js'
import ActorRoutes from './src/actor/routes.js'


const PORTS = 3000 || 4000;
const app = express();

// Configuración de middleware
app.use(express.json())
app.use(urlencoded({ extended: true }))
app.use(cors())

// Configuración de ruta por defecto
app.get('/', (req, res) => { return res.status(200).send('Bienvenido al cine Iplacex') })
app.use('/api', peliculaRoutes)
app.use('/api', ActorRoutes)

await client.connect()
    .then(() => {
        console.log("Conectado al cluster")
        app.listen(PORTS, () => { console.log(`Servidor corriendo en http://localhost:${PORTS}`) })


    })
    .catch(() => {
        console.log('Ha ocurrido un error al coenctar al cluster de Atlas')

    })


