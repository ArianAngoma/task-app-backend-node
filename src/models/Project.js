const {Schema, model} = require('mongoose');

const ProjectSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    created: {
        type: Date,
        default: Date.now()
    }
});

ProjectSchema.methods.toJSON = function () {
    const {__v, _id, ...project} = this.toObject();
    project.uid = _id;
    return project;
}

module.exports = model('Project', ProjectSchema);