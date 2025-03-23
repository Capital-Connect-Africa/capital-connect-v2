import { Session } from "./session.interface";

export interface AuthState {
    isLoading: boolean;
    session: Session | null
}