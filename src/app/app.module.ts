import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AmpDisplayComponent } from './amp-display/amp-display.component';
import { AmpDisplayService } from './amp-display/amp-display.service';

@NgModule({
  declarations: [
    AppComponent,
    AmpDisplayComponent
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule
  ],
  providers: [AmpDisplayService],
  bootstrap: [AppComponent],
  entryComponents: [AmpDisplayComponent]
})
export class AppModule { }
