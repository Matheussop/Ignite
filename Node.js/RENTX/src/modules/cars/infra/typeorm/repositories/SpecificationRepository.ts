import { getRepository, Repository } from "typeorm";

import {
  ISpecificationRepository,
  ISpecificationRepositoryDTO,
} from "@modules/cars/repositories/ISpecificationRepository";

import { Specification } from "../entities/Specification";

class SpecificationRepository implements ISpecificationRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = getRepository(Specification);
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    const specifications = await this.repository.findByIds(ids);
    return specifications;
  }

  async create({
    name,
    description,
  }: ISpecificationRepositoryDTO): Promise<Specification> {
    const specification = this.repository.create({
      description,
      name,
    });

    await this.repository.save(specification);

    return specification;
  }

  async list(): Promise<Specification[]> {
    const specification = await this.repository.find();
    return specification;
  }

  async findByName(name: string): Promise<Specification> {
    const specification: Specification = await this.repository.findOne({
      name,
    });
    return specification;
  }
}

export { SpecificationRepository };
