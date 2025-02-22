import mongoose, { Schema, Document } from "mongoose";

export interface IActiveSession extends Document {
  isActive: boolean;
  activeSession: Schema.Types.ObjectId;
}

const ActiveSessionSchema: Schema = new Schema(
  {
    isActive: {
      type: Boolean,
      default: false,
    },
    activeSession: {
      type: Schema.Types.ObjectId,
      ref: "Sessions",
    },
  },
  { timestamps: true }
);

export const ActiveSessionModel = mongoose.model<IActiveSession>(
  "ActiveSession",
  ActiveSessionSchema
);
