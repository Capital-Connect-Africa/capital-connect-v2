import { User } from "../../users/interfaces/user.interface";
import { Investor } from "../../users/interfaces/investor.interface";

export interface AuthState {
    isLoggedIn: boolean;
    user: User | Investor | null,
    accessToken: string | null,
    isLoading: boolean
}