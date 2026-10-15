import { Injectable, signal } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Flower {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
  description: string;
}

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private flowers = signal<Flower[]>([
    {
      id: 1,
      title: 'Букет "Ніжність півоній"',
      price: 1450,
      category: 'Букети',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVRVFb_F8p_qjHvlxxsVhS6caGo7-BS_hPzZlIPUfOgyTLcJu43xIV9O2J&s=10',
      description: 'Вишуканий букет із ніжних рожевих півоній для особливого настрою.'
    },
    {
      id: 2,
      title: 'Королівська розкіш "101 Червона троянда"',
      price: 4500,
      category: 'Букети',
      image: 'https://i.pinimg.com/736x/14/9b/60/149b609f3ab23cc94c5e8aad920bca36.jpg',
      description: 'Класичний грандіозний букет із 101 відбірної червоної троянди.'
    },
    {
      id: 3,
      title: 'Букет "Пристрасна Еустома"',
      price: 1300,
      category: 'Букети',
      image: 'https://flowersdelux.com.ua/wp-content/uploads/2021/04/1-118.jpg',
      description: 'Ніжне поєднання яскраво-червоної еустоми в елегантному оформленні.'
    },
    {
      id: 4,
      title: 'Композиція "Польова казка"',
      price: 980,
      category: 'Букети',
      image: 'https://i.pinimg.com/736x/d9/17/f4/d917f46321cc9f5237f20ef4f3cdcb37.jpg',
      description: 'Душевний легкий букет із польових квітів та зелені.'
    },
    {
      id: 5,
      title: 'Букет "Сніжна мрія хризантем"',
      price: 1100,
      category: 'Букети',
      image: 'https://i.pinimg.com/736x/20/17/b7/2017b79c62c2e2659b0b2e8519faad43.jpg',
      description: 'Пишні та стійкі білосніжні хризантеми у святковому пакуванні.'
    },
    {
      id: 6,
      title: 'Букет "Палахкотлива Мрія (червона хризантема)"',
      price: 1150,
      category: 'Букети',
      image: 'https://i.pinimg.com/736x/e7/99/9a/e7999ae52025334bd27ca8b2a6578ea5.jpg',
      description: 'Глибокі насичені червоні хризантеми для яскравого дарунку.'
    },
    {
      id: 7,
      title: 'Капелюшна коробка "Оксамитові кущові троянди"',
      price: 1600,
      category: 'Букети',
      image: 'https://i.pinimg.com/736x/a2/f3/3e/a2f33ec611b44d0579fbb83424a89227.jpg',
      description: 'Ніжні багатобутонні кущові троянди у вишуканій стильній композиції.'
    },
    {
      id: 8,
      title: 'Облако радості "Веселковий букет гіпсофіл"',
      price: 890,
      category: 'Букети',
      image: 'https://flowersdelux.com.ua/wp-content/uploads/2020/05/%D0%B3%D0%B8%D0%BF%D1%81%D0%BE%D1%84%D0%B8%D0%BB%D0%B0-%D1%80%D0%BE%D0%B7%D0%BE%D0%B2%D0%B0%D1%8F.jpg',
      description: 'Повітряний рожевий букет сухоцвітів гіпсофіли, що зберігає вигляд роками.'
    },
    {
      id: 9,
      title: 'Мікс-мікс "Дофаміновий сплеск"',
      price: 1350,
      category: 'Букети',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtjirI17bawf9eNiqTZP702xDEr7my7TbdzUgD79H-sEWKMQmPzHBhZM4&s=10',
      description: 'Вибух яскравих кольорів та позитивних емоцій у кожній пелюстці.'
    },
    {
      id: 10,
      title: 'Аристократичний букет "Сонцестояння гладіолусів"',
      price: 1250,
      category: 'Букети',
      image: 'https://viaflor.com.ua/edit/uploads/page/2306/64ad8c90810b1.jpg',
      description: 'Високий стрункий букет із різнокольорових літніх гладіолусів.'
    },
    {
      id: 11,
      title: 'Авторський букет "Хмара Гортензій"',
      price: 1700,
      category: 'Букети',
      image: 'https://i.pinimg.com/736x/3f/84/2f/3f842f21246648cb14de32eb8179abf8.jpg',
      description: 'Розкішний об’ємний букет із ніжно-блакитної гортензії.'
    },
    {
      id: 12,
      title: 'Кущова роза (гілочка)',
      price: 90,
      category: 'Квіти поштучно',
      image: 'https://donpion.ua/media/uploads/product/One_flower/sprey-rose/bombastic/.thumbnails/bombastik_.jpg/bombastik_-472x472.jpg',
      description: 'Ніжна кущова троянда спрей із багатьма суцвіттями на одній гілочці.'
    },
    {
      id: 13,
      title: 'Троянда червона висока',
      price: 85,
      category: 'Квіти поштучно',
      image: 'https://www.floramax.com.ua/image/cache/catalog/product/41930/tsvetok-roza-krasnyy-73284-1-660x660.jpg',
      description: 'Класична червона троянда з оксамитовими пелюстками.'
    },
    {
      id: 14,
      title: 'Хризантема біла (галузка)',
      price: 70,
      category: 'Квіти поштучно',
      image: 'https://rozsada.com.ua/pub/img/products/m/651_1615292130.jpg?v=20200528',
      description: 'Пишна біла хризантема, що довго залишається свіжою.'
    },
    {
      id: 15,
      title: 'Хризантема фіолетова',
      price: 75,
      category: 'Квіти поштучно',
      image: 'https://kvitna.ua/image/cache/catalog/image/cache/catalog/chrysanthemum-bouquets/3/scdn-com-images-products-1-3970-379842434-919-2-1000x1000.webp',
      description: 'Яскрава фіолетова хризантема для створення виразних композицій.'
    },
    {
      id: 16,
      title: 'Лілія королівська',
      price: 130,
      category: 'Квіти поштучно',
      image: 'https://raiflora.com.ua/image/catalog/news/vse-pro-liliyi/tsikavi-fakty-pro-liliyi.webp',
      description: 'Ароматна лілія з великими витонченими бутонами.'
    },
    {
      id: 17,
      title: 'Півонія ніжність',
      price: 150,
      category: 'Квіти поштучно',
      image: 'https://noreasonflowers.com/wp-content/uploads/2023/02/152a0357-scaled.jpg',
      description: 'Великий пишний бутон рожевої півонії.'
    },
    {
      id: 18,
      title: 'Ромашка польова',
      price: 45,
      category: 'Квіти поштучно',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5-lyrJlZCP8WUNYBwa8-wq9bPnJsEMqU_-KgEzsgf9owouaqrzXLS0LnD&s=10',
      description: 'Проста та щира польова ромашка.'
    },
    {
      id: 19,
      title: 'Ранункулюс (азіатський лютик)',
      price: 110,
      category: 'Квіти поштучно',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTC79CE3fH3C1LCNsEFZG7cz7GPFBMvnplciLg7_L4llRFx1R90UvcSoAU&s=10',
      description: 'Вишукана багатошарова квітка із мереживною фактурою пелюсток.'
    },
    {
      id: 20,
      title: 'Еустома (гілочка)',
      price: 95,
      category: 'Квіти поштучно',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTx4-rQRErammRg3iV_svoRgfzFIBofELDouJe5Z5SX_sKfCj7rc9SdBFnh&s=10',
      description: 'Ніжна французька троянда (еустома) з кількома бутонами.'
    },
    {
      id: 21,
      title: 'Гіпсофіла гілочка',
      price: 60,
      category: 'Квіти поштучно',
      image: 'https://images.prom.ua/6054014513_w1280_h640_6054014513.jpg',
      description: 'Дрібна дрібноквіткова гіпсофіла для доповнення або самостійного декору.'
    },
    {
      id: 22,
      title: 'Гладіолус високий',
      price: 80,
      category: 'Квіти поштучно',
      image: 'https://www.superflowers.com.ua/image/cache/data/vse%20bukety/buket-iz-gladiolusov-osobennyy-209(1)-1000x1000.jpg',
      description: 'Яскраве високе суцвіття гладіолуса.'
    },
    {
      id: 23,
      title: 'Жоржина (Георгіна)',
      price: 90,
      category: 'Квіти поштучно',
      image: 'https://i.pinimg.com/736x/94/dd/93/94dd93c00ed138c1bf1991547815f4f9.jpg',
      description: 'Геометрично досконала жоржина з насиченим кольором.'
    },
    {
      id: 24,
      title: 'Гортензія суцвіття',
      price: 180,
      category: 'Квіти поштучно',
      image: 'https://i.pinimg.com/736x/d0/26/fc/d026fca5a5ad3f4fc45472892d5ffada.jpg',
      description: 'Величезне пишне суцвіття гортензії.'
    }
  ]);

  getFlowersSignal() {
    return this.flowers;
  }

  list(): Observable<Flower[]> {
    return of(this.flowers());
  }

  get(id: number): Observable<Flower | undefined> {
    const flower = this.flowers().find(f => f.id === id);
    return of(flower);
  }

  create(f: Omit<Flower, 'id'>): Observable<Flower> {
    const newFlower: Flower = {
      ...f,
      id: Date.now(),
      image: f.image || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVRVFb_F8p_qjHvlxxsVhS6caGo7-BS_hPzZlIPUfOgyTLcJu43xIV9O2J&s=10'
    };
    this.flowers.update(list => [newFlower, ...list]);
    return of(newFlower);
  }

  updatePrice(id: number, newPrice: number): Observable<boolean> {
    this.flowers.update(list =>
      list.map(f => f.id === id ? { ...f, price: newPrice } : f)
    );
    return of(true);
  }

  delete(id: number): Observable<boolean> {
    this.flowers.update(list => list.filter(f => f.id !== id));
    return of(true);
  }
}