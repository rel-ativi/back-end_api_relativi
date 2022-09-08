import AppDataSource from "../../data-source";

import { Category } from "../../entities/categories.entity";
import { AppError } from "../../errors/AppError";

const deleteCategoryService = async (id: string): Promise<void> => {
  const categoryRepo = AppDataSource.getRepository(Category);
  const categories = await categoryRepo.find();

  const toDelete = categories.find((cat) => cat.id === id);

  if (!toDelete) {
    throw new AppError("Category not found", 404);
  }

  await categoryRepo.delete(toDelete);
};

export default deleteCategoryService;
