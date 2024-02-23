import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compress from 'compression'
import cors from 'cors'
import helmet from 'helmet'
import Template from './../template.js'
//import userRoutes from './routes/user.routes.js'
import productRoutes from './routes/product.routes.js'

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));  
app.use(cookieParser())
app.use(compress())
app.use(helmet())
app.use(cors())  
app.get('/', (req, res) => {
    res.status(200).send(Template()) 
    })
//app.use('/', userRoutes)   
app.use('/', productRoutes)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

export default app
