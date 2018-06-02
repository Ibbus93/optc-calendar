import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';
import { share } from 'rxjs/operators';

import {ModelDate} from './models/ModelDate';
import {FnSchedule} from './models/Schedules';
import {Fortnight} from './models/Fortnight';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-daily',
  templateUrl: './daily.component.html',
  styleUrls: ['./daily.component.css']
})
export class DailyComponent implements OnInit {
  today: ModelDate;
  schedule: FnSchedule[];
  public fort$: Fortnight[] = [];
  public asd$: Observable<any>;

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {
    this.today = new ModelDate(new Date());
    this.asd$ = http.get<FnSchedule[]>('https://optc-api.herokuapp.com/api/jap_schedule/fn/2018-05-04').pipe(share());//+ this.today.year + '-' + this.today.monthN + '-' + this.today.day)
  }

  ngOnInit() {
  }
}
