import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExpertService } from './services/expert.service';
import { ExpertProfile, ExpertCategory } from './models/expert.model';
import { ProfileDetailModalComponent } from './components/profile-detail-modal/profile-detail-modal';
import { ScraperStudioComponent } from './components/scraper-studio/scraper-studio';
import { VercelGuideComponent } from './components/vercel-guide/vercel-guide';
import { AddProfileModalComponent } from './components/add-profile-modal/add-profile-modal';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    ProfileDetailModalComponent, 
    ScraperStudioComponent, 
    VercelGuideComponent,
    AddProfileModalComponent
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements OnInit {
  title = 'Experts Hub';
  
  profiles: ExpertProfile[] = [];
  isLoading = true;
  
  activeTab: 'explore' | 'gather' | 'deploy' = 'explore';
  activeCategory: ExpertCategory = 'All';
  searchQuery = '';
  selectedClientFilter = '';

  selectedProfile: ExpertProfile | null = null;
  showAddModal = false;

  categories: ExpertCategory[] = [
    'All',
    'Corporate Trainer',
    'Corporate Coach',
    'Executive Coach',
    'Consultant',
    'AI Trainer'
  ];

  topClients = ['Google', 'Microsoft', 'NVIDIA', 'McKinsey', 'Amazon', 'Accenture', 'Salesforce', 'Apple'];
  popularTags = ['Generative AI', 'Agile Scaling', 'C-Suite Onboarding', 'Culture Transformation', 'Digital Strategy'];

  constructor(private expertService: ExpertService) {}

  ngOnInit() {
    this.loadProfiles();
  }

  loadProfiles() {
    this.isLoading = true;
    this.expertService.getProfiles(
      this.activeCategory, 
      this.searchQuery, 
      undefined, 
      this.selectedClientFilter
    ).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.profiles = res.profiles || [];
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  selectCategory(cat: ExpertCategory) {
    this.activeCategory = cat;
    this.loadProfiles();
  }

  filterByClient(client: string) {
    if (this.selectedClientFilter === client) {
      this.selectedClientFilter = '';
    } else {
      this.selectedClientFilter = client;
    }
    this.loadProfiles();
  }

  filterByTag(tag: string) {
    this.searchQuery = tag;
    this.loadProfiles();
  }

  onSearchChange() {
    this.loadProfiles();
  }

  openProfile(profile: ExpertProfile) {
    this.selectedProfile = profile;
  }

  closeProfileModal() {
    this.selectedProfile = null;
  }

  onProfileCreated(newProfile: ExpertProfile) {
    this.profiles.unshift(newProfile);
    this.activeTab = 'explore';
    this.openProfile(newProfile);
  }

  getCategoryBadgeClass(category: string): string {
    switch (category) {
      case 'AI Trainer': return 'badge-ai-trainer';
      case 'Executive Coach': return 'badge-executive-coach';
      case 'Corporate Trainer': return 'badge-corporate-trainer';
      case 'Corporate Coach': return 'badge-corporate-coach';
      case 'Consultant': return 'badge-consultant';
      default: return 'badge-corporate-trainer';
    }
  }
}
