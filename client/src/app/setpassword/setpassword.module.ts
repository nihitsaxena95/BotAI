
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SetpasswordRoutingModule } from './setpassword-routing.module';
import { SetpasswordComponent } from './setpassword.component';
import { FormsModule } from '@angular/forms';


@NgModule({
    imports: [
        CommonModule,
        SetpasswordRoutingModule,
        FormsModule
    ],
    declarations: [SetpasswordComponent]
})
export class SetpasswordModule {
}
