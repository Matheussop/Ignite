import { inject, injectable } from "tsyringe";

import { ISpecificationRepository } from "@modules/cars/repositories/ISpecificationRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject("SpecificationRepository")
    private specificationRepository: ISpecificationRepository
  ) {}

  async execute({ name, description }: IRequest): Promise<void> {
    const categoryAlreadyExists = await this.specificationRepository.findByName(
      name
    );
    if (categoryAlreadyExists) {
      throw new AppError(`Category ${name} already exists!`);
    }
    this.specificationRepository.create({ name, description });
  }
}

export { CreateSpecificationUseCase };
