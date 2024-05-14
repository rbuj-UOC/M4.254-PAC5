import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Article } from "../../model/article";
import { ArticleQuantityChange } from '../../model/article-quantity-change';

@Component({
  selector: 'app-article-item',
  templateUrl: './article-item.component.html',
  styleUrl: './article-item.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleItemComponent {

  @Input() public article: Article;
  @Output() private quantityChange: EventEmitter<ArticleQuantityChange> = new EventEmitter();

  constructor() { }

  incrementInCart(event) {
    this.quantityChange.emit({article: this.article, changeInQuantity: 1});
  }

  decrementInCart(event) {
    if (this.article.quantityInCart > 0) {
      this.quantityChange.emit({article: this.article, changeInQuantity: -1});
    }
  }

}
