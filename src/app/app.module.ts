import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AuthGuard} from './auth/auth-guard.service';
import {AuthService} from './auth/auth.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {LoginComponent} from './auth/login/login.component';
import {RegisterComponent} from './auth/register/register.component';
import {HeaderComponent} from './header/header.component';
import {CinemasComponent} from './cinemas/cinemas.component';
import {HallsComponent} from './halls/halls.component';
import {SchedulesComponent} from './schedules/schedules.component';
import {ScheduleListComponent} from './schedules/schedule-list/schedule-list.component';
import {ScheduleEditComponent} from './schedules/schedule-edit/schedule-edit.component';
import {ScheduleDetailComponent} from './schedules/schedule-detail/schedule-detail.component';
import {ReservationsComponent} from './reservations/reservations.component';
import {ReservationDetailComponent} from './reservations/reservation-detail/reservation-detail.component';
import {ReservationListComponent} from './reservations/reservation-list/reservation-list.component';
import {ReservationEditComponent} from './reservations/reservation-edit/reservation-edit.component';
import {MoviesComponent} from './movies/movies.component';
import {MovieDetailComponent} from './movies/movie-detail/movie-detail.component';
import {MovieEditComponent} from './movies/movie-edit/movie-edit.component';
import {MovieListComponent} from './movies/movie-list/movie-list.component';
import {CinemaService} from './cinemas/cinema.service';
import {MovieService} from './movies/movie.service';
import {ReservationService} from './reservations/reservation.service';
import {ScheduleService} from './schedules/schedule.service';
import {HallService} from './halls/hall.service';
import {UsersComponent} from './users/users.component';

@NgModule({
  declarations: [
    AppComponent,
    HallsComponent,
    HeaderComponent,
    SchedulesComponent,
    ScheduleListComponent,
    RegisterComponent,
    LoginComponent,
    CinemasComponent,
    UsersComponent,
    ScheduleEditComponent,
    ScheduleDetailComponent,
    ReservationsComponent,
    ReservationDetailComponent,
    ReservationListComponent,
    ReservationEditComponent,
    MoviesComponent,
    MovieDetailComponent,
    MovieEditComponent,
    MovieListComponent
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [ReservationService, CinemaService, ScheduleService, HallService, AuthService, MovieService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
}
