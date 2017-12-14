import {Movie} from '../movies/movie.model';
import {User} from '../users/user.model';
import {Hall} from '../halls/hall.model';

export class Schedule {
  get _id(): string {
    return this.__id;
  }

  set _id(value: string) {
    this.__id = value;
  }

  get movie(): Movie {
    return this._movie;
  }

  set movie(value: Movie) {
    this._movie = value;
  }

  get hall(): Hall {
    return this._hall;
  }

  set hall(value: Hall) {
    this._hall = value;
  }

  get dateTime(): number {
    return this._dateTime;
  }

  set dateTime(value: number) {
    this._dateTime = value;
  }

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

  private __id: string;
  private _movie: Movie;
  private _hall: Hall;
  private _dateTime: number;
}
