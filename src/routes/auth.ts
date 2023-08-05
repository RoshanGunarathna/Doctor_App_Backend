import express from "express";
// import { isAuthenticatedUser, isLoggedUser } from "../middleware/auth";

const router = express.Router();

import { registerUser, loginUser } from "../controllers/authController";

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

// router.route("/logout").get(isAuthenticatedUser, logoutUser);

export default router;
