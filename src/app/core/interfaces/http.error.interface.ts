import { HttpStatusCode } from "@angular/common/http";

export interface CustomHttpResponseError{
    statusText: string;
    method: HttpMethod;
    statusCode: HttpStatusCode | undefined;
    message: string | string[] | Record<string, any> | Record<string, any>[];
}

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

export interface ErrorState{
    showToast: boolean;
    error: CustomHttpResponseError | undefined;
}