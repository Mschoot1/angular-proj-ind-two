import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';

import {Hall} from './hall.model';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class HallService {
  hallsChanged = new Subject<Hall[]>();

  private headers = new HttpHeaders({'Content-Type': 'application/json'});
  private serverUrl = environment.serverUrl;
  private halls: Hall[];

  constructor(private http: HttpClient) {
  }

  public getHalls() {
    return this.http.get(this.serverUrl + '/halls', {
      headers: this.headers.append(
        'Authorization', 'Bearer ' + localStorage.getItem('token')
      )
    })
      .toPromise()
      .then(response => {
        this.halls = response as Hall[];
        return this.halls;
      })
      .catch(error => {
        return error.message || error;
      });
  }

  public getHall(id: string) {
    return this.http.get(this.serverUrl + '/halls/' + id, {
      headers: this.headers.append(
        'Authorization', 'Bearer ' + localStorage.getItem('token')
      )
    })
      .toPromise()
      .then(response => {
        return response as Hall;
      })
      .catch(error => {
        return error.message || error;
      });
  }

  public addHall(body) {
    return this.http.post(this.serverUrl + '/halls', body, {
      headers: this.headers.append(
        'Authorization', 'Bearer ' + localStorage.getItem('token')
      )
    })
      .toPromise()
      .then(response => {
        const hall = response as Hall;
        this.halls.push(hall);
        this.hallsChanged.next(this.halls.slice());
        return hall;
      })
      .catch(error => {
        return error.message || error;
      });
  }

  public updateHall(id: string, body) {
    return this.http.put(this.serverUrl + '/halls/' + id, body, {
      headers: this.headers.append(
        'Authorization', 'Bearer ' + localStorage.getItem('token')
      )
    })
      .toPromise()
      .then(response => {
        const hall = response as Hall;
        this.halls[this.findIndexById(id)] = hall;
        this.hallsChanged.next(this.halls.slice());
        return hall;
      })
      .catch(error => {
        return error.message || error;
      });
  }


  public deleteHall(id: string) {
    return this.http.delete(this.serverUrl + '/halls/' + id, {
      headers: this.headers.append(
        'Authorization', 'Bearer ' + localStorage.getItem('token')
      )
    })
      .toPromise()
      .then(response => {
        const hall = response as Hall;
        this.halls.splice(this.findIndexById(id), 1);
        this.hallsChanged.next(this.halls.slice());
        return hall;
      })
      .catch(error => {
        return error.message || error;
      });
  }

  private findIndexById(id: string) {
    for (let i = 0; i < this.halls.length; i++) {
      if (this.halls[i]._id === id) {
        return i;
      }
    }
    return this.halls.length;
  }
}
