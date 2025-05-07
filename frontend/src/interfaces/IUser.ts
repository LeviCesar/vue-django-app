export interface IUserForm {
    username: string,
    email: string,
    password: string,
}

export interface IUser {
    id: number | null,
    username: string | null,
    email: string | null,
    registerDate: Date | null
}