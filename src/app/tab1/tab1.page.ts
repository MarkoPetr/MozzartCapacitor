import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  matches: {home: string, away: string, score: string}[] = [];
  loading = false;

  constructor(private http: HttpClient) {}

  loadResults() {
    this.loading = true;
    const url = 'https://api.mocki.io/v2/79f2e3d3'; // privremeni mock API

    this.http.get<any>(url).subscribe({
      next: (data) => {
        this.matches = data.matches || [];
        this.loading = false;
      },
      error: (err) => {
        console.error('Greška pri učitavanju:', err);
        this.loading = false;
      }
    });
  }
}
