import express from "express";
import { deleteUsers, getCurrentUser, getOtherUsers, login, logout, register, registerMulter, test } from "../controllers/userController.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router();


// import multer here 
import { storage, multer } from "../middleware/multerConfig.js"

// Exactly. This line is the bridge between your Multer configuration and your route.
const upload = multer({storage:storage});
// for file 
// replacing registerMulter with register so that frontend can directly access this 
// router.route("/registerMulter").post(upload.single("profilePhoto"),registerMulter);
router.route("/register").post(upload.single("profilePhoto"),registerMulter);

// this is the testing of nodemailer 
router.route("/test").post(test);

// this is solving the problem of refresh
router.route("/me").get(isAuthenticated, getCurrentUser);

// making it not workable because to use multer 
// router.route("/register").post(register); 
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/").get(isAuthenticated, getOtherUsers);
router.route("/deleteUser/:id").delete(deleteUsers);

export default router;