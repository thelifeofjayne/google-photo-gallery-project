const express = require('express')
const mongoose = require('mongoose')
const cookies = require('cookie-parser')
const path = require('path')

mongoose.set('useNewUrlParser', true)
mongoose.set('useCreateIndex', true)
mongoose.set('useUnifiedTopology', true)

require('dotenv').config()

const app = express()
const port = process.env.PORT || 8080

app.use(express.json())
app.use(cookies())

const uri = process.env.ATLAS_URI
mongoose.connect(uri)
const connection = mongoose.connection
connection.once('open', () => {
	console.log('MongoDB database connection establised successfully')
})

const UserRouter = require('./router/user')

app.use('/user', UserRouter)

app.get('/googlea6193692145ff74a.html', (req, res) => {
	res.sendFile(path.join(__dirname + '/client3/build/googlea6193692145ff74a.html'))
})

app.use(express.static(path.join(__dirname, 'client3/build')))

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname + '/client3/build/index.html'))
})

app.listen(port, () => {
	console.log(`Server is running on port: ${port}`)
})
