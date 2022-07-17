import express from 'express';

// import the Movie Model
import Survey from '../Models/survey';

import { UserDisplayName, UserId  } from '../Util';

export function DisplayUserSurveys(req: express.Request, res: express.Response, next: express.NextFunction) 
{  
    //https://stackoverflow.com/questions/4299991/how-to-sort-in-mongoose
    //To sort database
    Survey.find({}).sort({Name: 1}).exec(function(err, surveysCollection)
    {
      // Database error
      if(err)
      {
        console.error(err.message);
        res.end(err);
      }
      
      res.render('index', { title: 'My Survery List', page: 'userSurveys', surveys: surveysCollection, displayName:  UserDisplayName(req)  });
    });
}

export function createSurvey(req: express.Request, res: express.Response, next: express.NextFunction) 
{ 
    res.render('index', { title: 'Create New Survey', page: 'createSurvey', surveys:'', displayName: UserDisplayName(req), userId: UserId(req) });
}

export function ProcessCreateSurvey(req: express.Request, res: express.Response, next: express.NextFunction) 
{  
  let questions = req.body["questions[]"];
  //console.log(questions[1]);
       //req.body.question[]
   
       

      //new book record with form data
      let surveyRec = new Survey({       
        "ownerId": UserId(req),//req.user._id, 
        "surveyName": req.body.surveyName,
        "isActive": true,
        "startDate" : new Date(),
        "endDate" : new Date(), 

      });

      let options = req.body["options[]"];
      let optionsArray :string[][] =[[]];
      //optionsArray[].push([])
      let j = 0;
      for(let i=0; i < options.length; i++){
        if(options[i] != "*"){
          optionsArray[j].push(options[i]);
        }
        else { 
          optionsArray.push([]);
          j++;
        }

      }
 
      console.log(optionsArray);

       for(let i=1; i < questions.length; i++){
        
        surveyRec.Questions.push({
            "qText": questions[i],
            "qType": req.body["type[]"][i],       
            "options": optionsArray[i-1]
        
        });

      } 
      

      //Add new record
      Survey.create(surveyRec, function(err:any)
      {
        // Database error
        if(err)
        {
          console.error(err.message);
          res.end(err);
        } 
        
        //reload book list
        //res.redirect('/userSurveys');
      });


    
}


//Delete from ContactDB
export function performDelete(req: express.Request, res: express.Response, next: express.NextFunction) 
{
    let id = req.params.id;
    Survey.remove({_id: id}, function(err)
    {
      // Database error
      if(err)
      {
        console.error(err.message);
        res.end(err);
      }
      
      res.redirect('/userSurveys');
    });
}



//Search by id and return record
export function displayEditPage(req: express.Request, res: express.Response, next: express.NextFunction) 
{
    let id = req.params.id;

    Survey.findById(id, function(err, surveysCollection)
    {
      // Database error
      if(err)
      {
        console.error(err.message);
        res.end(err);
      }
      
      //content/updateview
      res.render('index', { title: 'Update Contact', page: 'updateview', surveys: surveysCollection, displayName:  UserDisplayName(req)  });
    });
}

//save changes
export function processEditPage(req: express.Request, res: express.Response, next: express.NextFunction) 
{
    let id = req.params.id;

    let contactRec = new Survey({
        "_id": id,
        "Name": req.body.name,
        "Number": req.body.number,
        "Email": req.body.email
    });

    Survey.updateOne({_id: id}, contactRec, function(err)
    {
      // Database error
      if(err)
      {
        console.error(err.message);
        res.end(err);
      }
      
      res.redirect('/userSurveys');
    });
}