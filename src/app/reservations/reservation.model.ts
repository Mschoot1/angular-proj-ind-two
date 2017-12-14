import {Movie} from '../movies/movie.model';
import {User} from '../users/user.model';
import {Hall} from '../halls/hall.model';
import {Schedule} from '../schedules/schedule.model';

export class Reservation {
  get _id(): string {
    return this.__id;
  }

  set _id(value: string) {
    this.__id = value;
  }

  get schedule(): Schedule {
    return this._schedule;
  }

  set schedule(value: Schedule) {
    this._schedule = value;
  }

  get user(): User {
    return this._user;
  }

  set user(value: User) {
    this._user = value;
  }

  get amount(): Number {
    return this._amount;
  }

  set amount(value: Number) {
    this._amount = value;
  }

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

  private __id: string;
  private _schedule: Schedule;
  private _user: User;
  private _amount: Number;
}
