import express from 'express';
const router = express.Router();

import { ProcessLogoutPage, DisplayLoginPage, ProcessLoginPage } from '../Controllers/auth';

/* Display Login page. */
router.get('/login', DisplayLoginPage);

/* Display Register page. */
//router.get('/register', DisplayRegisterPage);


/* Process Login page. */
router.post('/login', ProcessLoginPage);

//Register page used once to generate user in contactDB database
/* Process Register page. */
//router.post('/register', ProcessRegisterPage);


/* Process Logout page. */
router.get('/logout', ProcessLogoutPage);

export default router;
