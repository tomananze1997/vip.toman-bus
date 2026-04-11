import { Injectable, inject } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SvgIconService {
  private matIconRegistry: MatIconRegistry = inject(MatIconRegistry);
  private domSanitizer: DomSanitizer = inject(DomSanitizer);

  public registerIcons(): void {
    this.matIconRegistry.addSvgIcon('de', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/de.svg'));
    this.matIconRegistry.addSvgIcon('en', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/en.svg'));
    this.matIconRegistry.addSvgIcon('sl', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/sl.svg'));
    this.matIconRegistry.addSvgIcon('telephone', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/telephone.svg'));
    this.matIconRegistry.addSvgIcon('cross', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/cross.svg'));
    this.matIconRegistry.addSvgIcon('hamburger', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/hamburger.svg'));
    this.matIconRegistry.addSvgIcon('down-arrow', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/down-arrow.svg'));
    this.matIconRegistry.addSvgIcon('left-arrow', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/left-arrow.svg'));
    this.matIconRegistry.addSvgIcon('right-arrow', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/right-arrow.svg'));
    this.matIconRegistry.addSvgIcon('corporate', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/corporate.svg'));
    this.matIconRegistry.addSvgIcon('suitcase', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/suitcase.svg'));
    this.matIconRegistry.addSvgIcon('facebook', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/facebook.svg'));
    this.matIconRegistry.addSvgIcon('mail', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/mail.svg'));
    this.matIconRegistry.addSvgIcon('crown', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/crown.svg'));
    this.matIconRegistry.addSvgIcon('champagne', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/champagne.svg'));
    this.matIconRegistry.addSvgIcon('globe', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/globe.svg'));
    this.matIconRegistry.addSvgIcon('settings', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/settings.svg'));
  }
}
