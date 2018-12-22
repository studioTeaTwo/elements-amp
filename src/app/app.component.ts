import { Component, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { AmpDisplayService } from './amp-display/amp-display.service';
import { AmpDisplayComponent } from './amp-display/amp-display.component';


@Component({
  selector: 'app-root',
  template: `
    <input #input value="Message">
    <button (click)="popup.showAsComponent(input.value)">Show as component</button>
    <button (click)="popup.showAsElement(input.value)">Show as element</button>
  `
})
export class AppComponent {
  constructor(injector: Injector, public popup: AmpDisplayService) {
    // Convert `PopupComponent` to a custom element.
    const AmpDisplayElement = createCustomElement(AmpDisplayComponent, {injector});
    // Register the custom element with the browser.
    customElements.define('amp-display-element', AmpDisplayElement);
  }
}
