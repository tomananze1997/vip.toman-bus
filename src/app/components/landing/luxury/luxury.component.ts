import { Component, inject } from '@angular/core';

import { LanguageService } from '@services';

@Component({
  selector: 'app-luxury',
  templateUrl: './luxury.component.html',
  styleUrls: ['./luxury.component.css']
})
export class LuxuryComponent {
  public languageService: LanguageService = inject(LanguageService);
}
