import express from "express";
import routes from "../routes";
import { home, search } from "../controllers/videoController";
import {
    getJoin,
    getLogin,
    logout,
    postJoin,
    postLogin
} from "../controllers/userController";
import { onlyPublic } from "../middlewares";

const globalRouter = express.Router();

// Home
globalRouter.get(routes.home, home);

// Join
globalRouter.get(routes.join, onlyPublic, getJoin);
globalRouter.post(routes.join, onlyPublic, postJoin, postLogin);

// Login
globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin);

// Logout
globalRouter.get(routes.logout, logout);

// Search
globalRouter.get(routes.search, search);

export default globalRouter;
