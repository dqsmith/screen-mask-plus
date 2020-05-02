import { TestBed, ComponentFixture, async } from '@angular/core/testing';

import { ColorPickerComponent } from './color-picker.component';
import { AppModule } from '../../app.module';

describe('ColorPickerComponent', () => {
  let component: ColorPickerComponent;
  let fixture: ComponentFixture<ColorPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorPickerComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should emit a selected color', () => {
    expect(component.color).toBeDefined();

    component.color.subscribe((res) => {
      expect(res).toBe('#ffffff');
    });

    component.color.emit('#ffffff');
  });

  it('should provide a context to the color palette', () => {
    expect(component.ngAfterViewInit).toBeDefined();
  });

  it('should handle selecting a color', () => {
    expect(component.selectColor).toBeDefined();

    spyOn(component, 'selectColor');

    component.selectColor({ offsetX: 100, offsetY: 100 });

    expect(component.selectColor).toHaveBeenCalledWith({
      offsetX: 100,
      offsetY: 100,
    });
  });
});
