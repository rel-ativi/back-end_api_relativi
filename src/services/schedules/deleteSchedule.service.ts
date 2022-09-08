import AppDataSource from "../../data-source";
import { UserSchedule } from "../../entities/user_schedule.entity";

import { AppError } from "../../errors/AppError";

const deleteScheduleService = async (id: string) => {
  const scheduleRepository = AppDataSource.getRepository(UserSchedule);

  const schedules = await scheduleRepository.find();

  const schedule = schedules.find((sche) => sche.id === id);

  if (!schedule) {
    throw new AppError("schedule not found", 404);
  }

  scheduleRepository.delete(schedule);

  return true;
};

export default deleteScheduleService;
