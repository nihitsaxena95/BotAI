import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RedirectRoutingModule } from './redirect-routing.module';
import { RedirectComponent } from '../redirect/redirect.component';

@NgModule({
  imports: [
    CommonModule,
    RedirectRoutingModule,
    FormsModule
  ],
  declarations: [RedirectComponent]
})
export class RedirectModule { }

