import { Component, OnInit } from '@angular/core';
import { CapacitorSQLite, SQLiteDBConnection } from '@capacitor-community/sqlite';

@Component({
  selector: 'app-results',
  templateUrl: './results.page.html',
  styleUrls: ['./results.page.scss'],
})
export class ResultsPage implements OnInit {

  mozUrl = 'https://www.mozzartbet.com/sr/rezultati?events=finished';
  matches: any[] = [];
  db!: SQLiteDBConnection;

  constructor() {}

  async ngOnInit() {
    await this.initDB();
    await this.loadMatches();
  }

  async initDB() {
    try {
      this.db = await CapacitorSQLite.createConnection({ database: 'mozzartDB', encrypted: false });
      await this.db.open();
      await this.db.execute(`
        CREATE TABLE IF NOT EXISTS matches (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          date TEXT,
          home TEXT,
          away TEXT,
          score TEXT
        );
      `);
      console.log('DB initialized');
    } catch (err) {
      console.error('DB error', err);
    }
  }

  async loadMatches() {
    const res = await this.db.query('SELECT * FROM matches ORDER BY id DESC;');
    this.matches = res.values ? res.values : [];
  }

  async fetchResults() {
    const sampleMatches = [
      { date: '12.12.2025', home: 'Partizan', away: 'Crvena Zvezda', score: '2-1' },
      { date: '12.12.2025', home: 'Real', away: 'Barcelona', score: '1-1' }
    ];

    for (let m of sampleMatches) {
      await this.db.run(`INSERT INTO matches (date, home, away, score) VALUES (?, ?, ?, ?)`,
        [m.date, m.home, m.away, m.score]
      );
    }

    await this.loadMatches();
    console.log('Rezultati ubačeni u tabelu');
  }
}
