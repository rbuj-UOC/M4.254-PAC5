import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Article } from '../../model/article';

@Component({
  selector: 'app-article-new-template',
  // eslint-disable-next-line @angular-eslint/prefer-standalone
  standalone: false,
  templateUrl: './article-new-template.html',
  styleUrl: './article-new-template.css'
})
export class ArticleNewTemplate {
  public message = '';

  createArticle(articleForm: NgForm) {
    if (articleForm.invalid) {
      this.message = 'Corregiu tots els errors i torneu a enviar el formulari';
    } else {
      const article: Article = articleForm.value.article;
      this.message = '';
      articleForm.resetForm({
        name: '',
        price: '',
        imageUrl: '',
        isOnSale: false
      });
      console.log('Creating article', article);
    }
  }
}
