
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface FilterUserInputByPage {
    search: FilterUserInput;
    page: number;
    pageSize: number;
    sort?: Nullable<string>;
    sorts_params?: Nullable<string>;
}

export interface FilterUserInput {
    username?: Nullable<string>;
    status?: Nullable<string>;
    email?: Nullable<string>;
}

export interface CreateUserInput {
    username: string;
    password: string;
    description?: Nullable<string>;
    status?: Nullable<string>;
    img_avatar?: Nullable<string>;
    email?: Nullable<string>;
    birth_day?: Nullable<DateTime>;
    role?: Nullable<string>;
    phone?: Nullable<string>;
    first_name?: Nullable<string>;
    last_name?: Nullable<string>;
}

export interface UpdateUserInput {
    username?: Nullable<string>;
    password?: Nullable<string>;
    description?: Nullable<string>;
    status?: Nullable<string>;
    img_avatar?: Nullable<string>;
    email?: Nullable<string>;
    birth_day?: Nullable<DateTime>;
    role?: Nullable<string>;
    phone?: Nullable<string>;
    first_name?: Nullable<string>;
    last_name?: Nullable<string>;
    _id?: Nullable<string>;
}

export interface Roles {
    code: string;
    users: User[];
}

export interface User {
    _id?: Nullable<string>;
    username: string;
    password: string;
    createdAt: DateTime;
    updatedAt: DateTime;
    description?: Nullable<string>;
    status?: Nullable<string>;
    img_avatar?: Nullable<string>;
    email?: Nullable<string>;
    birth_day?: Nullable<DateTime>;
    roleCode?: Nullable<string>;
    role: Roles;
    phone?: Nullable<string>;
    first_name?: Nullable<string>;
    last_name?: Nullable<string>;
}

export interface UserNotPassword {
    _id?: Nullable<string>;
    username: string;
    createdAt: DateTime;
    updatedAt: DateTime;
    description?: Nullable<string>;
    status?: Nullable<string>;
    img_avatar?: Nullable<string>;
    email?: Nullable<string>;
    birth_day?: Nullable<DateTime>;
    roleCode?: Nullable<string>;
    role: Roles;
    phone?: Nullable<string>;
    first_name?: Nullable<string>;
    last_name?: Nullable<string>;
}

export interface PaginatedUser {
    nodes?: Nullable<UserNotPassword[]>;
    total: number;
}

export interface IQuery {
    users(filter: FilterUserInputByPage): PaginatedUser | Promise<PaginatedUser>;
    findByUserName(username: string): User | Promise<User>;
}

export interface IMutation {
    createUser(createUserInput: CreateUserInput): UserNotPassword | Promise<UserNotPassword>;
    updateUser(updateUserInput: UpdateUserInput): UserNotPassword | Promise<UserNotPassword>;
    removeUser(id: number): UserNotPassword | Promise<UserNotPassword>;
}

export type DateTime = any;
type Nullable<T> = T | null;
