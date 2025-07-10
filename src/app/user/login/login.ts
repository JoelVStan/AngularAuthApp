import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../shared/services/auth';
import { ToastrService } from 'ngx-toastr';
import { TOKEN_KEY } from '../../shared/constants';

@Component({
  selector: 'app-login',
  imports: [CommonModule,ReactiveFormsModule,RouterLink],
  templateUrl: './login.html',
  styles: ``
})
export class Login implements OnInit {
  form;
  constructor(
    public formBuilder: FormBuilder, 
    private service: Auth,
    private router: Router,
    private toastr: ToastrService
  ) { 
    this.form = this.formBuilder.group({ 
      email: ['',Validators.required], 
      password: ['',Validators.required,], 
    });
  }
  ngOnInit(): void {
    if(this.service.isLoggedIn()) {
      this.router.navigateByUrl('/dashboard');
    }
  }
  isSubmitted:boolean = false;

  onSubmit(){
    this.isSubmitted = true;
    if(this.form.valid) {
      this.service.signIn(this.form.value)
      .subscribe({
        next: (res:any) => {
          localStorage.setItem(TOKEN_KEY, res.token);
          this.toastr.success('Logged in successfully');
          this.router.navigateByUrl('/dashboard');
        },
        error: (err) => {
          if(err.status == 400){
            this.toastr.error('Invalid email or password', 'Login failed');
          }
          else{
            console.error('error:', err);
          }
        }
      })
    }
  }

  hasDisplayableError(controlName: string): Boolean {
    const control = this.form.get(controlName);
    return Boolean(control?.invalid) &&
      (this.isSubmitted || Boolean(control?.touched) || Boolean(control?.dirty)) 
  }
}
