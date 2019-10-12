'use strict'

const express = require('express')
const guideCtrl = require('../controllers/GuiaController')
const practicaCtrl=require('../controllers/PracticasController')
const UploadFile=require('../controllers/UploadFileController')
const Galeria = require('../controllers/UploadFileController')
const router = express.Router()

// Routes

router.get('/materia', guideCtrl.getMateria)
router.get('/getPractica/:pId',practicaCtrl.getPractica)
router.post('/postPractica', practicaCtrl.savePractica)
router.delete('/deletePractica/:pId', practicaCtrl.deletePractica)



//router.get('/practica', guideCtrl.getPractica)
//router.get('/practica/:pId', guideCtrl.getPracticaId)//para mostrara una sola
//router.post('/practica', guideCtrl.savePractica)
//router.put('/practica/:pId', guideCtrl.updatePractica)
//
//////////
//router.post('/materia', guideCtrl.saveMateria)
/////////
//router.post('/subirArchivo',UploadFile.uploadFile)
//router.get('/subirArchivo',Galeria.galeria)
//router.delete('/subirArchivo/:pId', Galeria.deletefile)


module.exports = router
