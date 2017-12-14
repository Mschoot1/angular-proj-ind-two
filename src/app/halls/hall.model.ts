import {Cinema} from '../cinemas/cinema.model';

export class Hall {

  get _id(): string {
    return this.__id;
  }

  set _id(value: string) {
    this.__id = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get cinema(): Cinema {
    return this._cinema;
  }

  set cinema(value: Cinema) {
    this._cinema = value;
  }

  get capacity(): number {
    return this._capacity;
  }

  set capacity(value: number) {
    this._capacity = value;
  }

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

  private __id: string;
  private _name: string;
  private _cinema: Cinema;
  private _capacity: number;
}
