import { User } from "./user.interface";

export interface UserState{
    isLoading: boolean;
    verificationEmail: string | undefined;
    currentUser: User | undefined
}