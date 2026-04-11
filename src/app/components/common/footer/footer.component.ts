import { Component, inject } from '@angular/core';

import { LanguageService } from '@services';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  public languageService: LanguageService = inject(LanguageService);
  public readonly currentYear: number = new Date().getFullYear();
}
