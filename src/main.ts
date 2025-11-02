import "dotenv/config";
import express, { Request, Response } from "express";

import { connectDB } from "@infra/database";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

const startServer = async () => {
  try {
    await connectDB();

    app.listen(port, () => {
      console.log(`[SERVER] Server running at port ${port}`);
    });
  } catch (error) {
    console.error("[SERVER] Fail to start server", error);
  }
};

startServer();
