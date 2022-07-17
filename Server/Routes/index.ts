import express from 'express';
const router = express.Router();

import { DisplayHomePage, ViewPublicSurveys } from '../Controllers/index';

/* Display home page. */
router.get('/', DisplayHomePage);

/* Display home page. */
router.get('/home', DisplayHomePage);

/* Display home page. */
router.get('/viewSurveys', ViewPublicSurveys);

export default router;
