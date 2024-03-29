import dotenv from 'dotenv'
dotenv.config()
import  express  from 'express'
import cors from 'cors';
import userRoutes from './routes/userRoutes.js'
import connectDB from './config/connectdb.js'


const app = express()
const port = process.env.PORT
const DATAVASE_URL = process.env.DATAVASE_URL

//CORS policy
app.use(cors())

// database connection
connectDB(DATAVASE_URL)

// JSON
app.use(express.json())

//Load Routes
app.use("/api/user",userRoutes)

app.listen(port, () => {
    console.log(`Server lisrening at http://localhost:${port}`)
})

