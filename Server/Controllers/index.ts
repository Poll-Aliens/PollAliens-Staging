import express from 'express';

import { UserDisplayName } from '../Util';

export function DisplayHomePage(req: express.Request, res: express.Response, next: express.NextFunction) 
{
  res.render('index', { title: 'Welcome', page: 'home', displayName: UserDisplayName(req) });
}

export function DisplayAboutPage(req: express.Request, res: express.Response, next: express.NextFunction) 
{
  res.render('index', { title: 'About Me', page: 'about', displayName:  UserDisplayName(req) });
}

export function DisplayProjectsPage(req: express.Request, res: express.Response, next: express.NextFunction) 
{
    res.render('index', { title: 'My Projects', page: 'projects', displayName: UserDisplayName(req)  });
}

export function DisplayServicesPage(req: express.Request, res: express.Response, next: express.NextFunction) 
{
    res.render('index', { title: 'My Services', page: 'services', displayName: UserDisplayName(req)  });
}

export function DisplayContactPage(req: express.Request, res: express.Response, next: express.NextFunction) 
{
    res.render('index', { title: 'Contact Me', page: 'contact', displayName: UserDisplayName(req)  });
}