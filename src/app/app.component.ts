import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { WeatherService } from './shared/weather.service';

@Component({
  selector: 'pm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  langSelected: string;

  onChange(newValue: string) {
    this.langSelected = newValue;
    this.weatherService.myMethod(this.langSelected);
  }

  constructor(
    public translate: TranslateService,
    private weatherService: WeatherService
  ) {
    this.weatherService.myMethod(this.langSelected);

    translate.addLangs(['en', 'fr']);
    translate.setDefaultLang('en');
    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
  }
}
