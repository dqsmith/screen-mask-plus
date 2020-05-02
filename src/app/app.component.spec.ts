import { TestBed, ComponentFixture, async } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { IConfig } from './interfaces/config.interface';

// tslint:disable-next-line: no-string-literal
const chrome = (window['chrome'] = {
  tabs: {
    query: () => {},
  },
});

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;

    component.config = {
      on: true,
      popupOpen: false,
      range: 75,
      opacity: 0.5,
      color: '#000000',
    };
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should have a default config', () => {
    expect(component.config).toBeDefined();

    const defaultConfig: IConfig = {
      on: true,
      popupOpen: false,
      range: 75,
      opacity: 0.5,
      color: '#000000',
    };

    expect(component.config).toEqual(defaultConfig);
  });

  it('should handle a size change', () => {
    expect(component.onMaskSizeChange).toBeDefined();

    component.config.range = 75;

    component.onMaskSizeChange({ value: '100' });

    expect(component.config.range).toBe(100);
  });

  it('should set power is on when size changes', () => {
    expect(component.onMaskSizeChange).toBeDefined();

    component.config.on = false;

    component.onMaskSizeChange({ value: '100' });

    expect(component.config.on).toBe(true);
  });

  it('should set the popup to true on size changes', () => {
    expect(component.onMaskSizeChange).toBeDefined();

    component.config.popupOpen = false;

    component.onMaskSizeChange({ value: '100' });

    expect(component.config.popupOpen).toBe(true);
  });

  it('should handle an opacity change', () => {
    expect(component.onMaskOpacityChange).toBeDefined();

    component.onMaskOpacityChange({ value: '1' });

    expect(component.config.opacity).toBe(1);
  });

  it('should set power is on when opacity changes', () => {
    expect(component.onMaskOpacityChange).toBeDefined();

    component.config.on = false;

    component.onMaskOpacityChange({ value: '1' });

    expect(component.config.on).toBe(true);
  });

  it('should set the popup to true on opacity changes', () => {
    expect(component.onMaskOpacityChange).toBeDefined();

    component.config.color = '#000000';

    component.onMaskOpacityChange({ value: '0.6' });

    expect(component.config.popupOpen).toBe(true);
  });

  it('should handle a color change', () => {
    expect(component.onColorChange).toBeDefined();

    component.onColorChange('#ffffff');

    expect(component.config.color).toBe('#ffffff');
  });

  it('should set power is on when opacity changes', () => {
    expect(component.onColorChange).toBeDefined();

    component.config.on = false;

    component.onColorChange('#ffffff');

    expect(component.config.on).toBe(true);
  });

  it('should reset a config', () => {
    expect(component.onColorChange).toBeDefined();

    const defaultConfig: IConfig = {
      on: true,
      popupOpen: true,
      range: 75,
      opacity: 0.5,
      color: '#000000',
    };

    component.config = {
      on: false,
      popupOpen: true,
      range: 100,
      opacity: 1,
      color: '#ffffff',
    };

    component.onReset();

    expect(component.config).toEqual(defaultConfig);
  });

  it('should handle toggling power', () => {
    expect(component.onToggleMask).toBeDefined();

    component.config.on = false;
    component.config.popupOpen = false;

    component.onToggleMask({ checked: true });

    expect(component.config.on).toBe(true);
    expect(component.config.popupOpen).toBe(true);

    component.onToggleMask({ checked: false });

    expect(component.config.on).toBe(false);
  });
});
