import { Schema, model, Types } from 'mongoose';

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  projects: [{ type: Types.ObjectId, ref: 'Project' }],
});

export default model('User', UserSchema);
