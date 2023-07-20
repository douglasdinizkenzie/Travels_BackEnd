import "express-async-errors";
import express, { Application } from "express";
import { usersRoutes } from "./routes/users.routes";
import { handlerError } from "./middlewares/handleErrorMiddleware";
import { loginRouter } from "./routes/login.routes";

const app: Application = express();
app.use(express.json());

app.use("/users", usersRoutes);
app.use("/login", loginRouter);

app.use(handlerError);

export default app;
