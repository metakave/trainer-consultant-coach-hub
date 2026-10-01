import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExpertService } from '../../services/expert.service';
import { ExpertProfile } from '../../models/expert.model';

@Component({
  selector: 'app-scraper-studio',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './scraper-studio.html',
  styleUrls: ['./scraper-studio.css']
})
export class ScraperStudioComponent {
  @Output() profileCreated = new EventEmitter<ExpertProfile>();

  targetInput = '';
  isLoading = false;
  errorMessage = '';
  scrapedProfile: ExpertProfile | null = null;
  autoSave = true;
  publishedSuccess = false;

  presetExamples = [
    { name: 'Dr. Aris Thorne (AI Trainer)', url: 'https://aristhorne.ai' },
    { name: 'Jonathan Sterling (Executive Coach)', url: 'https://sterlingexecutive.com' },
    { name: 'Marcus Vance (Agile Corporate Trainer)', url: 'https://marcusvancetraining.com' },
    { name: 'Dr. Elena Rostova (Corporate Culture Coach)', url: 'https://elenarostova.com' }
  ];

  constructor(private expertService: ExpertService) {}

  usePreset(url: string) {
    this.targetInput = url;
    this.runScraper();
  }

  runScraper() {
    if (!this.targetInput.trim()) {
      this.errorMessage = 'Please enter a URL, website link, or expert name to gather data.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.scrapedProfile = null;
    this.publishedSuccess = false;

    this.expertService.scrapePublicProfile(this.targetInput, this.autoSave).subscribe({
      next: (res) => {
        this.isLoading = false;
        if (res.success && res.profile) {
          this.scrapedProfile = res.profile;
          if (this.autoSave) {
            this.publishedSuccess = true;
            this.profileCreated.emit(res.profile);
          }
        } else {
          this.errorMessage = res.message || 'Failed to extract profile information.';
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = 'Error connecting to public data gatherer API: ' + (err.message || 'Server error');
      }
    });
  }

  publishProfile() {
    if (!this.scrapedProfile) return;
    this.expertService.createProfile(this.scrapedProfile).subscribe({
      next: (res) => {
        if (res.success) {
          this.publishedSuccess = true;
          this.profileCreated.emit(res.profile);
        }
      }
    });
  }
}
