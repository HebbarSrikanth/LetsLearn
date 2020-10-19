//Import the Express module using require keyword
import express from 'express'
import dotenv from 'dotenv'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
dotenv.config()

//Importing the Route files
import productRoute from './routes/productRouter.js'

//Importing the DB connect files and initiating the connection
import dbConnect from './config/db.js'
dbConnect()

const app = express()
const PORT = process.env.PORT || 5000
const environment = process.env.NODE_ENV
app.listen(PORT, console.log(`Server is running in ${environment} mode in the port ${PORT}`.yellow.bold))

//Middleware Route for products
//Note : In this next is not use as response will end the cycle that will be sent in Product router
app.use('/api/products', productRoute)

//Not Found Error
app.use(notFound)
//Error handling 
app.use(errorHandler)