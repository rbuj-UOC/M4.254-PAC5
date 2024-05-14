# Exercici 1 – Preguntes teòriques quant a formularis Angular (1.5 punts)

## Quines són les principals diferències entre formularis dirigits per plantilles i els formularis reactius?

- Els formularis basats en plantilles utilitzen `FormsModule`, mentre que els formularis reactius utilitzen `ReactiveFormsModule`.

- Els formularis basats en plantilles són de naturalesa asincrònica, mentre que els formularis reactius són majoritàriament síncrons.

- En l'enfocament basat en plantilles, la major part de la lògica recau a la plantilla, mentre que en l'enfocament basat en formularis reactius, la lògica recau principalment en el component.

En els formularis basats en plantilles es declaren els controls del formulari a la plantilla, amb directives com ara ngModel. Després, Angular crea els controls del formulari i és el responsable de la sincronització del model de dades, enviar les dades al model, i llegir i actualitzar els valors a la interfície d'usuari.

En canvi, en els formularis reactius el desenvolupador té el control absolut sobre com i quan se sincronitzen les dades des de la interfície d'usuari amb el model i viceversa. Com que es crea tot l'arbre de control del formulari, hi ha accés immediatament i no s'ha de fer front al cicle de vida asíncron d'Angular.

## Què són, per a què serveixen i com es fan servir les directives `ngModel` i `ngModelChange`?

Les directives `ngModel` i `ngModelChange` s'utilitzen per al vincle de dades bidireccional en els formularis basats en plantilles.
- vinculació de dades `[ngModel]`: del model a la vista
- vinculació de l'esdeveniment `(ngModelChange)`: de la vista al model

app.component.ts
```ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  userName: string = 'Robert';
}
```

app.component.html
```html
<h1>Username: {{ userName }}</h1>
<input type="text" [ngModel]="userName" (ngModelChange)="userName=$event"/>
```

Avui en dia s'utilitza un únic `banana-in-the-box` `[(ngModel)]`, que substitueix els dos vincles individuals `ngModel` i `ngModelChange`. `banana-in-the-box` és el nom d'una notació, on `[()]` recorda un platan dins d'una caixa.

app.component.html
```html
<h1>Username: {{ userName }}</h1>
<input type="text" [(ngModel)]="userName" />
```

