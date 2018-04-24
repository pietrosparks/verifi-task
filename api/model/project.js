const mongoose = require('mongoose');
const Schema = mongoose.Schema; 
const uniqueValidator = require('mongoose-unique-validator');

const projectSchema = Schema({
    name: {
        type: String, 
        required: true,
        unique: true,
        trim: true,
        uniqueCaseInsensitive: true
    },
    description:{
        type: String, 
    }, 
    is_completed:{
        type: Boolean, 
        default: false
    },
    tasks:[],
},{
    timestamps: true
})

projectSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Project', projectSchema)

