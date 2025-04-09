import { User } from "../../users/interfaces/user.interface";

export enum RegistrationStructure {
  CoOperative = "Co-operative",
  JointVenture = "Joint Venture",
  LimitedLiabilityPartnership = "Limited Liability Partnerships (LLP)",
  LimitedLiabilityPrivateCompany = "Limited Liability Private Company",
  LimitedLiabilityPublicCompany = "Limited Liability Public Company",
  NonForProfitOrganization = "Non-for-profit Organization",
  SoleProprietorship = "Sole Proprietorship"
}


export enum GrowthStage {
  Idea = "Idea",
  StartUpPreRevenue ="Start up- Pre Revenue",
  StartUpPostRevenue ="Start up- Post Revenue",
  EarlyStage ="Early Stage",
  GrowthStage ="Growth Stage",
  Mature = "Mature",
  Turnaround ="Turnaround",
  Distress ="Distress",
  Liquidation ="Liquidation",
  InitialPublicOffering ='Initial Public Offering'
}



export interface CompanyInput {
  name: string;
  country: string;
  useOfFunds:string[],
  esgFocusAreas: string[],
  fundsNeeded: number,
  segments:string[],
  businessSector: string;
  businessSubsector: string;
  productsAndServices: string;
  yearsOfOperation: string;
  growthStage: GrowthStage | any;
  numberOfEmployees: string;
  fullTimeBusiness: boolean;
  registrationStructure: string;
  investmentStructure: string[];
  isHidden:boolean

}

export interface SpecialCriteriaCompanyRes{
  companies: SpecialCriteriaCompany[]
}

export interface SpecialCriteriaCompany{
    id: number,
    name: string,
    country: string,
    businessSector: string,
    businessSubsector: string,
    productsAndServices: string,
    registrationStructure: string,
    investmentStructure: string,
    useOfFunds: string,
    esgFocusAreas: string,
    fundsNeeded: number,
    yearsOfOperation: string,
    growthStage: string,
    numberOfEmployees: string,
    fullTimeBusiness: boolean,
    percentageScore: number,
    isHidden:boolean,
}

 export interface CompanyResponse extends Company {
  user: User;
}

export interface Company extends CompanyInput {
  id: number;
  companyLogo: { id:string, path: string }
}


export interface ScoreSummary {
  businessFinancials: string;
  investorEligibility: string;
  investorPreparedness: string;
  impactAssessment: string;
}




export type CompanyDashBoardData  = 'ownerInfo' | 'companyInfo'  | 'submissionInfo'

export type VoucherTabs ='voucherInfo' | 'voucherUsers' | 'voucherRules'

export type InvestorDashboardData ='profile' | 'matched' | 'connected' | 'interested' | 'declined' | 'special-criteria'
