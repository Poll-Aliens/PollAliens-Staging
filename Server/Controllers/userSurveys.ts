import express from 'express';

// import the Movie Model
import Survey from '../Models/survey';

import { UserDisplayName  } from '../Util';

export function DisplayContactListPage(req: express.Request, res: express.Response, next: express.NextFunction) 
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
      
      res.render('index', { title: 'Business Contacts List', page: 'userSurveys', surveys: surveysCollection, displayName:  UserDisplayName(req)  });
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

    Survey.findById(id, function(err, contactsCollection)
    {
      // Database error
      if(err)
      {
        console.error(err.message);
        res.end(err);
      }
      
      //content/updateview
      res.render('index', { title: 'Update Contact', page: 'updateview', contacts: contactsCollection, displayName:  UserDisplayName(req)  });
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