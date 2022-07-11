import express from 'express';
const router = express.Router();

import { DisplayContactListPage, displayEditPage, performDelete, processEditPage } from '../Controllers/userSurveys';

import { AuthGuard } from '../Util/index';

/* Display Contact List Page */
router.get('/userSurveys', AuthGuard, DisplayContactListPage);

/* Display Contact List Page */
router.get('/userSurveys/delete/:id', AuthGuard, performDelete);

/* GET Route for displaying the Edit page - UPDATE Operation */
router.get('/userSurveys/updateview/:id', AuthGuard, displayEditPage);

/* POST Route for processing the Edit page - UPDATE Operation */
router.post('/userSurveys/updateview/:id', AuthGuard, processEditPage);

export default router;