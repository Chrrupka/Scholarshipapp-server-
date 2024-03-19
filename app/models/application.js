import mongoose, { Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';


const applicationSchema = new Schema({
    type: { type: String, required: true },
    status: { type: String, required: true }
}, {
    collection: 'application',
    timestamps: true
});
applicationSchema.plugin(uniqueValidator);

module.exports=  mongoose.model('Application', applicationSchema, 'application');
