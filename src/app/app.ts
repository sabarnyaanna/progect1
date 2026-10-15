import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductsService, Flower } from './products.service';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, RouterLink, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.scss']
})
export class AppComponent implements OnInit {
  showAuthModal = signal(false);
  showAdminModal = signal(false);
  isAdminLoggedIn = signal(false);
  
  productList = signal<Flower[]>([]);

  authForm: FormGroup;
  productForm: FormGroup;

  constructor(private fb: FormBuilder, private productsService: ProductsService) {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });

    this.productForm = this.fb.group({
      title: ['', Validators.required],
      price: [1200, [Validators.required, Validators.min(100)]],
      category: ['Букети', Validators.required],
      image: ['https://images.unsplash.com/photo-1561181286-d3fee7d55364?q=80&w=600', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productsService.list().subscribe(data => this.productList.set(data));
  }

  openAuthModal() {
    this.showAuthModal.set(true);
  }

  openAdminPanel() {
    this.loadProducts();
    this.showAdminModal.set(true);
  }

  closeModals() {
    this.showAuthModal.set(false);
    this.showAdminModal.set(false);
  }

  onAuthSubmit() {
    if (this.authForm.valid) {
      const { email, password } = this.authForm.value;
      if (email === 'admin@flora.ua' && password === 'admin123') {
        this.isAdminLoggedIn.set(true);
        this.closeModals();
        this.openAdminPanel();
        alert('Успішний вхід у панель адміністратора!');
      } else {
        alert(`Вітаємо! Ви увійшли як користувач (${email}).`);
        this.closeModals();
      }
      this.authForm.reset();
    }
  }

  logoutAdmin() {
    this.isAdminLoggedIn.set(false);
    alert('Ви вийшли з акаунта адміна.');
  }

  onAddProductSubmit() {
    if (this.productForm.valid) {
      this.productsService.create(this.productForm.value).subscribe(() => {
        alert('Букет успішно додано!');
        this.loadProducts();
        this.productForm.reset({ price: 1200, category: 'Букети', image: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?q=80&w=600' });
      });
    }
  }

  editPrice(id: number, currentPrice: number) {
    const newPriceStr = prompt('Введіть нову ціну (₴):', currentPrice.toString());
    if (newPriceStr) {
      const newPrice = Number(newPriceStr);
      if (!isNaN(newPrice) && newPrice > 0) {
        this.productsService.updatePrice(id, newPrice).subscribe(() => {
          this.loadProducts();
          alert('Ціну оновлено!');
        });
      }
    }
  }

  deleteProduct(id: number) {
    if (confirm('Ви дійсно хочете видалити цей букет з каталогу?')) {
      this.productsService.delete(id).subscribe(() => {
        this.loadProducts();
        alert('Букет видалено!');
      });
    }
  }
}