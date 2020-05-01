import { Component } from '@angular/core';
import { StorageService } from './services/storage.service';
import { Config } from './interfaces/config.interface';

declare var chrome;

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	config: Config;

	constructor(private storageService: StorageService) {
		this.config = this.storageService.getConfig();

		const body = document.body;

		body.addEventListener('mouseleave', () => {
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

		this.storageService.setConfig(this.config);

		chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
			chrome.tabs.sendMessage(tabs[0].id, { screenMaskPlusSize: this.config });
		});
	}

	onToggleMask(event: any): void {
		this.config.on = event.checked;
		this.config.popupOpen = true;

		this.storageService.setConfig(this.config);

		this.powerMask();
	}

	onMaskOpacityChange(event: any): void {
		if (!this.config.on) {
			this.config.on = true;
			this.powerMask();
		}

		this.config.opacity = Number(event.value);
		this.config.popupOpen = true;

		this.storageService.setConfig(this.config);

		chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
			chrome.tabs.sendMessage(tabs[0].id, { screenMaskPlusOpacity: this.config });
		});
	}

	onColor(event: string): void {
		if (!this.config.on) {
			this.config.on = true;
			this.powerMask();
		}

		this.config.color = event;
		this.storageService.setConfig(this.config);

		chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
			chrome.tabs.sendMessage(tabs[0].id, { screenMaskPlusBackground: this.config });
		});
	}

	onReset(): void {
		const config = this.storageService.getDefaultConfig();

		this.config = config;
		this.storageService.setConfig(config);

		chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
			console.table(config);
			chrome.tabs.sendMessage(tabs[0].id, { screenMaskPlusReset: config });
		});
	}

	private powerMask(): void {
		chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
			chrome.tabs.sendMessage(tabs[0].id, { screenMaskPlusPower: this.config });
		});
	}
}
