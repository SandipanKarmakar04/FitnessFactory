import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone:true,
  imports: [ReactiveFormsModule, HttpClientModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
 userForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.userForm.invalid) {
      alert('Please fill all fields properly');
      return;
    }

    const user = this.userForm.value;

    console.log(user); // DEBUG

    this.http.post('http://localhost:8080/addUser', user)
      .subscribe({
        next: (res) => {
          console.log(res);
          alert('Success');
          this.userForm.reset();
        },
        error: (err) => {
          console.error(err);
          alert('Something went wrong');
        }
      });
  }
}
