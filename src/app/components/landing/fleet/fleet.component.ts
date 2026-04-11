import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';

import Swiper from 'swiper';
import { SwiperContainer } from 'swiper/swiper-element';

import { IFleet } from '@interfaces';

@Component({
  selector: 'app-fleet',
  templateUrl: './fleet.component.html',
  styleUrls: ['./fleet.component.css']
})
export class FleetComponent implements AfterViewInit, OnDestroy {
  @ViewChild('swiperRef', { static: false }) swiperRef!: ElementRef<SwiperContainer>;

  public fleet: IFleet[] = [
    {
      name: 'MAIN.FLEET.VEHICLES.V_CLASS.NAME',
      imgPrimary: 'assets/images/v-class_front.png',
      imgSecondary: 'assets/images/v-class_side.png',
      description: 'MAIN.FLEET.VEHICLES.V_CLASS.DESCRIPTION'
    },
    {
      name: 'MAIN.FLEET.VEHICLES.C_CLASS.NAME',
      imgPrimary: 'assets/images/c-class_front.png',
      imgSecondary: 'assets/images/c-class_side.png',
      description: 'MAIN.FLEET.VEHICLES.C_CLASS.DESCRIPTION'
    }
  ];
  public realIndex: number = 0;
  private swiperInstance!: Swiper;
  private intervalId: any;
  private hoveredIndex: number | null = null;

  ngAfterViewInit(): void {
    this.initiateSwiper();
  }

  private initiateSwiper(): void {
    setTimeout(() => {
      const swiperEl: SwiperContainer = this.swiperRef.nativeElement;
      this.swiperInstance = swiperEl.swiper;

      if (!this.swiperInstance) return;

      swiperEl.addEventListener('swiper-touchstart', () => {
        this.clearAutoplay();
      });

      swiperEl.addEventListener('swiper-touchend', () => {
        setTimeout(() => {
          this.updateRealIndex();
          this.startAutoplay();
        }, 50);
      });

      this.startAutoplay();
    }, 0);
  }

  public isSlideActive(index: number): boolean {
    return this.realIndex === index || this.hoveredIndex === index;
  }

  public onMouseEnter(index: number): void {
    this.hoveredIndex = index;
  }

  public onMouseLeave(): void {
    this.hoveredIndex = null;
  }

  private startAutoplay(): void {
    this.clearAutoplay();
    this.intervalId = setInterval(() => {
      if (!this.swiperInstance) return;
      const nextIndex: number = (this.swiperInstance.realIndex + 1) % this.fleet.length;

      this.swiperInstance.slideTo(nextIndex);
      this.updateRealIndex();
    }, 10000);
  }

  private clearAutoplay(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  private updateRealIndex(): void {
    this.realIndex = this.swiperInstance.realIndex;
  }

  public slideNext(): void {
    const nextIndex = (this.swiperInstance.realIndex + 1) % this.fleet.length;

    this.clearAutoplay();
    this.swiperInstance.slideTo(nextIndex);
    this.updateRealIndex();
    this.startAutoplay();
  }
  public onSelectSlide(index: number): void {
    this.clearAutoplay();
    this.swiperInstance.slideTo(index);
    this.updateRealIndex();
    this.startAutoplay();
  }
  public slidePrev(): void {
    const prevIndex = this.swiperInstance.realIndex === 0 ? this.fleet.length - 1 : this.swiperInstance.realIndex - 1;

    this.clearAutoplay();
    this.swiperInstance.slideTo(prevIndex);
    this.updateRealIndex();
    this.startAutoplay();
  }

  ngOnDestroy(): void {
    this.clearAutoplay();
  }
}
