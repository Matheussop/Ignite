import { Router } from "express";
import multer from "multer";

import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { CreateCarSpecificationController } from "@modules/cars/useCases/CreateCarSpecification/CreateCarSpecificationController";
import { ListCarsController } from "@modules/cars/useCases/listCars/ListCarsController";
import { UploadCarImageController } from "@modules/cars/useCases/uploadCarImage/UploadCarImageController";

import upload from "../../../../config/upload";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const carsRoutes = Router();
const uploadAvatar = multer(upload.upload("./tmp/cars"));

const createCarController = new CreateCarController();
const listCarsController = new ListCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarImageController = new UploadCarImageController();

carsRoutes.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle
);

carsRoutes.get("/available", listCarsController.handle);
carsRoutes.post(
  "/images/:id",
  ensureAuthenticated,
  ensureAdmin,
  uploadAvatar.array("images"),
  uploadCarImageController.handle
);
carsRoutes.post(
  "/specifications/:id",
  ensureAuthenticated,
  createCarSpecificationController.handle
);

export { carsRoutes };
