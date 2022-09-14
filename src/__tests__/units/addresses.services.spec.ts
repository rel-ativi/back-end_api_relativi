import { DataSource } from "typeorm";

import AppDataSource from "../../data-source";
import addressesCreateService from "../../services/addresses/addressesCreate.service";
import createCityService from "../../services/addresses/cityCreate.service";
import deleteCityService from "../../services/addresses/cityDelete.service";
import listCitiesService from "../../services/addresses/cityList.service";
import createCountryService from "../../services/addresses/countryCreate.service";
import deleteCountryService from "../../services/addresses/countryDelete.service";
import listCountriesService from "../../services/addresses/countryList.service";
import createDistrictService from "../../services/addresses/districtCreate.service";
import deleteDistrictService from "../../services/addresses/districtDelete.service";
import listDistrictsService from "../../services/addresses/districtList.service";
import createStateService from "../../services/addresses/stateCreate.service";
import deleteStatetService from "../../services/addresses/stateDelete.service";
import listStatesService from "../../services/addresses/stateList.service";
import createUserService from "../../services/users/createUser.service";

import { IAddressRequest, IAddressUpdate } from "../../interfaces/adresses";
import {
  createAddress,
  createCity,
  createCountry,
  createDistrict,
  createState,
  deleteCity,
  deleteCountry,
  deleteDistrict,
  deleteState,
  userCreate,
} from "../mock";
import addressesUpdateService from "../../services/addresses/addressesUpdate.service";

describe("Testing District services", () => {
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

  it("Should be able to create a district", async () => {
    const result = await createDistrictService(createDistrict);

    expect(result).toHaveProperty("id");
    expect(result).toHaveProperty("name");
    expect(result.name).toBe(createDistrict.name);
  });

  it("Should not be able to create a district with the same name", async () => {
    expect(async () => {
      await createDistrictService(createDistrict);
    }).rejects.toThrow("District already registered");
  });

  it("Should be able to delete a district", async () => {
    const newDistrict = await createDistrictService(deleteDistrict);
    const result = await deleteDistrictService(newDistrict.id);

    expect(result).toBe(undefined);
  });

  it("Should be able to list all districts", async () => {
    const result = await listDistrictsService();

    expect(result instanceof Array).toBe(true);
    expect(result.length).toBe(1);
    expect(result[0]).toHaveProperty("id");
    expect(result[0]).toHaveProperty("name");
    expect(result[0].name).toBe(createDistrict.name);
  });
});

describe("Testing City services", () => {
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

  it("Should be able to create a city", async () => {
    const result = await createCityService(createCity);

    expect(result).toHaveProperty("id");
    expect(result).toHaveProperty("name");
    expect(result.name).toBe(createCity.name);
  });

  it("Should not be able to create a city with the same name", async () => {
    expect(async () => {
      await createCityService(createCity);
    }).rejects.toThrow("City already registered");
  });

  it("Should be able to delete a district", async () => {
    const newCity = await createCityService(deleteCity);
    const result = await deleteCityService(newCity.id);

    expect(result).toBe(undefined);
  });

  it("Should be able to list all cities", async () => {
    const result = await listCitiesService();

    expect(result instanceof Array).toBe(true);
    expect(result.length).toBe(1);
    expect(result[0]).toHaveProperty("id");
    expect(result[0]).toHaveProperty("name");
    expect(result[0].name).toBe(createCity.name);
  });
});

describe("Testing State services", () => {
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

  it("Should be able to create a state", async () => {
    const result = await createStateService(createState);

    expect(result).toHaveProperty("id");
    expect(result).toHaveProperty("name");
    expect(result.name).toBe(createState.name);
  });

  it("Should not be able to create a state with the same name", async () => {
    expect(async () => {
      await createStateService(createState);
    }).rejects.toThrow("State already registered");
  });

  it("Should be able to delete a district", async () => {
    const newState = await createStateService(deleteState);
    const result = await deleteStatetService(newState.id);

    expect(result).toBe(undefined);
  });

  it("Should be able to list all cities", async () => {
    const result = await listStatesService();

    expect(result instanceof Array).toBe(true);
    expect(result.length).toBe(1);
    expect(result[0]).toHaveProperty("id");
    expect(result[0]).toHaveProperty("name");
    expect(result[0].name).toBe(createState.name);
  });
});

describe("Testing Country services", () => {
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

  it("Should be able to create a country", async () => {
    const result = await createCountryService(createCountry);

    expect(result).toHaveProperty("id");
    expect(result).toHaveProperty("name");
    expect(result.name).toBe(createCountry.name);
  });

  it("Should not be able to create a country with the same name", async () => {
    expect(async () => {
      await createCountryService(createCountry);
    }).rejects.toThrow("Country already registered");
  });

  it("Should be able to delete a district", async () => {
    const newCountry = await createCountryService(deleteCountry);
    const result = await deleteCountryService(newCountry.id);

    expect(result).toBe(undefined);
  });

  it("Should be able to list all cities", async () => {
    const result = await listCountriesService();

    expect(result instanceof Array).toBe(true);
    expect(result.length).toBe(1);
    expect(result[0]).toHaveProperty("id");
    expect(result[0]).toHaveProperty("name");
    expect(result[0].name).toBe(createCountry.name);
  });
});

describe("Testing Address services", async () => {
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

  const user = await createUserService(userCreate);
  const profile_id = user.profile.id;
  const is_adm = user.is_adm;

  const district = await createDistrictService(createDistrict);
  const city = await createCityService(createCity);
  const state = await createStateService(createState);
  const country = await createCountryService(createCountry);

  it("Should not be able to create an address with missing data", async () => {
    const requestData: IAddressRequest = {
      ...createAddress,
      district_id: "",
      city_id: city.id,
      state_id: state.id,
      country_id: country.id,
    };

    await expect(async () => {
      await addressesCreateService(profile_id, requestData);
    }).rejects.toThrow("District not found");
  });

  it("Should be able to create an address", async () => {
    const requestData: IAddressRequest = {
      ...createAddress,
      district_id: district.id,
      city_id: city.id,
      state_id: state.id,
      country_id: country.id,
    };

    const address = await addressesCreateService(profile_id, requestData);

    expect(address).toHaveProperty("id");
    expect(address).toHaveProperty("street");
    expect(address).toHaveProperty("number");
    expect(address).toHaveProperty("zip_code");
    expect(address.street).toBe(requestData.street);
    expect(address.number).toBe(requestData.number);
    expect(address.zip_code).toBe(requestData.zip_code);
  });

  it("Should be able to update an address", async () => {
    const requestData: IAddressRequest = {
      ...createAddress,
      district_id: district.id,
      city_id: city.id,
      state_id: state.id,
      country_id: country.id,
    };

    const address = await addressesCreateService(profile_id, requestData);

    const id = address.id;

    const updateData: IAddressUpdate = {
      ...createAddress,
    };

    const updated = await addressesUpdateService(
      id,
      profile_id,
      is_adm,
      updateData
    );

    expect(updated).toHaveProperty("id");
    expect(updated).toHaveProperty("street");
    expect(updated).toHaveProperty("number");
    expect(updated).toHaveProperty("zip_code");
    expect(updated.street).toBe(updateData.street);
    expect(updated.number).toBe(updateData.number);
    expect(updated.zip_code).toBe(updateData.zip_code);
  });
});
