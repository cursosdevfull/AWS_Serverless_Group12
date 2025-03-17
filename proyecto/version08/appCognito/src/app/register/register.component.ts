import { Component, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CognitoService } from '../cognito.service';

@Component({
  selector: 'app-register',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule, RouterLink
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  fg: FormGroup
  cognitoService = inject(CognitoService);

  constructor() {
    this.fg = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  signUp() {
    if (this.fg.valid) {
      this.cognitoService.signUp(this.fg.value.email, this.fg.value.password);
    }
  }


}
