import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";

import { IUsersRepositoryDTO } from "@modules/accounts/dtos/IUsersRepositoryDTO";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private userRepository: IUsersRepository
  ) {}

  async execute({
    name,
    email,
    password,
    driver_license,
  }: IUsersRepositoryDTO): Promise<void> {
    const userAlreadyExists = await this.userRepository.findByEmail(email);
    if (userAlreadyExists) {
      throw new AppError(`Email ${email} already exists!`);
    }
    const passwordHash = await hash(password, 7);

    this.userRepository.create({
      name,
      email,
      password: passwordHash,
      driver_license,
    });
  }
}

export { CreateUserUseCase };
