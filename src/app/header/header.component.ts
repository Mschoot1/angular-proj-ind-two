import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
  }

  onLogout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
