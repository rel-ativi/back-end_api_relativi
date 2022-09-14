import { hash } from "bcryptjs";
import AppDataSource from "../../data-source";
import { User } from "../../entities/users.entity";
import { AppError } from "../../errors/AppError";

const updateUserService = async (
  name: string,
  email: string,
  password: string,
  id: string
): Promise<User> => {
  const usersRepo = AppDataSource.getRepository(User);
  const users = await usersRepo.find();
  const user = users.find((u) => u.id === id);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  if (!name && !email && !password) {
    throw new AppError("Nothing to update", 400);
  }

  await usersRepo.update(id, {
    name: name || user.name,
    email: email || user.email,
    password: !!password ? await hash(password, 10) : user.password,
  });

  const updated = await usersRepo.findOneBy({
    id,
  });

  return updated!;
};

export default updateUserService;
