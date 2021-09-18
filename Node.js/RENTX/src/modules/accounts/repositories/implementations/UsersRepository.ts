import { getRepository, Repository } from "typeorm";

import { IUsersRepositoryDTO } from "../../dtos/IUsersRepositoryDTO";
import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";

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

  // async list(): Promise<User[]> {
  //   const users = await this.repository.find();
  //   return users;
  // }

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
