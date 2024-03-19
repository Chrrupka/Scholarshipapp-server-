import mongoose, { Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const detailsSchema = new Schema({
    applicationId: { type: mongoose.Schema.Types.ObjectId, ref: 'application', required: false, unique: true },
    specialization: { type: String, required: true },
    education_level: { type: String, required: true },
    study_system: { type: String, required: true },
    current_study_year: { type: Number, required: true },
    other_details: { type: String, required: false }
}, {
    collection: 'details'
});

detailsSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Details', detailsSchema, 'details');
