import { DataSource } from "typeorm";

import AppDataSource from "../../data-source";
import createCategoryService from "../../services/activities/createCategory.service";
import createDayService from "../../services/activities/createDay.service";
import deleteCategoryService from "../../services/activities/deleteCategory.service";
import createCityService from "../../services/addresses/cityCreate.service";
import createCountryService from "../../services/addresses/countryCreate.service";
import createDistrictService from "../../services/addresses/districtCreate.service";
import createStateService from "../../services/addresses/stateCreate.service";
import createUserService from "../../services/users/createUser.service";

import {
  ActivityUpdate,
  IActivityRequest,
  IActivitySchedule,
} from "../../interfaces/activities";
import createActivityService from "../../services/activities/createActivity.service";
import {
  createActivity,
  createAddress,
  createCategory,
  createCity,
  createCountry,
  createDay,
  createDistrict,
  createSchedule,
  createScheduleWrongTime,
  createState,
  deleteCategory,
  deleteDay,
  fisrtDay,
  secondDay,
  updateActivity,
  updateSchedule,
  userCreate,
} from "../mock";
import listCategoriesService from "../../services/activities/listCategories.service";
import listDaysService from "../../services/activities/listDays.service";
import createActivityScheduleService from "../../services/activities/createActivitySchedule.service";
import updateActivityService from "../../services/activities/updateActivity.service";
import updateActivityScheduleService from "../../services/activities/updateActivitySchedule.service";

describe("Testing category services", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((error) => {
        console.log(error);
      });
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it("Should be able to create a category", async () => {
    const result = await createCategoryService(createCategory);

    expect(result).toHaveProperty("id");
    expect(result).toHaveProperty("name");
    expect(result.name).toBe(createCategory.name);
  });

  it("Should not be able to create a category with the same name", async () => {
    expect(async () => {
      await createCategoryService(createCategory);
    }).rejects.toThrow("Category already registered");
  });

  it("Should be able to delete a category", async () => {
    const newCategory = await createCategoryService(deleteCategory);
    const result = await deleteCategoryService(newCategory.id);

    expect(result).toBe(undefined);
  });

  it("Should be able to list all categories", async () => {
    const result = await listCategoriesService();

    expect(result instanceof Array).toBe(true);
    expect(result.length).toBe(1);
    expect(result[0]).toHaveProperty("id");
    expect(result[0]).toHaveProperty("name");
    expect(result[0].name).toBe(createCategory.name);
  });
});

describe("Testing day services", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((error) => {
        console.log(error);
      });
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it("Should be able to create a day", async () => {
    const result = await createDayService(createDay);

    expect(result).toHaveProperty("id");
    expect(result).toHaveProperty("name");
    expect(result).toHaveProperty("number");
    expect(result.name).toBe(createDay.name);
    expect(result.number).toBe(createDay.number);
  });

  it("Should not be able to create a day with the same name", async () => {
    expect(async () => {
      await createDayService(createDay);
    }).rejects.toThrow("Day already registered");
  });

  it("Should be able to delete a day", async () => {
    const newDay = await createCategoryService(deleteDay);
    const result = await deleteCategoryService(newDay.id);

    expect(result).toBe(undefined);
  });

  it("Should be able to list all days", async () => {
    const result = await listDaysService();

    expect(result instanceof Array).toBe(true);
    expect(result.length).toBe(1);
    expect(result[0]).toHaveProperty("id");
    expect(result[0]).toHaveProperty("name");
    expect(result[0].name).toBe(createDay.name);
  });
});

