import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Flower } from './products.service';

@Component({
  standalone: true,
  selector: 'app-product-form',
  imports: [CommonModule, FormsModule],
  template: `
    <form (ngSubmit)="submit()" style="background: #181818; padding: 24px; border-radius: 6px; border: 1px solid #2A2A2A; max-width: 600px;">
      <div style="margin-bottom: 16px;">
        <label style="display: block; font-size: 12px; color: #A39E93; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 6px;">Назва квітів / букета</label>
        <input [(ngModel)]="title" name="title" required style="width: 100%; padding: 10px 12px; background: #121212; border: 1px solid #333; border-radius: 4px; color: #F5F2EB; box-sizing: border-box;" />
      </div>

      <div style="display: flex; gap: 16px; margin-bottom: 16px;">
        <div style="flex: 1;">
          <label style="display: block; font-size: 12px; color: #A39E93; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 6px;">Ціна (грн)</label>
          <input type="number" [(ngModel)]="price" name="price" required style="width: 100%; padding: 10px 12px; background: #121212; border: 1px solid #333; border-radius: 4px; color: #F5F2EB; box-sizing: border-box;" />
        </div>
        <div style="flex: 1;">
          <label style="display: block; font-size: 12px; color: #A39E93; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 6px;">Категорія</label>
          <select [(ngModel)]="category" name="category" style="width: 100%; padding: 10px 12px; background: #121212; border: 1px solid #333; border-radius: 4px; color: #F5F2EB; box-sizing: border-box;">
            <option value="Букети">Букети</option>
            <option value="Квіти поштучно">Квіти поштучно</option>
          </select>
        </div>
      </div>

      <div style="margin-bottom: 16px;">
        <label style="display: block; font-size: 12px; color: #A39E93; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 6px;">Посилання на фото (URL)</label>
        <input [(ngModel)]="image" name="image" style="width: 100%; padding: 10px 12px; background: #121212; border: 1px solid #333; border-radius: 4px; color: #F5F2EB; box-sizing: border-box;" />
      </div>

      <div style="margin-bottom: 20px;">
        <label style="display: block; font-size: 12px; color: #A39E93; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 6px;">Опис</label>
        <textarea [(ngModel)]="description" name="description" rows="3" style="width: 100%; padding: 10px 12px; background: #121212; border: 1px solid #333; border-radius: 4px; color: #F5F2EB; box-sizing: border-box;"></textarea>
      </div>

      <button type="submit" style="background: #C5A880; color: #121212; border: none; padding: 12px 24px; border-radius: 4px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; font-size: 12px; cursor: pointer;">
        Зберегти в каталог
      </button>
    </form>
  `
})
export class ProductFormComponent {
  @Output() flowerCreated = new EventEmitter<Omit<Flower, 'id'>>();

  title = '';
  price = 0;
  category = 'Букети';
  image = '';
  description = '';

  submit() {
    if (!this.title || !this.price) return;
    this.flowerCreated.emit({
      title: this.title,
      price: this.price,
      category: this.category,
      image: this.image,
      description: this.description
    });
    this.title = '';
    this.price = 0;
    this.image = '';
    this.description = '';
  }
}