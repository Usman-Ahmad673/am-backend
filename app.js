const express = require('express')
const app = express()
const cookie_parser = require('cookie-parser')
const bodyParser = require('body-parser')
const cors = require('cors')

const errMiddleware = require('./error')




app.use(cors());
app.use(express.json());
app.use(cookie_parser())
app.use(bodyParser.urlencoded({ extended: true }))


//Route Imports
const userRoute = require('./userRoute')

app.use('/api',userRoute)

//MiddleWare for Error
app.use(errMiddleware)

module.exports = app