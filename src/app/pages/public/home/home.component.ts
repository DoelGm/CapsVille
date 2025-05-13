import { Component } from '@angular/core';
import { WelcomeComponent } from "../../../component/public/welcome/welcome.component";
import { AboutUsComponent } from "../../../component/public/about-us/about-us.component";
import { ContactComponent } from "../../../component/public/contact/contact.component";
import { StatisticsComponent } from "../../../component/public/statistics/statistics.component";

@Component({
  selector: 'app-home',
  imports: [WelcomeComponent, AboutUsComponent, ContactComponent, StatisticsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
