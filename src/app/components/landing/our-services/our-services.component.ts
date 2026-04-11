import { AfterViewInit, Component, ElementRef, HostListener, QueryList, ViewChildren } from '@angular/core';

import { IServiceCards } from '@interfaces';

@Component({
  selector: 'app-our-services',
  templateUrl: './our-services.component.html',
  styleUrls: ['./our-services.component.css']
})
export class OurServicesComponent implements AfterViewInit {
  @ViewChildren('cardEl') cardElements!: QueryList<ElementRef>;

  public isMobileView: boolean = window.innerWidth < 640;
  public activeCardIndex: number | null = null;
  public cards: IServiceCards[] = [
    { title: 'MAIN.SERVICES.FIRST.TITLE', content: 'MAIN.SERVICES.FIRST.CONTENT', icon: 'suitcase' },
    { title: 'MAIN.SERVICES.SECOND.TITLE', content: 'MAIN.SERVICES.SECOND.CONTENT', icon: 'crown' },
    { title: 'MAIN.SERVICES.THIRD.TITLE', content: 'MAIN.SERVICES.THIRD.CONTENT', icon: 'champagne' },
    { title: 'MAIN.SERVICES.FOURTH.TITLE', content: 'MAIN.SERVICES.FOURTH.CONTENT', icon: 'corporate' },
    { title: 'MAIN.SERVICES.FIFTH.TITLE', content: 'MAIN.SERVICES.FIFTH.CONTENT', icon: 'globe' },
    { title: 'MAIN.SERVICES.SIXTH.TITLE', content: 'MAIN.SERVICES.SIXTH.CONTENT', icon: 'settings' }
  ];

  ngAfterViewInit(): void {
    if (window.innerWidth < 640) {
      this.highlightActiveCard();
    }
  }

  @HostListener('window:scroll')
  @HostListener('window:resize')
  onScrollOrResize(): void {
    this.isMobileView = window.innerWidth < 640;

    if (window.innerWidth < 640) {
      this.highlightActiveCard();
    } else {
      this.activeCardIndex = null;
    }
  }

  private highlightActiveCard(): void {
    const centerY: number = window.innerHeight / 2;

    let closestIndex: number = 0;
    let closestDistance: number = Number.MAX_VALUE;

    this.cardElements.forEach((card: ElementRef<any>, index: number) => {
      const rect = card.nativeElement.getBoundingClientRect();
      const cardCenterY = rect.top + rect.height / 2;
      const distance: number = Math.abs(centerY - cardCenterY);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    this.activeCardIndex = closestIndex;
  }

  public isAroundActive(index: number): boolean {
    if (!this.isMobileView) return false;
    return index === this.activeCardIndex! - 1 || index === this.activeCardIndex! + 1;
  }
}
