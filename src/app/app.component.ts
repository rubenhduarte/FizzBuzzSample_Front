// src/app/app.component.ts
import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'FizzBuzz App';
  start: number = 1;
  limit: number = 100;
  series: string[] = [];
  errorMessage: string = '';

  constructor(@Inject(HttpClient) private http: HttpClient) {}

  generateSeries(): void {
    const request = { start: this.start, limit: this.limit };
    this.http.post<string[]>('/api/fizzbuzz', request).subscribe({
      next: (data: string[]) => {
        this.series = data;
        this.errorMessage = '';
      },
      error: (error: any) => {
        console.error(error);
        this.errorMessage = 'Error generando la serie. Verifica los parámetros.';
      }
    });
  }
}