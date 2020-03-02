import express from "express";
import routes from "../routes";
import {
    userDetail,
    editProfile,
    changePassword
} from "../controllers/userController";
import { onlyPriveate } from "../middlewares";

const userRouter = express.Router();

userRouter.get(routes.editProfile, onlyPriveate, editProfile);
userRouter.get(routes.changePassword, onlyPriveate, changePassword);
userRouter.get(routes.userDetail(), userDetail);

export default userRouter;
