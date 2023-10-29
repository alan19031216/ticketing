import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import {
  errorHandler,
  NotFoundError,
  currentUser,
} from "@alanwkorganization/common";
import { createChargeRouter } from "./routes/new";


const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);

app.use(currentUser);

app.use(createChargeRouter)

// If dont have express-async-errors, express cannot return data which you need method two
app.all("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
