import { Component } from '@angular/core';
import { WelcomeComponent } from "../../component/welcome/welcome.component";
import { AboutUsComponent } from "../../component/about-us/about-us.component";
import { ContactComponent } from "../../component/contact/contact.component";
import { StatisticsComponent } from "../../component/statistics/statistics.component";

@Component({
  selector: 'app-home',
  imports: [WelcomeComponent, AboutUsComponent, ContactComponent, StatisticsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
