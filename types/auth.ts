import { BaseUser } from "./user";

export interface AuthResponse {
    token: string;
    user: BaseUser;
}