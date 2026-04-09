import { Component, ElementRef, HostListener, inject } from '@angular/core';

import { environment } from '@environments';

import { LanguageService } from '@services';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  public isMenuOpen: boolean = false;
  public isScrolled: boolean = false;
  public showHamburger: boolean = true;
  public showCross: boolean = false;

  private ref: ElementRef = inject(ElementRef);
  public languageService: LanguageService = inject(LanguageService);
  public REDIRECT_LINK: string = environment.REDIRECT_LINK;

  @HostListener('window:scroll', [])
  onScroll() {
    this.isScrolled = window.scrollY > 50;
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: Event) {
    // Close the menu if click is outside the nav
    if (this.isMenuOpen && !this.ref.nativeElement.contains(event.target)) {
      this.isMenuOpen = false;
    }
  }

  toggleMenu(event: MouseEvent) {
    event.stopPropagation();

    if (this.isMenuOpen) {
      this.showCross = false;
      setTimeout(() => {
        this.showHamburger = true;
      }, 200);
    } else {
      this.showHamburger = false;
      setTimeout(() => {
        this.showCross = true;
      }, 200);
    }

    this.isMenuOpen = !this.isMenuOpen;
  }
}
