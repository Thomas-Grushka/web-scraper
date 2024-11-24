import scrapeFromAvito from "../utils/puppeteer.avito.scraper.js";

const scrapeFromAvitoController = async(req, res)=> {
    const link = await scrapeFromAvito(req.body);

    res.json({
        link,
    });
}

export default {
    scrapeFromAvitoController,
}