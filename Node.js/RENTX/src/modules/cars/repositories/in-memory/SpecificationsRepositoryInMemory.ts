import { ICreateCarDto } from "@modules/cars/dtos/ICreateCarDTO";
import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
import { ISpecificationRepository } from "@modules/cars/repositories/ISpecificationRepository";

interface IRequest {
  name: string;
  description: string;
}

class SpecificationRepositoryInMemory implements ISpecificationRepository {
  list(): Promise<Specification[]> {
    throw new Error("Method not implemented.");
  }
  specification: Specification[] = [];

  async findByIds(ids: string[]): Promise<Specification[]> {
    const allSpecifications = this.specification.filter((s) =>
      ids.includes(s.id)
    );
    return allSpecifications;
  }

  async findByName(name: string): Promise<Specification> {
    const specification = this.specification.find((s) => s.name === name);
    return specification;
  }

  async create(data: IRequest): Promise<Specification> {
    const specification = new Specification();
    Object.assign(specification, data);

    await this.specification.push(specification);

    return specification;
  }
}

export { SpecificationRepositoryInMemory };
