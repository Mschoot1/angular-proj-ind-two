import {Injectable, OnInit} from '@angular/core';
import {Subject} from 'rxjs/Subject';

import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Reservation} from './reservation.model';

@Injectable()
export class ReservationService implements OnInit {
  reservationsChanged = new Subject<Reservation[]>();

  private headers = new HttpHeaders({'Content-Type': 'application/json'});
  private serverUrl = environment.serverUrl;
  private reservations: Reservation[];

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
  }

  public getReservations() {
    return this.http.get(this.serverUrl + '/reservations', {
      headers: this.headers.append(
        'Authorization', 'Bearer ' + localStorage.getItem('token')
      )
    })
      .toPromise()
      .then(response => {
        const reservations = response as Reservation[];
        this.reservations = reservations;
        return reservations;
      })
      .catch(error => {
        return error.message || error;
      });
  }

  public getReservation(id: string) {
    return this.http.get(this.serverUrl + '/reservations/' + id, {
      headers: this.headers.append(
        'Authorization', 'Bearer ' + localStorage.getItem('token')
      )
    })
      .toPromise()
      .then(response => {
        return response as Reservation;
      })
      .catch(error => {
        return error.message || error;
      });
  }

  addReservation(body) {
    return this.http.post(this.serverUrl + '/reservations', body, {
      headers: this.headers.append(
        'Authorization', 'Bearer ' + localStorage.getItem('token')
      )
    })
      .toPromise()
      .then(response => {
        const reservation = response as Reservation;
        this.reservations.push(reservation);
        this.reservationsChanged.next(this.reservations.slice());
        return reservation;
      })
      .catch(error => {
        return error.message || error;
      });
  }

  updateReservation(id: string, body) {
    return this.http.put(this.serverUrl + '/reservations/' + id, body, {
      headers: this.headers.append(
        'Authorization', 'Bearer ' + localStorage.getItem('token')
      )
    })
      .toPromise()
      .then(response => {
        const reservation = response as Reservation;
        this.reservations[this.findIndexById(id)] = reservation;
        this.reservationsChanged.next(this.reservations.slice());
        return reservation;
      })
      .catch(error => {
        return error.message || error;
      });
  }

  deleteReservation(id: string) {
    return this.http.delete(this.serverUrl + '/reservations/' + id, {
      headers: this.headers.append(
        'Authorization', 'Bearer ' + localStorage.getItem('token')
      )
    })
      .toPromise()
      .then(response => {
        const reservation = response as Reservation;
        this.reservations.splice(this.findIndexById(id), 1);
        this.reservationsChanged.next(this.reservations.slice());
        return reservation;
      })
      .catch(error => {
        return error.message || error;
      });
  }

  private findIndexById(id: string) {
    for (let i = 0; i < this.reservations.length; i++) {
      if (this.reservations[i]._id === id) {
        return i;
      }
    }
    return this.reservations.length;
  }
}
