import {Component, OnInit} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  formGroup: UntypedFormGroup;
  cadastralMask = '00-000-000-000';
  phonePrefix = '+7';
  phoneMask = '(000) 000-00-00';
  numberErrorMessage: string;
  cadastralNumberErrorMessage: string;
  phoneNumberErrorMessage: string;

  constructor() {
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.formGroup = new UntypedFormGroup({
      number: new UntypedFormControl(null, [
        Validators.required,
        Validators.pattern('/^-?(0|[1-9]\\d*)?$/'),
        Validators.minLength(Number.MIN_SAFE_INTEGER),
        Validators.maxLength(Number.MAX_SAFE_INTEGER),
      ]),
      cadastralNumber: new UntypedFormControl('', [
        Validators.maxLength(255),
      ]),
      phoneNumber: new UntypedFormControl('', [
        Validators.maxLength(255),
      ]),
    });
  }

  onSendForm() {
    this.onCheck();
  }

  onCheck(): boolean {
    let isValid = true;
    if (!this.formGroup.get('number')?.value) {
      this.numberErrorMessage = 'Введите номер';
      this.messageTimeOut();
      isValid = false;
    } else if (!this.formGroup.get('cadastralNumber')?.value) {
      this.cadastralNumberErrorMessage = 'Введите кадастровый номер';
      this.messageTimeOut();
      isValid = false;
    } else if (this.formGroup.get('cadastralNumber')?.value.length < 11) {
      this.cadastralNumberErrorMessage = 'Кадастровый номер введен не корректно';
      this.messageTimeOut();
      isValid = false;
    } else if (!this.formGroup.get('phoneNumber')?.value) {
      this.phoneNumberErrorMessage = 'Введите номер телефона';
      this.messageTimeOut();
      isValid = false;
    } else if (this.formGroup.get('phoneNumber')?.value.length < 8) {
      this.phoneNumberErrorMessage = 'Номер введен не корректно';
      this.messageTimeOut();
      isValid = false;
    }
    return isValid;
  }

  messageTimeOut(): void {
    setTimeout(() => {
      this.numberErrorMessage = '';
      this.cadastralNumberErrorMessage = '';
      this.phoneNumberErrorMessage = '';
    }, 4000);
  }
}
