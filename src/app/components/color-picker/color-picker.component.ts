import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss'],
})
export class ColorPickerComponent implements OnInit {
  @ViewChild('palette') palette: ElementRef;

  @Output() color: EventEmitter<string> = new EventEmitter();

  private context: any;

  constructor() {}

  ngOnInit() {
    this.context = this.palette.nativeElement.getContext('2d');

    this.buildPalette();
  }

  selectColor(event: any): void {
    const pixels = this.context.getImageData(event.offsetX, event.offsetY, 1, 1)
      .data;
    const hex =
      '#' +
      ('000000' + this.rgbToHex(pixels[0], pixels[1], pixels[2])).slice(-6);

    this.color.emit(hex);
  }

  private rgbToHex(r, g, b): string {
    if (r > 255 || g > 255 || b > 255) {
      console.warn('Invalid color selected');
    }

    // tslint:disable-next-line:no-bitwise
    return ((r << 16) | (g << 8) | b).toString(16);
  }

  private buildPalette(): void {
    let gradient = this.context.createLinearGradient(
      0,
      0,
      this.palette.nativeElement.width,
      0
    );

    gradient.addColorStop(0, 'rgb(255,0,0)');
    gradient.addColorStop(0.14, 'rgb(255,0,255)');
    gradient.addColorStop(0.28, 'rgb(0,0,255)');
    gradient.addColorStop(0.42, 'rgb(0,255,255)');
    gradient.addColorStop(0.56, 'rgb(0,255,0)');
    gradient.addColorStop(0.7, 'rgb(255,255,0)');
    gradient.addColorStop(1, 'rgb(255,0,0)');

    this.context.fillStyle = gradient;
    this.context.fillRect(
      0,
      0,
      this.context.canvas.width,
      this.context.canvas.height - 10
    );

    gradient = this.context.createLinearGradient(
      0,
      0,
      this.palette.nativeElement.width,
      0
    );

    gradient.addColorStop(0, 'rgb(0,0,0');
    gradient.addColorStop(1, 'rgb(255, 255, 255)');

    this.context.fillStyle = gradient;
    this.context.fillRect(
      0,
      this.context.canvas.height - 10,
      this.context.canvas.width,
      this.context.canvas.height
    );
  }
}
