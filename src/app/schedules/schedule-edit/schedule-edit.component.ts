import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {HallService} from '../../halls/hall.service';
import {Hall} from '../../halls/hall.model';
import {MovieService} from '../../movies/movie.service';
import {Movie} from '../../movies/movie.model';
import {Schedule} from '../schedule.model';
import {ScheduleService} from '../schedule.service';

@Component({
  selector: 'app-schedule-edit',
  templateUrl: './schedule-edit.component.html',
  styleUrls: ['./schedule-edit.component.css']
})
export class ScheduleEditComponent implements OnInit {
  get halls(): Hall[] {
    return this._halls;
  }

  get movies(): Movie[] {
    return this._movies;
  }

  get scheduleForm(): FormGroup {
    return this._scheduleForm;
  }

  private id = '';
  private editMode = false;
  private _halls: Hall[];
  private _movies: Movie[];
  private schedule: Schedule = new Schedule();
  private _scheduleForm: FormGroup;

  constructor(private scheduleService: ScheduleService,
              private hallService: HallService,
              private movieService: MovieService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['_id'];
          this.editMode = params['_id'] != null;
          this.initForm();
        }
      );
  }

  onSubmit() {
    if (this.editMode) {
      this.scheduleService.updateSchedule(this.id, this.scheduleForm.value)
        .then(schedule => console.log(schedule))
        .catch(error => console.log(error));
    } else {
      this.scheduleService.addSchedule(this.scheduleForm.value)
        .then(schedule => console.log(schedule))
        .catch(error => console.log(error));
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  private initForm() {
    const calls = [this.hallService.getHalls(), this.movieService.getMovies()];
    if (this.editMode) {
      calls.push(this.scheduleService.getSchedule(this.id));
    }
    Promise.all(calls)
      .then(results => {
        this._halls = results[0] as Hall[];
        this._movies = results[1] as Movie[];
        if (this.editMode) {
          this.schedule = results[2] as Schedule;
          this._scheduleForm.patchValue(this.schedule);
        }
      })
      .catch(error => console.log(error));

    this._scheduleForm = new FormGroup({
      'movie': new FormGroup({
        'title': new FormControl(null, Validators.required)
      }),
      'hall': new FormGroup({
        '_id': new FormControl(null, Validators.required)
      }),
      'dateTime': new FormControl(null, Validators.required)
    });
  }
}
