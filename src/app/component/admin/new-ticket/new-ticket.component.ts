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
  @ViewChild('imagenPreview', { static: false }) imagenPreview!: ElementRef;


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
  generateImage() {
  const content = this.pdfContent.nativeElement;

  html2canvas(content).then(canvas => {
    scale: 2
    useCORS: true
    const imageData = canvas.toDataURL('image/png');

    
    const imgElement = document.createElement('img');
    imgElement.src = imageData;
    imgElement.alt = 'Resumen del ticket';
    imgElement.style.maxWidth = '100%';
    imgElement.style.marginTop = '20px';

    // Buscar contenedor seguro
    const previewContainer = document.getElementById('imagenPreview');
    
    if (previewContainer) {
      previewContainer.innerHTML = ''; // Limpiar contenido anterior
      previewContainer.appendChild(imgElement);
      const link = document.createElement('a');
      link.href = imageData;
      link.download = 'ticket_resumen.png';
      link.innerText = 'Descargar imagen 🖼️';
      link.className = 'btn btn-success mt-2';
      previewContainer.appendChild(link);

    } else {
      console.error('No se encontró el contenedor con id="imagenPreview"');
    }
    
  });
}


}
