"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processEditPage = exports.displayEditPage = exports.performDelete = exports.ProcessCreateSurvey = exports.createSurvey = exports.DisplayUserSurveys = void 0;
const survey_1 = __importDefault(require("../Models/survey"));
const Util_1 = require("../Util");
function DisplayUserSurveys(req, res, next) {
    survey_1.default.find({}).sort({ Name: 1 }).exec(function (err, surveysCollection) {
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
    let surveyRec = new survey_1.default({
        "ownerId": (0, Util_1.UserId)(req),
        "surveyName": req.body.surveyName,
        "isActive": true,
        "startDate": new Date(),
        "endDate": new Date(),
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
    let contactRec = new survey_1.default({
        "_id": id,
        "Name": req.body.name,
        "Number": req.body.number,
        "Email": req.body.email
    });
    survey_1.default.updateOne({ _id: id }, contactRec, function (err) {
        if (err) {
            console.error(err.message);
            res.end(err);
        }
        res.redirect('/userSurveys');
    });
}
exports.processEditPage = processEditPage;
//# sourceMappingURL=userSurveys.js.map