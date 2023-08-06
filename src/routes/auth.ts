import express from "express";
import { isAuthenticatedUser, isLoggedUser } from "../middleware/auth";

const router = express.Router();

import {
  registerUser,
  loginUser,
  logoutUser,
} from "../controllers/authController";

router.route("/register").post(isLoggedUser, registerUser);
router.route("/login").post(isLoggedUser, loginUser);

router.route("/logout").get(isAuthenticatedUser, logoutUser);

export default router;
