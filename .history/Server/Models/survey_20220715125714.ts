// Step 1 - import mongoose - database adapter
import mongoose from 'mongoose';
const Schema = mongoose.Schema; // alias for mongoose.Schema

// Step 2 - Create a Schema that matches the data in the collection
const SurveySchema = new Schema
({
    ownerId: String,  
    surveyId: Number,
    isActive: Boolean,
    surveyName : String,
    startDate : Date,
    endDate : Date,
    //q1: {ques : String, ans: String}     //q is array of Questions objects
},
{
    collection: "Surveys"
});

const QuestionSchema = new Schema
({ 
    questionId: Number,
    surveyId: Number,
    questionText: String,
    typeIsMC: Boolean, //MC or TF
},
{
    collection: "Questions"
});

const OptionSchema = new Schema
({ 
    optionId: Number,
    questionId: Number,
    optionText: String,
    optionValue: String
},
{
    collection: "Options"
});

const ResponseSchema = new Schema
({ 
    optionId: Number,
    questionId: Number,
    surveyId: Number,
    responseValue: Number// which is equal to the optionID selected by respondents.
},
{
    collection: "Responses"
});

// Step 3- Create a Model using the Schema
const Model = mongoose.model("Survey", SurveySchema);

// Step 4 - Export the Model -> converts this file into a module
export default Model;