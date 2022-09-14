import { DataSource } from "typeorm";
import AppDataSource from "../../data-source";
import createCategoryService from "../../services/activities/createCategory.service";
import createDayService from "../../services/activities/createDay.service";
import deleteCategoryService from "../../services/activities/deleteCategory.service";
import { createCategory, createDay, deleteCategory, deleteDay } from "../mock";

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
});
