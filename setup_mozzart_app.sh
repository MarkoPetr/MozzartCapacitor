#!/bin/bash

echo "==== 1. Provera i setovanje Node preko nvm ===="
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

echo "Koristićemo Node 24.x"
nvm install 24
nvm use 24

echo "==== 2. Provera npm verzije ===="
npm -v

echo "==== 3. Instalacija Angular i Ionic dependency ===="
npm install @angular/common @angular/core @angular/http @ionic/angular xlsx --save

echo "==== 4. Kreiranje servisa za Mozzart rezultate ===="
cd src/app
if [ -f mozresults.service.ts ]; then
    mv mozresults.service.ts mozresults.service.ts.bak
    echo "Postojeci mozresults.service.ts sačuvan kao mozresults.service.ts.bak"
fi

cat > mozresults.service.ts << 'EOFS'
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
EOFS

echo "==== 5. Provera obaveznih Appflow fajlova ===="
ls package.json ionic.config.json capacitor.config.ts src

echo "==== 6. Dodavanje svega u git ===="
git add .
git commit -m "Dodavanje servisa za Mozzart rezultate i priprema za Appflow"
git push origin main

echo "==== 7. Zavrseno. Sada mozes da odes u Appflow i pokrenes build ===="
