import "express-async-errors";
import express, { Application } from "express";
import { usersRoutes } from "./routes/users.routes";
import { handlerError } from "./middlewares/handleErrorMiddleware";

const app: Application = express();
app.use(express.json());

app.use("/users", usersRoutes);

app.use(handlerError);

export default app;
