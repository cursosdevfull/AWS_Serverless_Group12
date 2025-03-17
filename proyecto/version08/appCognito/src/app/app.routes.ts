import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ConfirmComponent } from './confirm/confirm.component';

export const routes: Routes = [
    { path: "home", component: HomeComponent },
    { path: "register", component: RegisterComponent },
    { path: "confirm", component: ConfirmComponent },
    { path: "login", component: LoginComponent },
    { path: "**", redirectTo: "register", pathMatch: "full" }

];
