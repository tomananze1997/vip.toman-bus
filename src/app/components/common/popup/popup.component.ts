import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent {
  @Input() showPopup: boolean = false;
  @Input() text: string = '';
  @Input() textParams: Record<string, unknown> = {};
  @Output() confirmAction: EventEmitter<void> = new EventEmitter<void>();

  public onConfirm() {
    this.confirmAction.emit();
  }
}
