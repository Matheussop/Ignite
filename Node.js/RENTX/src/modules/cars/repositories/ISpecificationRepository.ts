import { Category } from "../infra/typeorm/entities/Category";
import { Specification } from "../infra/typeorm/entities/Specification";

interface ISpecificationRepositoryDTO {
  name: string;
  description: string;
}

interface ISpecificationRepository {
  findByName(name: string): Promise<Specification>;
  findByIds(ids: string[]): Promise<Specification[]>;
  list(): Promise<Specification[]>;
  create({
    name,
    description,
  }: ISpecificationRepositoryDTO): Promise<Specification>;
}

export { ISpecificationRepository, ISpecificationRepositoryDTO };
