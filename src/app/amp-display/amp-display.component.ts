import {
  Component,
  EventEmitter,
  Input,
  Output,
  HostBinding,
  ViewEncapsulation
} from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-amp-display',
  template: `
    <iframe [srcdoc]="safeMsg"></iframe>
    <button (click)="closed.next()">&#x2716;</button>
  `,
  animations: [
    trigger('state', [
      state('opened', style({ transform: 'translateY(0%)' })),
      state(
        'void, closed',
        style({ transform: 'translateY(100%)', opacity: 0 })
      ),
      transition('* => *', animate('100ms ease-in'))
    ])
  ],
  // encapsulation: ViewEncapsulation.Native,
  styles: [
    `
      :host {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 480px;
        padding: 16px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-top: 1px solid black;
        font-size: 24px;
      }
      iframe {
        width: 100%;
        height: 100%;
      }
      button {
        border-radius: 50%;
      }
    `
  ]
})
export class AmpDisplayComponent {
  safeMsg: SafeHtml;

  @Input()
  set message(message: string) {
    this.state = 'opened';
    this.safeMsg = this.sanitizer.bypassSecurityTrustHtml(message);
  }
  @HostBinding('@state') state: 'opened' | 'closed' = 'closed';

  @Output()
  closed = new EventEmitter();

  constructor(private sanitizer: DomSanitizer) {}
}
