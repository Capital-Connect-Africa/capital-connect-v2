import { Component } from '@angular/core';
import {SidenavComponent} from "../../../../core";
import {BookingComponent} from "../../components/my-bookings/main/booking.component";
import { BusinessLinks } from '../../../../core/utils/business.links';
import { FinancialReporting } from "../../components/FinancialReporting/financial.component";

@Component({
  selector: 'app-my-bookings',
  standalone: true,
  imports: [
    SidenavComponent,
    FinancialReporting
],
  templateUrl: './financials.component.html',
  styleUrl: './financials.component.scss'
})
export class FinancialReportingPage {
  links =BusinessLinks
}
