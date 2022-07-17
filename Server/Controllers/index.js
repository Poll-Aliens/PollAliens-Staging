"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViewPublicSurveys = exports.DisplayHomePage = void 0;
const survey_1 = __importDefault(require("../Models/survey"));
const Util_1 = require("../Util");
function DisplayHomePage(req, res, next) {
    res.render('index', { title: 'Welcome', page: 'home', displayName: (0, Util_1.UserDisplayName)(req) });
}
exports.DisplayHomePage = DisplayHomePage;
function ViewPublicSurveys(req, res, next) {
    survey_1.default.find({ "isActive": true, "startDate": { $lt: new Date() }, "endDate": { $gt: new Date() } }).sort({ surveyName: 1 }).exec(function (err, surveysCollection) {
        if (err) {
            console.error(err.message);
            res.end(err);
        }
        res.render('index', { title: 'Complete Surveys to WIN BIG CASH PRIZES', page: 'viewSurveys', surveys: surveysCollection, displayName: (0, Util_1.UserDisplayName)(req) });
    });
}
exports.ViewPublicSurveys = ViewPublicSurveys;
//# sourceMappingURL=index.js.map