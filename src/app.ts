import cors from "cors";
import "express-async-errors";
import express, { Application } from "express";
import { usersRoutes } from "./routes/users.routes";
import { handlerError } from "./middlewares/handleErrorMiddleware";
import { loginRouter } from "./routes/login.routes";
import { addressRoutes } from "./routes/address.routes";
import { postRoutes } from "./routes/posts.routes";

const app: Application = express();
app.use(cors());
app.use(express.json());

app.use("/users", usersRoutes);
app.use("/login", loginRouter);
app.use("/address", addressRoutes);
app.use("/posts", postRoutes);

app.use(handlerError);

export default app;
