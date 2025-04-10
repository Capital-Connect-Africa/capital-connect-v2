import { UserProperties } from "./voucher.interface";

export enum Operators{
    EQUAL_TO ='eq',
    LESS_THAN ='lt',
    GREATER_THAN ='gt',
    LESS_THAN_OR_EQUAL_TO ='lte',
    GREATER_THAN_OR_EQUAL_TO ='gte',
    BETWEEN ='between',
    EXISTS ='exists,'
}

export interface RuleFormData{
    userProperty: UserProperties;
    description: string;
    operator: Operators;
    value: string;
}

export interface Rule extends RuleFormData{
    id: number,
}