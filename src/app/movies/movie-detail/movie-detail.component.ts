import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Movie} from '../movie.model';
import {MovieService} from '../movie.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
  get movie(): Movie {
    return this._movie;
  }

  private title: string;
  private _movie = new Movie();

  constructor(private movieService: MovieService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(params => {
        this.title = params['title'];
          this.movieService.getMovie(this.title)
            .then(movie => this._movie = movie)
            .catch(error => console.log(error));
        }
      );
  }
}
