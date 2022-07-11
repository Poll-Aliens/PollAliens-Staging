"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const userSurveys_1 = require("../Controllers/userSurveys");
const index_1 = require("../Util/index");
router.get('/userSurveys', index_1.AuthGuard, userSurveys_1.DisplayContactListPage);
router.get('/userSurveys/delete/:id', index_1.AuthGuard, userSurveys_1.performDelete);
router.get('/userSurveys/updateview/:id', index_1.AuthGuard, userSurveys_1.displayEditPage);
router.post('/userSurveys/updateview/:id', index_1.AuthGuard, userSurveys_1.processEditPage);
exports.default = router;
//# sourceMappingURL=userSurveys.js.map