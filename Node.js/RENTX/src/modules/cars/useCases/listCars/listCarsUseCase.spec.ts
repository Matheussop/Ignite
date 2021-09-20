import { CarRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarUseCase } from "../createCar/CreateCarUseCase";
import { ListCarsUseCase } from "./ListCarsUseCase";

let createCarUseCase: CreateCarUseCase;
let listCarUseCase: ListCarsUseCase;
let carRepositoryInMemory: CarRepositoryInMemory;

describe("Create category", () => {
  beforeEach(() => {
    carRepositoryInMemory = new CarRepositoryInMemory();
    listCarUseCase = new ListCarsUseCase(carRepositoryInMemory);
  });

  it("should be able to list all available cars", async () => {
    expect(async () => {
      const car = {
        name: "name",
        description: "description",
        daily_rate: 2,
        license_plate: "license_plate",
        fine_amount: 1,
        brand: "brand",
        category_id: "category_id",
      };

      const car2 = {
        name: "name",
        description: "description",
        daily_rate: 2,
        license_plate: "abcd1234",
        fine_amount: 1,
        brand: "brand",
        category_id: "category_id",
      };

      await carRepositoryInMemory.create(car);
      await carRepositoryInMemory.create(car2);

      const cars = await listCarUseCase.execute({});
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should be able to list all available cars by name", async () => {
    expect(async () => {
      const car = {
        name: "name",
        description: "description",
        daily_rate: 2,
        license_plate: "license_plate",
        fine_amount: 1,
        brand: "brand",
        category_id: "category_id",
      };

      const car2 = {
        name: "name2",
        description: "description",
        daily_rate: 2,
        license_plate: "abcd1234",
        fine_amount: 1,
        brand: "brand",
        category_id: "category_id",
      };

      await carRepositoryInMemory.create(car);
      await carRepositoryInMemory.create(car2);

      const cars = await listCarUseCase.execute({ name: "name" });
    }).rejects.toBeInstanceOf(AppError);
  });
});
