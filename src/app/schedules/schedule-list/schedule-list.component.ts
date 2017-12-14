import {Component, OnInit} from '@angular/core';
import {ScheduleService} from '../schedule.service';
import {Subscription} from 'rxjs/Subscription';
import {Schedule} from '../schedule.model';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-schedule-list',
  templateUrl: './schedule-list.component.html',
  styleUrls: ['./schedule-list.component.css']
})
export class ScheduleListComponent implements OnInit {
  get schedules(): Schedule[] {
    return this._schedules;
  }

  subscription: Subscription;
  private _schedules: Schedule[];

  constructor(private scheduleService: ScheduleService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.scheduleService.getSchedules()
      .then(schedules => this._schedules = schedules)
      .catch(error => console.log(error));
    this.subscription = this.scheduleService.schedulesChanged
      .subscribe((schedules: Schedule[]) => {
          this._schedules = schedules;
        }
      );
  }

  onNewSchedule() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }
}
