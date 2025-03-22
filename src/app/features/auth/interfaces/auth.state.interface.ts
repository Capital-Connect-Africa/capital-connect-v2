import { Session } from "../../../core/interfaces/session.interface";

export interface AuthState {
    isLoading: boolean;
    session: Session | null
}