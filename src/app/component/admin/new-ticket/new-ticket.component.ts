import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { CustomerService } from '../../../services/customer.service';
import { ProductService } from '../../../services/product.service'; 
import { TicketService } from '../../../services/ticket.service'; 

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
  @ViewChild('productSelect') productSelect!: ElementRef<HTMLSelectElement>;


  // Datos del formulario
  ticketData: any = null;
  customers: any = [];
  products: any = [];
  selectedCustomer: any = null;
  selectedProduct: any = null;
  selectedQuantity: number = 1;
  ticketItems: any[] = []; 
  useWholesalePrice: boolean = false;
wholesalePrice: number | null = null;


  constructor(
    private customerService: CustomerService,
    private productService: ProductService,
    private ticketService: TicketService
  ) {}

  ngOnInit() {
    this.loadCustomers();
    this.loadProducts();
  }

  loadCustomers() {
    this.customerService.getCustomers().subscribe(data => {
      this.customers = data;
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

const existingItemIndex = this.ticketItems.findIndex(item =>
  item.product.id === this.selectedProduct.id &&
  item.useWholesalePrice === this.useWholesalePrice &&
  (!this.useWholesalePrice || item.wholesalePrice === this.wholesalePrice)
);


  if (existingItemIndex >= 0) {
    this.ticketItems[existingItemIndex].quantity += this.selectedQuantity;
  } else {
    this.ticketItems.push({
      product: this.selectedProduct,
      quantity: this.selectedQuantity,
      useWholesalePrice: this.useWholesalePrice,
      wholesalePrice: this.useWholesalePrice ? this.wholesalePrice : null
    });
  }
if (this.productSelect) {
  this.productSelect.nativeElement.value = '';
}
  // Reset
  this.selectedProduct = null;
  this.selectedQuantity = 1;
  this.useWholesalePrice = false;
  this.wholesalePrice = null;
}

  removeItem(index: number) {
    this.ticketItems.splice(index, 1);
  }


calculateTotal() {
  return this.ticketItems.reduce((total, item) => {
    const unitPrice = item.useWholesalePrice && item.wholesalePrice !== null
      ? item.wholesalePrice
      : item.product.price;
    return total + (unitPrice * item.quantity);
  }, 0);
}

  submitForm(form: NgForm) {
  if (!form.valid) {
    alert('Por favor completa todos los campos obligatorios.');
    return;
  }

  // Verificar que haya un cliente seleccionado
  if (!this.selectedCustomer || !this.selectedCustomer.id) {
    alert('Por favor selecciona un cliente');
    return;
  }

if (this.ticketItems.length === 0) {
  alert('Debes agregar al menos un producto al ticket');
  return;
}

// Validar que todos los productos tengan suficiente stock
for (const item of this.ticketItems) {
  if (item.quantity > item.product.stock) {
    alert(`❌ El producto "${item.product.name}" no tiene suficiente stock disponible (Stock actual: ${item.product.stock}).`);
    return;
  }
}


  const productsPayload = this.ticketItems.map(item => ({
    id: item.product.id,
    quantity: item.quantity,
    useWholesalePrice: item.useWholesalePrice,
    wholesalePrice: item.wholesalePrice
  }));

  this.ticketService.createTicket(productsPayload).subscribe({
    next: (response) => {
      console.log('Ticket creado con éxito:', response);

      

      const folio = response.ticket.id.toString().padStart(4, '0');
      console.log('Folio generado:', folio);

      const itemsCopy = [...this.ticketItems]; // Copia antes de limpiar

      this.ticketData = {
        ...form.value,
        folio: folio,
        items: itemsCopy,
        total: response.subtotal,
        date: new Date()
      };

      // Esperar para limpiar, así se muestra la vista previa
      setTimeout(() => {
        form.resetForm();
        this.ticketItems = [];
      }, 500);
    },
    error: (error) => {
      console.error('Error al crear el ticket:', error);
      alert(`❌ Error: ${error.error?.error || 'No se pudo crear el ticket.'}`);
        this.ticketData = null; // ← Asegura que no se muestre vista previa
    }
  });
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
  console.log('📸 Generando imagen PNG...');
  const content = this.pdfContent.nativeElement;

  const targetWidth = 718;   // ancho deseado
  const targetHeight = 900; // alto deseado (ajustado a proporción A4 vertical)

  html2canvas(content, {
    width: content.scrollWidth,
    height: content.scrollHeight,
    scale: 4,
    useCORS: true
  }).then(canvas => {
    // Crear un canvas nuevo ajustado al tamaño deseado
    const resizedCanvas = document.createElement('canvas');
    resizedCanvas.width = targetWidth;
    resizedCanvas.height = targetHeight;

    const ctx = resizedCanvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(canvas, 0, 0, targetWidth, targetHeight);

      const imageData = resizedCanvas.toDataURL('image/png');

      const link = document.createElement('a');
      link.href = imageData;
      link.download = 'ticket_resumen.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  });
}



}