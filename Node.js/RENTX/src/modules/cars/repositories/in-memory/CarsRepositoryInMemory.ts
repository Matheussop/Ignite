import { ICreateCarDto } from "@modules/cars/dtos/ICreateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";

import { ICarRepository } from "../ICarRepository";

class CarRepositoryInMemory implements ICarRepository {
  car: Car[] = [];

  async findById(id: string): Promise<Car> {
    const car = this.car.find((c) => c.id === id);
    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = this.car.find((c) => c.license_plate === license_plate);
    return car;
  }

  async findAvailable(
    brand: string,
    name: string,
    category_id: string
  ): Promise<Car[]> {
    const cars = this.car.filter((car) => {
      if (
        car.available === true ||
        (brand && car.brand === brand) ||
        (name && car.name === name) ||
        (category_id && car.category_id === category_id)
      ) {
        return car;
      }
      return null;
    });
    return cars;
  }

  async create(data: ICreateCarDto): Promise<Car> {
    const car = new Car();
    Object.assign(car, data);

    await this.car.push(car);

    return car;
  }
}

export { CarRepositoryInMemory };
