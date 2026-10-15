import { Component, OnInit, signal } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductsService, Flower } from './products.service';

@Component({
  standalone: true,
  selector: 'app-product-details',
  imports: [CommonModule, RouterLink],
  template: `
    <!-- Зовнішній оверлей: при кліку на нього (поза карткою) повертаємось до каталогу -->
    <div (click)="closeDetails()" style="max-width: 900px; margin: 40px auto; padding: 20px; color: #E8E3D9; cursor: pointer;">
      
      <!-- Зупиняємо спливання події усередині самої картки, щоб кліки по тексту/картинці не закривали її -->
      <div (click)="$event.stopPropagation()" style="cursor: auto;">
        
        <!-- Кнопка «Назад до каталогу» тепер веде на /products -->
        <a routerLink="/products" style="color: #C5A880; text-decoration: none; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">← Назад до каталогу</a>

        @if (flower(); as f) {
          <div style="margin-top: 24px; display: grid; grid-template-columns: 1fr 1fr; gap: 40px; background: #181818; padding: 32px; border-radius: 6px; border: 1px solid #2A2A2A;">
            <img [src]="f.image" [alt]="f.title" style="width: 100%; border-radius: 4px; object-fit: cover; max-height: 400px; border: 1px solid #2A2A2A;" />
            <div style="display: flex; flex-direction: column;">
              <span style="font-size: 11px; color: #C5A880; text-transform: uppercase; letter-spacing: 2px; font-weight: 600;">{{ f.category }}</span>
              <h1 style="font-family: 'Cinzel', serif; font-size: 28px; color: #F5F2EB; margin: 12px 0;">{{ f.title }}</h1>
              <p style="font-size: 24px; font-weight: 600; color: #C5A880; margin-bottom: 20px;">{{ f.price }} ₴</p>
              <p style="color: #A39E93; line-height: 1.6; font-size: 15px; margin-bottom: 30px;">{{ f.description }}</p>

              <button style="margin-top: auto; background: #C5A880; color: #121212; border: none; padding: 14px; border-radius: 4px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; font-size: 13px; cursor: pointer;">
                Замовити букет
              </button>
            </div>
          </div>
        } @else {
          <p style="margin-top: 40px; color: #A39E93;">Завантаження детальної інформації...</p>
        }
      </div>
    </div>
  `
})
export class ProductDetailsComponent implements OnInit {
  flower = signal<Flower | undefined>(undefined);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ProductsService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.service.get(id).subscribe(data => this.flower.set(data));
  }

  closeDetails() {
    this.router.navigate(['/products']);
  }
}