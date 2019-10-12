'use strict'

// Settings

const mongoose = require('mongoose')
const config = require('./config')
const app = require('./app')

// Connecting to DB

mongoose.connect(config.db, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true 
})
  .then(db => console.log('DB connected'))
  .catch(err => console.log(err))

// Starting the server

app.listen(config.port, () => {
  console.log(`Server running on http://localhost:${config.port}`)
})
