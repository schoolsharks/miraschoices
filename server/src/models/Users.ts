import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  _id: Schema.Types.ObjectId;
  name: String;
  email: String;
  session: Schema.Types.ObjectId;
  answered: number;
  responses: { quesId: number; option: String }[];
  cash: number;
  loan: number;
  investments: { amount: number; returns: number }[];
  rp:number;
  sp:number;
  avgResponseTime:number;
  createdAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    session: { type: Schema.Types.ObjectId, ref: "Session" },
    answered: { type: Number, default: 0 },
    responses: [{ quesId: { type: Number }, option: { type: String } }],
    cash: { type: Number, default: 0 },
    loan: { type: Number, default: 0 },
    investments: [{ amount: { type: Number }, returns: { type: Number } }],
    rp:{type:Number,default:0},
    sp:{type:Number,default:0},
    avgResponseTime:{type:Number,default:0}
  },
  { timestamps: true }
);

export const UserModel = mongoose.model<IUser>("User", UserSchema);
