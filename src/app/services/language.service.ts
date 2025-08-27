import { Injectable, OnDestroy, inject } from '@angular/core';
import { Router, UrlSegment, UrlTree } from '@angular/router';

import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

import { ELanguages } from '@enums';

@Injectable({
  providedIn: 'root'
})
export class LanguageService implements OnDestroy {
  private translate: TranslateService = inject(TranslateService);
  private langSub: Subscription | null = null;
  private router: Router = inject(Router);

  public currentLang: string = 'en';

  constructor() {
    this.currentLang = this.translate.currentLang || this.translate.getDefaultLang() || 'en';

    this.langSub = this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.currentLang = event.lang;
    });
  }

  public async setLanguageFromBrowserSettings(): Promise<void> {
    const browserLang: string = navigator.language.split('-')[0].toLowerCase();
    let selectedLang: ELanguages;

    switch (browserLang) {
      case ELanguages.SLOVENIAN:
        selectedLang = ELanguages.SLOVENIAN;
        break;
      case ELanguages.GERMAN:
        selectedLang = ELanguages.GERMAN;
        break;
      default:
        selectedLang = ELanguages.ENGLISH;
    }

    this.translate.setDefaultLang(ELanguages.ENGLISH);
    this.translate.use(selectedLang);
  }

  public async switchLanguage(lang: ELanguages): Promise<void> {
    this.translate.use(lang);

    const urlTree: UrlTree = this.router.parseUrl(this.router.url);
    const segments: string[] = urlTree.root.children['primary']?.segments.map((s: UrlSegment) => s.path) || [];

    if (segments.length > 0) {
      segments.shift();
    }
    await this.router.navigate(['/', lang, ...segments]);
  }

  ngOnDestroy() {
    if (!this.langSub) return;

    this.langSub.unsubscribe();
  }
}
