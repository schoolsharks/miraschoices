import express from "express"
import asyncHandler from "../../utils/asyncHandler"
import * as userControllers from "../../controllers/admin"

const router=express.Router()

router.get("/leaderboard",asyncHandler(userControllers.handleLeaderBoard))



export default router