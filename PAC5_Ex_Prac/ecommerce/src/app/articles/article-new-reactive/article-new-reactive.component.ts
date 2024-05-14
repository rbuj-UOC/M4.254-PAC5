import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Article } from '../../model/article';
import { NameArticleValidator } from '../../../shared/name-article-validator.directive';

@Component({
  selector: 'app-article-new-reactive',
  templateUrl: './article-new-reactive.component.html',
  styleUrl: './article-new-reactive.component.css'
})

export class ArticleNewReactiveComponent {

  public message = '';
  public articleForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  get name() { return this.articleForm.get('name'); }

  get price() { return this.articleForm.get('price'); }

  get imageUrl() { return this.articleForm.get('imageUrl'); }

  get isOnSale() { return this.articleForm.get('isOnSale'); }

  createForm() {
    this.articleForm = this.fb.group({
      name: ['', [Validators.required, NameArticleValidator(/(Prova|Test|Mock|Fake)/)]],
      price: [0, [Validators.required, Validators.min(0.1)]],
      imageUrl: ['', [Validators.required, Validators.pattern('^http(s?)\://[a-zA-Z0-9\.]+\.[a-zA-Z]{2,3}/[a-zA-Z0-9\.\-]+$')]],
      isOnSale: false
    });
  }

  createArticle() {
    if (this.articleForm.invalid) {
      this.message = 'Corregiu tots els errors i torneu a enviar el formulari';
    } else {
      const article: Article = this.articleForm.value;
      this.message = '';
      console.log('Creating article', article);
    }
  }
}
