const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const subTaskSchema = Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        index: true,
        unique: true,
        uniqueCaseInsensitive: true
    },
    description: {
        type: String
    },
    is_completed: {
        type: Boolean,
        default: false
    },
    priority: {
        type: Number,
        min: 1,
        max: 5
    },
    due_date: {
        type: Date
    },
    task: {
        type: Schema.Types.ObjectId,
        ref: 'Task'
    }

})
subTaskSchema.plugin(uniqueValidator)
module.exports = mongoose.model('SubTask', subTaskSchema)