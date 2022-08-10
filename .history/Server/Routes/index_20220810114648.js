"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const index_1 = require("../Controllers/index");
router.get('/', index_1.DisplayHomePage);
router.get('/home', index_1.DisplayHomePage);
router.get('/about', index_1.DisplayAboutPage);
router.get('/contact', index_1.DisplayContactPage);
router.get('/viewSurveys', index_1.ViewPublicSurveys);
router.get('/viewSurveys/answerSurvey/:id', index_1.AnswerSurvey);
router.post('/viewSurveys/answerSurvey/:id', index_1.processAnswerSurvey);
exports.default = router;
//# sourceMappingURL=index.js.map