describe("Testing activity services", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((error) => {
        console.log(error);
      });
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it("Should not be able to create an activitiy with missing data", async () => {
    const user = await createUserService(userCreate);
    const profile_id = user.profile.id;

    const category = await createCategoryService(createCategory);

    const city = await createCityService(createCity);
    const state = await createStateService(createState);
    const country = await createCountryService(createCountry);

    const requestData: IActivityRequest = {
      ...createActivity,
      category_id: category.id,
      address: {
        ...createAddress,
        district_id: "",
        city_id: city.id,
        state_id: state.id,
        country_id: country.id,
      },
    };

    await expect(async () => {
      await createActivityService(profile_id, requestData);
    }).rejects.toThrow("District not found");
  });

  it("Should be able to create an activitiy", async () => {
    userCreate.email = "example@mail.com";
    const user = await createUserService(userCreate);
    const profile_id = user.profile.id;

    createCategory.name = createCategory.name + "0";

    createCity.name = createCity.name + "0";
    createState.name = createState.name + "0";
    createCountry.name = createCountry.name + "0";

    const category = await createCategoryService(createCategory);

    const district = await createDistrictService(createDistrict);
    const city = await createCityService(createCity);
    const state = await createStateService(createState);
    const country = await createCountryService(createCountry);

    const requestData: IActivityRequest = {
      ...createActivity,
      category_id: category.id,
      address: {
        ...createAddress,
        district_id: district.id,
        city_id: city.id,
        state_id: state.id,
        country_id: country.id,
      },
    };

    const activity = await createActivityService(profile_id, requestData);

    expect(activity).toHaveProperty("id");
    expect(activity).toHaveProperty("min_users");
    expect(activity).toHaveProperty("recurrent");
    expect(activity.min_users).toBe(1);
    expect(activity.recurrent).toBe(requestData.recurrent);
  });

  it("Should not be able to create an activitiy with the same name", async () => {
    userCreate.email = "mail@exeample.com";
    const user = await createUserService(userCreate);
    const profile_id = user.profile.id;

    createCategory.name = createCategory.name + "1";

    createDistrict.name = createDistrict.name + "1";
    createCity.name = createCity.name + "1";
    createState.name = createState.name + "1";
    createCountry.name = createCountry.name + "1";

    const category = await createCategoryService(createCategory);

    const district = await createDistrictService(createDistrict);
    const city = await createCityService(createCity);
    const state = await createStateService(createState);
    const country = await createCountryService(createCountry);

    const requestData: IActivityRequest = {
      ...createActivity,
      category_id: category.id,
      address: {
        ...createAddress,
        district_id: district.id,
        city_id: city.id,
        state_id: state.id,
        country_id: country.id,
      },
    };

    await expect(async () => {
      await createActivityService(profile_id, requestData);
    }).rejects.toThrow("Activity name already used");
  });

  it("Should be able to update an activitiy", async () => {
    userCreate.email = "example@email.com";
    const user = await createUserService(userCreate);
    const profile_id = user.profile.id;

    createActivity.name = createActivity.name + "2";

    createCategory.name = createCategory.name + "2";

    createDistrict.name = createDistrict.name + "2";
    createCity.name = createCity.name + "2";
    createState.name = createState.name + "2";
    createCountry.name = createCountry.name + "2";

    const category = await createCategoryService(createCategory);
    const newCategory = await createCategoryService(deleteCategory);

    const district = await createDistrictService(createDistrict);
    const city = await createCityService(createCity);
    const state = await createStateService(createState);
    const country = await createCountryService(createCountry);

    const requestData: IActivityRequest = {
      ...createActivity,
      category_id: category.id,
      address: {
        ...createAddress,
        district_id: district.id,
        city_id: city.id,
        state_id: state.id,
        country_id: country.id,
      },
    };

    const updateData: ActivityUpdate = {
      ...updateActivity,
      category_id: newCategory.id,
    };

    const activity = await createActivityService(profile_id, requestData);

    const result = await updateActivityService(activity.id, updateData);

    expect(result.name).toBe(updateData.name);
    expect(result.max_users).toBe(updateData.max_users);
    expect(result.category.id).toBe(updateData.category_id);
  });

  it("Should not be able to create an activitiy with a past date", async () => {
    userCreate.email = "mail@mail.com";
    const user = await createUserService(userCreate);
    const profile_id = user.profile.id;

    createActivity.name = createActivity.name + "2";
    createActivity.starting_date = "10/01/2010";

    createCategory.name = createCategory.name + "2";

    createDistrict.name = createDistrict.name + "2";
    createCity.name = createCity.name + "2";
    createState.name = createState.name + "2";
    createCountry.name = createCountry.name + "2";

    const category = await createCategoryService(createCategory);

    const district = await createDistrictService(createDistrict);
    const city = await createCityService(createCity);
    const state = await createStateService(createState);
    const country = await createCountryService(createCountry);

    const requestData: IActivityRequest = {
      ...createActivity,
      category_id: category.id,
      address: {
        ...createAddress,
        district_id: district.id,
        city_id: city.id,
        state_id: state.id,
        country_id: country.id,
      },
    };

    await expect(async () => {
      await createActivityService(profile_id, requestData);
    }).rejects.toThrow("Invalid starting date");
  });
});

