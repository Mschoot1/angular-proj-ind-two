import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {MovieService} from './movie.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  constructor(private movieService: MovieService,
              private router: Router) { }

  ngOnInit() {
  }
}
