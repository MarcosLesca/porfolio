import { Injectable, signal } from '@angular/core';

export type NotificationType = 'success' | 'error' | 'info';

export interface NotificationMessage {
  id: number;
  type: NotificationType;
  message: string;
  duration: number;
  closing?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private readonly notificationsSignal = signal<NotificationMessage[]>([]);
  readonly notifications = this.notificationsSignal.asReadonly();

  private readonly autoDismissTimers = new Map<number, ReturnType<typeof setTimeout>>();
  private readonly closingTimers = new Map<number, ReturnType<typeof setTimeout>>();
  private readonly closingDuration = 250;
  private lastId = 0;

  show(type: NotificationType, message: string, duration = 3500): void {
    const id = ++this.lastId;
    const notification: NotificationMessage = { id, type, message, duration };

    this.notificationsSignal.update((current) => [...current, notification]);
    this.scheduleAutoDismiss(id, duration);
  }

  success(message: string, duration?: number): void {
    this.show('success', message, duration);
  }

  error(message: string, duration?: number): void {
    this.show('error', message, duration);
  }

  info(message: string, duration?: number): void {
    this.show('info', message, duration);
  }

  dismiss(id: number): void {
    if (this.closingTimers.has(id)) {
      return;
    }

    this.clearAutoTimer(id);

    this.notificationsSignal.update((current) =>
      current.map((notification) =>
        notification.id === id ? { ...notification, closing: true } : notification
      )
    );

    const closingTimer = setTimeout(() => {
      this.notificationsSignal.update((current) =>
        current.filter((notification) => notification.id !== id)
      );
      this.closingTimers.delete(id);
    }, this.closingDuration);

    this.closingTimers.set(id, closingTimer);
  }

  clear(): void {
    this.notificationsSignal().forEach((notification) => this.dismiss(notification.id));
  }

  private scheduleAutoDismiss(id: number, duration: number): void {
    const timer = setTimeout(() => this.dismiss(id), duration);
    this.autoDismissTimers.set(id, timer);
  }

  private clearAutoTimer(id: number): void {
    const timer = this.autoDismissTimers.get(id);
    if (timer) {
      clearTimeout(timer);
      this.autoDismissTimers.delete(id);
    }
  }
}

