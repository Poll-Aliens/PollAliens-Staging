import express from 'express';
const router = express.Router();

import { DisplayHomePage } from '../Controllers/index';

/* Display home page. */
router.get('/', DisplayHomePage);

/* Display home page. */
router.get('/home', DisplayHomePage);

export default router;
