declare var chrome: any;

class ScreenMaskPlus {
  private topMask: HTMLElement;
  private bottomMask: HTMLElement;
  private topMaskId = 'smp-upper-mask';
  private bottomMaskId = 'smp-lower-mask';
  private updateMaskHandler: any;
  private position = 50;
  private config: any = {
    on: false,
    popupOpen: false,
    range: 75,
    opacity: 0.5,
    color: '#000000',
  };

  constructor() {
    chrome.runtime.onMessage.addListener((request: any) => {
      if (request.hasOwnProperty(['config'])) {
        this.config = request.config;
        this.update();
      }

      if (request.hasOwnProperty(['powerConfig'])) {
        this.config = request.powerConfig;
        this.power();
      }
    });
  }

  private power(): void {
    if (this.config.on) {
      this.removeMask();
      this.createMask();
    } else {
      this.removeMask();
    }
  }

  private update(): void {
    if (this.config.on) {
      this.moveMask();
      this.setBackground();
      this.setOpacity();
    }
  }

  private createMask(): void {
    const hasMask: boolean = !!document.getElementById(this.topMaskId);

    if (!hasMask) {
      this.topMask = document.createElement('div');
      this.bottomMask = document.createElement('div');

      this.topMask.id = this.topMaskId;
      this.topMask.classList.add(
        'smp-screen-mask-plus',
        'smp-screen-mask-plus-upper'
      );
      this.topMask.style.opacity = this.config.opacity.toString();
      this.topMask.style.background = this.config.color;

      this.bottomMask.id = this.bottomMaskId;
      this.bottomMask.classList.add(
        'smp-screen-mask-plus',
        'smp-screen-mask-plus-lower'
      );
      this.bottomMask.style.opacity = this.config.opacity.toString();
      this.topMask.style.background = this.config.color;

      document.body.appendChild(this.topMask);
      document.body.appendChild(this.bottomMask);

      this.setMask();

      this.updateMaskHandler = (event: any) => this.updateMaskPosition(event);

      document.addEventListener('mousemove', this.updateMaskHandler);
      document.addEventListener('touchend', this.updateMaskHandler);
    }
  }

  private removeMask(): void {
    document.removeEventListener('mousemove', this.updateMaskHandler);
    document.removeEventListener('touchend', this.updateMaskHandler);

    if (this.topMask && this.bottomMask) {
      this.topMask.remove();
      this.bottomMask.remove();
    }
  }

  private updateMaskPosition(event: any): void {
    const touches: TouchList = event.touches;

    if (this.topMask && this.bottomMask) {
      if (touches && touches.length) {
        this.position = touches[0].clientY;
      } else {
        this.position = event.clientY;
      }

      if (this.position) {
        this.moveMask();
      }
    }
  }

  private setMask(): void {
    if (this.topMask && this.bottomMask) {
      this.setAnimation();
      this.setBackground();
      this.setOpacity();
      this.moveMask();
    }
  }

  private setBackground(): void {
    if (this.topMask && this.bottomMask) {
      this.setAnimation();

      this.topMask.style.background = this.config.color;
      this.bottomMask.style.background = this.config.color;
    }
  }

  private setOpacity(): void {
    if (this.topMask && this.bottomMask) {
      this.setAnimation();

      this.topMask.style.opacity = this.config.opacity.toString();
      this.bottomMask.style.opacity = this.config.opacity.toString();
    }
  }

  private moveMask(): void {
    if (this.topMask && this.bottomMask) {
      this.setAnimation();

      this.topMask.style.bottom =
        window.innerHeight - this.position + this.config.range / 2 + 'px';
      this.bottomMask.style.top = this.position + this.config.range + 'px';
    }
  }

  private setAnimation(): void {
    if (!this.config.popupOpen) {
      this.topMask.classList.add('smp-screen-mask-noanimation');
      this.bottomMask.classList.add('smp-screen-mask-noanimation');
    } else {
      this.topMask.classList.remove('smp-screen-mask-noanimation');
      this.bottomMask.classList.remove('smp-screen-mask-noanimation');
    }
  }
}

const screenMaskPlus = new ScreenMaskPlus();
