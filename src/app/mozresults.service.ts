import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as XLSX from 'xlsx';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MozResultsService {

  private baseUrl = 'https://www.mozzartbet.com';
  private finishedUrl = `${this.baseUrl}/sr/rezultati?events=finished`;

  constructor(private http: HttpClient) {}

  async fetchFinishedMatches(): Promise<string> {
    const headers = new HttpHeaders({
      'User-Agent': 'Mozilla/5.0',
      'Accept': 'text/html'
    });
    return firstValueFrom(this.http.get(this.finishedUrl, { headers, responseType: 'text' }));
  }

  parseMatches(html: string): any[] {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const rows = Array.from(doc.querySelectorAll('table tr'));
    const matches: any[] = [];
    rows.forEach(row => {
      const cols = row.querySelectorAll('td');
      if (cols.length >= 3) {
        matches.push({
          home: cols[0].textContent?.trim() || '',
          away: cols[1].textContent?.trim() || '',
          score: cols[2].textContent?.trim() || ''
        });
      }
    });
    return matches;
  }

  saveToExcel(data: any[], filename: string = 'matches.xlsx') {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Matches');
    XLSX.writeFile(workbook, filename);
  }

  async getAndSaveFinishedMatches() {
    const html = await this.fetchFinishedMatches();
    const matches = this.parseMatches(html);
    this.saveToExcel(matches);
    return matches;
  }
}
