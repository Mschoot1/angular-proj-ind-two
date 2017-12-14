export class User {
  get _id(): string {
    return this.__id;
  }

  set _id(value: string) {
    this.__id = value;
  }

  get username(): string {
    return this._username;
  }

  set username(value: string) {
    this._username = value;
  }

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

  private __id: string;
  private _username: string;
}
