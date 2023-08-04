import { Response } from "express";

// Create and send token and save in the cookie
const sendToken = async (token: string, statusCode: number, res: Response) => {
  // options for cookie
  const options = {
    expires: new Date(
      Date.now() + Number(process.env.COOKIE_EXPIRES_TIME) * 1000 * 60 * 60 * 24
    ),
    httpOnly: true,
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    token,
  });
};

export default sendToken;
