import AppDataSource from "../../data-source";

import { Activity } from "../../entities/activities.entity";
import { ActivitySchedule } from "../../entities/activity_schedule.entity";
import { Day } from "../../entities/days.entity";
import { AppError } from "../../errors/AppError";
import { IActivitySchedule } from "../../interfaces/activities";

const createActivityScheduleService = async (
  activity_id: string,
  { time, days }: IActivitySchedule
): Promise<boolean> => {
  const activityRepo = AppDataSource.getRepository(Activity);
  const activityScheduleRepo = AppDataSource.getRepository(ActivitySchedule);
  const daysRepo = AppDataSource.getRepository(Day);

  const activities = await activityRepo.find();
  const allDays = await daysRepo.find();

  const activity = activities.find((act) => act.id === activity_id);

  if (!activity) {
    throw new AppError("Activity not found", 404);
  }

  const daysArray: Day[] = [];

  days.forEach((day) => {
    const aDay = allDays.find((d) => d.id === day);

    if (!aDay) {
      throw new AppError("Day not found", 404);
    }

    daysArray.push(aDay);
  });

  const [hour, minutes] = time.split(":");

  if (+hour < 6 || (+hour >= 22 && +minutes > 0)) {
    throw new AppError("Invalid starting time");
  }

  const activity_schedule = new ActivitySchedule();
  activity_schedule.hour = hour;
  activity_schedule.days = [...daysArray];

  activityScheduleRepo.create(activity_schedule);
  await activityScheduleRepo.save(activity_schedule);

  return true;
};

export default createActivityScheduleService;
