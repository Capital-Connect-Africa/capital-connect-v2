import { AccessTokenPayload } from "./access.token.payload.interface";
import { Investor } from "../../users/interfaces/investor.interface";
import { User } from "../../users/interfaces/user.interface";

export interface Session{
    accessToken?: string;
    accessTokenPayload?: AccessTokenPayload;
    user?: User | Investor,
    isActive?: boolean
}