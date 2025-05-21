import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./component/public/header/header.component";
import { FooterComponent } from "./component/public/footer/footer.component";
import { HttpClientModule } from '@angular/common/http';
import Aos from 'aos';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'CapsVille';
  ngOnInit(): void {
    Aos.init({
      duration: 1000,
      once: true,
    });
  }
}
