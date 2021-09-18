import { IUsersRepositoryDTO } from "../../dtos/IUsersRepositoryDTO";
import { User } from "../../infra/typeorm/entities/User";
import { IUsersRepository } from "../IUsersRepository";

class UsersRepositoryInMemory implements IUsersRepository {
  user: User[] = [];

  async findByName(name: string): Promise<User> {
    const user = this.user.find((c) => c.name === name);
    return user;
  }

  async list(): Promise<User[]> {
    return this.user;
  }

  async create(data: IUsersRepositoryDTO): Promise<void> {
    const user = new User();
    Object.assign(user, data);

    this.user.push(user);
  }

  async findByEmail(email: string): Promise<User> {
    const user = this.user.find((c) => c.email === email);
    return user;
  }

  async findById(id: string): Promise<User> {
    const user = this.user.find((c) => c.id === id);
    return user;
  }
}

export { UsersRepositoryInMemory };
