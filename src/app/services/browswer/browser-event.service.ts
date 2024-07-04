import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BrowserEventService {
  private beforeUnloadHandler: any;
  private unloadHandler: any;

  private beforeUnloadCallback: () => void;
  private unloadCallback: () => void;

  registerBeforeUnloadEvent(callback: () => void) {
    this.beforeUnloadCallback = callback;
  }

  registerUnloadEvent(callback: () => void) {
    this.unloadCallback = callback;
  }

  private onBeforeUnload() {
    if (this.beforeUnloadCallback) {
      this.beforeUnloadCallback();
    }
  }
  
  private onUnload() {
    if (this.unloadCallback) {
      this.unloadCallback();
    }
  }

  init() {
    // Thêm sự kiện beforeunload
    this.beforeUnloadHandler = window.addEventListener('beforeunload', (event) => {
      event.preventDefault();
      event.returnValue = '';
      alert('Bạn đang thoát khỏi trang web');
    });

    // Thêm sự kiện unload
    this.unloadHandler = window.addEventListener('unload', () => {
      alert('Bạn đang thoát khỏi trang web');
    });
  }

  destroy() {
    // Xóa sự kiện beforeunload và unload
    window.removeEventListener('beforeunload', this.beforeUnloadHandler);
    window.removeEventListener('unload', this.unloadHandler);
  }
}