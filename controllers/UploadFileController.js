'use strict'

const path=require('path')
const File=require('../models/File')
const multer=require('multer')


//--------------configuracion de multer para que reciba archivos----------------------
    const storage = multer.diskStorage({
        destination: "./public/file",
        filename:function(req, file, cb){
            var extencionArchivo=path.extname(file.originalname)   
            console.log(extencionArchivo)
            cb(null, "FILE__"+Date.now()+extencionArchivo) 
        }
    })

    var upload = multer({
        storage:storage
    }).single("file");



//function of multer
function uploadFile(req,res){
       
        upload(req, res, (err) => {
            // console.log(req.file)
           if(err){
               res.status(500).json({
                   "message":"No se pude guadar el archivo"
               })
           }else{
               var ruta = req.file.path.substr(6, req.file.path.length);   //estraea la ruta, quita public   y solo queda \video\VIDEO_1558896752374.MP4
               console.log(ruta)
    
               var filedata = {
                   originalname:req.file.originalname,
                   filename: req.file.filename,
                   Physicalpath: req.file.path,
                   relativepath: 'http://localhost:7777',
                   linkfile:'http://localhost:7777'+ruta,
                   size: req.file.size
               }
    
               //guarda el archivo el la base de datos y reorna la id del archivo guardao
               var file=new File(filedata);
               file.save().then((infofile)=>{
                   console.log(infofile);
                   console.log(infofile._id);
                   console.log(infofile.linkfile)
                   
               })
               
           };
           
           res.status(200).send(file)
           
        })

}

function galeria(req,res){
    File.find({}, (err, file) => {
        if (err) {
          return res.status(500).send({
            message: `Error performing request: ${err}`
          })
        }
        if (!file) {
          return res.status(404).send({
            message: `There aren't guides.`
          })
        }
        res.status(200).send({ file })
      })
}


function deletefile (req, res) {
    let pId = req.params.pId
  
    File.findById(pId, (err, file)=>{
      if(err) res.status(500).send({message: `Error al borrar el file:${err}`})
  
      file.remove(err => {
        if(err) res.status(500).send({message: `Error al borrar el file:${err}`})
        res.status(200).send({message: "El archivos ha sido eliminado"})
      })
    })
  } 

module.exports={
    uploadFile,
    galeria,
    deletefile
}