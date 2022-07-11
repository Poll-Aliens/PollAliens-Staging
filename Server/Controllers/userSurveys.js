"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processEditPage = exports.displayEditPage = exports.performDelete = exports.DisplayContactListPage = void 0;
const survey_1 = __importDefault(require("../Models/survey"));
const Util_1 = require("../Util");
function DisplayContactListPage(req, res, next) {
    survey_1.default.find({}).sort({ Name: 1 }).exec(function (err, surveysCollection) {
        if (err) {
            console.error(err.message);
            res.end(err);
        }
        res.render('index', { title: 'Business Contacts List', page: 'userSurveys', surveys: surveysCollection, displayName: (0, Util_1.UserDisplayName)(req) });
    });
}
exports.DisplayContactListPage = DisplayContactListPage;
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
    survey_1.default.findById(id, function (err, contactsCollection) {
        if (err) {
            console.error(err.message);
            res.end(err);
        }
        res.render('index', { title: 'Update Contact', page: 'updateview', contacts: contactsCollection, displayName: (0, Util_1.UserDisplayName)(req) });
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