import AppDataSource from "../../data-source";
import { Day } from "../../entities/days.entity";
import { AppError } from "../../errors/AppError";

const deleteDayService = async (id: string): Promise<void> => {
  const daysRepo = AppDataSource.getRepository(Day);
  const allDays = await daysRepo.find();

  const toDelete = allDays.find((d) => d.id === id);

  if (!toDelete) {
    throw new AppError("Day not found", 404);
  }

  await daysRepo.delete(toDelete);
};

export default deleteDayService;
