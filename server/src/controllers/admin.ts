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
    
    const activeSession = await ActiveSessionModel.findOne({}, "activeSession isActive").lean();
    if (!activeSession?.activeSession) {
      return next(new AppError("Active Session module not found", 404));
    }
    if (!activeSession.isActive) {
      return next(new AppError("No Session Active", 404));
    }

    const sessionId = activeSession.activeSession;

    
    const session = await SessionModel.findById(sessionId, "players").lean();
    if (!session) {
      return next(new AppError("Session not found", 400));
    }
    const totalPlayers = session.players || 0;

    
    const [leaderboardData] = await UserModel.aggregate([
      { $match: { session: sessionId } },
      {
        $facet: {
          
          topUsers: [
            {
              $project: {
                name: 1,
                cash: 1,
                loan: 1,
                avgResponseTime: 1,
                investments: { $sum: "$investments.amount" },
                netWorth: {
                  $add: ["$cash", "$loan", { $sum: "$investments.amount" }]
                }
              }
            },
            { $sort: { netWorth: -1 } },
            { $limit: 10 }
          ],

          
          archetypeCounts: [
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
          ],

          
          gameCompletionData: [
            {
              $group: {
                _id: null,
                totalCompleted: {
                  $sum: { $cond: [{ $eq: [{ $size: "$responses" }, questions.length] }, 1, 0] }
                },
                totalUsers: { $sum: 1 }
              }
            }
          ]
        }
      }
    ]);

    
    const topUsers = leaderboardData.topUsers;
    const archetypeCounts = leaderboardData.archetypeCounts;
    const gameCompletionData = leaderboardData.gameCompletionData[0] || { totalCompleted: 0, totalUsers: totalPlayers };

    
    const archetypePercentages = archetypeCounts.map((archetype:{_id:string,count:number}) => ({
      archetype: archetype._id,
      percentage: (archetype.count / totalPlayers) * 100
    }));

    
    const percentageGameCompletion = totalPlayers
      ? (gameCompletionData.totalCompleted / gameCompletionData.totalUsers) * 100
      : 0;

    
    res.status(200).json({
      success: true,
      data: {
        topUsers,
        totalPlayers,
        archetypePercentages,
        percentageGameCompletion
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
