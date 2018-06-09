import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';

import {ModelDate} from './models/ModelDate';
import {Schedule} from './models/Schedules';
import {Fortnight} from './models/Fortnight';
import {Raid} from './models/Raid';
import {Colosseum} from './models/Colosseum';

import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-daily',
  templateUrl: './daily.component.html',
  styleUrls: ['./daily.component.css']
})
export class DailyComponent implements OnInit {
  today: ModelDate;
  public schedule$: Schedule[];
  public fortnights$: Fortnight[];
  public colosseums$: Colosseum[];
  public raids$: Raid[];

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router, private _sanitizer: DomSanitizer) {

    let params = this.route.snapshot.params;

    let year  = params.year;
    let month = params.month;
    let day   = params.day;

    if(year && month && day){
      this.startup(new Date(year, (month - 1), day));
    } else {
      this.startup(new Date());
    }

  }

  ngOnInit() {
  }

  imageUrl(id): SafeUrl {
    let url = 'https://onepiece-treasurecruise.com/wp-content/uploads/';

    switch (id.toString().length) {
      case 1:
        return this._sanitizer.bypassSecurityTrustUrl(url + 'f000' + id + '.png');
      case 2:
        return this._sanitizer.bypassSecurityTrustUrl(url + 'f00' + id + '.png');
      case 3:
        return this._sanitizer.bypassSecurityTrustUrl(url + 'f0' + id + '.png');
      case 4:
        return this._sanitizer.bypassSecurityTrustUrl(url + 'f' + id + '.png');
            // return url + "f" + id + ".png";
    }
  }

  goToDay(type: number) {

    if (type === -1) {
      this.startup(new Date(this.today.date.getTime() - (86400 * 1000)));
    } else {
      this.startup(new Date(this.today.date.getTime() + (86400 * 1000)));
    }
  }

  startup(date: Date) {

    this.today = new ModelDate(date); // non si sta aggiornando

    this.fortnightSetup();
    this.raidSetup();
    this.colosseumSetup();
  }

  fortnightSetup() {
    this.fortnights$ = [];

    this.http.get<Schedule[]>('https://optc-api.herokuapp.com/api/jap_schedule/fn/' + this.today.toString())
      .subscribe(schedule => {
        this.schedule$ = schedule;

        schedule.forEach(fn => {
          this.http.get<Fortnight>('https://optc-api.herokuapp.com/api/fortnight/' + fn.fortnight)
            .subscribe(fn_data => {
              fn_data.bonus = fn.bonus;
              let data_tbegin = new Date(fn.data_begin);
              let data_tend = new Date(fn.data_end);

              // if (data_tbegin.getDay() === this.today.getDay() && (this.today.monthN === (data_tbegin.getMonth() + 1))) {
              //   fn_data.data_begin = 'Starts at ' + data_tbegin.getHours() + ':' + data_tbegin.getMinutes();
              // }
              //
              // if (data_tend.getDay() === this.today.getDay() && (this.today.monthN === (data_tend.getMonth() + 1))) {
              //   fn_data.data_end = 'Ends at ' + data_tend.getHours() + ':' + data_tend.getMinutes();
              // }

              fn_data.data_begin = this.startsAt(data_tbegin);
              fn_data.data_end = this.endsAt(data_tend);

              // fn_data.data_begin = fn.data_begin;
              this.fortnights$.push(fn_data);
            });
        });
      });
  }

  raidSetup() {
    this.raids$ = [];

    this.http.get<Schedule[]>('https://optc-api.herokuapp.com/api/jap_schedule/raid/' + this.today.toString())
      .subscribe(schedule => {

        schedule.forEach(raid => {
          this.http.get<Raid>('https://optc-api.herokuapp.com/api/raid/' + raid.raid)
            .subscribe(raid_data => {

              raid_data.bonus = raid.bonus;

              let data_tbegin = new Date(raid.data_begin);
              let data_tend = new Date(raid.data_end);

              raid_data.data_begin = this.startsAt(data_tbegin);
              raid_data.data_end = this.endsAt(data_tend);

              this.raids$.push(raid_data);
            });
        });
      });
  }

  colosseumSetup() {
    this.colosseums$ = [];

    this.http.get<Schedule[]>('https://optc-api.herokuapp.com/api/jap_schedule/colosseum/' + this.today.toString())
      .subscribe(schedule => {
        // this.schedule$ = schedule;

        console.log(schedule);

        schedule.forEach(colo => {
          console.log(colo.colosseum);
          this.http.get<Colosseum>('https://optc-api.herokuapp.com/api/colosseum/' + colo.colosseum)
            .subscribe(colo_data => {

              console.log(colo_data);

              colo_data.bonus = colo.bonus;

              let data_tbegin = new Date(colo.data_begin);
              let data_tend = new Date(colo.data_end);

              colo_data.data_begin = this.startsAt(data_tbegin);
              colo_data.data_end = this.endsAt(data_tend);

              this.colosseums$.push(colo_data);
            });
        });
      });
  }

  startsAt(data_tbegin): string{
    if (data_tbegin.getDay() === this.today.getDay() && (this.today.monthN === (data_tbegin.getMonth() + 1))) {
      return 'Starts at ' + data_tbegin.getHours() + ':' + data_tbegin.getMinutes();
    }

    return null;
  }

  endsAt(data_tend): string{
    if (data_tend.getDay() === this.today.getDay() && (this.today.monthN === (data_tend.getMonth() + 1))) {
      return 'Ends at ' + data_tend.getHours() + ':' + data_tend.getMinutes();
    }

    return null;
  }

  nakamaFnLink(title: string): SafeUrl {
    // let optcdb_json = window.drops.Fortnight;
    let linkNakama = null;
    // let jjj = false;

    return this._sanitizer.bypassSecurityTrustUrl(linkNakama);
  }
}
