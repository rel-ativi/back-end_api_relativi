import AppDataSource from "../../data-source";

import { Activity } from "../../entities/activities.entity";
import { ActivitySchedule } from "../../entities/activity_schedule.entity";
import { Address } from "../../entities/addresses.entity";
import { Category } from "../../entities/categories.entity";
import { City } from "../../entities/cities.entity";
import { Country } from "../../entities/countries.entity";
import { District } from "../../entities/districts.entity";
import { Profile } from "../../entities/profiles.entity";
import { State } from "../../entities/states.entity";
import { AppError } from "../../errors/AppError";
import { IActivityRequest } from "../../interfaces/activities";

const createActivityService = async (
  profile_id: string,
  {
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
  }: IActivityRequest
): Promise<Activity> => {
  const activityRepo = AppDataSource.getRepository(Activity);
  const categoryRepo = AppDataSource.getRepository(Category);
  const addressRepo = AppDataSource.getRepository(Address);
  const districtsRepo = AppDataSource.getRepository(District);
  const citiesRepo = AppDataSource.getRepository(City);
  const statesRepo = AppDataSource.getRepository(State);
  const countriesRepo = AppDataSource.getRepository(Country);
  const profileRepo = AppDataSource.getRepository(Profile);
  const activityScheduleRepo = AppDataSource.getRepository(ActivitySchedule);

  const districts = await districtsRepo.find();

  const category = await categoryRepo.findOne({
    where: { id: category_id },
  });
  const profile = await profileRepo.findOne({
    where: { id: profile_id },
  });

  const district = districts.find((dis) => dis.id === address.district_id);
  const city = await citiesRepo.findOne({
    where: { id: address.city_id },
  });
  const state = await statesRepo.findOne({
    where: { id: address.state_id },
  });
  const country = await countriesRepo.findOne({
    where: { id: address.country_id },
  });

  if (!category) {
    throw new AppError("Category not found", 404);
  }
  if (!profile) {
    throw new AppError("Profile not found", 404);
  }
  if (!district) {
    throw new AppError("District not found", 404);
  }
  if (!city) {
    throw new AppError("City not found", 404);
  }
  if (!state) {
    throw new AppError("State not found", 404);
  }
  if (!country) {
    throw new AppError("Country not found", 404);
  }

  const addresses = await addressRepo.find();
  const schedules = await activityScheduleRepo.find();

  const addressAlreadyExists = addresses.find(
    (adrs) => adrs.street === address.street && adrs.number === address.number
  );

  let newAddress: Address;

  if (!addressAlreadyExists) {
    newAddress = addressRepo.create({
      street: address.street,
      number: address.number,
      zip_code: address.zip_code,
      district: district,
      city: city,
      state: state,
      country: country,
    });
    await addressRepo.save(newAddress);
  }

  const starting = new Date(starting_date);
  const now = new Date(Date.now());
  if (starting < now) {
    throw new AppError("Invalid starting date");
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
  activity.created_by = profile;
  if (min_users) activity.min_users = min_users;
  if (schedule) activity.activity_schedule = schedule;

  activityRepo.create(activity);
  await activityRepo.save(activity);

  return activity;
};

export default createActivityService;
