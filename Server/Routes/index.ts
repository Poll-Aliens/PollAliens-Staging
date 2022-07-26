import express from 'express';
const router = express.Router();

import { DisplayHomePage, ViewPublicSurveys, AnswerSurvey } from '../Controllers/index';

/* Display home page. */
router.get('/', DisplayHomePage);

/* Display home page. */
router.get('/home', DisplayHomePage);

/* Display home page. */
router.get('/viewSurveys', ViewPublicSurveys);

/* GET Route for displaying the Edit page - UPDATE Operation */
router.get('/viewSurveys/answerSurvey/:id', AnswerSurvey);

export default router;
