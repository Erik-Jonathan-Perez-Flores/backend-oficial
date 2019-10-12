'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PracticaSchema = Schema({
    number_practice: {
      type: Number,
      require: true
    },
    title: {
      type: String,
      require: true
    },
    materia_id:{
      type:String
    }
},
{timestamps: { createdAt: true, 
               updatedAt: true 
             }
});

module.exports = mongoose.model('Practica', PracticaSchema,'Practica');