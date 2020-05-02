import { Component } from '@angular/core';
import { StorageService } from './services/storage.service';
import { IConfig } from './interfaces/config.interface';

declare var chrome;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  config: IConfig;

  constructor(private storageService: StorageService) {
    this.config = this.storageService.getConfig();

    document.body.addEventListener('mouseleave', () => {
      this.config.popupOpen = false;

      this.powerMask();

      window.close();
    });

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.executeScript(tabs[0].id, { file: 'content.min.js' }, () => {
        if (chrome.runtime.lastError) {
          console.warn('Unable to inject Screen Mask Plus script into tab.');
        } else {
          if (this.config.on) {
            this.powerMask();
          }
        }
      });
    });
  }

  onMaskSizeChange(event: any): void {
    if (!this.config.on) {
      this.config.on = true;
      this.powerMask();
    }

    this.config.range = Number(event.value);
    this.config.popupOpen = true;

    this.setConfig();
  }

  onToggleMask(event: any): void {
    this.config.on = event.checked;
    this.config.popupOpen = true;

    this.powerMask();
  }

  onMaskOpacityChange(event: any): void {
    if (!this.config.on) {
      this.config.on = true;
      this.powerMask();
    }

    this.config.opacity = Number(event.value);
    this.config.popupOpen = true;

    this.setConfig();
  }

  onColorChange(event: string): void {
    if (!this.config.on) {
      this.config.on = true;
      this.powerMask();
    }

    this.config.color = event;

    this.setConfig();
  }

  onReset(): void {
    this.config = this.storageService.getDefaultConfig();

    this.setConfig();
  }

  private setConfig(): void {
    this.storageService.setConfig(this.config);
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { config: this.config });
    });
  }

  private powerMask(): void {
    this.storageService.setConfig(this.config);
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { powerConfig: this.config });
    });
  }
}
