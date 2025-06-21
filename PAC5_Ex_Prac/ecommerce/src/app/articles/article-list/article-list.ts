import { Component, OnInit } from '@angular/core';
import { Article } from '../../model/article';
import { ArticleQuantityChange } from '../../model/article-quantity-change';

@Component({
  selector: 'app-article-list',
  // eslint-disable-next-line @angular-eslint/prefer-standalone
  standalone: false,
  template: `
    <div class="article-list">
      @for (articleObj of articles; track articleObj.id) {
        <app-article-item
          [article]="articleObj"
          (quantityChange)="onQuantityChange($event)"
        ></app-article-item>
      }
    </div>
  `,
  styles: `
    .article-list {
      display: flex;
      padding: 10px;
    }
  `
})
export class ArticleList implements OnInit {
  public articles: Article[];

  ngOnInit() {
    this.articles = [
      {
        id: 1,
        name: 'Aerosmith: Permanent Vacation',
        imageUrl: './records/permanent-vacation.webp',
        price: 31.99,
        isOnSale: true,
        quantityInCart: 0
      },
      {
        id: 2,
        name: 'The Beatles: Sgt. Pepper`s Lonely Hearts Club Band',
        imageUrl: './records/beatles.webp',
        price: 36.99,
        isOnSale: false,
        quantityInCart: 0
      },
      {
        id: 3,
        name: 'Pulp Fiction',
        imageUrl: './records/pulp-fiction.webp',
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
