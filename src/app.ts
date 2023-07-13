import "reflect-metadata";
import "express-async-errors";
import express from "express";
import { HandlerErros } from "./errors";

const app = express();
app.use(express.json());

app.use(HandlerErros);

export default app;
