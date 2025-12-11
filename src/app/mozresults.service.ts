import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class MozResultsService {

  constructor(private http: HttpClient) { }

  async fetchFinishedMatches() {
    const url = 'https://www.mozzartbet.com/sr/rezultati?events=finished';
    return this.http.get(url, { responseType: 'text' }).toPromise();
  }

  saveToExcel(data: any, filename: string = 'matches.xlsx') {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Matches');
    XLSX.writeFile(workbook, filename);
  }
}
