import AppDataSource from "../../data-source";
import { AppError } from "../../errors/AppError";
import { UserSchedule } from "../../entities/user_schedule";
import { Profile } from "../../entities/profiles";
import { IIdOnly } from "../../interfaces/generic";
import { User } from "../../entities/users";

const listScheduleService = async (id: string) => {
  const scheduleRepository = AppDataSource.getMongoRepository(UserSchedule);

  const schedules = await scheduleRepository.find();

  const schedule = schedules.filter((sche) => sche.profile.id === id);

  if (!schedule) {
    throw new AppError("schedules not found", 404);
  }

  console.log(schedule, "4: aqui deve ter o schedule capturado");

  return schedule;
};

export default listScheduleService;
