import mongoose from 'mongoose';
const { Schema } = mongoose;

const CalorieSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    calories: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Calorie = mongoose.model('CalorieJournal', CalorieSchema);
export default Calorie;
