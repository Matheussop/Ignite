import { inject, injectable } from "tsyringe";

import { ICarRepository } from "@modules/cars/repositories/ICarRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  name: string;
  description: string;
  daily_rate: number;
  license_plate: string;
  fine_amount: number;
  brand: string;
  category_id: string;
}

@injectable()
class CreateCarUseCase {
  constructor(
    @inject("CarRepository")
    private carRepository: ICarRepository
  ) {}

  async execute(data: IRequest): Promise<void> {
    const carAlreadyExists = await this.carRepository.findByLicensePlate(
      data.license_plate
    );

    if (carAlreadyExists) {
      throw new AppError(
        `Car with a license plate = ${data.license_plate}, already exists!`
      );
    }

    this.carRepository.create(data);
  }
}

export { CreateCarUseCase };
