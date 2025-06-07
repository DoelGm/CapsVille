import { Component, AfterViewInit } from '@angular/core';

declare const bootstrap: any;

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements AfterViewInit {

ngAfterViewInit() {
  const form = document.getElementById('contacto-form') as HTMLFormElement;
  const modalElement = document.getElementById('exitoModal');

  if (!form || !modalElement) return;

  form.addEventListener("submit", () => {
    const modal = new bootstrap.Modal(modalElement);
    modal.show();

    // Oculta el modal luego de 4 segundos
    setTimeout(() => modal.hide(), 4000);

    // Limpia los campos luego del envío
    setTimeout(() => form.reset(), 2000);
  });
}

}
