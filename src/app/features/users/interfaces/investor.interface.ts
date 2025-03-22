import { InvestorProfile } from "./investor.profile.interface";
import { User } from "./user.interface";

export interface Investor extends User {
    profile: InvestorProfile
}