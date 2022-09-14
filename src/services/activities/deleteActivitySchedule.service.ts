import AppDataSource from "../../data-source";
import { Activity } from "../../entities/activities.entity";

import { ActivitySchedule } from "../../entities/activity_schedule.entity";
import { AppError } from "../../errors/AppError";

const deleteActivityScheduleService = async (id: string): Promise<void> => {
  const activitiesRepo = AppDataSource.getRepository(Activity);
  const activitySchedulerepo = AppDataSource.getRepository(ActivitySchedule);

  const activities = await activitiesRepo.find();
  const schedules = await activitySchedulerepo.find();

  const owner = activities.find((act) => act.activity_schedule.id === id);
  const toDelete = schedules.find((sch) => sch.id === id);

  if (!owner) {
    throw new AppError("Activity not found", 404);
  }

  if (!toDelete) {
    throw new AppError("Activity Schedule not found", 404);
  }

  await AppDataSource.createQueryBuilder()
    .delete()
    .from(ActivitySchedule)
    .where("id = :id", { id: id })
    .execute();
};

export default deleteActivityScheduleService;
