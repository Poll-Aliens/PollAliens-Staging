// Step 1 - import mongoose - database adapter
import mongoose from 'mongoose';
const Schema = mongoose.Schema; // alias for mongoose.Schema

// Step 2 - Create a Schema that matches the data in the collection
const SurveySchema = new Schema
({
    ownerId: {name:String},  //user id of person who created survey
    ownerName: String, //name of person who created survey
    personId: String, //person who completed the survey
    question: String    
},
{
    collection: "surveys"
});

// Step 3- Create a Model using the Schema
const Model = mongoose.model("Survey", SurveySchema);

// Step 4 - Export the Model -> converts this file into a module
export default Model;