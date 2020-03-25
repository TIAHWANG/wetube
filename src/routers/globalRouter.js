import express from "express";
import passport from "passport";
import routes from "../routes";
import { home, search } from "../controllers/videoController";
import {
    getJoin,
    getLogin,
    logout,
    postJoin,
    postLogin,
    githubLogin,
    postGithubLogin,
    getMe,
    naverLogin,
    postNaverLogin
} from "../controllers/userController";
import { onlyPublic, onlyPrivate } from "../middlewares";

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
globalRouter.get(routes.logout, onlyPrivate, logout);

// Search
globalRouter.get(routes.search, search);

// Github
globalRouter.get(routes.gitHub, githubLogin);
globalRouter.get(
    routes.gitHubCallback,
    passport.authenticate("github", {
        failureRedirect: routes.login,
        successFlash: "Welcome"
    }),
    postGithubLogin
);

// Naver
globalRouter.get(routes.naver, naverLogin);
globalRouter.get(
    routes.naverCallback,
    passport.authenticate("naver", {
        failureRedirect: routes.login,
        successFlash: "Welcome"
    }),
    postNaverLogin
);

// Me
globalRouter.get(routes.me, getMe);

export default globalRouter;
