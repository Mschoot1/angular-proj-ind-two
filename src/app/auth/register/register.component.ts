import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../auth.service';
import {Subscription} from 'rxjs/Subscription';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  get usernameTaken(): boolean {
    return this._usernameTaken;
  }

  set usernameTaken(value: boolean) {
    this._usernameTaken = value;
  }

  private _usernameTaken: boolean;

  constructor(private authService: AuthService, private router: Router) {

  }

  ngOnInit() {
  }

  onRegister(form: NgForm) {
    this.authService.register(form.value)
      .then(response => this.onLogin(response))
      .catch(error => this.errorHandler(error));
  }

  onLogin(credentials) {
    this.authService.login(credentials)
      .then(response => {
        localStorage.setItem('token', response);
        this.router.navigate(['/']);
      })
      .catch(error => {
        console.log(error);
      });
  }

  errorHandler(error) {
    this._usernameTaken = error.status === 409;
    console.log(error);
  }
}
