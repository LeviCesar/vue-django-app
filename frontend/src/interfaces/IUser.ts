export interface IUserForm {
    name: string,
    email: string,
    document: string,
    password: string,
    confirmPassword: string
}

export interface IUser {
    name: string,
    email: string,
    document: string, 
    registerDate: Date | null
}