import { Component, inject } from '@angular/core';
import { NgClass } from '@angular/common';
import { NotificationService } from './notification.service';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [ NgClass],
  templateUrl: './notification.html',
  styleUrl: './notification.css',
})
export class Notification {
  private readonly notificationService = inject(NotificationService);
  readonly notifications = this.notificationService.notifications;

  dismiss(id: number): void {
    this.notificationService.dismiss(id);
  }
}
