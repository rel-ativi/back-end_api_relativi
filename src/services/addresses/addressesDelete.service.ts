import AppDataSource from "../../data-source";
import { Address } from "../../entities/addresses.entity";
import { AppError } from "../../errors/AppError";


const addressesDeleteService = async (id: string) => {

    const addressesRepository = AppDataSource.getRepository(Address);

    const addresses = await addressesRepository.find();

    const deleteAddress = addresses.find((address) => address.id === id);

    if(!deleteAddress){
        throw new AppError('Address does not exist', 404)
    }

    await   addressesRepository.delete(deleteAddress)
};

export default addressesDeleteService;