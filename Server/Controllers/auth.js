"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessLogoutPage = exports.ProcessRegisterPage = exports.ProcessLoginPage = exports.DisplayRegisterPage = exports.DisplayLoginPage = void 0;
const passport_1 = __importDefault(require("passport"));
const user_1 = __importDefault(require("../Models/user"));
const Util_1 = require("../Util");
function DisplayLoginPage(req, res, next) {
    if (!req.user) {
        return res.render('index', { title: "Login", page: "login", messages: req.flash("loginMessage"), displayName: (0, Util_1.UserDisplayName)(req) });
    }
    return res.redirect('/userSurveys');
}
exports.DisplayLoginPage = DisplayLoginPage;
function DisplayRegisterPage(req, res, next) {
    if (!req.user) {
        return res.render('index', { title: "Register", page: "register", messages: req.flash("registerMessage"), displayName: (0, Util_1.UserDisplayName)(req) });
    }
    return res.redirect('/userSurveys');
}
exports.DisplayRegisterPage = DisplayRegisterPage;
function ProcessLoginPage(req, res, next) {
    passport_1.default.authenticate('local', function (err, user, info) {
        if (err) {
            console.error(err);
            res.end(err);
        }
        if (!user) {
            req.flash('loginMessage', 'Authentication Error!');
            return res.redirect('/login');
        }
        req.logIn(user, function (err) {
            if (err) {
                console.error(err);
                res.end(err);
            }
            return res.redirect('/userSurveys');
        });
    })(req, res, next);
}
exports.ProcessLoginPage = ProcessLoginPage;
function ProcessRegisterPage(req, res, next) {
    if (req.body.password != req.body.confirmPassword) {
        console.error('ERROR: passwords do not match');
        req.flash('registerMessage', 'Passwords do not match!');
        return res.redirect('/register');
    }
    let newUser = new user_1.default({
        username: req.body.username,
        EmailAddress: req.body.emailAddress,
        DisplayName: req.body.firstName + " " + req.body.lastName
    });
    user_1.default.register(newUser, req.body.password, function (err) {
        if (err) {
            if (err.name == "UserExistsError") {
                console.error('ERROR: User Already Exists!');
                req.flash('registerMessage', 'Username is taken.');
            }
            else {
                console.error(err.name);
                req.flash('registerMessage', 'Server Error');
            }
            return res.redirect('/register');
        }
        return passport_1.default.authenticate('local')(req, res, function () {
            return res.redirect('/userSurveys');
        });
    });
}
exports.ProcessRegisterPage = ProcessRegisterPage;
function ProcessLogoutPage(req, res, next) {
    req.logOut(function (err) {
        if (err) {
            console.error(err);
            res.end(err);
        }
        console.log('User Logged Out');
    });
    res.redirect('/login');
}
exports.ProcessLogoutPage = ProcessLogoutPage;
//# sourceMappingURL=auth.js.map