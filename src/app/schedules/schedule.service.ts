import {Injectable, OnInit} from '@angular/core';
import {Subject} from 'rxjs/Subject';

import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Schedule} from './schedule.model';

@Injectable()
export class ScheduleService implements OnInit {
  schedulesChanged = new Subject<Schedule[]>();

  private headers = new HttpHeaders({'Content-Type': 'application/json'});
  private serverUrl = environment.serverUrl;
  private schedules: Schedule[];

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
  }

  public getSchedules() {
    return this.http.get(this.serverUrl + '/schedules', {
      headers: this.headers.append(
        'Authorization', 'Bearer ' + localStorage.getItem('token')
      )
    })
      .toPromise()
      .then(response => {
        const schedules = response as Schedule[];
        this.schedules = schedules;
        return schedules;
      })
      .catch(error => {
        return error.message || error;
      });
  }

  public getSchedule(id: string) {
    return this.http.get(this.serverUrl + '/schedules/' + id, {
      headers: this.headers.append(
        'Authorization', 'Bearer ' + localStorage.getItem('token')
      )
    })
      .toPromise()
      .then(response => {
        return response as Schedule;
      })
      .catch(error => {
        return error.message || error;
      });
  }

  deleteSchedule(id: string) {
    return this.http.delete(this.serverUrl + '/schedules/' + id, {
      headers: this.headers.append(
        'Authorization', 'Bearer ' + localStorage.getItem('token')
      )
    })
      .toPromise()
      .then(response => {
        const schedule = response as Schedule;
        this.schedules.splice(this.findIndexById(id), 1);
        this.schedulesChanged.next(this.schedules.slice());
        return schedule;
      })
      .catch(error => {
        return error.message || error;
      });
  }

  addSchedule(body) {
    return this.http.post(this.serverUrl + '/schedules', body, {
      headers: this.headers.append(
        'Authorization', 'Bearer ' + localStorage.getItem('token')
      )
    })
      .toPromise()
      .then(response => {
        const schedule = response as Schedule;
        this.schedules.push(schedule);
        this.schedulesChanged.next(this.schedules.slice());
        return schedule;
      })
      .catch(error => {
        return error.message || error;
      });
  }

  updateSchedule(id: string, body) {
    return this.http.put(this.serverUrl + '/schedules/' + id, body, {
      headers: this.headers.append(
        'Authorization', 'Bearer ' + localStorage.getItem('token')
      )
    })
      .toPromise()
      .then(response => {
        const schedule = response as Schedule;
        this.schedules[this.findIndexById(id)] = schedule;
        this.schedulesChanged.next(this.schedules.slice());
        return schedule;
      })
      .catch(error => {
        return error.message || error;
      });
  }

  private findIndexById(id: string) {
    for (let i = 0; i < this.schedules.length; i++) {
      if (this.schedules[i]._id === id) {
        return i;
      }
    }
    return this.schedules.length;
  }
}
