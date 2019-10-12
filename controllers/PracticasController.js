
'use strict'
const Practica = require('../models/Practica')
const Materia = require('../models/Materia')


let getPractica = async(req,res)=>{
	let materia =() =>(Materia.findOne({"_id":req.params.pId}))
	let practicas=()=>(Practica.find({materia_id:{$in:req.params.pId}},{materia_id:0}))	
	let practicas_count=()=>practicas().count()
	try{
		res.status(200).send({
			materia:await materia(),
			practicas:await practicas(),
			practicas_count:await practicas_count()
		})
		}
	catch(e){
		if (e) {
		    return res.status(500).send({
		      message: `Error al realizar la petición: ${e}`
		    })
	 	 }
	 	if (!materia() || !practicas()) {
	    return res.status(404).send({
	      message: `No encontrado`
	    })	
		}
	}
}

let savePractica = async(req, res)=> {
     
     /*const practica = new Practica(req.body)
     const savePractica= await practica.save()
     try{
     	res.status(200).send({message:'Añadido correctamente'})
     }
     catch(e){
     	if(e) res.status(500).send({message:`Error al guardar en la BD ${e}`})
     }
    */
    let practica = new Practica()
    practica.number_practice=req.body.number_practice
    practica.title =  req.body.title
    practica.materia_id=req.body.materia_id
   practica.save((err, practicaStored)=>{
      console.log(req.practicaStored)
        if(err) res.status(500).send({message:`Error al guardar en la BD ${err}`})
		res.status(200).send({practica: practicaStored})
    })
};
let deletePractica =async(req, res)=> {
	    let prueba= await Practica.findById(req.params.pId)
		let updatePractica= await Practica.updateMany({materia_id:{$in:prueba.materia_id},
			number_practice:{$gt:prueba.number_practice}},
			{ $inc: { number_practice: -1 }},{multi:true})	
	    const deletepra = await Practica.remove({ _id: req.params.pId })
		try{
			res.status(200).send({message: "El producto ha sido eliminado"})
		}
		catch(e){
			if(e) {
				res.status(500).send({message: `Error al borrar el producto:${e}`})
				}
		}	
} 
module.exports={
	getPractica,
	savePractica,
	deletePractica

}