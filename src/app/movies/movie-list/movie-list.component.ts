import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {Movie} from '../movie.model';
import {MovieService} from '../movie.service';
import {NgModel} from '@angular/forms';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  get searchQuery(): string {
    return this._searchQuery;
  }

  get movies(): Movie[] {
    return this._movies;
  }

  subscription: Subscription;
  private _searchQuery: string;
  private _movies: Movie[];

  constructor(private movieService: MovieService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
          if (params['searchQuery']) {
            this._searchQuery = params['searchQuery'];
            this.movieService.getMovies(this._searchQuery)
              .then(movies => this._movies = movies)
              .catch(error => console.log(error));
          } else {
            this._searchQuery = '';
            this.movieService.getMovies()
              .then(movies => this._movies = movies)
              .catch(error => console.log(error));
          }
        }
      );
    this.subscription = this.movieService.moviesChanged
      .subscribe((movies: Movie[]) => {
          this._movies = movies;
        }
      );
  }

  onNewMovie() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }
}
