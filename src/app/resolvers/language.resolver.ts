import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';

export const languageResolver: ResolveFn<string> = (route, state) => {
  const translate: TranslateService = inject(TranslateService);
  return translate.currentLang || translate.getDefaultLang();
};
