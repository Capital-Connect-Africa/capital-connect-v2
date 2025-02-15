import { USER_ROLES } from "../enums/user.roles.enum";

export interface SignupDetails{
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    roles: USER_ROLES[];
    referralCode?: string;
    hasAcceptedTerms: boolean;
    hasAcceptedPrivacyPolicy: boolean;
}