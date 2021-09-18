import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe("Create category", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory
    );
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it("should be able to authenticate an user", async () => {
    const user = {
      name: "Name test",
      password: "1234567",
      email: "user@test.com",
      driver_license: "123456",
    };

    await createUserUseCase.execute(user);
    const authenticatedResponse = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(authenticatedResponse).toHaveProperty("token");
    expect(authenticatedResponse).toHaveProperty("user");
  });

  it("should  not be able to authenticated an nonexistent user", async () => {
    expect(async () => {
      const user = {
        password: "Passwordtest",
        email: "false@test.com",
      };

      const authenticatedResponse = await authenticateUserUseCase.execute(user);
      console.log(authenticatedResponse);
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should  not be able to authenticated with incorrect password", async () => {
    expect(async () => {
      const user = {
        name: "Name test",
        password: "Passwordtest",
        email: "user@test.com",
        driver_license: "123456",
      };

      await createUserUseCase.execute(user);
      const authenticatedResponse = await authenticateUserUseCase.execute({
        email: user.email,
        password: "123456",
      });

      expect(authenticatedResponse).toHaveProperty("token");
      expect(authenticatedResponse).toHaveProperty("user");
    }).rejects.toBeInstanceOf(AppError);
  });
});
