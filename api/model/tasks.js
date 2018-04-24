const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const taskSchema = Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        index:{
            unique: true
        },
        uniqueCaseInsensitive: true
        
    },
    description: {
        type: String,
    },
    is_completed: {
        type: Boolean,
        default: false
    },
    subtasks: [],
    due_date: {
        type: Date
    },
    priority: {
        type: Number,
        min: 1,
        max: 5
    },
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project'
    }
}, {
    timestamps: true
})

taskSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Task', taskSchema);