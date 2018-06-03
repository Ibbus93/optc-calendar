export class ModelDate {
  date: Date;
  day: number;
  monthText: string;
  monthN: number;
  year: number;

  constructor(date: Date) {
    this.date = date;
    this.day = date.getDate();
    this.monthText = ModelDate.numberToMonth(date.getMonth() + 1);
    this.monthN = date.getMonth() + 1;
    this.year = date.getFullYear();
  }

  static numberToMonth(number) {

    switch (number) {
      case 1:
        return 'January';
      case 2:
        return 'February';
      case 3:
        return 'March';
      case 4:
        return 'April';
      case 5:
        return 'May';
      case 6:
        return 'June';
      case 7:
        return 'July';
      case 8:
        return 'August';
      case 9:
        return 'September';
      case 10:
        return 'October';
      case 11:
        return 'November';
      case 12:
        return 'December';
    }
  }

  toString() : string {
    return this.year + '-' + this.monthN + '-' + this.day;
  }
}
