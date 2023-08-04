import express from "express";
// import { isAuthenticatedUser, isLoggedUser } from "../middleware/auth";

const router = express.Router();

import { registerUser } from "../controllers/authController";

router.route("/register").post(registerUser);

// router.route("/logout").get(isAuthenticatedUser, logoutUser);

export default router;
