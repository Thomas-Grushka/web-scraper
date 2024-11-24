import express from "express";
import cors from "cors";
import "dotenv/config";

import scrapingRoutes from "./routes/scraping.routes.js";

import {notFoundHandler, errorHandler} from "./middlewares/index.js";

const {PORT = 5000} = process.env;
const port = Number(PORT);

const startServer = ()=> {
    const app = express();
    app.use(cors());
    app.use(express.json());

    app.use("/api/scraping", scrapingRoutes);

    app.use(notFoundHandler);
    app.use(errorHandler);

    app.listen(port, ()=> console.log(`Server running on port ${port}`));
}

export default startServer;


