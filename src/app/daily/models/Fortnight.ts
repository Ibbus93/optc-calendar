import {FnBook} from './FnBook';
import {FnSchedule} from './Schedules';
import {Observable} from 'rxjs/Observable';
import {ModelDate} from './ModelDate';
import {HttpClient} from '@angular/common/http';

export class Fortnight {
  ID: number;
  title: string;
  conditions: string;
  tinyImg: number;
  bigImg: number;
  books: FnBook[];
  drops: number[];

/*  static async getJapFnSchedule(today: ModelDate): FnSchedule[] {
    let http: HttpClient;

    await http.get<FnSchedule[]>(
      'https://optc-api.herokuapp.com/api/jap_schedule/fn/'
      + today.year + '-' + today.monthN + '-' + today.day)
      .subscribe(fns => {
          return fns;
        }
      );

    return null;
  }*/

  /*
        console.log('schedule');
        console.log(this.schedule);
        schedule.forEach((fn: FnSchedule) => {
          this.getFortnightById(fn.ID)
            .then(result => {
              this.fort.push(result);
            })
            .catch(err => {
              console.log(err);
            });

        });
      } catch (err) {
        console.log(err);
      }

      console.log(aux);
      return aux;*/


/*  static async getFortnightById(id: number) {
    console.log('Ho ricevuto: ' + id);

    let http: HttpClient;
    let response;

    try {
      response = await http.get<Fortnight>('https://optc-api.herokuapp.com/api/fortnight/' + id);
    } catch (err) {
      console.log(err);
    }

    return response;
  }*/
}
