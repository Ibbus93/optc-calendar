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

import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-daily',
  templateUrl: './daily.component.html',
  styleUrls: ['./daily.component.css']
})
export class DailyComponent implements OnInit {
  today: ModelDate;
  // public schedule$: Observable<any>;
  public schedule$: FnSchedule[];
  public fortnights$: Fortnight[] = [];

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router, private _sanitizer: DomSanitizer) {
    this.today = new ModelDate(new Date());

    http.get<FnSchedule[]>('https://optc-api.herokuapp.com/api/jap_schedule/fn/2018-05-04')
      .subscribe(schedule => {
        this.schedule$ = schedule;


        schedule.forEach(fn => {
          console.log(fn.bonus);
          http.get<Fortnight>('https://optc-api.herokuapp.com/api/fortnight/' + fn.fortnight)
            .subscribe(fn_data => {
              fn_data.bonus = fn.bonus;
              // let thingtopush = fn_data;
              // thingtopush.setBonus(fn.bonus);
              this.fortnights$.push(fn_data);
            });
        });
      });
  }

  ngOnInit() {
  }

  imageUrl(id) : SafeUrl{
    let url = 'https://onepiece-treasurecruise.com/wp-content/uploads/';

    switch (id.toString().length) {
      case 1:
        return this._sanitizer.bypassSecurityTrustUrl(url + "f000" + id + ".png");
      case 2:
        return this._sanitizer.bypassSecurityTrustUrl(url + "f00" + id + ".png");
      case 3:
        return this._sanitizer.bypassSecurityTrustUrl(url + "f0" + id + ".png");
      case 4:
        return this._sanitizer.bypassSecurityTrustUrl(url + "f" + id + ".png");
            // return url + "f" + id + ".png";
    }
  }

  async idToImagePath(id: number) {
    let response;

    try {
      await this.http.get('https://optc-api.herokuapp.com/api/images/' + id)
        .subscribe(value => response = value)
    }catch(err) {
      console.log(err);
    }

    return response.path;
  }
}
