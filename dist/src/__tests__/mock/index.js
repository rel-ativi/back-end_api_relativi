"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDay = exports.secondDay = exports.fisrtDay = exports.createDay = exports.deleteCategory = exports.createCategory = exports.createDistrict = exports.createPayment = exports.updateBank = exports.createBank = exports.createSchedules = exports.updateProfile = exports.createProfile = exports.notAdmLogin = exports.admLogin = exports.userUpdate = exports.userCreateNotAdm = exports.userCreate = void 0;
exports.userCreate = {
    name: "example",
    email: "example@org.com.br",
    password: "*)#Ygafbius241",
    is_adm: true,
    is_pro_user: true,
};
exports.userCreateNotAdm = {
    name: "example",
    email: "example@org.com.br",
    password: "*)#Ygafbius241",
    is_adm: false,
    is_pro_user: false,
};
exports.userUpdate = {
    name: "example",
    email: "example@org.com.br",
    password: "*)#Ygafbius241",
    is_adm: false,
    is_pro_user: true,
};
exports.admLogin = {
    email: "example@org.com.br",
    password: "*)#Ygafbius241",
};
exports.notAdmLogin = {
    email: "example@gmail.com.br",
    password: "*)#Ygafbius241",
};
exports.createProfile = {
    bio: "programador",
    phone: "99 99999-9999",
};
exports.updateProfile = {
    bio: "programador jr",
    phone: "99 99999-9999",
};
exports.createSchedules = {
    date: "2022/09/09",
};
exports.createBank = {
    bank: "Nu Bank",
    agency: "0000-1",
    account_number: "3798649287",
};
exports.updateBank = {
    bank: "Inter",
    agency: "9999-1",
    account_number: "338204738",
};
exports.createPayment = {
    card: "carro",
    card_name: "BMW",
    due_date: "20/12/2022",
    sec_code: 12,
};
exports.createDistrict = {
    name: "Bairro Teste",
};
exports.createCategory = {
    name: "Artes Marciais",
};
exports.deleteCategory = {
    name: "Funcional",
};
exports.createDay = {
    name: "Domingo",
    number: 0,
};
exports.fisrtDay = {
    name: "Segunda",
    number: 1,
};
exports.secondDay = {
    name: "Quarta-Feira",
    number: 3,
};
exports.deleteDay = {
    name: "Sábado",
    number: 6,
};
