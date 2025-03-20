import { USER_ROLES } from "../../users/enums/user.roles.enum";

export interface SignupDto{
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    roles: USER_ROLES[];
    referralCode?: string;
    hasAcceptedTerms: boolean;
    hasAcceptedPrivacyPolicy: boolean;
}