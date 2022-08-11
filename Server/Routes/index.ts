import express from 'express';
const router = express.Router();

import { DisplayHomePage, ViewPublicSurveys, AnswerSurvey, processAnswerSurvey, About, Contact } from '../Controllers/index';

/* Display home page. */
router.get('/', DisplayHomePage);

/* Display home page. */
router.get('/home', DisplayHomePage);

/* Display about us page. */
router.get('/about-us', About);

/* Display about us page. */
router.get('/contact-us', Contact);

/* Display home page. */
router.get('/viewSurveys', ViewPublicSurveys);

/* GET Route for displaying the answer survey page  */
router.get('/viewSurveys/answerSurvey/:id', AnswerSurvey);

/* POST Route for processing the Answer Survey */
router.post('/viewSurveys/answerSurvey/:id', processAnswerSurvey);

export default router;
