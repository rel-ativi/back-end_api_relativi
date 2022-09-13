import AppDataSource from "../../data-source";

import { State } from "../../entities/states.entity"; 
import { AppError } from "../../errors/AppError";
import { INameOnly } from "../../interfaces/generic";

const createStateService = async ({ name,}: INameOnly): Promise<State> => {

  const stateRepository = AppDataSource.getRepository(State);

  const states = await stateRepository.find();

  const stateAlreadyExists = states.find((sta) => sta.name === name);

  if (stateAlreadyExists) {
    throw new AppError("State already registered");
  }

  const state = new State();
  state.name = name;

  stateRepository.create(states);

  await stateRepository.save(states);

  return state;
};

export default createStateService;