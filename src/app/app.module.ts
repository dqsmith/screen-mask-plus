import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { AppComponent } from './app.component';
import { ColorPickerComponent } from './components/color-picker/color-picker.component';

import { StorageService } from './services/storage.service';

@NgModule({
	declarations: [
		AppComponent,
		ColorPickerComponent
	],
	imports: [
		BrowserModule,
		MatSliderModule,
		MatButtonModule,
		MatSlideToggleModule
	],
	providers: [StorageService],
	bootstrap: [AppComponent]
})
export class AppModule { }
