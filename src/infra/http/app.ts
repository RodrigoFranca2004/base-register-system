import "dotenv/config";
import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import "@infra/shared/container";
import "@infra/cache";
import "@infra/messaging";
import { router } from "./routes";
import { ZodError } from "zod";
import {
  BusinessRuleError,
  ResourceNotFoundError,
} from "@application/errors/application-errors";

const app = express();

app.use(express.json());

app.use("/api", router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ZodError) {
    return res.status(400).json({
      message: "Validation failed",
      errors: err.issues.map((i) => ({ path: i.path, message: i.message })),
    });
  }

  if (err instanceof SyntaxError && "body" in err) {
    return res
      .status(400)
      .json({ message: "Invalid JSON format in request body" });
  }

  if (err instanceof ResourceNotFoundError) {
    return res.status(404).json({ message: err.message });
  }
  if (err instanceof BusinessRuleError) {
    return res.status(400).json({ message: err.message });
  }

  console.error("[GLOBAL_ERROR_HANDLER]", err);
  return res.status(500).json({ message: "Internal Server Error" });
});

export { app };
