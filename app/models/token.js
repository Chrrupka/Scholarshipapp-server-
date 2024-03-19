import mongoose, {Schema} from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const tokenTypeEnum = {
  authorization: 'authorization'
};

const tokenTypes = [tokenTypeEnum.authorization];

const tokenSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    createDate: { type: Number, required: true },
    type: { type: String, enum: tokenTypes, required: true },
    value: { type: String, required: true }
  },
  {
    collection: 'token'
  });

tokenSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Token', tokenSchema, 'token');
