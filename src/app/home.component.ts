import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [RouterLink],
  template: `
    <div style="background-color: #121212; min-height: 80vh; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; padding: 40px 20px;">
      <span style="font-size: 12px; text-transform: uppercase; letter-spacing: 4px; color: #C5A880; margin-bottom: 16px;">Авторська Флористика</span>
      <h1 style="color: #F5F2EB; font-family: 'Cinzel', serif; font-size: 48px; font-weight: 500; max-width: 800px; margin: 0 0 24px 0; line-height: 1.2;">
        Естетика & Вишуканість у Кожній Пелюстці
      </h1>
      <p style="font-size: 16px; color: #A39E93; max-width: 550px; margin: 0 auto 40px auto; line-height: 1.6;">
        Створюємо авторські букети та флористичні композиції для важливих моментів вашого життя.
      </p>
      <a routerLink="/products" style="background: #C5A880; color: #121212; padding: 16px 36px; border-radius: 4px; text-decoration: none; font-weight: 600; font-size: 13px; text-transform: uppercase; letter-spacing: 2px;">
        Переглянути Каталог
      </a>
    </div>
  `
})
export class HomeComponent {}