import AppDataSource from "../../data-source";
import { Activity } from "../../entities/activities.entity";
import { AppError } from "../../errors/AppError";

const deleteActivityService = async (id: string) => {
  const activityRepo = AppDataSource.getRepository(Activity);
  const activities = await activityRepo.find();

  const toInactive = activities.find((act) => act.id === id);

  if (!toInactive) {
    throw new AppError("Activity not found", 404);
  }

  if (!toInactive.is_active) {
    throw new AppError("Inactive activity");
  }

  await activityRepo.update(toInactive.id, { is_active: false });
};

export default deleteActivityService;
