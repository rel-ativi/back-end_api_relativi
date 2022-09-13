import AppDataSource from "../../data-source";

import { State } from "../../entities/states.entity";

const listStateService = async () => {

  const statesRepository = AppDataSource.getRepository(State);
  const states = await statesRepository.find();

  return states;
};

export default listStateService;