import AppDataSource from "../../data-source";

import { Category } from "../../entities/categories.entity";

const listCategoriesService = async () => {
  const categoryRepo = AppDataSource.getRepository(Category);
  const categories = await categoryRepo.find();

  return categories;
};

export default listCategoriesService;
