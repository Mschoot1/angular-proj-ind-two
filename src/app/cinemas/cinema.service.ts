import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';

import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Cinema} from './cinema.model';

@Injectable()
export class CinemaService {
  cinemasChanged = new Subject<Cinema[]>();

  private headers = new HttpHeaders({'Content-Type': 'application/json'});
  private serverUrl = environment.serverUrl;
  private cinemas: Cinema[];

  constructor(private http: HttpClient) {
  }

  public getCinemas(): Promise<Cinema[]> {
    return this.http.get(this.serverUrl + '/cinemas', {
      headers: this.headers.append(
        'Authorization', 'Bearer ' + localStorage.getItem('token')
      )
    })
      .toPromise()
      .then(response => {
        this.cinemas = response as Cinema[];
        return this.cinemas;
      })
      .catch(error => {
        return error.message || error;
      });
  }

  getCinema(id: string) {
    return this.http.get(this.serverUrl + '/cinemas/' + id, {
      headers: this.headers.append(
        'Authorization', 'Bearer ' + localStorage.getItem('token')
      )
    })
      .toPromise()
      .then(response => {
        return response as Cinema;
      })
      .catch(error => {
        return error.message || error;
      });
  }

  public addCinema(body) {
    return this.http.post(this.serverUrl + '/cinemas', body, {
      headers: this.headers.append(
        'Authorization', 'Bearer ' + localStorage.getItem('token')
      )
    })
      .toPromise()
      .then(response => {
        const cinema = response as Cinema;
        this.cinemas.push(cinema);
        this.cinemasChanged.next(this.cinemas.slice());
        return cinema;
      })
      .catch(error => {
        return error.message || error;
      });
  }

  public updateCinema(id: string, body) {
    return this.http.put(this.serverUrl + '/cinemas/' + id, body, {
      headers: this.headers.append(
        'Authorization', 'Bearer ' + localStorage.getItem('token')
      )
    })
      .toPromise()
      .then(response => {
        const cinema = response as Cinema;
        this.cinemas[this.findIndexById(id)] = cinema;
        this.cinemasChanged.next(this.cinemas.slice());
        return cinema;
      })
      .catch(error => {
        return error.message || error;
      });
  }

  deleteCinema(id: string) {
    return this.http.delete(this.serverUrl + '/cinemas/' + id, {
      headers: this.headers.append(
        'Authorization', 'Bearer ' + localStorage.getItem('token')
      )
    })
      .toPromise()
      .then(response => {
        const cinema = response as Cinema;
        this.cinemas.splice(this.findIndexById(id), 1);
        this.cinemasChanged.next(this.cinemas.slice());
        return cinema;
      })
      .catch(error => {
        return error.message || error;
      });
  }

  private findIndexById(id: string) {
    for (let i = 0; i < this.cinemas.length; i++) {
      if (this.cinemas[i]._id === id) {
        return i;
      }
    }
    return this.cinemas.length;
  }
}
