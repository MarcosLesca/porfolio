import { Component } from '@angular/core';
import { Tasks } from '../../shared/tasks/tasks';
import { AuthService } from '../../auth/auth-service';

@Component({
  selector: 'app-dashboard',
  imports: [Tasks],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  progressPercentage = 76;

  constructor(private authService: AuthService) {}

  logout(): void {
    this.authService.logout();
  }
  
  getProgressStyle(): { width: string } {
    return { width: `${this.progressPercentage}%` };
  }
}
