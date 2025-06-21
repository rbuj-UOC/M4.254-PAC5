import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { App } from './app';
import { AppRoutingModule } from './app-routing-module';
import { ArticleItem } from './articles/article-item/article-item';
import { ArticleList } from './articles/article-list/article-list';
import { ArticleNewReactive } from './articles/article-new-reactive/article-new-reactive';
import { ArticleNewTemplate } from './articles/article-new-template/article-new-template';
import { Navbar } from './articles/navbar/navbar';

@NgModule({
  declarations: [
    App,
    ArticleList,
    ArticleItem,
    ArticleNewReactive,
    ArticleNewTemplate,
    Navbar
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App]
})
export class AppModule {}
