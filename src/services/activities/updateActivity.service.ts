import AppDataSource from "../../data-source";

import { Activity } from "../../entities/activities.entity";
import { ActivitySchedule } from "../../entities/activity_schedule.entity";
import { Address } from "../../entities/addresses.entity";
import { Category } from "../../entities/categories.entity";
import { AppError } from "../../errors/AppError";
import { ActivityUpdate } from "../../interfaces/activities";

const updateActivityService = async (
  id: string,
  {
    name,
    price,
    min_users,
    max_users,
    duration,
    category_id,
    recurrent,
    activity_schedule_id,
    starting_date,
    image_url,
  }: ActivityUpdate
): Promise<Activity> => {
  const activityRepo = AppDataSource.getRepository(Activity);
  const categoryRepo = AppDataSource.getRepository(Category);
  const activityScheduleRepo = AppDataSource.getRepository(ActivitySchedule);

  const activities = await activityRepo.find();
  const categories = await categoryRepo.find();
  const schedules = await activityScheduleRepo.find();

  const toUpdate = activities.find((act) => act.id === id);
  const newCategory = categories.find((cat) => cat.id === category_id);
  const schedule = schedules.find((sch) => sch.id === activity_schedule_id);

  if (!toUpdate) {
    throw new AppError("Activity not found", 404);
  }
  if (!newCategory) {
    throw new AppError("Category not found", 404);
  }

  await activityRepo.update(id, {
    name: name || toUpdate.name,
    price: price || toUpdate.price,
    min_users: min_users || toUpdate.min_users,
    max_users: max_users || toUpdate.max_users,
    duration: duration || toUpdate.duration,
    category: newCategory || toUpdate.category,
    recurrent: recurrent || toUpdate.recurrent,
    activity_schedule: schedule || toUpdate.activity_schedule,
    starting_date: starting_date || toUpdate.starting_date,
    image_url: image_url || toUpdate.image_url,
  });

  const updated = await activityRepo.findOneBy({
    id,
  });

  return updated!;
};

export default updateActivityService;
