import { NextFunction, Request, Response } from "express";

import ErrorHandler from "../utils/errorHandler";
import catchAsyncErrors from "../middleware/catchAsyncErrors";

import {
  addUser,
  checkIfUserExists,
  comparePassword,
  getUserDetails,
} from "../Services/User";
import { hashPassword, validatePassword } from "../utils/password";
import { generateJwt } from "../utils/tokens";
import sendToken from "../utils/sendToken";
import { strict } from "assert";

// Register a user  => /api/v1/register
export const registerUser = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { firstName, lastName, phoneNumber, password, nic } = req.body;

    // Check if any filed is empty
    if (!firstName || !lastName || !phoneNumber || !password || !nic) {
      return next(new ErrorHandler("empty fields are not allowed!", 400));
    }

    // Check if user already exists with phone number

    if (await checkIfUserExists(phoneNumber, "phone")) {
      return next(
        new ErrorHandler("User already exist with same phone number", 400)
      );
    }

    // Check if user already exists with NIC
    if (await checkIfUserExists(nic, "nic")) {
      return next(new ErrorHandler("User already exist with same NIC", 400));
    }

    // check the validity of password
    const validationResult = validatePassword(password as string);

    if (validationResult !== true) {
      return next(new ErrorHandler(validationResult, 400));
    }

    // Hash Password
    const hashedPassword = await hashPassword(password as string);

    if (hashPassword instanceof Error) {
      return next(new ErrorHandler(hashPassword.message, 500));
    }

    const result = await addUser({
      firstName: firstName as string,
      lastName: lastName as string,
      password: hashedPassword as string,
      phoneNumber: phoneNumber as string,
      nic: nic as string,
    });

    if (result === true) {
      res.status(200).json({
        success: true,
      });
    } else {
      return next(new ErrorHandler(result, 500));
    }
  }
);

export const loginUser = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { nic, password } = req.body;

    // Check if any filed is empty
    if (!password || !nic) {
      return next(new ErrorHandler("Empty fields are not allowed!", 400));
    }

    // Check if user already exists with NIC
    if (!(await checkIfUserExists(nic, "nic"))) {
      return next(new ErrorHandler("User does not exist with NIC", 400));
    }

    // Compare password
    const isMatched = await comparePassword(nic, password);

    if (!isMatched) {
      return next(new ErrorHandler("Wrong password!", 400));
    }

    // login successful
    sendToken(generateJwt(nic), 200, res, await getUserDetails(nic));
  }
);

export const logoutUser = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
      secure: true,
    });

    res.status(200).json({
      success: true,
      message: "You have logged out",
    });
  }
);

export const getUser = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
      success: true,
      user: req.body.user,
    });
  }
);
