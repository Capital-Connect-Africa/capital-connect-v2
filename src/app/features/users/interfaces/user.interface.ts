import { USER_ROLES } from "../enums/user.roles.enum";

export interface User{
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    password: string;
    roles: USER_ROLES[];
    referralCode: string;
    resetPasswordToken: string;
    resetPasswordExpires: Date;
    isEmailVerified: boolean;
    emailVerificationToken: string;
    emailVerificationExpires: string;
    hasAcceptedTerms: boolean
    hasAcceptedPrivacyPolicy: boolean;
    termsAcceptedAt: Date;
    createdAt: Date;
    updatedAt: Date;
}