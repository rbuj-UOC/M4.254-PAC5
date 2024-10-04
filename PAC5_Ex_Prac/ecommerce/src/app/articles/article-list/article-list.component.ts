import { Component, OnInit } from '@angular/core';
import { Article } from '../../model/article';
import { ArticleQuantityChange } from '../../model/article-quantity-change';

@Component({
  selector: 'app-article-list',
  template: `
    <div class="article-list">
      <app-article-item
        [article]="articleObj"
        (quantityChange)="onQuantityChange($event)"
        *ngFor="let articleObj of articles"
      ></app-article-item>
    </div>
  `,
  styles: `
    .article-list {
      display: flex;
      padding: 10px;
    }
  `
})
export class ArticleListComponent implements OnInit {
  public articles: Article[];

  constructor() {}

  ngOnInit() {
    this.articles = [
      {
        id: 1,
        name: 'Aerosmith: Permanent Vacation',
        imageUrl: 'assets/records/permanent-vacation.webp',
        price: 31.99,
        isOnSale: true,
        quantityInCart: 0
      },
      {
        id: 2,
        name: 'The Beatles: Sgt. Pepper`s Lonely Hearts Club Band',
        imageUrl: 'assets/records/beatles.webp',
        price: 36.99,
        isOnSale: false,
        quantityInCart: 0
      },
      {
        id: 3,
        name: 'Pulp Fiction',
        imageUrl: 'assets/records/pulp-fiction.webp',
        price: 25.99,
        isOnSale: true,
        quantityInCart: 0
      }
    ];
  }

  onQuantityChange(change: ArticleQuantityChange) {
    const product = this.articles.find((art) => {
      return change.article.id === art.id;
    });
    product.quantityInCart += change.changeInQuantity;
  }
}
