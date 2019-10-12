'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const routes = require('./routes')
const multer = require('multer')
const path = require('path')
//const uuid = require('uuid/v4');
//const { format } = require('timeago.js');
const app = express()
var cors = require('cors')
// Settings
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(morgan('dev'))
app.use('/api', routes)
 
//middlewar multer subir archivos

const storage = multer.diskStorage({
    destination: "./public/uploads",
    filename:function(req,file,cb){
        var extencionArchivo=path.extname(file.originalname)

        console.log(extencionArchivo)
        cb(null, "ARCHCOMPR_"+Date.now()+extencionArchivo)
    }
})

///

app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));



app.use(require('./routes/index'));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, 'public')));

module.exports = app