Ref: [Angular - ngModel en Angular 17 - Two way data binding](https://www.youtube.com/watch?v=2NWc1x-VLcM)

## Què són, quins són i per a què serveixen els estats als formularis basats en plantilles?

Els estats formen part de la validació nativa d'Angular, que amplia la validació html, i permeten veure l'estat del control del formulari, si l'usuari l'ha visitat (Visited), si l'ha canviat (Changed) i finalment si es troba en un estat vàlid (Valid).

| Control state    | classe CSS si cert | classe CSS si fals |
| ---------------- | ------------------ | ------------------ |
| Visited          | ng-touched         | ng-untouched       |
| Changed          | ng-dirty           | ng-pristine        |
| Valid            | ng-valid           | ng-invalid         |

En l'exemple següent primer s'utilitzen les classes ng-valid, ng-pristine i ng-untouched, i després les classes ng-invalid, ng-dirty i ng-touched al fitxer create-stock.component.css.

Fitxer create-stock.component.html
```html
<h2>Create Stock Form</h2>

<div class="form-group">
  <form (ngSubmit)="createStock()">              1
    <div class="stock-name">
      <input type="text" placeholder="Stock Name"
             name="stockName" [(ngModel)]="stock.name">
    </div>
    <div class="stock-code">
      <input type="text" placeholder="Stock Code"
             name="stockCode" [(ngModel)]="stock.code">
    </div>
    <div class="stock-code">
      <input type="number" placeholder="Stock Price"
             name="stockPrice" [ngModel]="stock.price"      2
             (ngModelChange)="setStockPrice($event)">
    </div>
...
```

Fitxer create-stock.component.css
```css
.stock-name .ng-valid,
.stock-code .ng-pristine,
.stock-price .ng-untouched {
  background-color: green;
}

.stock-name .ng-invalid,
.stock-code .ng-dirty,
.stock-price .ng-touched {
  background-color: pink;
}
```

La directiva `ngModel` canvia i afegeix classes CSS a l'element on es troba, en funció de la interacció de l'usuari amb ell.

També es pot inspeccionar l'estat exportant `ngModel` a una variable de plantilla local. En l'exemple de sota s'exporta `NgModel` a una variable anomenada `name`, a la línia `#name="ngModel"`.

Fitxer: template/hero-form-template.component.html
```html
<input
  type="text"
  id="name"
  name="name"
  class="form-control"
  required
  minlength="4"
  appForbiddenName="bob"
  [(ngModel)]="hero.name"
  #name="ngModel"
/>

<div *ngIf="name.invalid && (name.dirty || name.touched)" class="alert"> <!-- Check on the name template reference variable for dirty, invalid and touched form controls -->
  <div *ngIf="name.errors?.['required']">Name is required.</div> <!-- Check on the name for errors -->
  <div *ngIf="name.errors?.['minlength']">
    Name must be at least 4 characters long.
  </div>
  <div *ngIf="name.errors?.['forbiddenName']">
    Name cannot be Bob.
  </div>
</div>
```
Exemple de https://angular.io/guide/form-validation

En la classe TypeScript del component, es poden accedir a les propietats de [NgForm](https://angular.io/api/forms/NgForm) a través de propietats d'estat heretades d'[AbstractControlDirective](https://angular.io/api/forms/AbstractControlDirective).

| nom atribut | tipus | descripció |
| ----------- | ----- | ---------- |
| valid | boolean o null | Informa si el control és vàlid. Un control es considera vàlid si no existeixen errors de validació amb el valor actual. Si el control no està present, es retorna null. |
| invalid | boolean o null | Informa si el control no és vàlid, el que significa que hi ha un error en el valor d'entrada. Si el control no està present, es retorna null. |
| pending | boolean o null | Informa si hi ha un control pendent, el que significa que s'està produint una validació asíncrona i que encara no hi ha errors disponibles per al valor d'entrada. Si el control no està present, es retorna null. Informa si el control està desactivat, és a dir, que el control està desactivat a la interfície d'usuari i està exempt de comprovacions de validació i exclòs dels valors agregats dels controls d'ancestres. Si el control no està present, es retorna null. |
| disabled | boolean o null | Informa si el control està desactivat, és a dir, que el control està desactivat a la interfície d'usuari i està exempt de comprovacions de validació i exclòs dels valors agregats dels controls d'ancestres. Si el control no està present, es retorna null. |
| enabled | boolean o null | Informa si el control està habilitat, és a dir, que el control s'inclou en els càlculs de validesa o valor dels ancestres. Si el control no està present, es retorna null. |
| errors | ValidationErrors o null | Informa dels errors de validació del control. Si el control no està present, es retorna null. |
| pristine | boolean o null | Informa que l'usuari encara no ha canviat el valor a la interfície d'usuari. Si el control no està present, es retorna null. |
| dirty | boolean o null | Informa que l'usuari ha canviat el valor a la interfície d'usuari. Si el control no està present, es retorna null. |
| touched | boolean o null | Informa si l'usuari hi ha disparat un esdeveniment `blur`. Si el control no està present, es retorna null. |
| status | string o null | Informa de l'estat de validació del control. Els valors possibles inclouen: "VALID", "INVALID", "DISABLED" i "PENDING". Si el control no està present, es retorna null. |
| untouched | boolean o null | Informa si el control no s'ha tocat, el que significa que l'usuari encara no ha activat cap esdeveniment `blur`. Si el control no està present, es retorna null. |

L'[estat per a un control](https://angular.io/api/forms/FormControlStatus), propietat `status`, pot ser:
```ts
type FormControlStatus = 'VALID' | 'INVALID' | 'PENDING' | 'DISABLED';
````
- VALID: Informa que un control és vàlid, és a dir, que no hi ha errors en el valor d'entrada.
- INVALID: Informa que un control no és vàlid, el que significa que hi ha un error en el valor d'entrada.
- PENDING: Informa que hi ha un control pendent, el que significa que s'està produint una validació asíncrona i que encara no hi ha errors disponibles per al valor d'entrada.
- DISABLED: Informa que un control està desactivat, és a dir, que el control està exempt dels càlculs de validesa o valor.



## Quins avantatges aporten els `FormGroup` a la composició de formularis?

Permet crear diversos grups i utilitzar directament `ngModel`, i finalment copiar tots els valors a un camp comú al component quan s'envia el formulari. En l'exemple següent s'agrupen els camps name, code i price al grup `stock`, i els camps locker, row, column al grup `warehouse`.

Fitxer create-stock.component.html
```html
<h2>Create Stock Form</h2>

<div class="form-group">
  <form (ngSubmit)="createStock(stockForm)" #stockForm="ngForm" >

    <div ngModelGroup="stock">
      <div class="stock-name">
        <input type="text"
              placeholder="Stock Name"
              required
              name="name"
              ngModel>
      </div>
      <div class="stock-code">
        <input type="text"
              placeholder="Stock Code"
              required
              minlength="2"
              name="code"
              ngModel>
      </div>
      <div class="stock-price">
        <input type="number"
              placeholder="Stock Price"
              name="price"
              required
              ngModel>
      </div>
    </div>

    <div ngModelGroup="warehouse">
      <div class="warehouse-column">
        <input type="number"
              placeholder="Warehouse Column"
              required
              name="column"
              ngModel>
      </div>
      <div class="warehouse-row">
        <input type="number"
              placeholder="Warehouse Row"
              required
              name="row"
              ngModel>
      </div>
      <div class="warehouse-locker">
        <input type="number"
              placeholder="Warehouse Locker"
              required
              name="locker"
              ngModel>
      </div>
    </div>

    <button type="submit">Create</button>
  </form>
</div>
```

Fitxer create-stock.component.ts
```ts
...
  createStock(stockForm) {
...
    this.stock = stockForm.value.stock;
    console.log('Creating stock ', this.stock);
...
    this.stock = stockForm.value.warehouse;
    console.log('Creating warehouse ', this.warehouse);
...
}

```
