import express from 'express';

// import the Survey Model
import Survey from '../Models/survey';

import { UserDisplayName } from '../Util';

export function DisplayHomePage(req: express.Request, res: express.Response, next: express.NextFunction) 
{
  res.render('index', { title: 'Welcome', page: 'home', displayName: UserDisplayName(req) });
}

export function ViewPublicSurveys(req: express.Request, res: express.Response, next: express.NextFunction) 
{

   //https://stackoverflow.com/questions/4299991/how-to-sort-in-mongoose
    //To sort database

    //sort and display user surveys only
    Survey.find({"isActive": true, "startDate": {$lt: new Date()}, "endDate": {$gt: new Date()} }).sort({surveyName: 1}).exec(function(err, surveysCollection)
    {
      // Database error
      if(err)
      {
        console.error(err.message);
        res.end(err);
      }
      
      res.render('index', { title: 'Complete Surveys to WIN BIG CASH PRIZES', page: 'viewSurveys', surveys: surveysCollection, displayName:  UserDisplayName(req)  });
    });
  
}


export function AnswerSurvey(req: express.Request, res: express.Response, next: express.NextFunction) 
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
    res.render('index', { title: 'Answer Survey', page: 'answerSurvey', surveys: surveysCollection, displayName:  UserDisplayName(req) });
  });    
     
  
}


//save changes
export function processAnswerSurvey(req: express.Request, res: express.Response, next: express.NextFunction) 
{
    
    
    //let questions = req.body["questions[]"];
    //console.log(questions[1]);
         //req.body.question[]  
      
  
        //new book record with form data
        


    let id = req.params.id;

    
    
    Survey.findById(id, function(err, surveysCollection)
     {
       // Database error
       if(err)
       {
         console.error(err.message);
         res.end(err);
       }

       let answers = req.body;

       console.log(req.body);
       //console.log(answers[0]);

       //this loop starts at index i = 1 because a dummy value '*' is stored at the first position in array
         //This is because if one question is sent it is interpretted as a single string instead of the required array
         for(let i=0; i < surveysCollection.Questions.length; i++){
          console.log(surveysCollection.Questions[i]);
            if(answers[i] == undefined) {answers[i] = "skipped";}
            surveysCollection.Questions[i].Responses.push({
                "qAnswer": answers[i]            
            
            });
  
          } 

       
       Survey.updateOne({_id: id}, surveysCollection, function(err)
        {
          // Database error
          if(err)
          {
            console.error(err.message);
            res.end(err);
          }
          
          res.redirect('/viewSurveys');
        });   
      
       
     });




}