import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';

import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Movie} from './movie.model';

@Injectable()
export class MovieService {
  moviesChanged = new Subject<Movie[]>();

  private headers = new HttpHeaders({'Content-Type': 'application/json'});
  private serverUrl = environment.serverUrl;
  private movies: Movie[];

  constructor(private http: HttpClient) {
  }

  public getMovies(searchQuery?: string) {
    const params = searchQuery ? new HttpParams().set('searchQuery', searchQuery) : new HttpParams();
    return this.http.get(this.serverUrl + '/movies', {
      params: params,
      headers: this.headers.append(
        'Authorization', 'Bearer ' + localStorage.getItem('token')
      )
    })
      .toPromise()
      .then(response => {
        this.movies = response as Movie[];
        return this.movies;
      })
      .catch(error => {
        return error.message || error;
      });
  }

  getMovie(title: string) {
    return this.http.get(this.serverUrl + '/movies/' + title, {
      headers: this.headers.append(
        'Authorization', 'Bearer ' + localStorage.getItem('token')
      )
    })
      .toPromise()
      .then(response => {
        return response as Movie;
      })
      .catch(error => {
        return error.message || error;
      });
  }

  public addMovie(body) {
    return this.http.post(this.serverUrl + '/movies', body, {
      headers: this.headers.append(
        'Authorization', 'Bearer ' + localStorage.getItem('token')
      )
    })
      .toPromise()
      .then(response => {
        const cinema = response as Movie;
        this.movies.push(cinema);
        this.moviesChanged.next(this.movies.slice());
        return cinema;
      })
      .catch(error => {
        return error.message || error;
      });
  }

  public updateMovie(title: string, body) {
    return this.http.put(this.serverUrl + '/movies/' + title, body, {
      headers: this.headers.append(
        'Authorization', 'Bearer ' + localStorage.getItem('token')
      )
    })
      .toPromise()
      .then(response => {
        const cinema = response as Movie;
        this.movies[this.findIndexById(title)] = cinema;
        this.moviesChanged.next(this.movies.slice());
        return cinema;
      })
      .catch(error => {
        return error.message || error;
      });
  }

  deleteMovie(title: string) {
    return this.http.delete(this.serverUrl + '/movies/' + title, {
      headers: this.headers.append(
        'Authorization', 'Bearer ' + localStorage.getItem('token')
      )
    })
      .toPromise()
      .then(response => {
        const movie = response as Movie;
        this.movies.splice(this.findIndexById(title), 1);
        this.moviesChanged.next(this.movies.slice());
        return movie;
      })
      .catch(error => {
        return error.message || error;
      });
  }

  private findIndexById(title: string) {
    for (let i = 0; i < this.movies.length; i++) {
      if (this.movies[i].title === title) {
        return i;
      }
    }
    return this.movies.length;
  }
}
