import { Schema, model } from 'mongoose';

const ProfileSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  age: {
    type: String,
    required: true,
    min: 12,
    max: 100,
  },
  gender: {
    type: String,
    required: true,
    enum: ['Male, Female'],
  },
  bio: {
    drink: {
      type: Boolean,
      required: true,
    },
    smoke: {
      type: Boolean,
      required: true,
    },
    workout: {
      type: String,
      enum: ['Never', 'Sometimes', 'Often', 'Everyday'],
      default: 'Sometimes',
    },
    relationType: {
      type: String,
      enum: ['Casual', 'Serious', 'Friendship', 'Open', 'Not Sure'],
      default: 'Not Sure',
    },
    education: {
      type: String,
      enum: ['High School', 'Bachelors', 'Masters', 'PhD', 'Other'],
      default: 'Other',
    },
    interests: [
      {
        type: String,
        trim: true,
      }
    ],
    photos: [
      {
        type: String,
        required: true,
      }
    ],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

export default model('ProfileSchema', ProfileSchema);
