import { Component, OnInit, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import emailjs from 'emailjs-com';

import { environment } from '@environments';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  private fb: FormBuilder = inject(FormBuilder);
  public contactForm: FormGroup | undefined;

  public showPopup: boolean = false;
  public popupText: string = '';
  public popupTextParams: Record<string, unknown> = {};

  public isSubmitting: boolean = false;
  public cooldownUntil: number = 0;
  public readonly minSubmitTimeMs: number = 1500;
  public readonly cooldownMs: number = 30000;
  private formStartedAt: number = Date.now();

  private EMAIL_SERVICE_ID: string = environment.EMAIL_SERVICE_ID;
  private EMAIL_TEMPLATE_ID: string = environment.EMAIL_TEMPLATE_ID;
  private EMAIL_PUBLIC_KEY: string = environment.EMAIL_PUBLIC_KEY;

  ngOnInit(): void {
    this.formStartedAt = Date.now();
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[\d +]*$/)]],
      message: ['', Validators.required],
      website: ['']
    });
  }

  onSubmit(): void {
    if (this.isCooldownActive()) {
      const secondsLeft: number = Math.ceil((this.cooldownUntil - Date.now()) / 1000);
      this.showPopup = true;
      this.popupText = 'COMMON.POPUP.COOLDOWN_TEXT';
      this.popupTextParams = { seconds: Math.max(secondsLeft, 1) };

      return;
    }

    if (this.contactForm) {
      Object.values(this.contactForm.controls).forEach((control: AbstractControl<any, any>) => {
        control.markAsTouched();
      });

      if (!this.contactForm?.valid) return;
      const formData = this.contactForm.value;

      // Honeypot: bots often fill hidden fields.
      if (formData.website && String(formData.website).trim().length > 0) {
        this.startCooldown();
        this.showPopup = true;
        this.popupText = 'COMMON.POPUP.FAILURE_TEXT';
        this.popupTextParams = {};

        return;
      }

      // blocks submissions that happen too quickly after form load
      if (Date.now() - this.formStartedAt < this.minSubmitTimeMs) {
        this.showPopup = true;
        this.popupText = 'COMMON.POPUP.FAILURE_TEXT';
        this.popupTextParams = {};

        return;
      }

      this.isSubmitting = true;

      try {
        emailjs
          .send(
            this.EMAIL_SERVICE_ID,
            this.EMAIL_TEMPLATE_ID,
            {
              name: formData.name,
              email: formData.email,
              phone: formData.phone,
              message: formData.message
            },
            this.EMAIL_PUBLIC_KEY
          )
          .then(() => {
            this.showPopup = true;
            this.popupText = 'COMMON.POPUP.SUCCESS_TEXT';
            this.popupTextParams = {};
            this.contactForm?.reset();
            this.formStartedAt = Date.now();
            this.startCooldown();
          })
          .catch((error) => {
            this.showPopup = true;
            this.popupText = 'COMMON.POPUP.FAILURE_TEXT';
            this.popupTextParams = {};
            this.startCooldown();
          })
          .finally(() => {
            this.isSubmitting = false;
          });
      } catch (error) {
        this.showPopup = true;
        this.popupText = 'COMMON.POPUP.FAILURE_TEXT';
        this.popupTextParams = {};
        this.isSubmitting = false;
      }
    }
  }

  public isCooldownActive(): boolean {
    return Date.now() < this.cooldownUntil;
  }

  private startCooldown(): void {
    this.cooldownUntil = Date.now() + this.cooldownMs;
  }
}
