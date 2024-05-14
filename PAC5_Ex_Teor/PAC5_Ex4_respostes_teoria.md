# Exercici 1 – Preguntes teòriques quant a formularis reactius Angular (1.5 punts)

## Què són, per a què serveixen i com es fan servir FormControl, FormGroup i FormBuilder?

| classe      | Ús |
| ----------- | -- |
| [FormControl](https://angular.io/api/forms/FormControl) | Gestiona el valor i l'estat de validesa d'un control de formulari individual. Correspon a un control de formulari HTML com ara `<input>` o `<select>`. |
| [FormGroup](https://angular.io/api/forms/FormGroup) | Gestiona el valor i l'estat de validesa d'un grup d'instàncies d'`AbstractControl`. Les propietats del grup inclouen els seus controls fills. El formulari de nivell superior del component és `FormGroup`. |
| [FormBuilder](https://angular.io/api/forms/FormBuilder) | Un servei injectable que proporciona mètodes de generació per crear instàncies de control. |

### FormControl

Des de la plantilla es realitza la vinculació al control del formulari `[formControl]="nameControl"`.

```html
<h2>Create Stock Form</h2>

<div class="form-group">

    <div class="stock-name">
      <input type="text"
             placeholder="Stock Name"
             name="stockName"
             [formControl]="nameControl">
    </div>
    <button (click)="onSubmit()">Submit</button>
</div>

<p>Form Control value: {{ nameControl.value | json }}</p>
<p>Form Control status: {{ nameControl.status | json }}</p>
```

En la classe de TypeScript es crea una instancia de `FormControl` amb el mateix nom `nameControl`:
```ts
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-create-stock',
  templateUrl: './create-stock.component.html',
  styleUrls: ['./create-stock.component.css']
})
export class CreateStockComponent {

  public nameControl = new FormControl();
  constructor() {}

  onSubmit() {
    console.log('Name Control Value', this.nameControl.value);
  }
}
```

### FormGroup

En comptes de vincular cada `FormControl`, es crea un `FormGroup` que agrupa diversos controls.

En la plantilla es crea un `FormGroup` anomenat `stockForm` a `[formGroup]="stockForm"`, i els controls s'afegeixen amb `formControlName`.

```html
<h2>Create Stock Form</h2>

<div class="form-group">
  <form [formGroup]="stockForm" (ngSubmit)="onSubmit()">
    <div class="stock-name">
      <input type="text"
             placeholder="Stock Name"
             name="stockName"
             formControlName="name">
    </div>
    <div class="stock-code">
        <input type="text"
               placeholder="Stock Code"
               formControlName="code">
    </div>
    <div class="stock-price">
        <input type="number"
               placeholder="Stock Price"
               formControlName="price">
    </div>
    <button type="submit">Submit</button>
  </form>
</div>

<p>Form Control value: {{ stockForm.value | json }}</p>
<p>Form Control status: {{ stockForm.status | json }}</p>
```

Sentència de vinculació del grup `FormGroup` i dels controls `FormControl` a la classe TypeScript del control:

```ts
  public stockForm: FormGroup = new FormGroup({
    name: new FormControl(null, Validators.required),
    code: new FormControl(null, [Validators.required, Validators.minLength(2)]),
    price: new FormControl(0, [Validators.required, Validators.min(0)])
  });
```
Tot el fitxer TypeScript de la classe del component:
```ts
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-stock',
  templateUrl: './create-stock.component.html',
  styleUrls: ['./create-stock.component.css']
})
export class CreateStockComponent {

  public stockForm: FormGroup = new FormGroup({
    name: new FormControl(null, Validators.required),
    code: new FormControl(null, [Validators.required, Validators.minLength(2)]),
    price: new FormControl(0, [Validators.required, Validators.min(0)])
  });
  constructor() {}

  onSubmit() {
    console.log('Stock Form Value', this.stockForm.value);
  }
}
```

### FormBuilder

Ja no cal cridar a `new` amb `FormBuilder`.

Sentència:
```ts
    this.stockForm = this.fb.group({
      name: [null, Validators.required],
      code: [null, [Validators.required, Validators.minLength(2)]],
      price: [0, [Validators.required, Validators.min(0)]]
    });
```
Tot el fitxer TypeScript de la classe del component:
```ts
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators, FormBuilder } from '@angular/forms';    1

@Component({
  selector: 'app-create-stock',
  templateUrl: './create-stock.component.html',
  styleUrls: ['./create-stock.component.css']
})
export class CreateStockComponent {

  public stockForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.stockForm = this.fb.group({
      name: [null, Validators.required],
      code: [null, [Validators.required, Validators.minLength(2)]],
      price: [0, [Validators.required, Validators.min(0)]]
    });
  }

  onSubmit() {
    console.log('Stock Form Value', this.stockForm.value);
  }
}
```

## Cerca a la pàgina oficial d'Angular en què s'especifiquin tots els validadors que inclou Angular per ser utilitzats en els formularis reactius. Construïu una taula de resum d'aquests.

| Validador | Descripció |
| --------- | ---------- |
| min | Validador que requereix que el valor del control sigui superior o igual al nombre proporcionat. |
| max | Validador que requereix que el valor del control sigui inferior o igual al número proporcionat. |
| required | Validador que requereix que el control tingui un valor no buit. |
| requiredTrue | Validador que requereix que el valor del control sigui cert. Aquest validador s'utilitza habitualment per a les caselles de selecció necessàries. |
| email | Validador que requereix que el valor del control superi una prova de validació del correu electrònic. |
| minLength | Validador que requereix que la longitud del valor del control sigui superior o igual a la longitud mínima indicada. |
| maxLength | Validador que requereix que la longitud del valor del control sigui inferior o igual a la longitud màxima indicada. |
| pattern | Validador que requereix que el valor del control coincideixi amb un patró d'expressió regular. |
| nullValidator | Validador que no realitza cap operació. |
| compose | Compon diversos validadors en una única funció que retorna la unió dels mapes dels errors individuals per al control indicat. |
| composeAsync | Compon diversos validadors asíncrons en una única funció que retorna la unió dels objectes dels errors individuals per al control indicat. |

[Validadors](https://angular.io/api/forms/Validators) inclosos a Angular:
```ts
class Validators {
  static min(min: number): ValidatorFn
  static max(max: number): ValidatorFn
  static required(control: AbstractControl<any, any>): ValidationErrors | null
  static requiredTrue(control: AbstractControl<any, any>): ValidationErrors | null
  static email(control: AbstractControl<any, any>): ValidationErrors | null
  static minLength(minLength: number): ValidatorFn
  static maxLength(maxLength: number): ValidatorFn
  static pattern(pattern: string | RegExp): ValidatorFn
  static nullValidator(control: AbstractControl<any, any>): ValidationErrors | null
  static compose(validators: ValidatorFn[]): ValidatorFn | null
  static composeAsync(validators: AsyncValidatorFn[]): AsyncValidatorFn | null
}
```

## Què són, quins són i per a què serveixen els estats en els formularis reactius?

L'estat i la validesa dels control dels formularis és bastant semblant a com es gestiona als formularis basats en plantilles, ja que els estats de control base i la validesa són els mateixos.

El que canvia és el mètode d'accés a les propietats.

Per accedir a l'estat d'un `FormControl`:
```html
<h2>Create Stock Form</h2>

<div class="form-group">

    <div class="stock-name">
      <input type="text"
             placeholder="Stock Name"
             name="stockName"
             [formControl]="nameControl">
    </div>
    <button (click)="onSubmit()">Submit</button>
</div>

<p>Form Control value: {{ nameControl.value | json }}</p>
<p>Form Control status: {{ nameControl.status | json }}</p>
```

Per a un `FormGroup`, es pot consultar directament l'estat
```html
<h2>Create Stock Form</h2>

<div class="form-group">
  <form [formGroup]="stockForm" (ngSubmit)="onSubmit()">
...
  </form>
</div>

<p>Form Control status: {{ stockForm.status | json }}</p>
```

O també consultar l'estat dels controls que conté. On primer s'accedeix al component a través de `get()` amb el `formControlName`:
```html
<h2>Create Stock Form</h2>

<div class="form-group">
  <form [formGroup]="stockForm" (ngSubmit)="onSubmit()">
    <div class="stock-name">
      <input type="text"
             placeholder="Stock Name"
             name="stockName"
             formControlName="name">
      <div *ngIf="stockForm.get('name').invalid &&
                  ( stockForm.get('name').dirty ||
                    stockForm.get('name').touched )">
        Name is required
      </div>
    </div>
...
```
També es poden definir getters:
```ts
@Component({
  selector: 'app-create-stock',
  templateUrl: './create-stock.component.html',
  styleUrls: ['./create-stock.component.css']
})
export class CreateStockComponent {
/*  Skipping irrelevant code here */

  get name() { return this.stockForm.get('name'); }

  get price() { return this.stockForm.get('price'); }

  get code() { return this.stockForm.get('code'); }
}
````
Ara a la plantilla HTML del component es pot utilitzar `name.invalid` en comptes de `stockForm.get('name').invalid` i així successivament.

