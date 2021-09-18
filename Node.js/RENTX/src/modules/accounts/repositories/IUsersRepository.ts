import { IUsersRepositoryDTO } from "../dtos/IUsersRepositoryDTO";
import { User } from "../infra/typeorm/entities/User";

interface IUsersRepository {
  create(data: IUsersRepositoryDTO): Promise<void>;
  findByEmail(email: string): Promise<User>;
  findById(id: string): Promise<User>;
  // list(): Promise<User[]>;
}

export { IUsersRepository };
