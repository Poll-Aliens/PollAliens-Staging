"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Statistics = exports.ToggleisActive = exports.processEditPage = exports.displayEditPage = exports.performDelete = exports.ProcessCreateSurvey = exports.createSurvey = exports.DisplayUserSurveys = void 0;
const survey_1 = __importDefault(require("../Models/survey"));
const Util_1 = require("../Util");
function DisplayUserSurveys(req, res, next) {
    survey_1.default.find({ "ownerId": (0, Util_1.UserId)(req) }).sort({ surveyName: 1 }).exec(function (err, surveysCollection) {
        if (err) {
            console.error(err.message);
            res.end(err);
        }
        res.render('index', { title: 'My Survey List', page: 'userSurveys', surveys: surveysCollection, displayName: (0, Util_1.UserDisplayName)(req) });
    });
}
exports.DisplayUserSurveys = DisplayUserSurveys;
function createSurvey(req, res, next) {
    res.render('index', { title: 'Create New Survey', page: 'createSurvey', surveys: '', displayName: (0, Util_1.UserDisplayName)(req), userId: (0, Util_1.UserId)(req) });
}
exports.createSurvey = createSurvey;
function ProcessCreateSurvey(req, res, next) {
    let questions = req.body["questions[]"];
    let startDate = new Date(req.body.startDate);
    let endDate = new Date(req.body.endDate);
    let todayDate = new Date();
    console.log(startDate);
    console.log(new Date());
    console.log(startDate < new Date());
    let surveyRec = new survey_1.default({
        "ownerId": (0, Util_1.UserId)(req),
        "surveyName": req.body.surveyName,
        "isActive": true,
        "startDate": req.body.startDate,
        "endDate": req.body.endDate,
    });
    let options = req.body["options[]"];
    let optionsArray = [[]];
    let j = 0;
    for (let i = 0; i < options.length; i++) {
        if (options[i] != "*") {
            optionsArray[j].push(options[i]);
        }
        else {
            optionsArray.push([]);
            j++;
        }
    }
    console.log(optionsArray);
    for (let i = 1; i < questions.length; i++) {
        surveyRec.Questions.push({
            "qText": questions[i],
            "qType": req.body["type[]"][i],
            "options": optionsArray[i - 1]
        });
    }
    survey_1.default.create(surveyRec, function (err) {
        if (err) {
            console.error(err.message);
            res.end(err);
        }
        res.redirect('/userSurveys');
    });
}
exports.ProcessCreateSurvey = ProcessCreateSurvey;
function performDelete(req, res, next) {
    let id = req.params.id;
    survey_1.default.remove({ _id: id }, function (err) {
        if (err) {
            console.error(err.message);
            res.end(err);
        }
        res.redirect('/userSurveys');
    });
}
exports.performDelete = performDelete;
function displayEditPage(req, res, next) {
    let id = req.params.id;
    survey_1.default.findById(id, function (err, surveysCollection) {
        if (err) {
            console.error(err.message);
            res.end(err);
        }
        res.render('index', { title: 'Update Survey', page: 'updateSurvey', surveys: surveysCollection, displayName: (0, Util_1.UserDisplayName)(req) });
    });
}
exports.displayEditPage = displayEditPage;
function processEditPage(req, res, next) {
    let id = req.params.id;
    let questions = req.body["questions[]"];
    let startDate = new Date(req.body.startDate);
    let endDate = new Date(req.body.endDate);
    let todayDate = new Date();
    let surveyRec = new survey_1.default({
        "_id": id,
        "ownerId": (0, Util_1.UserId)(req),
        "surveyName": req.body.surveyName,
        "startDate": startDate,
        "endDate": endDate,
    });
    let options = req.body["options[]"];
    let optionsArray = [[]];
    let j = 0;
    for (let i = 0; i < options.length; i++) {
        if (options[i] != "*") {
            optionsArray[j].push(options[i]);
        }
        else {
            optionsArray.push([]);
            j++;
        }
    }
    console.log(optionsArray);
    for (let i = 1; i < questions.length; i++) {
        surveyRec.Questions.push({
            "qText": questions[i],
            "qType": req.body["type[]"][i],
            "options": optionsArray[i - 1]
        });
    }
    survey_1.default.updateOne({ _id: id }, surveyRec, function (err) {
        if (err) {
            console.error(err.message);
            res.end(err);
        }
        res.redirect('/userSurveys');
    });
}
exports.processEditPage = processEditPage;
function ToggleisActive(req, res, next) {
    let id = req.params.id;
    survey_1.default.findById(id, function (err, surveysCollection) {
        if (err) {
            console.error(err.message);
            res.end(err);
        }
        survey_1.default.updateOne({ _id: id }, { $set: { "isActive": !surveysCollection.isActive } }, function (err) {
            if (err) {
                console.error(err.message);
                res.end(err);
            }
            res.redirect('/userSurveys');
        });
    });
}
exports.ToggleisActive = ToggleisActive;
function Statistics(req, res, next) {
    let id = req.params.id;
    survey_1.default.findById(id, function (err, surveysCollection) {
        if (err) {
            console.error(err.message);
            res.end(err);
        }
        res.render('index', { title: 'Statistics', page: 'statistics', surveys: surveysCollection, displayName: (0, Util_1.UserDisplayName)(req) });
    });
}
exports.Statistics = Statistics;
//# sourceMappingURL=userSurveys.js.map