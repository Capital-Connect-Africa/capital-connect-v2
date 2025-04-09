import { Component, inject, Input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidenavComponent } from "../../../../core/components/sidenav/sidenav.component";
import { Link } from '../../../../shared/interfaces/link.interface';
import { SignalsService } from '../../../../core/services/signals/signals.service';
import { InvestorLinks } from '../../../../core/utils/investor.links';
import { NavbarComponent } from "../../../../core/components/navbar/navbar.component";
import { InvestorOnboardingPageComponent } from "../../pages/InvestorOnboarding/InvestorOnboardingPage.component";
import { InvestorDashboardPageComponent } from "../../pages/InvestorDashboard/InvestorDashboardPage.component";

@Component({
  selector: 'app-investor-dashboard-layout',
  imports: [SidenavComponent, NavbarComponent, InvestorDashboardPageComponent],
  templateUrl: './dashboard.layout.component.html',
  styleUrl: './dashboard.layout.component.scss'
})
export class InvestorDashboardLayoutComponent {
  links: Link[] = []
  signalService = inject(SignalsService);

  //props
  @Input() bg_gray: boolean = false;
  @Input() title = 'Dashboard';


  ngOnInit():void{
    this.signalService.pageTitle.set(this.title);
    this.links = InvestorLinks
  }

}
