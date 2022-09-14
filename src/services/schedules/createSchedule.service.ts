import AppDataSource from "../../data-source";
import { UserSchedule } from "../../entities/user_schedule.entity";

import { Activity } from "../../entities/activities.entity";
import { Profile } from "../../entities/profiles.entity";
import { AppError } from "../../errors/AppError";
import { IUserScheduleRequest } from "../../interfaces/profiles";

const createScheduleService = async (
  id: string,
  profile_id: string,
  { date }: IUserScheduleRequest
) => {
  const scheduleRepository = AppDataSource.getRepository(UserSchedule);
  const activityReository = AppDataSource.getRepository(Activity);
  const profileRepository = AppDataSource.getRepository(Profile);

  const profiles = await profileRepository.find();
  const profile = profiles.find((prof) => prof.id === profile_id);

  if (!profile) {
    throw new AppError("user not found", 404);
  }

  const activities = await activityReository.find();
  const activity = activities.find((act) => act.id === id);

  if (!activity) {
    throw new AppError("Activity not found", 404);
  }

  const requiredDate = new Date(date);
  const initialDate = new Date(activity!.starting_date);

  if (requiredDate < initialDate) {
    throw new AppError("Unavailable date");
  }

  if (activity.recurrent && !!activity.activity_schedule) {
    const avilableDays = activity.activity_schedule.days.map(
      (day) => day.number
    );

    if (!avilableDays.includes(requiredDate.getDay())) {
      throw new AppError("Choose another date");
    }
  }

  const schedule = new UserSchedule();

  schedule.date = date;
  schedule.hour = activity.activity_schedule.hour;
  schedule.profile = profile;
  schedule.activity = activity;

  scheduleRepository.create(schedule);
  await scheduleRepository.save(schedule);

  return schedule;
};

export default createScheduleService;
