import {
  ApplicationRef,
  ComponentFactoryResolver,
  Injectable,
  Injector
} from '@angular/core';
import { NgElement, WithProperties } from '@angular/elements';
import { HttpClient } from '@angular/common/http';

import { AmpDisplayComponent } from './amp-display.component';

@Injectable({
  providedIn: 'root'
})
export class AmpDisplayService {
  private ampUrl = 'http://localhost:8080/amp';

  constructor(
    private injector: Injector,
    private applicationRef: ApplicationRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private http: HttpClient
  ) {}

  // Previous dynamic-loading method required you to set up infrastructure
  // before adding the popup to the DOM.
  showAsComponent() {
    // Create element
    const ampDisplay = document.createElement('amp-display-component');

    // Create the component and wire it up with the element
    const factory = this.componentFactoryResolver.resolveComponentFactory(
      AmpDisplayComponent
    );
    const ampDisplayComponentRef = factory.create(
      this.injector,
      [],
      ampDisplay
    );

    // Attach to the view so that the change detector knows to run
    this.applicationRef.attachView(ampDisplayComponentRef.hostView);

    // Listen to the close event
    ampDisplayComponentRef.instance.closed.subscribe(() => {
      document.body.removeChild(ampDisplay);
      this.applicationRef.detachView(ampDisplayComponentRef.hostView);
    });

    this.getContent().subscribe(text => {
      // Set the message
      ampDisplayComponentRef.instance.message = text;
      // Add to the DOM
      document.body.appendChild(ampDisplay);
    });
  }

  // This uses the new custom-element method to add the popup to the DOM.
  showAsElement() {
    // Create element
    const ampDisplayEl: NgElement &
      WithProperties<AmpDisplayComponent> = document.createElement(
      'amp-display-element'
    ) as any;

    // Listen to the close event
    ampDisplayEl.addEventListener('closed', () =>
      document.body.removeChild(ampDisplayEl)
    );

    this.getContent().subscribe(text => {
      // Set the message
      ampDisplayEl.message = text;
      // Add to the DOM
      document.body.appendChild(ampDisplayEl);
    });
  }

  private getContent() {
    return this.http.get(this.ampUrl, { responseType: 'text' });
  }
}
