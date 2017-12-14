import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Reservation} from '../reservation.model';
import {Schedule} from '../../schedules/schedule.model';
import {Hall} from '../../halls/hall.model';
import {Cinema} from '../../../../../angular-proj-ind-two/src/app/cinemas/cinema.model';
import {Movie} from '../../movies/movie.model';
import {ReservationService} from '../reservation.service';

@Component({
  selector: 'app-reservation-detail',
  templateUrl: './reservation-detail.component.html',
  styleUrls: ['./reservation-detail.component.css']
})
export class ReservationDetailComponent implements OnInit {
  get reservation(): Reservation {
    return this._reservation;
  }

  private id: string;
  private _reservation = new Reservation({schedule: new Schedule({hall: new Hall({cinema: new Cinema()}), movie: new Movie()})});

  constructor(private reservationService: ReservationService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(params => {
          this.id = params['_id'];
          this.reservationService.getReservation(this.id)
            .then(reservation => this._reservation = reservation)
            .catch(error => console.log(error));
        }
      );
  }

  onEditReservation() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeleteReservation() {
    this.reservationService.deleteReservation(this.id)
      .then(reservation => console.log(reservation))
      .catch(error => console.log(error));
    this.router.navigate(['/reservations']);
  }
}
