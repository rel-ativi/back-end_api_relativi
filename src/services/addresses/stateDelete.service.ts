import AppDataSource from "../../data-source";
import { State } from "../../entities/states.entity"; 
import { AppError } from "../../errors/AppError";

const deleteStatetService = async (id: string) => {

  const stateRepository = AppDataSource.getRepository(State);
  
  const state = await stateRepository.find();

  const deleteState = state.find((sta) => sta.id === id);

  if(!deleteState){
      throw new AppError('State does not exist', 404)
  }

  await stateRepository.delete(deleteState)
};

export default deleteStatetService;