import { IUserRequest } from "../../interfaces/users"


export const userCreate: IUserRequest = {
    name: "example",
    email: "example@org.com.br",
    password: "*)#Ygafbius241",
    is_adm: true,
    is_pro_user: false
}

export const userUpdate: IUserRequest = {
    name: "example",
    email: "example@org.com.br",
    password: "*)#Ygafbius241",
    is_adm: false,
    is_pro_user: true
}
