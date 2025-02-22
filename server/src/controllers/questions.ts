import { NextFunction, Request, response, Response } from "express";
import {
  questions,
  standardLoanInterest,
} from "../data/questions";
import { UserModel } from "../models/Users";
import AppError from "../utils/appError";
import { SessionModel } from "../models/Sessions";

export const handleFetchNextQuestion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { quesId, option } = req.body;
  const userId = req.user;

  const user = await UserModel.findById(userId);

  if (!user) {
    return next(new AppError("User not found", 400));
  }

  let question;

  if (user.responses.length === 0 && (!quesId || !option)) {
    // If it is the first question
    question = questions[0];
  } else {
    let lastQuestionId = quesId;
    let lastResponse = option;

    if (!quesId || !option) {
      // If user has not send the question id or option, fetch the last response from his responses
      lastQuestionId = user.responses[user.responses?.length - 1]?.quesId;
      lastResponse = user.responses[user.responses?.length - 1]?.option;
    } else {
      // If he is sending question id and response of a question...

      const existingResponseIndex = user.responses.findIndex(
        (response) => response.quesId === quesId
      );

      
      const totalResponseTime = (Date.now() - new Date(user.createdAt).getTime()) / 1000;

      user.avgResponseTime = totalResponseTime / user.responses.length;

      if (existingResponseIndex !== -1) {
        // If already responded just update the selected choise and accordingly scores
        const existingResponse = user.responses[existingResponseIndex];

        if (existingResponse.option !== option) {
          const previousOption = questions
            .find((q) => q.id === quesId)
            ?.options.find((o) => o.option === existingResponse.option);

          const newOption = questions
            .find((q) => q.id === quesId)
            ?.options.find((o) => o.option === option);

          if (previousOption && newOption) {
            user.loan += previousOption.loan.amount - newOption.loan.amount;
            user.cash += previousOption.cash - newOption.cash;
            // for investments, we will remove the previous investment and add the new investment
            user.investments = user.investments.filter(
              (investment) => investment.amount !== previousOption.investment.amount
            ); 
            user.investments.push(newOption.investment);
            user.rp+=newOption.rp-previousOption.rp;
            user.sp+=newOption.sp-previousOption.sp;
            existingResponse.option = option;
            // Updating overall stats
            // await SessionModel.findByIdAndUpdate(
            //   user.session,
            //   {
            //     $inc: {
            //       "overallStats.trustScore":
            //         newOption.trustShift - previousOption.trustShift,
            //       "overallStats.timeInHand":
            //         previousOption.timeCost - newOption.timeCost,
            //       // Not updating overall colleagues time in stats for now (also not updating individual and optimial choices also)
            //     },
            //   },
            //   { new: true }
            // );
          }
        }
      } else {
        // If not responded earlier
        const newOption = questions
          .find((q) => q.id === quesId)
          ?.options.find((o) => o.option === option);

        if(user.loan<0){
          user.loan *= (1 + standardLoanInterest);
        }
        
        user.investments = user.investments.map((investment) => ({
          amount: investment.amount * (1 + investment.returns),
          returns: investment.returns,
        }));

        if (newOption) {
          user.responses.push({ quesId, option });
          user.loan += newOption.loan.amount;
          user.cash += newOption.cash;
          user.investments.push(newOption.investment);
          user.rp+=newOption.rp;
          user.sp+=newOption.sp;
        }
      }
    }

    // Determining the next question to send
    question = questions.find((q) => q.id === parseInt(lastQuestionId) + 1);
  }



  if (!question) {
    await user.save();
    return res.status(200).json({
      success: true,
      data: {
        message: "No more questions available",
        gameStatus: "COMPLETED",
      },
    });
  }

  const nextQuestion = {
    quesId: question.id,
    question: question.question,
    options: question.options.map((option) => ({
      option: option.option,
      optionText: option.optionText,
    })),
  };

  await user.save();

  res.status(200).json({
    success: true,
    data: {
      nextQuestion,
      gameStatus: "RUNNING",
      loan: user.loan,
      cash: user.cash,
      answered:user.responses.length,
      totalQuestions:questions.length,
      investments: user.investments.reduce((a, b) => a + b.amount, 0),
    },
  });
};

export const handleGameCompleted = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.user;

  const user = await UserModel.findById(userId);

  if (!user) {
    return next(new AppError("User not found", 400));
  }

  if (user.responses.length < questions.length) {
    return next(new AppError("Game not completed yet", 400));
  }

  const session = await SessionModel.findById(user.session);
  if (!session) {
    return next(new AppError("Session not found", 400));
  }

  let archeType;
  if (user.rp >= 1.5*user.sp) {
    archeType = "Risk-Taker";
  } else if (user.sp>=1.5*user.rp) {
    archeType = "Security Seeker";
  } else{
    archeType = " Balanced Thinker";
  }

  const userNetWorth =
  user.cash +
  user.loan +
  user.investments.reduce((sum, investment) => sum + investment.amount, 0);

  let userRank =
  (await UserModel.countDocuments({
    session: user.session,
    $expr: {
      $gt: [
        {
          $add: [
            "$cash",
            "$loan",
            { $ifNull: [{ $sum: "$investments.amount" }, 0] }, 
          ],
        },
        userNetWorth,
      ],
    },
  })) + 1;

  const analytics = {
    name:user.name,
    cash: user.cash,
    loan: user.loan,
    totalPlayers:session.players,
    investments: user.investments.reduce((a, b) => a + b.amount, 0),
    netWorth: user.cash + user.loan + user.investments.reduce((a, b) => a + b.returns, 0),
    archeType,
    userRank,
  };
  res.status(200).json({ success: true, data: { analytics } });
};


export const handleLeaderBoard = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.user;

  try {
    const user = await UserModel.findById(userId);

    if (!user) {
      return next(new AppError("User not found", 400));
    }

    const sessionId = user.session;

    const session = await SessionModel.findById(user.session);
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
          investments: 1,
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
      { $limit: 3 }
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
        archetypePercentages
      }
    });
  } catch (err) {
    next(new AppError("Failed to fetch leaderboard", 500));
  }
};