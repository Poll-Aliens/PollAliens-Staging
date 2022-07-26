"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const userSurveys_1 = require("../Controllers/userSurveys");
const index_1 = require("../Util/index");
router.get('/userSurveys', index_1.AuthGuard, userSurveys_1.DisplayUserSurveys);
router.get('/createSurvey', index_1.AuthGuard, userSurveys_1.createSurvey);
router.post('/createSurvey', index_1.AuthGuard, userSurveys_1.ProcessCreateSurvey);
router.get('/userSurveys/delete/:id', index_1.AuthGuard, userSurveys_1.performDelete);
router.get('/userSurveys/updateSurvey/:id', index_1.AuthGuard, userSurveys_1.displayEditPage);
router.post('/userSurveys/updateSurvey/:id', index_1.AuthGuard, userSurveys_1.processEditPage);
router.get('/userSurveys/ToggleisActive/:id', index_1.AuthGuard, userSurveys_1.ToggleisActive);
router.get('/userSurveys/statistics/:id', index_1.AuthGuard, userSurveys_1.Statistics);
exports.default = router;
//# sourceMappingURL=userSurveys.js.map