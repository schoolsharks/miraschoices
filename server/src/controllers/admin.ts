import { NextFunction, Request, Response } from "express";
import { ActiveSessionModel } from "../models/ActiveSession";
import AppError from "../utils/appError";
import { SessionModel } from "../models/Sessions";
import {
  questions,
} from "../data/questions";
import { UserModel } from "../models/Users";



export const handleLeaderBoard = async (req: Request, res: Response, next: NextFunction) => {

  try {
    const activeSession=await ActiveSessionModel.findOne();
    if(!activeSession || !activeSession.activeSession){
      return next(new AppError("Active Session module not found", 404));
    }

    if(!activeSession.isActive){
      return next(new AppError("No Session Active", 404));
    }


    const sessionId = activeSession.activeSession;

    const session = await SessionModel.findById(sessionId);
    if (!session) {
      return next(new AppError("Session not found", 400));
    }


    const topUsers = await UserModel.aggregate([
      { $match: { session:sessionId} },
      {
        $project: {
          name: 1,
          cash: 1,
          loan: 1,
          avgResponseTime:1,
          investments: { $sum: "$investments.amount" },
          netWorth: {
            $add: [
              "$cash",
              "$loan",
              { $sum: "$investments.amount" }
            ]
          }
        }
      },
      { $sort: { netWorth: -1 } },
      { $limit: 10 }
    ]);


    const archetypeCounts = await UserModel.aggregate([
      { $match: { session:sessionId } },
      {
        $group: {
          _id: {
            $cond: [
              { $gte: ["$rp", { $multiply: ["$sp", 1.5] }] },
              "Risk-Taker",
              {
                $cond: [
                  { $gte: ["$sp", { $multiply: ["$rp", 1.5] }] },
                  "Security Seeker",
                  "Balanced Thinker"
                ]
              }
            ]
          },
          count: { $sum: 1 }
        }
      }
    ]);

    const totalPlayers=session.players;


    const archetypePercentages = archetypeCounts.map(archetype => ({
      archetype: archetype._id,
      percentage: (archetype.count / totalPlayers) * 100
    }));

    res.status(200).json({
      success: true,
      data: {
        topUsers,
        totalPlayers:session.players,
        archetypePercentages,
      }
    });
  } catch (err) {
    next(new AppError("Failed to fetch leaderboard", 500));
  }
};



export const resetSession = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const activeSession = await ActiveSessionModel.findOne();

  if (!activeSession) {
    return next(new AppError("Active Session module not found", 404));
  }
  const newSession = await SessionModel.create({});

  activeSession.isActive = true;
  activeSession.activeSession=newSession._id

  await activeSession.save()

  return res.status(200).json({message:"Session Reset Successful"})
};
