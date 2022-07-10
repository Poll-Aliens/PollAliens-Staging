// Step 1 - import mongoose - database adapter
import mongoose from 'mongoose';
const Schema = mongoose.Schema; // alias for mongoose.Schema

// Step 2 - Create a Schema that matches the data in the collection
const ContactSchema = new Schema
({
    Name: String,
    Number: String,
    Email: String    
},
{
    collection: "contacts"
});

// Step 3- Create a Model using the Schema
const Model = mongoose.model("Contact", ContactSchema);

// Step 4 - Export the Model -> converts this file into a module
export default Model;