import { Component } from '@angular/core';

import { WeatherService } from '../shared/weather.service';

@Component({
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.css'],
})
export class CityListComponent {
  currentWeather: any = [];
  errorMessage: string;
  today = new Date();
  sortByTemp: boolean = false;


  constructor(private weatherService: WeatherService) {
    this.weatherService.myMethod$.subscribe(() => {
      this.createData();
    });
    // Refresh the data each 15 minutes
    setInterval(() => {
      this.ngOnInit();
    }, 1000 * 60 * 15);
  }

  ngOnInit(): void {
    this.createData();
  }

  toggleSort(): void {
    this.sortByTemp = !this.sortByTemp;
    this.ngOnInit();
  }

  createData() {
    this.weatherService.getCurrentWeather().subscribe({
      next: (weather) => {
        this.currentWeather = weather;
        if (!this.sortByTemp) {
          this.currentWeather.list.sort(
            (a: { name: string }, b: { name: any }) =>
              a.name.localeCompare(b.name)
          );
        } else {
          this.currentWeather.list.sort((a, b) => a.main.temp - b.main.temp);
        }
      },
      error: (err) => (this.errorMessage = err),
    });
  }
}
