import express from 'express'
import { connectDb } from './db/index.js'
import dotenv from 'dotenv'
import studentRouter from './routes/student.route.js'
import cors from 'cors'

dotenv.config({ path: './.env' })

const app = express()
const port = process.env.PORT || 4000


app.use(cors({
    origin: "*",
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}))
app.use(express.json())
app.use('/api/student', studentRouter)

app.use('/', (req,res) => {
    res.send('Welcome its Working Salahudin')
})

connectDb()
    .then(
        app.listen(port, () => {
            console.log(`Running on ${port}`)
        })
    )
    .catch((error) => {
        console.log(error)
    })