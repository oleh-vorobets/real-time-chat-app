import * as bcrypt from 'bcrypt';
import { NextFunction } from 'express';
import { Schema } from 'mongoose';

export const userSchema = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  initials: { type: String, required: true },
  rooms: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Room',
      validate: {
        validator: function (v: any) {
          return v != null;
        },
        message: () => `Field can not be empty!`,
      },
    },
  ],
});

userSchema.pre('save', async function (next: NextFunction) {
  try {
    if (!this.isModified('password')) {
      return next();
    }
    const hashed = await bcrypt.hash(this['password'], 10);
    this['password'] = hashed;
    return next();
  } catch (err) {
    return next(err);
  }
});
