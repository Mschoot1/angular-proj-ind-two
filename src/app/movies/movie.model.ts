interface Released {
  low: Number;
  high: Number;
}

export class Movie {
  get title(): String {
    return this._title;
  }

  set title(value: String) {
    this._title = value;
  }

  get tagline(): String {
    return this._tagline;
  }

  set tagline(value: String) {
    this._tagline = value;
  }

  get released(): Released {
    return this._released;
  }

  set released(value: Released) {
    this._released = value;
  }

  private _title: String;
  private _tagline: String;
  private _released: Released;
}
