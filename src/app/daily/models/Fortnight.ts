import {FnBook} from './FnBook';

export class Fortnight {
  ID: number;
  title: string;
  conditions: string;
  tinyImg: string;
  bigImg: string;
  books: FnBook[];
  drops: number[];
  bonus: number;
  data_begin: any;
  data_end: any;
}
