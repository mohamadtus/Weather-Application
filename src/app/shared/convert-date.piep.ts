import { Pipe, PipeTransform } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

import { format } from 'date-fns';
import { enGB } from 'date-fns/locale';
import { fr } from 'date-fns/locale';

@Pipe({ name: 'convertDate', pure: false })
export class ConvertDate implements PipeTransform {
  constructor(public _translateSrvc: TranslateService) {}

  transform(value: string) {
    let formatter: string =
      this._translateSrvc.currentLang === 'fr'
        ? 'EEEE d MMMM yyyy'
        : 'EEEE d MMMM yyyy';
    let localeLang = this._translateSrvc.currentLang === 'fr' ? fr : enGB;
    let resultDate = format(new Date(value), 'EEEE d MMMM yyyy', {
      locale: localeLang,
    });

    this._translateSrvc.onLangChange.subscribe((event: LangChangeEvent) => {
      localeLang = this._translateSrvc.currentLang === 'fr' ? fr : enGB;
      resultDate = format(new Date(value), 'EEEE d MMMM yyyy', {
        locale: localeLang,
      });
    });

    return resultDate;
  }
}
