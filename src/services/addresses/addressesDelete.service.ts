import AppDataSource from "../../data-source";
import { Address } from "../../entities/addresses.entity";
import { AppError } from "../../errors/AppError";


const addressesDeleteService = async (id: string) => {

    const addressesRepository = AppDataSource.getRepository(Address);


};

export default addressesDeleteService;