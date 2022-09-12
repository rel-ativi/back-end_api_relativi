import AppDataSource from "../../data-source";

import { ActivitySchedule } from "../../entities/activity_schedule.entity";
import { AppError } from "../../errors/AppError";

const deleteActivityScheduleService = async (id: string): Promise<void> => {
  const activitySchedulerepo = AppDataSource.getRepository(ActivitySchedule);
  const schedules = await activitySchedulerepo.find();

  const toDelete = schedules.find((sch) => sch.id === id);

  if (!toDelete) {
    throw new AppError("Activity Schedule not found", 404);
  }

  await activitySchedulerepo.delete(toDelete);
};

export default deleteActivityScheduleService;
