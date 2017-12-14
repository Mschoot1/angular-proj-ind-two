import {Component, OnInit} from '@angular/core';
import {Schedule} from '../../schedules/schedule.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Reservation} from '../reservation.model';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ScheduleService} from '../../schedules/schedule.service';
import {ReservationService} from '../reservation.service';
import {Hall} from '../../halls/hall.model';
import {Movie} from '../../movies/movie.model';

@Component({
  selector: 'app-reservation-edit',
  templateUrl: './reservation-edit.component.html',
  styleUrls: ['./reservation-edit.component.css']
})
export class ReservationEditComponent implements OnInit {
  get reservationForm(): FormGroup {
    return this._reservationForm;
  }

  get schedules(): Schedule[] {
    return this._schedules;
  }

  get reservation(): Reservation {
    return this._reservation;
  }

  private id = '';
  private editMode = false;
  private _schedules: Schedule[];
  private _reservation: Reservation = new Reservation({schedule: new Schedule()});
  private _reservationForm: FormGroup;

  constructor(private reservationService: ReservationService,
              private scheduleService: ScheduleService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['_id'];
          this.editMode = params['_id'] != null;
          this.initForm();
        }
      );
  }

  onSubmit() {
    if (this.editMode) {
      this.reservationService.updateReservation(this.id, this._reservationForm.value)
        .then(reservation => console.log(reservation))
        .catch(error => console.log(error));
    } else {
      this.reservationService.addReservation(this._reservationForm.value)
        .then(reservation => console.log(reservation))
        .catch(error => console.log(error));
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  private initForm() {
    const calls = [this.scheduleService.getSchedules()];
    if (this.editMode) {
      calls.push(this.reservationService.getReservation(this.id));
    }
    Promise.all(calls)
      .then(results => {
        this._schedules = results[0] as Schedule[];
        if (this.editMode) {
          this._reservation = results[1] as Reservation;
          this._reservationForm.patchValue(this._reservation);
        }
      })
      .catch(error => console.log(error));

    this._reservationForm = new FormGroup({
      'schedule': new FormGroup({
        '_id': new FormControl(null, Validators.required)
      }),
      'amount': new FormControl(null, Validators.required)
    });
  }
}
