const {Schema, model} = require('mongoose');

const TaskSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: Boolean,
        default: false
    },
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    created: {
        type: Date,
        default: Date.now()
    }
});

TaskSchema.methods.toJSON = function () {
    const {__v, _id, ...task} = this.toObject();
    task.uid = _id;
    return task;
}

module.exports = model('Task', TaskSchema);