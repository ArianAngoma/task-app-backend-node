const {Schema, model} = require('mongoose');

/* Importaciones propias */
const Task = require('./Task');

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

/* Eliminar documentos relacionados */
ProjectSchema.pre('findOneAndDelete', async function (next) {
    const {_id} = this.getFilter();
    // console.log(_id);
    await Task.deleteMany({project: _id}).exec();
    next();
});

/*ProjectSchema.post('findOneAndDelete', async function (doc) {
    // console.log(doc._id);
    await Task.deleteMany({project: doc._id}).exec();
});*/

module.exports = model('Project', ProjectSchema);