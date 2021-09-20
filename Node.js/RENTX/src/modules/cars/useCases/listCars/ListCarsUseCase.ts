import { inject, injectable } from "tsyringe";

import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarRepository } from "@modules/cars/repositories/ICarRepository";

interface IRequest {
  category_id?: string;
  brand?: string;
  name?: string;
}

@injectable()
class ListCarsUseCase {
  constructor(
    @inject("CarRepository")
    private CarRepository: ICarRepository
  ) {}

  async execute({ name, brand, category_id }: IRequest): Promise<Car[]> {
    const Car = await this.CarRepository.findAvailable(
      name,
      brand,
      category_id
    );

    return Car;
  }
}

export { ListCarsUseCase };
