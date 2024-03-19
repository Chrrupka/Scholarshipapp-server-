import mongoose, {Schema} from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const passwordSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true, unique: true },
    password: { type: String, required: true }
  },
  {
    collection: 'password'
  });

passwordSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Password', passwordSchema, 'password');
