import { Schema } from 'mongoose';

export const roomSchema = new Schema({
  name: { type: String },
  messages: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Message',
      required: true,
    },
  ],
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  ],
});
