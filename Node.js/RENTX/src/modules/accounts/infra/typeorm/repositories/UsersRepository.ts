import { getRepository, Repository } from "typeorm";

import { IUsersRepositoryDTO } from "../../../dtos/IUsersRepositoryDTO";
import { IUsersRepository } from "../../../repositories/IUsersRepository";
import { User } from "../entities/User";

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create({
    id,
    name,
    email,
    password,
    driver_license,
    avatar,
  }: IUsersRepositoryDTO): Promise<void> {
    const user = await this.repository.create({
      id,
      name,
      email,
      password,
      driver_license,
      avatar,
    });

    await this.repository.save(user);
  }

  async findByEmail(email: string): Promise<User> {
    const user: User = await this.repository.findOne({ email });
    return user;
  }

  async findById(id: string): Promise<User> {
    const user: User = await this.repository.findOne(id);
    return user;
  }
}

export { UsersRepository };
