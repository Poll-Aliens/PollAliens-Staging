import express from 'express';
const router = express.Router();

import { DisplayContactListPage, displayEditPage, performDelete, processEditPage } from '../Controllers/contact-list';

import { AuthGuard } from '../Util/index';

/* Display Contact List Page */
router.get('/contact-list', AuthGuard, DisplayContactListPage);

/* Display Contact List Page */
router.get('/contact-list/delete/:id', AuthGuard, performDelete);

/* GET Route for displaying the Edit page - UPDATE Operation */
router.get('/contact-list/updateview/:id', AuthGuard, displayEditPage);

/* POST Route for processing the Edit page - UPDATE Operation */
router.post('/contact-list/updateview/:id', AuthGuard, processEditPage);

export default router;