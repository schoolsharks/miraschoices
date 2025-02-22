import express from "express"
import asyncHandler from "../../utils/asyncHandler"
import * as adminControllers from "../../controllers/admin"
import { authenticate } from "../../middlewares/authenticate"

const router=express.Router()

router.post("/reset-session",authenticate,asyncHandler(adminControllers.resetSession))



export default router