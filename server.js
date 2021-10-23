require('dotenv').config()
const express = require('express')
const app = express()

// require middleware
const bodyParser = require('body-parser')
const morgan = require('morgan')

// require routes
const userRouter = require('./routes/user')
const boardRouter = require('./routes/board')
const commendRouter = require('./routes/commend')

// require mongodb
const connectDB = require('./config/database')
connectDB()

// use middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : false}))

app.use(morgan('dev'))

// use routes
app.use('/user', userRouter)
app.use('/board', boardRouter)
app.use('/commend', commendRouter)

const PORT = process.env.PORT || 7000

app.listen(PORT, console.log("connected server..."))