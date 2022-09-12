import AppDataSource from "../../data-source";
import { Activity } from "../../entities/activities.entity";
import { ActivitySchedule } from "../../entities/activity_schedule.entity";
import { Day } from "../../entities/days.entity";
import { AppError } from "../../errors/AppError";
import { IActivitySchedule } from "../../interfaces/activities";

const updateActivityScheduleService = async (
  activity_id: string,
  { time, days }: IActivitySchedule
): Promise<ActivitySchedule> => {
  const activityRepo = AppDataSource.getRepository(Activity);
  const activityScheduleRepo = AppDataSource.getRepository(ActivitySchedule);
  const daysRepo = AppDataSource.getRepository(Day);

  const activities = await activityRepo.find();
  const schedules = await activityScheduleRepo.find();
  const allDays = await daysRepo.find();

  const activity = activities.find((act) => act.id === activity_id);

  if (!activity) {
    throw new AppError("Activity not found", 404);
  }

  const id = activity.activity_schedule.id;

  const schedule = schedules.find((sch) => sch.id === id);

  if (!schedule) {
    throw new AppError("Activity schedule not found", 404);
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

  await activityScheduleRepo.update(id, {
    hour: hour || schedule.hour,
    days: daysArray.length > 0 ? [...daysArray] : schedule.days,
  });

  const updated = await activityScheduleRepo.findOneBy({
    id,
  });

  return updated!;
};

export default updateActivityScheduleService;