describe("Testing activity schedule services", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((error) => {
        console.log(error);
      });
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it("Should not be able to create a schedule with invalid time", async () => {
    const user = await createUserService(userCreate);
    const profile_id = user.profile.id;

    createActivity.starting_date = "10/01/2022";

    const category = await createCategoryService(createCategory);

    const district = await createDistrictService(createDistrict);
    const city = await createCityService(createCity);
    const state = await createStateService(createState);
    const country = await createCountryService(createCountry);

    const dayOne = await createDayService(fisrtDay);
    const dayTwo = await createDayService(secondDay);

    const activityData: IActivityRequest = {
      ...createActivity,
      category_id: category.id,
      address: {
        ...createAddress,
        district_id: district.id,
        city_id: city.id,
        state_id: state.id,
        country_id: country.id,
      },
    };

    const activity = await createActivityService(profile_id, activityData);

    const requestData: IActivitySchedule = {
      ...createScheduleWrongTime,
      days: [dayOne.id, dayTwo.id],
    };

    await expect(async () => {
      await createActivityScheduleService(activity.id, requestData);
    }).rejects.toThrow("Invalid starting time");
  });

  it("Should not be able to create a schedule with missing data", async () => {
    fisrtDay.name = fisrtDay.name + "1";
    secondDay.name = secondDay.name + "1";

    const dayOne = await createDayService(fisrtDay);
    const dayTwo = await createDayService(secondDay);

    const requestData: IActivitySchedule = {
      ...createScheduleWrongTime,
      days: [dayOne.id, dayTwo.id],
    };

    await expect(async () => {
      await createActivityScheduleService("", requestData);
    }).rejects.toThrow("Activity not found");
  });

  it("Should be able to create a schedule", async () => {
    userCreate.email = "email@test.com";
    const user = await createUserService(userCreate);
    const profile_id = user.profile.id;

    createActivity.name = createActivity.name + "1";

    createCategory.name = createCategory.name + "1";

    createDistrict.name = createDistrict.name + "1";
    createCity.name = createCity.name + "1";
    createState.name = createState.name + "1";
    createCountry.name = createCountry.name + "1";

    fisrtDay.name = fisrtDay.name + "2";
    secondDay.name = secondDay.name + "2";

    const category = await createCategoryService(createCategory);

    const district = await createDistrictService(createDistrict);
    const city = await createCityService(createCity);
    const state = await createStateService(createState);
    const country = await createCountryService(createCountry);

    const dayOne = await createDayService(fisrtDay);
    const dayTwo = await createDayService(secondDay);

    const activityData: IActivityRequest = {
      ...createActivity,
      category_id: category.id,
      address: {
        ...createAddress,
        district_id: district.id,
        city_id: city.id,
        state_id: state.id,
        country_id: country.id,
      },
    };

    const activity = await createActivityService(profile_id, activityData);

    const requestData: IActivitySchedule = {
      ...createSchedule,
      days: [dayOne.id, dayTwo.id],
    };

    const result = await createActivityScheduleService(
      activity.id,
      requestData
    );

    expect(result).toHaveProperty("id");
    expect(result.hour).toBe(requestData.time);
    expect(result.days.length).toBe(requestData.days.length);
  });

  it("Should be able to update a schedule", async () => {
    userCreate.email = "email@teste.com";
    const user = await createUserService(userCreate);
    const profile_id = user.profile.id;

    createActivity.name = createActivity.name + "3";

    createCategory.name = createCategory.name + "3";

    createDistrict.name = createDistrict.name + "3";
    createCity.name = createCity.name + "3";
    createState.name = createState.name + "3";
    createCountry.name = createCountry.name + "3";

    fisrtDay.name = fisrtDay.name + "3";
    secondDay.name = secondDay.name + "3";

    const category = await createCategoryService(createCategory);

    const district = await createDistrictService(createDistrict);
    const city = await createCityService(createCity);
    const state = await createStateService(createState);
    const country = await createCountryService(createCountry);

    const dayOne = await createDayService(fisrtDay);
    const dayTwo = await createDayService(secondDay);
    const dayThree = await createDayService(createDay);

    const activityData: IActivityRequest = {
      ...createActivity,
      category_id: category.id,
      address: {
        ...createAddress,
        district_id: district.id,
        city_id: city.id,
        state_id: state.id,
        country_id: country.id,
      },
    };

    const activity = await createActivityService(profile_id, activityData);

    const requestData: IActivitySchedule = {
      ...createSchedule,
      days: [dayOne.id, dayTwo.id],
    };

    const updateData: IActivitySchedule = {
      ...updateSchedule,
      days: [dayThree.id],
    };

    await createActivityScheduleService(activity.id, requestData);

    const updated = await updateActivityScheduleService(
      activity.id,
      updateData
    );

    expect(updated.hour).toBe(requestData.time);
    expect(updated.days.length).toBe(updateData.days.length);
  });
});
