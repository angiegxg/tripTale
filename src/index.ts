import express, {Request,Response} from 'express'

import userRoutes from './routes/userRoutes'
import tripTaleRoutes from './routes/tripTaleRoutes'
import placeRoutes from './routes/placeRoutes'
const app = express()
app.use(express.json())

const PORT=3000

app.get('/ping', (_req:Request, res:Response) => {
    console.log('someone pinged here!!!')
    res.send('pong')
} )
app.use('/user', userRoutes);
app.use('/triptale', tripTaleRoutes);
app.use('/place', placeRoutes);


app.listen(PORT,()=> {
    console.log(`server listening on ${PORT}`)
})
