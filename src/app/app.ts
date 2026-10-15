import { Component, signal } from '@angular/core';
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
export class AppComponent {
  showAuthModal = signal(false);
  showAdminModal = signal(false);
  isAdminLoggedIn = signal(false);

  editingProductId = signal<number | null>(null);

  authForm: FormGroup;
  productForm: FormGroup;

  constructor(private fb: FormBuilder, private productsService: ProductsService) {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });

    this.productForm = this.fb.group({
      title: ['', Validators.required],
      price: [1200, [Validators.required, Validators.min(10)]],
      category: ['Букети', Validators.required],
      image: ['https://images.unsplash.com/photo-1561181286-d3fee7d55364?q=80&w=600', Validators.required],
      description: ['', Validators.required]
    });
  }

  // Повертає список товарів для @for (item of productList)
  get productList(): Flower[] {
    return this.productsService.getFlowersSignal()();
  }

  openAuthModal() {
    this.showAuthModal.set(true);
  }

  openAdminPanel() {
    this.showAdminModal.set(true);
  }

  closeModals() {
    this.showAuthModal.set(false);
    this.showAdminModal.set(false);
    this.resetProductForm();
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

  onSaveProductSubmit() {
    if (this.productForm.invalid) return;

    const formVal = this.productForm.value;
    const currentId = this.editingProductId();

    if (currentId !== null) {
      this.productsService.updatePrice(currentId, formVal.price).subscribe(() => {
        alert('Зміни успішно збережено!');
        this.resetProductForm();
      });
    } else {
      this.productsService.create(formVal).subscribe(() => {
        alert('Новий букет успішно додано до каталогу!');
        this.resetProductForm();
      });
    }
  }

  onAddProductSubmit() {
    this.onSaveProductSubmit();
  }

  startEditProduct(item: Flower) {
    this.editingProductId.set(item.id);
    this.productForm.patchValue({
      title: item.title,
      price: item.price,
      category: item.category,
      image: item.image,
      description: item.description
    });
  }

  editPrice(id: number, currentPrice: number) {
    const item = this.productList.find(p => p.id === id);
    if (item) {
      this.startEditProduct(item);
    }
  }

  resetProductForm() {
    this.editingProductId.set(null);
    this.productForm.reset({
      price: 1200,
      category: 'Букети',
      image: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?q=80&w=600'
    });
  }

  deleteProduct(id: number) {
    if (confirm('Ви дійсно хочете видалити цей букет з каталогу?')) {
      this.productsService.delete(id).subscribe(() => {
        alert('Букет видалено!');
      });
    }
  }
}