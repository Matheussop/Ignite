import { Car } from "@modules/cars/infra/typeorm/entities/Car";

import { ICreateCarDto } from "../dtos/ICreateCarDTO";

interface ICarRepository {
  findById(id: string): Promise<Car>;
  findByLicensePlate(license_plate: string): Promise<Car>;
  findAvailable(
    name?: string,
    brand?: string,
    category_id?: string
  ): Promise<Car[]>;
  create(data: ICreateCarDto): Promise<Car>;
}

export { ICarRepository };
