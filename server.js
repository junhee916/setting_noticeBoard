require('dotenv').config()
const express = require('express')
const app = express()

// require middleware
const bodyParser = require('body-parser')
const morgan = require('morgan')
const path = require('path')

// require routes
const userRouter = require('./routes/user')
const boardRouter = require('./routes/board')
const commendRouter = require('./routes/commend')

// require mongodb
const connectDB = require('./config/database')
connectDB()

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/controllers', express.static(__dirname + '/controllers'))
app.use('/publics', express.static(__dirname + '/publics'))

// use middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : false}))

app.use(morgan('dev'))

// use routes
app.use('/user', userRouter)
app.use('/board', boardRouter)
app.use('/commend', commendRouter)

// get ejs 
app.get('/login', (req, res) => {

    res.render('login')
})

app.get('/signup', (req, res) => {

    res.render('signup')
})

app.get('/index', (req, res) => {

    res.render('index')
})

app.get('/show', (req, res) => {

    res.render('show')
})


const PORT = process.env.PORT || 7000

app.listen(PORT, console.log("connected server..."))