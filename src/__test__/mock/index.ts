import { IBankInfo } from "../../interfaces/bank_info"
import { IProfile, IUserScheduleRequest } from "../../interfaces/profiles"
import { IUserRequest } from "../../interfaces/users"


export const userCreate: IUserRequest = {
    name: "example",
    email: "example@org.com.br",
    password: "*)#Ygafbius241",
    is_adm: true,
    is_pro_user: true
}
export const userCreateNotAdm: IUserRequest = {
    name: "example",
    email: "example@org.com.br",
    password: "*)#Ygafbius241",
    is_adm: false,
    is_pro_user: false
}

export const userUpdate: IUserRequest = {
    name: "example",
    email: "example@org.com.br",
    password: "*)#Ygafbius241",
    is_adm: false,
    is_pro_user: true
}

export const admLogin = {
    name: "example@org.com.br",
    email:"*)#Ygafbius241"
}

export const notAdmLogin = {
    name: "example@gmail.com.br",
    email:"*)#Ygafbius241"
}

export const createProfile: IProfile = {
    bio: "programador",
    phone: "99 99999-9999",
}

export const updateProfile: IProfile = {
    bio: "programador jr",
    phone: "99 99999-9999",
}

export const createSchedules: IUserScheduleRequest = {
    date: new Date("2022/09/09")
}

export const createBank: IBankInfo = {
    bank: "Nu Bank",
    agency: "0000-1",
    account_number: "3798649287"
}

export const updateBank: IBankInfo = {
    bank: "Inter",
    agency: "9999-1",
    account_number: "338204738"
}
