import { Component, inject } from '@angular/core';

import { LanguageService } from '@services';

@Component({
  selector: 'app-who-we-are',
  templateUrl: './who-we-are.component.html',
  styleUrls: ['./who-we-are.component.css']
})
export class WhoWeAreComponent {
  public languageService: LanguageService = inject(LanguageService);
}
