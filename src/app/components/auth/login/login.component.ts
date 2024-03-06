import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  hide = true;

  constructor(
    private _fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}
  loginForn: FormGroup = this._fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  login() {
    console.log(this.loginForn);
    this.auth.login(this.loginForn.value).subscribe({
      next: (res) => {
        console.log(res);
        this.showSuccess();
        localStorage.setItem('userToken', res.token);
        this.auth.userData();
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.log(err);
        this.showError(err.error.msg);
      },
    });
    console.log(this.loginForn);
  }

  showSuccess() {
    this.toastr.success('welcome back');
  }

  showError(msg: string) {
    this.toastr.error(msg);
  }
}
