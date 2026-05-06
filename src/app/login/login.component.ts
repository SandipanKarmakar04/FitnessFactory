import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone:true,
  imports: [ReactiveFormsModule, HttpClientModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  onLogin() {
    // console.log("Login clicked");
    if (this.loginForm.invalid) {
      alert("Fill all fields properly");
      return;
    }

    const loginData = this.loginForm.value;

    this.http.post<any>('http://localhost:8080/login', loginData)
      .subscribe({
        next: (res) => {
          console.log("Login success", res);

          // ✅ Save user/token
          localStorage.setItem("user", JSON.stringify(res));

          // ✅ Navigate
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          console.error(err);
          alert("Invalid email or password");
        }
      });
  }
}
