import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';
import { Article } from '../../model/article';
import { ArticleQuantityChange } from '../../model/article-quantity-change';

@Component({
  selector: 'app-article-item',
  // eslint-disable-next-line @angular-eslint/prefer-standalone
  standalone: false,
  templateUrl: './article-item.component.html',
  styleUrl: './article-item.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleItemComponent {
  @Input() public article: Article;
  @Output() private quantityChange = new EventEmitter<ArticleQuantityChange>();

  incrementInCart() {
    this.quantityChange.emit({ article: this.article, changeInQuantity: 1 });
  }

  decrementInCart() {
    if (this.article.quantityInCart > 0) {
      this.quantityChange.emit({ article: this.article, changeInQuantity: -1 });
    }
  }
}
