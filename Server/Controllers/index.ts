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