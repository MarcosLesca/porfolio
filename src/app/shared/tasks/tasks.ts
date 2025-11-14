import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface Task {
  id: number;
  text: string;
  completed: boolean;
  createdAt: Date;
}

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tasks.html',
  styleUrl: './tasks.css',
})
export class Tasks {
  private readonly storageKey = 'dashboard-tasks';
  private nextId = 1;

  tasks = signal<Task[]>(this.loadTasksFromStorage());
  newTaskText = '';
  showAddForm = false;

  constructor() {
    const loadedTasks = this.loadTasksFromStorage();
    if (loadedTasks.length > 0) {
      this.nextId = Math.max(...loadedTasks.map(t => t.id)) + 1;
    }
  }

  addTask(): void {
    if (!this.newTaskText.trim()) {
      return;
    }

    const newTask: Task = {
      id: this.nextId++,
      text: this.newTaskText.trim(),
      completed: false,
      createdAt: new Date(),
    };

    this.tasks.update((current) => [...current, newTask]);
    this.newTaskText = '';
    this.saveTasksToStorage();
  }

  toggleTask(id: number): void {
    this.tasks.update((current) =>
      current.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
    this.saveTasksToStorage();
  }

  deleteTask(id: number): void {
    this.tasks.update((current) => current.filter((task) => task.id !== id));
    this.saveTasksToStorage();
  }

  get pendingTasks(): Task[] {
    return this.tasks().filter((task) => !task.completed);
  }

  onKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.addTask();
    }
  }

  private loadTasksFromStorage(): Task[] {
    if (typeof window === 'undefined') {
      return [];
    }

    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        const tasks = JSON.parse(stored);
        return tasks.map((task: any) => ({
          ...task,
          createdAt: new Date(task.createdAt),
        }));
      }
    } catch (error) {
      console.error('Error loading tasks from storage:', error);
    }

    return [
      {
        id: 1,
        text: 'Pulir diseño de la página principal',
        completed: false,
        createdAt: new Date(),
      },
      {
        id: 2,
        text: 'Agregar autenticación con Google',
        completed: false,
        createdAt: new Date(),
      },
      {
        id: 3,
        text: 'Escribir pruebas unitarias',
        completed: false,
        createdAt: new Date(),
      },
      {
        id: 4,
        text: 'Actualizar documentación de API',
        completed: false,
        createdAt: new Date(),
      },
    ];
  }

  private saveTasksToStorage(): void {
    if (typeof window === 'undefined') {
      return;
    }

    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.tasks()));
    } catch (error) {
      console.error('Error saving tasks to storage:', error);
    }
  }
}

