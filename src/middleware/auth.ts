import { NextFunction, Response, Request } from "express";
import { verify, JwtPayload, TokenExpiredError } from "jsonwebtoken";
import ErrorHandler from "../utils/errorHandler";
import { checkIfUserExists, getUserDetails } from "../Services/User";

// Checks if user is authenticated
export const isAuthenticatedUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Login first to access this resource.", 401));
  }

  try {
    const decode = verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;

    const isValid = await checkIfUserExists(decode.nic, "nic");

    if (!isValid) {
      res.clearCookie("token", { path: "/" });
      return next(new ErrorHandler("Invalid Token! Try again", 400));
    }

    req.body.user = await getUserDetails(decode.nic);
  } catch (error) {
    console.log(error);
    res.clearCookie("token", { path: "/" });

    if (error instanceof TokenExpiredError) {
      return next(
        new ErrorHandler("Token Expired Please Login and Try Again!", 400)
      );
    }

    return next(new ErrorHandler("Something went to wrong", 500));
  }

  next();
};

// Checks if user is authenticated
export const isLoggedUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.cookies;

  if (token) {
    return next(new ErrorHandler("You Have Already Logged in", 401));
  }

  next();
};

// Handle users roles
export const authorizeRoles = (roles: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const authRoles = roles.split(",");
    if (!authRoles.includes(req.body.user?.role as string)) {
      return next(
        new ErrorHandler(
          `Role (${req.body.user?.role}) is not allowed to access this resource`,
          403
        )
      );
    }
    next();
  };
};
