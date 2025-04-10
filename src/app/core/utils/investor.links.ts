import { Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InvestorLinkService {

  constructor() {
  }
  // Method to return processed business links
  getBusinessLinks(value:boolean) {
    return [
      { label: 'Dashboard', href: '/business', exact: true, icon: 'grid_view', display: true },
      { label: 'Plans', href: '/business/plans', exact: false, icon: 'paid', display: value }, // default to false initially
      { label: 'My Business', href: '/business/my-business', exact: false, icon: 'business_center', display: true },
      { label: 'Special Criteria', href: '/business/special-criteria', exact: false, icon: 'contact_support', display: true },
      { label: 'My Bookings', href: '/business/my-bookings', exact: false, icon: 'event', display: false },
      { label: 'My Profile', href: '/user-profile', exact: true, icon: 'person', display: true },
    ]
  }
}

export const InvestorLinks = [
  { label: 'Dashboard', href: '/business', exact: true, icon: 'pi pi-th-large', display: true },
  // { label: 'Investors', href: '/business/investors-db', exact: true, icon: 'pi pi-database', display: true },
  { label: 'Plans', href: '/business/plans', exact: false, icon: 'pi pi-money-bill', display: false},
  { label: 'My Business', href: '/business/my-business', exact: false, icon: 'pi pi-briefcase', display: true },
  { label: 'Special Criteria', href: '/business/special-criteria', exact: false, icon: 'pi pi-question-circle', display: true },
  { label: 'My Bookings', href: '/business/my-bookings', exact: false, icon: 'pi pi-calendar', display: true },
  { label: 'Financials', href: '', exact: true,   icon: 'pi pi-chart-bar',  display: true,
    children: [
      { label: 'Income Statement', href: '/business/financial-reporting', exact: true, icon: 'pi pi-chart-line' },
      { label: 'Balance Sheet', href: '/business/balance-sheets', exact: true, icon: 'pi pi-wallet' },
      { label: 'Cash Flows', href: '/business/cash-flow', exact: true, icon: 'pi pi-arrows-h' }
    ]
   },
  { label: 'My Profile', href: '/user-profile', exact: true, icon: 'pi pi-user', display: true },
];