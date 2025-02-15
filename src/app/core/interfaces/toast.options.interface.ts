import { ToastPositionType } from "primeng/toast";

export interface ToastOptions {
    severity: 'success' | 'info' | 'warn' | 'error' | 'secondary' | 'contrast';
    position?: ToastPositionType;
    summary: string;
    details: string;
    life?: number;
    key?: string;
}