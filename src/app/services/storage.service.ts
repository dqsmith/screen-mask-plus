import { Injectable } from '@angular/core';
import { Config } from '../interfaces/config.interface';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private key = 'screen-mask-plus';
  private config: Config = {
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

  getConfig(): Config {
    const config = localStorage.getItem(this.key);

    if (config) {
      return JSON.parse(config);
    }

    this.setConfig(this.config);

    return this.config;
  }

  getDefaultConfig(): Config {
    return {
      on: true,
      popupOpen: true,
      range: 75,
      opacity: 0.5,
      color: '#000000',
    };
  }
}
