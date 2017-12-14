interface Address {
  streetName: string;
  city: string;
  zipCode: string;
}

export class Cinema {
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

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

  private __id: string;
  private _name: string;
  private address: Address;
}
