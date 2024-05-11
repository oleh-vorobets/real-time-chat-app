import { Types } from 'mongoose';

export interface Room extends Document {
  name: string;
  messages: Types.ObjectId[];
  users: Types.ObjectId[];
}
