import {Router} from 'express';

import scrapingControllers from '../controllers/scraping.controllers.js';

import ctrlWrapper from '../decorators/ctrlWrapper.js';

const router = new Router();

router.post("/avito", ctrlWrapper(scrapingControllers.scrapeFromAvitoController));

export default router;