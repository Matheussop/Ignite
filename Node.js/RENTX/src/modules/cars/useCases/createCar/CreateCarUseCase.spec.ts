import { CarRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carRepositoryInMemory: CarRepositoryInMemory;

describe("Create category", () => {
  beforeEach(() => {
    carRepositoryInMemory = new CarRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carRepositoryInMemory);
  });

  it("should be able to create a new car", async () => {
    const car = {
      name: "name",
      description: "description",
      daily_rate: 2,
      license_plate: "license_plate",
      fine_amount: 1,
      brand: "brand",
      category_id: "category_id",
    };

    await createCarUseCase.execute(car);
  });

  it("should be not able to create a car with exists license plate", async () => {
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

      await createCarUseCase.execute(car);
      await createCarUseCase.execute(car);
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should be able to create a car with a atribute avaible equal true by default", async () => {
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

      await createCarUseCase.execute(car);
    }).rejects.toBeInstanceOf(AppError);
  });
});
