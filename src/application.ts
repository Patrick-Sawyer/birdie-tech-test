import * as express from "express";
import {observationsController} from "./controllers/observations";

const app = express();

app.use(observationsController);

export default app;
