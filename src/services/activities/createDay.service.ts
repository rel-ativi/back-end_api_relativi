import AppDataSource from "../../data-source";

import { Day } from "../../entities/days.entity";
import { AppError } from "../../errors/AppError";
import { INameNumber } from "../../interfaces/generic";

const createDayService = async ({
  name,
  number,
}: INameNumber): Promise<boolean> => {
  const daysrRepo = AppDataSource.getRepository(Day);

  const allDays = await daysrRepo.find();

  const dayAlreadyExists = allDays.find(
    (d) => d.name === name && d.number === number
  );

  if (dayAlreadyExists) {
    throw new AppError("Day already registered");
  }

  if (number < 0 || number > 6) {
    throw new AppError("Invalid number");
  }

  const day = new Day();
  day.name = name;
  day.number = number;

  daysrRepo.create(day);
  await daysrRepo.save(day);

  return true;
};

export default createDayService;
