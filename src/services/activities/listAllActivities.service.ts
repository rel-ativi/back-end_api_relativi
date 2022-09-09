import AppDataSource from "../../data-source";

import { Activity } from "../../entities/activities.entity";

const listAllActivitiesService = async () => {
  const activityRepo = AppDataSource.getRepository(Activity);
  const activities = await activityRepo.find();

  return activities;
};

export default listAllActivitiesService;
