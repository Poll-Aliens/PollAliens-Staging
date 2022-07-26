import express from 'express';
const router = express.Router();

import { DisplayUserSurveys, createSurvey, ProcessCreateSurvey, displayEditPage, performDelete, processEditPage, ToggleisActive, Statistics } from '../Controllers/userSurveys';

import { AuthGuard } from '../Util/index';

/* Display specific user surveys Page */
router.get('/userSurveys', AuthGuard, DisplayUserSurveys);

router.get('/createSurvey', AuthGuard, createSurvey);

router.post('/createSurvey', AuthGuard, ProcessCreateSurvey);

/* Delete specific user survey */
router.get('/userSurveys/delete/:id', AuthGuard, performDelete);

/* GET Route for displaying the Edit page - UPDATE Operation */
router.get('/userSurveys/updateSurvey/:id', AuthGuard, displayEditPage);

/* POST Route for processing the Edit page - UPDATE Operation */
router.post('/userSurveys/updateSurvey/:id', AuthGuard, processEditPage);


router.get('/userSurveys/ToggleisActive/:id', AuthGuard, ToggleisActive);

router.get('/userSurveys/statistics/:id', AuthGuard, Statistics);

export default router;