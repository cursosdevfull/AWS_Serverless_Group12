import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CognitoService } from '../cognito.service';

@Component({
  selector: 'app-confirm',
  imports: [MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,],
  templateUrl: './confirm.component.html',
  styleUrl: './confirm.component.css'
})
export class ConfirmComponent {
  fg: FormGroup
  cognitoService = inject(CognitoService);

  constructor() {
    this.fg = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      code: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(6)]),
    });
  }


  confirmSignUp() {
    if (this.fg.valid) {
      this.cognitoService.confirmSignUp(this.fg.value.email, this.fg.value.code);
    }
  }
}
