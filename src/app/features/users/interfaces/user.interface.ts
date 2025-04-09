import { USER_ROLES } from "../enums/user.roles.enum";

export interface User{
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    password: string;
    roles: USER_ROLES | USER_ROLES[];
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


export interface Profile {
    id: number;
    roles: string;
    lastName: string;
    username: string;
    firstName: string;
    referralCode: string;
    hasAcceptedTerms: boolean;
    mobileNumbers: MobileNumber[];
  }


  export interface MobileNumber {
    phoneNo: string;
    isVerified: boolean;
  }