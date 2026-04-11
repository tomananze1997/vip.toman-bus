import { Component, inject } from '@angular/core';

import { environment } from '@environments';

import { LanguageService } from '@services';

@Component({
  selector: 'app-luxury',
  templateUrl: './luxury.component.html',
  styleUrls: ['./luxury.component.css']
})
export class LuxuryComponent {
  public languageService: LanguageService = inject(LanguageService);

  public get coachSiteLangUrl(): string {
    const base: string = environment.REDIRECT_LINK.replace(/\/$/, '');
    return `${base}/${this.languageService.currentLang}`;
  }
}
