import mongoose, { Document, Schema } from 'mongoose';

export interface IErrorLog extends Document {
  message: string;
  stack?: string;
  route?: string;
  method?: string;
  userId?: mongoose.Types.ObjectId;
  timestamp: Date;
}

const ErrorLogSchema = new Schema<IErrorLog>(
  {
    message: {
      type: String,
      required: true,
    },
    stack: {
      type: String,
    },
    route: {
      type: String,
    },
    method: {
      type: String,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IErrorLog>('ErrorLog', ErrorLogSchema);

