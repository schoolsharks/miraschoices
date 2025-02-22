import mongoose, { Schema, Document } from "mongoose";

export interface ISession extends Document {
  _id: mongoose.Schema.Types.ObjectId;
  players: number;
  overallStats: {
    trustScore: number;
    timeInHand: number;
    colleaguesTime: number;
  };
  choicesDistribution: {
    optimal: number;
    subOptimal: number;
    acceptable: number;
  };
}

const SessionSchema: Schema = new Schema(
  {
    players: {
      type: Number,
      default: 0,
    },
    overallStats: {
      trustScore: {
        type: Number,
        default: 0,
      },
      timeInHand: {
        type: Number,
        default: 0,
      },
      colleaguesTime: {
        type: Number,
        default: 0,
      },
    },
    choicesDistribution: {
      optimal: { type: Number, default: 0 },
      subOptimal: { type: Number, default: 0 },
      acceptable: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

export const SessionModel = mongoose.model<ISession>("Session", SessionSchema);
