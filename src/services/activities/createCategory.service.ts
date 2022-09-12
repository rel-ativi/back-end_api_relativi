import AppDataSource from "../../data-source";

import { Category } from "../../entities/categories.entity";
import { AppError } from "../../errors/AppError";
import { INameOnly } from "../../interfaces/generic";

const createCategoryService = async ({
  name,
}: INameOnly): Promise<Category> => {
  const categoryRepo = AppDataSource.getRepository(Category);

  const categories = await categoryRepo.find();

  const categoryAlreadyExists = categories.find((cat) => cat.name === name);

  if (categoryAlreadyExists) {
    throw new AppError("Category already registered");
  }

  const category = new Category();
  category.name = name;

  categoryRepo.create(category);
  await categoryRepo.save(category);

  return category;
};

export default createCategoryService;
