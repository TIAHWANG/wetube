import passport from "passport";
import routes from "../routes";
import User from "../models/User";

// Join
export const getJoin = (req, res) => {
    res.render("join", { pageTitle: "Join" });
};

export const postJoin = async (req, res, next) => {
    const {
        body: { name, email, password, password2 }
    } = req;
    if (password !== password2) {
        req.flash("error", "passwords dont match");
        res.status(400);
        res.render("join", { pageTitle: "Join" });
    } else {
        try {
            const user = await User({
                name,
                email
            });
            await User.register(user, password);
            next();
        } catch (error) {
            res.redirect(routes.home);
        }
    }
};

// Login
export const getLogin = (req, res) =>
    res.render("login", { pageTitle: "Login" });

export const postLogin = passport.authenticate("local", {
    failureRedirect: routes.login,
    successRedirect: routes.home,
    successFlash: "Welcome",
    failureFlash: "Can't log in. Check email and/or password"
});

// GitHub Login
export const githubLogin = passport.authenticate("github", {
    successFlash: "Welcome",
    failureFlash: "Can't log in at this time"
});

export const githubLoginCallback = async (_, __, profile, cb) => {
    const {
        _json: { id, avatar_url: avatarUrl, name, email }
    } = profile;
    try {
        const user = await User.findOne({ email });
        if (user) {
            user.githubId = id;
            user.avatarUrl = avatarUrl;
            user.save();
            return cb(null, user);
        }
        const newUser = await User.create({
            email,
            name,
            githubId: id,
            avatarUrl
        });
        return cb(null, newUser);
    } catch (error) {
        return cb(error);
    }
};

export const postGithubLogin = (req, res) => {
    res.redirect(routes.home);
};

// Naver Login
export const naverLogin = passport.authenticate("naver", {
    successFlash: "Welcome",
    failureFlash: "Can't log in at this time"
});

export const naverLoginCallback = async (_, __, profile, done) => {
    const {
        _json: { id, nickname: name, profile_image: avatarUrl, email }
    } = profile;
    try {
        const user = await User.findOne({ email });
        if (user) {
            user.naverId = id;
            user.save();
            return done(null, user);
        }
        const newUser = await User.create({
            naverId: id,
            email,
            name,
            avatarUrl
        });
        return done(null, newUser);
    } catch (error) {
        return done(error);
    }
};

export const postNaverLogin = (req, res) => res.redirect(routes.home);

// Logout
export const logout = (req, res) => {
    req.flase("info", "Logged out. See you later");
    req.logout();
    res.redirect(routes.home);
};

// Me
export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate("videos");
        res.render("userDetail", { pageTitle: "User Detail", user });
    } catch (error) {
        res.redirect(routes.home);
    }
};

// User Detail
export const userDetail = async (req, res) => {
    const {
        params: { id }
    } = req;
    try {
        const user = await User.findById(id).populate("videos");
        console.log(user);
        res.render("userDetail", { pageTitle: "User Detail", user });
    } catch (error) {
        req.flash("error", "User not found");
        res.redirect(routes.home);
    }
};

// Edit Profile
export const getEditProfile = (req, res) =>
    res.render("editProfile", { pageTitle: "Edit Profile" });

export const postEditProfile = async (req, res) => {
    const {
        body: { name, email },
        file
    } = req;
    try {
        await User.findByIdAndUpdate(req.user.id, {
            name,
            email,
            avatarUrl: file ? file.location : req.user.avatarUrl
        });
        req.flash("success", "Profile updated");
        res.redirect(routes.me);
    } catch (error) {
        req.flash("error", "Can't update Profile");
        res.redirect(routes.editProfile);
    }
};

// Change Password
export const getChangePassword = (req, res) =>
    res.render("changePassword", { pageTitle: "Change Password" });

export const postChangePassword = async (req, res) => {
    const {
        body: { oldPassword, newPassword, newPassword1 }
    } = req;
    try {
        if (newPassword !== newPassword1) {
            req.flash("error", "Passwords don't match");
            res.status(400);
            res.redirect(`/users${routes.changePassword}`);
            return;
        }
        await req.user.changePassword(oldPassword, newPassword);
        res.redirect(routes.me);
    } catch (error) {
        req.flash("error", "Can't change password");
        res.status(400);
        res.redirect(`/users${routes.changePassword}`);
    }
};
