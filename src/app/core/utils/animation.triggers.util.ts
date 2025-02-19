import { trigger, transition, style, animate } from '@angular/animations';

export const slideInFromBottom = trigger('slideInFromBottom', [
  transition(':enter', [
    style({ transform: 'translateY(100%)', opacity: 0 }),
    animate('1s ease-out', style({ transform: 'translateY(0)', opacity: 1 })),
  ]),
]);

export const slideInFromRight = trigger('slideInFromRight', [
  transition(':enter', [
    style({ transform: 'translateX(100%)', opacity: 0 }),
    animate('1s ease-out', style({ transform: 'translateX(0)', opacity: 1 })),
  ]),
]);

export const slideInFromLeft = trigger('slideInFromLeft', [
  transition(':enter', [
    style({ transform: 'translateX(-100%)', opacity: 0 }),
    animate('1s ease-out', style({ transform: 'translateX(0)', opacity: 1 })),
  ]),
]);
