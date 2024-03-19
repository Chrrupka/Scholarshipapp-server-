import mongoose, { Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const attachmentSchema = new Schema({
    applicationId: { type: mongoose.Schema.Types.ObjectId, ref: 'application', required: false, unique: true },
    file_name: { type: String, required: true },
    file_data: { type: Buffer, required: true }
}, {
    collection: 'attachment',
    timestamps: true
});

attachmentSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Attachment', attachmentSchema, 'attachment');
