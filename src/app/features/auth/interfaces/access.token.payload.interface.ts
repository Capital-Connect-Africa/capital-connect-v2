import { USER_ROLES } from "../../users/enums/user.roles.enum"

export interface AccessTokenPayload{
    exp:number;
    sub:number,
    iat: number;
    username:string
    firstName: string;
    lastName: string;
    roles: USER_ROLES[];
    referralCode: string;
    hasAcceptedTerms:boolean;
    subscriptionTier: string;
}