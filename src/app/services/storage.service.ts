import { Injectable } from '@angular/core';
import { IConfig } from '../interfaces/config.interface';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private key = 'screen-mask-plus';
  private config: IConfig = {
    on: true,
    popupOpen: false,
    range: 75,
    opacity: 0.5,
    color: '#000000',
  };

  constructor() {}

  setConfig(config): void {
    localStorage.setItem(this.key, JSON.stringify(config));

    this.config = config;
  }

  getConfig(): IConfig {
    const config = localStorage.getItem(this.key);

    if (config) {
      return JSON.parse(config);
    }

    this.setConfig(this.config);

    return this.config;
  }

  getDefaultConfig(): IConfig {
    return {
      on: true,
      popupOpen: true,
      range: 75,
      opacity: 0.5,
      color: '#000000',
    };
  }
}
