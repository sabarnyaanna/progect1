import { Component, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductsService } from './products.service';
import { signal } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-products-list',
  imports: [CommonModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div style="max-width: 1200px; margin: 0 auto; padding: 40px 20px; background-color: #121212;">
      
      <!-- Шапка -->
      <div style="border-bottom: 1px solid #2A2A2A; padding-bottom: 24px; margin-bottom: 32px; display: flex; justify-content: space-between; align-items: flex-end;">
        <div>
          <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 3px; color: #C5A880; font-weight: 600;">Квіткова Студія</span>
          <h1 style="color: #F5F2EB; font-family: 'Cinzel', serif; font-size: 32px; margin: 6px 0 0 0; font-weight: 600;">Каталог композицій</h1>
        </div>
      </div>
      
      <!-- Перемикач категорій -->
      <div style="margin-bottom: 40px; display: flex; gap: 12px; border-bottom: 1px solid #2A2A2A; padding-bottom: 16px;">
        <button 
          (click)="selectCategory('')" 
          [style.background]="selectedCategory() === '' ? '#C5A880' : 'transparent'"
          [style.color]="selectedCategory() === '' ? '#121212' : '#A39E93'"
          [style.border]="selectedCategory() === '' ? '1px solid #C5A880' : '1px solid #2A2A2A'"
          style="padding: 10px 20px; border-radius: 4px; font-size: 13px; font-weight: 500; cursor: pointer;">
          Усі позиції
        </button>
        @for (c of categories; track c) {
          <button 
            (click)="selectCategory(c)" 
            [style.background]="selectedCategory() === c ? '#C5A880' : 'transparent'"
            [style.color]="selectedCategory() === c ? '#121212' : '#A39E93'"
            [style.border]="selectedCategory() === c ? '1px solid #C5A880' : '1px solid #2A2A2A'"
            style="padding: 10px 20px; border-radius: 4px; font-size: 13px; font-weight: 500; cursor: pointer;">
            {{ c }}
          </button>
        }
      </div>

      <!-- Сітка карток -->
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 28px;">
        @for (flower of filteredFlowers(); track flower.id) {
          <div style="border: 1px solid #2A2A2A; border-radius: 6px; overflow: hidden; background: #181818; display: flex; flex-direction: column;">
            <div style="position: relative; width: 100%; height: 260px; overflow: hidden; background-color: #0A0A0A;">
              <img [src]="flower.image" [alt]="flower.title" style="width: 100%; height: 100%; object-fit: cover; filter: brightness(0.95);" />
            </div>
            <div style="padding: 20px; display: flex; flex-direction: column; flex-grow: 1;">
              <span style="font-size: 10px; color: #C5A880; text-transform: uppercase; letter-spacing: 2px; font-weight: 600;">{{ flower.category }}</span>
              <h3 style="font-family: 'Cinzel', serif; font-size: 16px; margin: 8px 0; color: #F5F2EB; font-weight: 500;">{{ flower.title }}</h3>
              <p style="font-size: 17px; font-weight: 600; color: #E8E3D9; margin-top: auto; padding-top: 12px;">{{ flower.price }} ₴</p>
              
              <a [routerLink]="['/products', flower.id]" style="display: block; text-align: center; background: transparent; color: #C5A880; border: 1px solid #C5A880; padding: 10px; border-radius: 4px; text-decoration: none; font-size: 12px; font-weight: 600; text-transform: uppercase; margin-top: 14px;">
                Детальніше
              </a>
            </div>
          </div>
        }
      </div>

    </div>
  `
})
export class ProductsListComponent {
  selectedCategory = signal<string>('');
  categories = ['Букети', 'Квіти поштучно'];

  constructor(private service: ProductsService) {}

  selectCategory(cat: string) {
    this.selectedCategory.set(cat);
  }

  filteredFlowers = computed(() => {
    const cat = this.selectedCategory();
    const flowersList = this.service.getFlowersSignal()();
    return cat ? flowersList.filter(f => f.category === cat) : flowersList;
  });
}