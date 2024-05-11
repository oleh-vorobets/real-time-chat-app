import { Document, Types } from 'mongoose';

export interface User extends Document {
  initials: string;
  email: string;
  password: string;
  rooms: Types.ObjectId[];
}
