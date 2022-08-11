import express from 'express';

// import the Survey Model
import Survey from '../Models/survey';

import { UserDisplayName, UserId  } from '../Util';

export function DisplayUserSurveys(req: express.Request, res: express.Response, next: express.NextFunction) 
{  
    //https://stackoverflow.com/questions/4299991/how-to-sort-in-mongoose
    //To sort database

    //sort and display user surveys only
    Survey.find({"ownerId":UserId(req)}).sort({surveyName: 1}).exec(function(err, surveysCollection)
    {
      // Database error
      if(err)
      {
        console.error(err.message);
        res.end(err);
      }
      
      res.render('index', { title: 'My Survey List', page: 'userSurveys', surveys: surveysCollection, displayName:  UserDisplayName(req)  });
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
       let startDate = new Date(req.body.startDate);   
       let endDate =   new Date(req.body.endDate);
       let todayDate = new Date();

       console.log(startDate);
       console.log(new Date());
       console.log(startDate < new Date());
      //new book record with form data
      let surveyRec = new Survey({       
        "ownerId": UserId(req),//req.user._id, 
        "surveyName": req.body.surveyName,
        "isActive": true,//(startDate < todayDate) && (endDate > todayDate),
        "startDate" : req.body.startDate,
        "endDate" : req.body.endDate, 

      });

      let options = req.body["options[]"];
      //options = options || []; //if no question added empty
      let optionsArray :string[][] =[[]];
      //optionsArray[].push([])
      let j = 0;
      //create individual question option list from array options form data sent as one large array
      for(let i=0; i < options.length; i++){
        if(options[i] != "*"){ //the '*' separates each questions option list
          optionsArray[j].push(options[i]);
        }
        else { 
          optionsArray.push([]);
          j++;
        }

      }
 
      console.log(optionsArray);

       //this loop starts at index i = 1 because a dummy value '*' is stored at the first position in array
       //This is because if one question is sent it is interpretted as a single string instead of the required array
       for(let i=1; i < questions.length; i++){
        
        surveyRec.Questions.push({
            "qText": questions[i],
            "qType": req.body["type[]"][i],       
            "options": optionsArray[i-1] //subtract one to start at zero index
        
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
        res.redirect('/userSurveys');
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
      res.render('index', { title: 'Update Survey', page: 'updateSurvey', surveys: surveysCollection, displayName:  UserDisplayName(req)  });
    });
}

//save changes
export function processEditPage(req: express.Request, res: express.Response, next: express.NextFunction) 
{
    let id = req.params.id;

    
    let questions = req.body["questions[]"];
    //console.log(questions[1]);
         //req.body.question[]  
       let startDate = new Date(req.body.startDate);   
       let endDate =   new Date(req.body.endDate);
       let todayDate = new Date();
  
        //new book record with form data
        let surveyRec = new Survey({   
          "_id": id,    
          "ownerId": UserId(req),//req.user._id, 
          "surveyName": req.body.surveyName,
          //"isActive": (startDate < todayDate) && (endDate > todayDate),
          "startDate" : startDate,
          "endDate" : endDate, 
  
        });
  
        let options = req.body["options[]"];
        let optionsArray :string[][] =[[]];
        //optionsArray[].push([])
        let j = 0;
        //create individual question option list from array options form data sent as one large array
        for(let i=0; i < options.length; i++){
          if(options[i] != "*"){ //the '*' separates each questions option list
            optionsArray[j].push(options[i]);
          }
          else { 
            optionsArray.push([]);
            j++;
          }
  
        }
   
        console.log(optionsArray);
  
         //this loop starts at index i = 1 because a dummy value '*' is stored at the first position in array
         //This is because if one question is sent it is interpretted as a single string instead of the required array
         for(let i=1; i < questions.length; i++){
          
          surveyRec.Questions.push({
              "qText": questions[i],
              "qType": req.body["type[]"][i],       
              "options": optionsArray[i-1] //subtract one to start at zero index
          
          });
  
        } 




    Survey.updateOne({_id: id}, surveyRec, function(err)
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


 //Toggle Survey isActive from ContactDB
 export function ToggleisActive(req: express.Request, res: express.Response, next: express.NextFunction) 
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
       
       Survey.updateOne({_id: id}, {$set: {"isActive": !surveysCollection.isActive}}, function(err)
       {
         // Database error
         if(err)
         {
           console.error(err.message);
           res.end(err);
         }
         
         res.redirect('/userSurveys');
       });
      
       
     });
     
 }


 //save changes
export function Statistics(req: express.Request, res: express.Response, next: express.NextFunction) 
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
    res.render('index', { title: 'Statistics', page: 'statistics', surveys: surveysCollection, displayName:  UserDisplayName(req)  });
  });



}