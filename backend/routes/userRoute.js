import express from "express";
import { deleteUsers, getOtherUsers, login, logout, register, registerMulter } from "../controllers/userController.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router();


// import multer here 
import { storage, multer } from "../middleware/multerConfig.js"

// Exactly. This line is the bridge between your Multer configuration and your route.
const upload = multer({storage:storage});
// for file 
router.route("/registerMulter").post(upload.single("profilePhoto"),registerMulter);


router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/").get(isAuthenticated, getOtherUsers);
router.route("/deleteUser/:id").delete(deleteUsers);

export default router;