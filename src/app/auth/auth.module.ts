/*  Copyright 2020 by Douglas Sauer | Blue Heart Software. */
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {LoginComponent} from './login/login.component';
import {AngularMaterialModule} from '../angular-material.module';

// import {AuthRoutingModule} from "./auth-routing.module";

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, AngularMaterialModule, FormsModule]
})
export class AuthModule {}
