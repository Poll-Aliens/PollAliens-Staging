"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const SurveySchema = new Schema({
    ownerId: String,
    surveyName: String,
    isActive: Boolean,
    startDate: Date,
    endDate: Date,
    Questions: [{
            qText: String,
            qType: String,
            options: [String],
            Responses: [{
                    qAnswer: String
                }]
        }]
}, {
    collection: "Surveys"
});
const QuestionSchema = new Schema({
    questionId: Number,
    surveyId: Number,
    questionText: String,
    typeIsMC: Boolean,
}, {
    collection: "Questions"
});
const OptionSchema = new Schema({
    optionId: Number,
    questionId: Number,
    optionText: String,
    optionValue: String
}, {
    collection: "Options"
});
const ResponseSchema = new Schema({
    optionId: Number,
    questionId: Number,
    surveyId: Number,
    responseValue: Number
}, {
    collection: "Responses"
});
const Model = mongoose_1.default.model("Survey", SurveySchema);
exports.default = Model;
//# sourceMappingURL=survey.js.map