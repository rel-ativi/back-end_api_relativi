import { IBankInfo } from "../../interfaces/bank_info";
import { INameNumber, INameOnly } from "../../interfaces/generic";
import { IPaymentInfo } from "../../interfaces/payment_info";
import { IProfile, IUserScheduleRequest } from "../../interfaces/profiles";
import { IUserRequest } from "../../interfaces/users";

export const userCreate: IUserRequest = {
  name: "example",
  email: "example@org.com.br",
  password: "*)#Ygafbius241",
  is_adm: true,
  is_pro_user: true,
};
export const userCreateNotAdm: IUserRequest = {
  name: "example",
  email: "example@org.com.br",
  password: "*)#Ygafbius241",
  is_adm: false,
  is_pro_user: false,
};

export const userUpdate: IUserRequest = {
  name: "example",
  email: "example@org.com.br",
  password: "*)#Ygafbius241",
  is_adm: false,
  is_pro_user: true,
};

export const admLogin = {
  email: "example@org.com.br",
  password: "*)#Ygafbius241",
};

export const notAdmLogin = {
  email: "example@gmail.com.br",
  password: "*)#Ygafbius241",
};

export const createProfile: IProfile = {
  bio: "programador",
  phone: "99 99999-9999",
};

export const updateProfile: IProfile = {
  bio: "programador jr",
  phone: "99 99999-9999",
};

export const createSchedules: IUserScheduleRequest = {
  date: "2022/09/09",
};

export const createBank: IBankInfo = {
  bank: "Nu Bank",
  agency: "0000-1",
  account_number: "3798649287",
};

export const updateBank: IBankInfo = {
  bank: "Inter",
  agency: "9999-1",
  account_number: "338204738",
};

export const createPayment: IPaymentInfo = {
  card: "carro",
  card_name: "BMW",
  due_date: "20/12/2022",
  sec_code: 12,
};

export const updatePayment: IPaymentInfo = {
  card: "caminhão",
  card_name: "Mercedez",
  due_date: "10/02/2023",
  sec_code: 1,
};

export const createDistrict: INameOnly = {
  name: "Bairro teste create",
};

export const deleteDistrict: INameOnly = {
  name: "Bairro teste delete",
};
export const createCity: INameOnly = {
  name: "Cidade teste create",
};

export const deleteCity: INameOnly = {
  name: "Cidade teste delete",
};
export const createState: INameOnly = {
  name: "Estado teste create",
};

export const deleteState: INameOnly = {
  name: "Estado teste delete",
};
export const createCountry: INameOnly = {
  name: "País teste create",
};

export const deleteCountry: INameOnly = {
  name: "País teste delete",
};

export const createAddress = {
  street: "Rua teste",
  number: "1230",
  zip_code: "11223344",
};

export const updateAddress = {
  street: "Update street",
  number: "1312",
  zip_code: "12312312",
};

export const createCategory: INameOnly = {
  name: "Artes Marciais",
};

export const deleteCategory: INameOnly = {
  name: "Funcional",
};

export const createDay: INameNumber = {
  name: "Domingo",
  number: 0,
};

export const fisrtDay: INameNumber = {
  name: "Segunda",
  number: 1,
};

export const secondDay: INameNumber = {
  name: "Quarta-Feira",
  number: 3,
};

export const deleteDay: INameNumber = {
  name: "Sábado",
  number: 6,
};

export const createActivity = {
  name: "Karate",
  price: 50.97,
  max_users: 7,
  duration: "1 H",
  recurrent: true,
  starting_date: "10/01/2022",
};

export const updateActivity = {
  name: "Personal",
  max_users: 4,
};

export const createSchedule = {
  time: "19:30",
};
export const updateSchedule = {
  time: "13:45",
};

export const createScheduleWrongTime = {
  time: "22:30",
};
