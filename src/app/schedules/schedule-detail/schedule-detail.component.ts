import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Schedule} from '../schedule.model';
import {ScheduleService} from '../schedule.service';
import {Hall} from '../../halls/hall.model';
import {Movie} from '../../movies/movie.model';
import {Cinema} from '../../cinemas/cinema.model';

@Component({
  selector: 'app-schedule-detail',
  templateUrl: './schedule-detail.component.html',
  styleUrls: ['./schedule-detail.component.css']
})
export class ScheduleDetailComponent implements OnInit {
  get schedule(): Schedule {
    return this._schedule;
  }

  private id: string;
  private _schedule = new Schedule({hall: new Hall({cinema: new Cinema()}), movie: new Movie()});

  constructor(private scheduleService: ScheduleService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(params => {
          this.id = params['_id'];
          this.scheduleService.getSchedule(this.id)
            .then(schedule => this._schedule = schedule)
            .catch(error => console.log(error));
        }
      );
  }

  onEditSchedule() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeleteSchedule() {
    this.scheduleService.deleteSchedule(this.id)
      .then(schedule => console.log(schedule))
      .catch(error => console.log(error));
    this.router.navigate(['/schedules']);
  }
}
