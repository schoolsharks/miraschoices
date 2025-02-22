import express from "express"
import asyncHandler from "../../utils/asyncHandler"
import { authenticate } from "../../middlewares/authenticate"
import * as userControllers from "../../controllers/users"
import * as questionsControllers from "../../controllers/questions"

const router=express.Router()

// router.get("/getUser",authenticate,authorize[Roles.USER],asyncHandler(authControllers.login))

router.post("/create",asyncHandler(userControllers.handleCreateUser))

// Protected
router.get("/getUser",authenticate,asyncHandler(userControllers.handleFetchUser))
router.get("/reset",authenticate,asyncHandler(userControllers.handleReset))

router.post("/question",authenticate,asyncHandler(questionsControllers.handleFetchNextQuestion))
router.get("/completed",authenticate,asyncHandler(questionsControllers.handleGameCompleted))

// router.get("/leaderboard",authenticate,asyncHandler(questionsControllers.handleLeaderBoard))


export default router