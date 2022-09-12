import { User } from "../../entities/users.entity";
import AppDataSource from "../../data-source";
import { IUserCompleteResponse } from "../../interfaces/users";

const listUsersService = async (): Promise<IUserCompleteResponse[]> => {
  const userRepository = AppDataSource.getRepository(User);

  const users: IUserCompleteResponse[] = await userRepository.find();

  users.forEach((user) => {
    delete user.password;
  });

  return users;
};

export default listUsersService;
