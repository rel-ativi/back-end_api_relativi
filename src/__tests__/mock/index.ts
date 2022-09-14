import { IBankInfo } from "../../interfaces/bank_info"
import { IScheduleRequest } from "../../interfaces/generic"
import { IPaymentInfo } from "../../interfaces/payment_info"
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
    email: "example@org.com.br",
    password: "*)#Ygafbius241"
}

export const notAdmLogin = {
    email: "example@gmail.com.br",
    password: "*)#Ygafbius241"
}

export const createProfile: IProfile = {
    bio: "programador",
    phone: "99 99999-9999",
}

export const updateProfile: IProfile = {
    bio: "programador jr",
    phone: "99 99999-9999",
}

export const createSchedules: IScheduleRequest = {
    date: "2022/09/09",
    hour: "10:30",
    activityId: "1",
    userId: "1"
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

export const createPayment: IPaymentInfo = {
    card: "carro",
    card_name: "BMW",
    due_date: "20/12/2022",
    sec_code: 12
}

export const updatePayment: IPaymentInfo = {
    card: "caminhão",
    card_name: "Mercedez",
    due_date: "10/02/2023",
    sec_code: 1
}
