import express from 'express';

// convenience function to return the DisplayName of the User
export function UserDisplayName(req: express.Request): string
{
    if(req.user)
    {
        let user = req.user as UserDocument;
        return user.DisplayName.toString();
    }
    return '';
}

//get user id to track owners of questionaires
export function UserId(req: express.Request): string
{
    if(req.user)
    {
        let user = req.user as UserDocument;
        return user._id.toString();
    }
    return '';
}

// helper middleware function for guarding secure locations
export function AuthGuard(req: express.Request, res: express.Response, next: express.NextFunction): void
{
    if(!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    next();
}