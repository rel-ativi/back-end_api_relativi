import AppDataSource from "../../data-source";

import { Day } from "../../entities/days.entity";

const listDaysService = async () => {
  const dayRepo = AppDataSource.getRepository(Day);
  const days = await dayRepo.find();

  return days;
};

export default listDaysService;
