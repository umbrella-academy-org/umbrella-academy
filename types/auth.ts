import { BaseUser, Trainer } from "./user";

export interface AuthResponse {
    token: string;
    user: BaseUser | Trainer;
}