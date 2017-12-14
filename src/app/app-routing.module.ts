import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {RegisterComponent} from './auth/register/register.component';
import {LoginComponent} from './auth/login/login.component';
import {AuthGuard} from './auth/auth-guard.service';
import {SchedulesComponent} from './schedules/schedules.component';
import {ScheduleEditComponent} from './schedules/schedule-edit/schedule-edit.component';
import {ScheduleDetailComponent} from './schedules/schedule-detail/schedule-detail.component';
import {MoviesComponent} from './movies/movies.component';
import {MovieEditComponent} from './movies/movie-edit/movie-edit.component';
import {MovieDetailComponent} from './movies/movie-detail/movie-detail.component';
import {ReservationsComponent} from './reservations/reservations.component';
import {ReservationEditComponent} from './reservations/reservation-edit/reservation-edit.component';
import {ReservationDetailComponent} from './reservations/reservation-detail/reservation-detail.component';

const appRoutes: Routes = [
  {path: '', redirectTo: '/movies', pathMatch: 'full'},
  {
    path: 'movies', component: MoviesComponent, children: [
      {path: 'new', component: MovieEditComponent},
      {path: ':title', component: MovieDetailComponent},
      {path: ':title/edit', component: MovieEditComponent}
    ], canActivate: [AuthGuard]
  },
  {
    path: 'schedules', component: SchedulesComponent, children: [
      {path: 'new', component: ScheduleEditComponent},
      {path: ':_id', component: ScheduleDetailComponent},
      {path: ':_id/edit', component: ScheduleEditComponent}
    ], canActivate: [AuthGuard]
  },
  {
    path: 'reservations', component: ReservationsComponent, children: [
      {path: 'new', component: ReservationEditComponent},
      {path: ':_id', component: ReservationDetailComponent},
      {path: ':_id/edit', component: ReservationEditComponent}
    ], canActivate: [AuthGuard]
  },
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
