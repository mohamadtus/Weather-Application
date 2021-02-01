import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { WeatherService } from '../shared/weather.service';

@Component({
  templateUrl: './city-forcast.component.html',
})
export class CityForcastComponent implements OnInit {
  forcastWeather: any = [];
  errorMessage: string;
  city: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private weatherService: WeatherService
  ) {
    this.weatherService.myMethod$.subscribe(() => {
      this.createDataForcast();
    });
    // Refresh the data each 15 minutes
    setInterval(() => {
      this.ngOnInit();
    }, 1000 * 60 * 15);
  }

  ngOnInit(): void {
    this.createDataForcast();
  }

  onBack(): void {
    this.router.navigate(['/cities']);
  }

  createDataForcast() {
    this.city = this.route.snapshot.paramMap.get('city');
    this.weatherService.getForcastWeather(this.city).subscribe({
      next: (weather) => {
        this.forcastWeather = weather;
      },
      error: (err) => (this.errorMessage = err),
    });
  }
}
