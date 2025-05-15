import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-new-ticket',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './new-ticket.component.html',
  styleUrl: './new-ticket.component.css'
})
export class NewTicketComponent {
  @ViewChild('pdfContent') pdfContent!: ElementRef;

  // Datos del formulario
  ticketData: any = null;

  // Lógica cuando se envía el formulario
  submitForm(form: NgForm) {
    if (!form.valid) {
      alert('Por favor completa todos los campos obligatorios.');
      return;
    }

    this.ticketData = { ...form.value }; // Guardamos los datos para mostrarlos
  }

  // Lógica para generar el PDF del resumen
  generatePDF() {
    const content = this.pdfContent.nativeElement;

    html2canvas(content).then(canvas => {
      const imageData = canvas.toDataURL('image/png');
      const doc = new jsPDF();
      const imgWidth = 210;
      const imgHeight = canvas.height * imgWidth / canvas.width;

      doc.addImage(imageData, 'PNG', 0, 0, imgWidth, imgHeight);
      doc.save('ticket_resumen.pdf');
    });
  }
}
