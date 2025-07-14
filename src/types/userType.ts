export type TUserRole =  "ADMIN" | "SUPER_ADMIN" | "USER"

export type TUser = {
    id: string;
    email: string;
    role: TUserRole;
}