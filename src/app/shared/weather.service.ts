import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  language: string;
  myMethod$: Observable<any>;
  private myMethodSubject = new Subject<any>();

  constructor(private http: HttpClient) {
    this.myMethod$ = this.myMethodSubject.asObservable();
  }

  myMethod(data: any) {
    this.language = data;
    this.myMethodSubject.next(data);
  }

  getCurrentWeather(): Observable<any> {
    const currentWeatherUrl = `http://api.openweathermap.org/data/2.5/group?id=6077243,6325494,6167865,6173331,2988507&lang=${this.language}&units=metric&appid=3d6bef08efd2f1f4def7ccdc72ee53a0`;
    return this.http.get(currentWeatherUrl);
  }

  getForcastWeather(city: String): Observable<any> {
    const forcastWeatherUrl = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&lang=${this.language}&units=metric&appid=3d6bef08efd2f1f4def7ccdc72ee53a0`;
    return this.http.get(forcastWeatherUrl);
  }
}
