import { RequestHandler } from "express";
import { verifyAccessToken } from "../utils/jwtUtils";
import AppError from "../utils/appError";


export const authenticate: RequestHandler = (req, res, next) => {
  const token =
    req.cookies?.accessToken ||
    (req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
      ? req.headers.authorization.split(" ")[1]
      : null);

  if (!token) {
    return next(new AppError("Unauthorized: Missing token", 401));
  }

  try {
    const payload = verifyAccessToken(token);
    req.user = payload.id;
    return next();
  } catch (err) {
    return next(new AppError("Failed to authorize", 401));
  }
};
