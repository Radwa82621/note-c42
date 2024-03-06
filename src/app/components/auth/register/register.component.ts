import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  hide = true;

  constructor(
    private _fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}
  registerForm: FormGroup = this._fb.group({
    name: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(8)],
    ],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    age: ['', [Validators.required, Validators.min(18)]],
    phone: ['', [Validators.required]],
  });

  register() {
    console.log(this.registerForm);
    this.auth.register(this.registerForm.value).subscribe({
      next: (res) => {
        console.log(res);
        this.showSuccess();
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.log(err);
        this.showError(err.error.msg);
      },
    });
  }

  showSuccess() {
    this.toastr.success('welcome to our family');
  }

  showError(msg: string) {
    this.toastr.error(msg);
  }
}
