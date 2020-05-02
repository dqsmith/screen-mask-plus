import { TestBed, inject } from '@angular/core/testing';

import { StorageService } from './storage.service';
import { IConfig } from '../interfaces/config.interface';

describe('StorageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StorageService],
    });

    localStorage.removeItem('screen-mask-plus');
  });

  it('should be created', inject(
    [StorageService],
    (service: StorageService) => {
      expect(service).toBeTruthy();
    }
  ));

  it('should set a config', inject(
    [StorageService],
    (service: StorageService) => {
      expect(service.setConfig).toBeTruthy();

      const defaultConfig: IConfig = {
        on: true,
        popupOpen: false,
        range: 75,
        opacity: 0.5,
        color: '#000000',
      };

      expect(service.getConfig()).toEqual(defaultConfig);

      const updatedConfig: IConfig = {
        on: false,
        popupOpen: true,
        range: 100,
        opacity: 1.0,
        color: '#ffffff',
      };

      service.setConfig(updatedConfig);

      expect(service.getConfig()).toEqual(updatedConfig);
    }
  ));

  it('should get a config', inject(
    [StorageService],
    (service: StorageService) => {
      expect(service.getConfig).toBeTruthy();

      const defaultConfig: IConfig = {
        on: true,
        popupOpen: false,
        range: 75,
        opacity: 0.5,
        color: '#000000',
      };

      expect(service.getConfig()).toEqual(defaultConfig);
    }
  ));

  it('should get a stored config', inject(
    [StorageService],
    (service: StorageService) => {
      expect(service.setConfig).toBeTruthy();

      const storedConfig: IConfig = {
        on: false,
        popupOpen: true,
        range: 100,
        opacity: 1.0,
        color: '#ffffff',
      };

      localStorage.setItem('screen-mask-plus', JSON.stringify(storedConfig));

      expect(service.getConfig()).toEqual(storedConfig);
    }
  ));

  it('should get a default config', inject(
    [StorageService],
    (service: StorageService) => {
      expect(service.getDefaultConfig).toBeTruthy();

      const defaultConfig: IConfig = {
        on: true,
        popupOpen: true,
        range: 75,
        opacity: 0.5,
        color: '#000000',
      };

      expect(service.getDefaultConfig()).toEqual(defaultConfig);
    }
  ));
});
