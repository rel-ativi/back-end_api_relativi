interface UserCreate {
    name: string
    email: string
    password: string
    is_pro_user: boolean
    is_active: boolean
    is_adm: boolean
}

export const userCreate: UserCreate = {
    name: "example",
    email: "example@org.com.br",
    password: "*)#Ygafbius241",
    is_pro_user: false,
    is_active: true,
    is_adm: true
}
