import AppDataSource from "../data-source";
import { UserSchedule } from "../entities/user_schedule";

import { Activity } from "../entities/activities";
import { Profile } from "../entities/profiles";
import { AppError } from "../errors/AppError";
import { IScheduleRequest } from "../interfaces/generic";

const createScheduleService = async ({
  activityId,
  userId,
  date,
  hour,
}: IScheduleRequest) => {
  const scheduleRepository = AppDataSource.getRepository(UserSchedule);
  const activityReository = AppDataSource.getRepository(Activity);
  const profileRepository = AppDataSource.getRepository(Profile);

  console.log(
    activityId,
    userId,
    date,
    hour,
    "2: parâmetros recebidos do controller"
  );

  const profiles = await profileRepository.find();
  const profile = profiles.find((prof) => prof.id === userId);

  if (!profile) {
    throw new AppError("user not found", 404);
  }

  const activities = await activityReository.find();
  const activity = activities.find((act) => act.id === activityId);

  if (!activity) {
    throw new AppError("activity not found", 404);
  }

  const schedule = new UserSchedule();

  schedule.date = date;
  schedule.hour = hour;
  schedule.profile = profile;
  schedule.activity = activity;

  console.log(schedule, "3: schedule criado no service");

  scheduleRepository.create(schedule);
  await scheduleRepository.save(schedule);

  return schedule;
};

export default createScheduleService;
