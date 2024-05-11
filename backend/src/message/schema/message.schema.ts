import { Schema } from 'mongoose';

export const messageSchema = new Schema({
  message: { type: String, required: true },
  created_at: {
    type: Date,
    default: Date.now(),
    immutable: false,
    select: false,
  },
  senderId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  roomId: {
    type: Schema.Types.ObjectId,
    ref: 'Room',
    required: true,
  },
});
