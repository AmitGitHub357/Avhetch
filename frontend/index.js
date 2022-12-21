
import express from 'express'
import connectDB from './app/config/db.js'
import dotenv from 'dotenv'
import morgan from 'morgan'
import cors from 'cors'
import path from 'path'
import userRoutes from './app/routes/userRoutes.js'
import ayurvedaRoutes from './app/routes/ayurvedaRoutes.js'
import companyRoutes from './app/routes/companyRoutes.js'
import diseaseRoutes from './app/routes/diseaseRoutes.js'
import labTestRoutes from './app/routes/labTestRoutes.js'
import medicineRoutes from './app/routes/medicineRoutes.js'
import cartRoutes from './app/routes/cartRoutes.js'
import orderRoutes from './app/routes/orderRoutes.js'
import doctorRoutes from './app/routes/doctorRoutes.js'
import blogRoutes from './app/routes/blogRoutes.js'
import newUserRoutes from './app/routes/newUserRoutes.js'
import batchRoutes from './app/routes/batchRoutes.js'
dotenv.config()
// Connecting to Mongodb
connectDB()

const app = express()

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(express.json())

app.use(cors())

app.use('/api/user', userRoutes)
app.use('/api/ayurveda', ayurvedaRoutes)
app.use('/api/company', companyRoutes)
app.use('/api/disease', diseaseRoutes)
app.use('/api/labTest',labTestRoutes)
app.use('/api/medicine',medicineRoutes)
app.use('/api/cart',cartRoutes)
app.use('/api/order',orderRoutes)
app.use('/api/doctor',doctorRoutes)
app.use('/api/blog',blogRoutes)
app.use('/api/newuser',newUserRoutes)
app.use('/api/batch',batchRoutes)
const __dirname = path.resolve()

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running....')
  })
}

//app.use(notFound)
//app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
)