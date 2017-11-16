import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import { NG_VALIDATORS,Validator,
  Validators,AbstractControl,ValidatorFn } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RegisterRoutingModule,
    FormsModule
  ],
  declarations: [RegisterComponent]
})
export class RegisterModule { }
