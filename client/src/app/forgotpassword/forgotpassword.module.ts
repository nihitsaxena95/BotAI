
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ForgotpasswordRoutingModule } from './forgotpassword-routing.module';
import { ForgotpasswordComponent } from './forgotpassword.component';
import  {FormsModule} from '@angular/forms';


@NgModule({
    imports: [
        CommonModule,
        ForgotpasswordRoutingModule,
        FormsModule
    ],
    declarations: [ForgotpasswordComponent]
})
export class ForgotpasswordModule {
}

