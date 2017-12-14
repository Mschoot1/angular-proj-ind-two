import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  get invalidCredentials(): boolean {
    return this._invalidCredentials;
  }

  private _invalidCredentials: boolean;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    if (this.authService.loggedIn()) {
      this.navigateToHome();
    }
  }

  onLogin(form: NgForm) {
    this.authService.login(form.value)
      .then(response => {
        localStorage.setItem('token', response);
        this._invalidCredentials = false;
        this.navigateToHome();
      })
      .catch(error => {
        this._invalidCredentials = error.status === 401;
        console.log(error);
      });
  }

  navigateToHome() {
    this.router.navigate(['/']);
  }
}
