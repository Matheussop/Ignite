import { Category } from "../entities/Category";

interface ISpecificationRepositoryDTO {
  name: string;
  description: string;
}

interface ISpecificationRepository {
  findByName(name: string): Promise<Category>;
  list(): Promise<Category[]>;
  create({ name, description }: ISpecificationRepositoryDTO): Promise<void>;
}

export { ISpecificationRepository, ISpecificationRepositoryDTO };
