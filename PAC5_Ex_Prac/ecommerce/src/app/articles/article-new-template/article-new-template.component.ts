import { Component } from '@angular/core';
import { Article } from '../../model/article';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-article-new-template',
  templateUrl: './article-new-template.component.html',
  styleUrl: './article-new-template.component.css'
})
export class ArticleNewTemplateComponent {
  public message = '';
  constructor() { }

  createArticle(articleForm: NgForm) {
    if (articleForm.invalid) {
      this.message = 'Corregiu tots els errors i torneu a enviar el formulari';
    } else {
      const article: Article = articleForm.value.article;
      this.message = '';
      articleForm.resetForm({name: '', price: '', imageUrl: '', isOnSale: false});
      console.log('Creating article', article);
    }
  }
}
