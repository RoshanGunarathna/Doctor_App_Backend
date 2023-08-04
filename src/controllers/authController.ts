import { NextFunction, Request, Response } from "express";

import ErrorHandler from "../utils/errorHandler";
import catchAsyncErrors from "../middleware/catchAsyncErrors";

import { addUser, checkIfUserExists } from "../Services/User";
import { hashPassword, validatePassword } from "../utils/password";
import { generateJwt } from "../utils/tokens";
import sendToken from "../utils/sendToken";

// Register a user  => /api/v1/register
export const registerUser = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, phoneNumber, password, nic } = req.body;

    // Check if any filed is empty
    if (!name || !phoneNumber || !password || !nic) {
      return next(new ErrorHandler("empty fields are not allowed!", 400));
    }

    // Check if user already exists with phone number

    if (await checkIfUserExists(phoneNumber, "phone")) {
      return next(
        new ErrorHandler("User already exist with same phone number", 400)
      );
    }

    // Check if user already exists with phone number
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

    // Create Token
    const token = generateJwt(nic);

    const result = await addUser(
      {
        name: name as string,
        password: hashedPassword,
        phoneNumber: phoneNumber as string,
        nic: nic as string,
      },
      token
    );

    if (result === true) {
      sendToken(token, 200, res);
    } else {
      return next(new ErrorHandler(result, 500));
    }
  }
);
