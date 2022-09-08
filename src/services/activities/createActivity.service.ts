import AppDataSource from "../../data-source";

import { Activity } from "../../entities/activities.entity";
import { ActivitySchedule } from "../../entities/activity_schedule.entity";
import { Address } from "../../entities/addresses.entity";
import { Category } from "../../entities/categories.entity";
import { AppError } from "../../errors/AppError";
import { IActivityRequest } from "../../interfaces/activities";

const createActivityService = async ({
  name,
  price,
  min_users,
  max_users,
  duration,
  category_id,
  address,
  recurrent,
  activity_schedule_id,
  starting_date,
  image,
}: IActivityRequest): Promise<Activity> => {
  const activityRepo = AppDataSource.getRepository(Activity);
  const categoryRepo = AppDataSource.getRepository(Category);
  const addressRepo = AppDataSource.getRepository(Address);
  const activityScheduleRepo = AppDataSource.getRepository(ActivitySchedule);

  const category = await categoryRepo.findOne({
    where: { id: category_id },
  });

  if (!category) {
    throw new AppError("Category not found", 404);
  }

  const addresses = await addressRepo.find();
  const schedules = await activityScheduleRepo.find();

  const addressAlreadyExists = addresses.find(
    (adrs) => adrs.street === address.street && adrs.number === address.number
  );

  let newAddress: Address;

  if (!addressAlreadyExists) {
    newAddress = addressRepo.create({ ...address });
    await addressRepo.save(newAddress);
  }

  const schedule = schedules.find((sch) => sch.id === activity_schedule_id);

  const activity = new Activity();
  activity.name = name;
  activity.price = price;
  activity.max_users = max_users;
  activity.duration = duration;
  activity.category = category;
  activity.recurrent = recurrent;
  activity.starting_date = starting_date;
  activity.address = addressAlreadyExists || newAddress!;
  if (min_users) activity.min_users = min_users;
  if (schedule) activity.activity_schedule = schedule;

  activityRepo.create(activity);
  await activityRepo.save(activity);

  return activity;
};

export default createActivityService;
