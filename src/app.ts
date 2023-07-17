import "reflect-metadata";
import "express-async-errors";
import express from "express";
import { HandlerErros } from "./errors";
import { usersRoutes } from "./routes/users.routes";

const app = express();
app.use(express.json());

app.use("/users", usersRoutes);

app.use(HandlerErros);

export default app;
