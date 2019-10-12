'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MateriaSchema = new Schema({
  nombre: {
    type: String,
    require: true
  },
  sigla: {
    type: String,
    require: true
  }
},{
  	timestamps:true
  });


module.exports = mongoose.model('Materia', MateriaSchema,'Materia');