import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { CustomerService } from '../../../services/customer.service';
import { ProductService } from '../../../services/product.service'; 

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
  customers: any = [];
  products: any = [];
  selectedCustomer: any = null;
  selectedProduct: any = null;
  selectedQuantity: number = 1;
  ticketItems: any[] = []; 

  constructor(
    private customerService: CustomerService,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.loadCustomers();
    this.loadProducts();
    this.loadCustomer();
  }

  loadCustomers() {
    this.customerService.getCustomers().subscribe(data => {
      this.customers = data;
    });
  }
  loadCustomer() {
    this.customerService.getCustomer(this.selectedCustomer).subscribe(data => {
      this.selectedCustomer = data;
    });
  }

  loadProducts() {
    this.productService.getAllProducts().subscribe(data => {
      this.products = data;
    });
  }

  onCustomerSelected(event: any) {
    const selectedId = event.target.value;
    this.selectedCustomer = this.customers.find((c: any) => c.id == selectedId);
  }

  onProductSelected(event: any) {
    const selectedId = event.target.value;
    this.selectedProduct = this.products.find((p: any) => p.id == selectedId);
  }

  addProductToTicket() {
    if (!this.selectedProduct) {
      alert('Por favor selecciona un producto');
      return;
    }

    if (this.selectedQuantity <= 0) {
      alert('La cantidad debe ser mayor a cero');
      return;
    }

    // Verificar si el producto ya está en el ticket
    const existingItemIndex = this.ticketItems.findIndex(
      item => item.product.id === this.selectedProduct.id
    );

    if (existingItemIndex >= 0) {
      // Actualizar cantidad si el producto ya existe
      this.ticketItems[existingItemIndex].quantity += this.selectedQuantity;
    } else {
      // Agregar nuevo producto al ticket
      this.ticketItems.push({
        product: this.selectedProduct,
        quantity: this.selectedQuantity
      });
    }

    // Resetear selección
    this.selectedProduct = null;
    this.selectedQuantity = 1;
  }

  removeItem(index: number) {
    this.ticketItems.splice(index, 1);
  }

  calculateTotal() {
    return this.ticketItems.reduce(
      (total, item) => total + (item.product.price * item.quantity),
      0
    );
  }

  submitForm(form: NgForm) {
    if (!form.valid) {
      alert('Por favor completa todos los campos obligatorios.');
      return;
    }

    if (this.ticketItems.length === 0) {
      alert('Debes agregar al menos un producto al ticket');
      return;
    }

    this.ticketData = { 
      ...form.value,
      items: this.ticketItems,
      total: this.calculateTotal(),
      date: new Date() 
    };
  }

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
      const imageData = canvas.toDataURL('image/png');
      const imgElement = document.createElement('img');
      imgElement.src = imageData;
      imgElement.alt = 'Resumen del ticket';
      imgElement.style.maxWidth = '100%';
      imgElement.style.marginTop = '20px';

      const previewContainer = document.getElementById('imagenPreview');
      if (previewContainer) {
        previewContainer.innerHTML = '';
        previewContainer.appendChild(imgElement);
        const link = document.createElement('a');
        link.href = imageData;
        link.download = 'ticket_resumen.png';
        link.innerText = 'Descargar imagen 🖼️';
        link.className = 'btn btn-success mt-2';
        previewContainer.appendChild(link);
      }
    });
  }
}