import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppComponent } from './app.component';
import { CityListComponent } from './list/city-list.component';
import { CityForcastComponent } from './forcast/city-forcast.component';
import { ConvertDate } from './shared/convert-date.piep';

export function HttpLoadFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    CityListComponent,
    CityForcastComponent,
    ConvertDate,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoadFactory,
        deps: [HttpClient],
      },
    }),
    RouterModule.forRoot([
      { path: 'cities', component: CityListComponent },
      {
        path: 'forcast/:city',
        component: CityForcastComponent,
      },
      { path: '', redirectTo: 'cities', pathMatch: 'full' },
      { path: '**', redirectTo: 'cities', pathMatch: 'full' },
    ]),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
