import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule, NgIf, NgForOf } from '@angular/common';
import { MozResultsService } from '../mozresults.service';

@Component({
  selector: 'app-tab1',
  standalone: true,
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [
    IonicModule,
    CommonModule,
    NgIf,
    NgForOf
  ]
})
export class Tab1Page {
  matches: any[] = [];
  loading = false;

  constructor(private mozService: MozResultsService) {}

  async loadResults() {
    this.loading = true;
    try {
      this.matches = await this.mozService.getAndSaveFinishedMatches();
    } catch (e) {
      console.error('Greška pri učitavanju rezultata', e);
    } finally {
      this.loading = false;
    }
  }
}
