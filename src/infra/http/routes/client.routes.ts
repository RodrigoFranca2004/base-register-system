import { Router } from "express";
import { ClientController } from "../controllers/client.controller";
import { validate } from "../middlewares/validation.middleware";
import {
  createClientSchema,
  updateClientSchema,
  clientIdSchema,
} from "../validators/client.validator";

const clientRoutes = Router();
const clientController = new ClientController();

clientRoutes.post("/", validate(createClientSchema), (req, res) =>
  clientController.create(req, res)
);

clientRoutes.get("/:id", validate(clientIdSchema), (req, res) =>
  clientController.getById(req, res)
);

clientRoutes.get("/", (req, res) => clientController.list(req, res));

clientRoutes.put("/:id", validate(updateClientSchema), (req, res) =>
  clientController.update(req, res)
);

clientRoutes.delete("/:id", validate(clientIdSchema), (req, res) =>
  clientController.delete(req, res)
);

export { clientRoutes };
