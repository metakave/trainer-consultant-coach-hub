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
  
  rawProfiles: ExpertProfile[] = [];
  displayedProfiles: ExpertProfile[] = [];
  isLoading = true;
  
  activeTab: 'explore' | 'gather' | 'deploy' = 'explore';
  activeCategory: ExpertCategory = 'All';
  searchQuery = '';
  selectedClientFilter = '';

  // Bookmarks & Favorites
  savedExpertIds: Set<string> = new Set<string>();
  showSavedOnly = false;

  // Sorting
  sortBy: 'featured' | 'rating' | 'reviews' | 'name' = 'featured';

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
    this.loadSavedState();
    this.loadProfiles();
  }

  loadSavedState() {
    try {
      const stored = localStorage.getItem('saved_expert_ids');
      if (stored) {
        const parsed = JSON.parse(stored);
        this.savedExpertIds = new Set(parsed);
      }
    } catch (e) {
      console.warn('Could not load saved experts from localStorage');
    }
  }

  saveStateToStorage() {
    try {
      localStorage.setItem('saved_expert_ids', JSON.stringify(Array.from(this.savedExpertIds)));
    } catch (e) {
      console.warn('Could not persist saved experts to localStorage');
    }
  }

  toggleSaveExpert(profileId: string, event: MouseEvent) {
    event.stopPropagation();
    if (this.savedExpertIds.has(profileId)) {
      this.savedExpertIds.delete(profileId);
    } else {
      this.savedExpertIds.add(profileId);
    }
    this.saveStateToStorage();
    this.applyLocalFiltersAndSorting();
  }

  isSaved(profileId: string): boolean {
    return this.savedExpertIds.has(profileId);
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
        this.rawProfiles = res.profiles || [];
        this.applyLocalFiltersAndSorting();
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  applyLocalFiltersAndSorting() {
    let result = [...this.rawProfiles];

    if (this.showSavedOnly) {
      result = result.filter(p => this.savedExpertIds.has(p.id));
    }

    switch (this.sortBy) {
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'reviews':
        result.sort((a, b) => b.reviewsCount - a.reviewsCount);
        break;
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'featured':
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }

    this.displayedProfiles = result;
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

  onSortChange() {
    this.applyLocalFiltersAndSorting();
  }

  toggleSavedOnlyView() {
    this.showSavedOnly = !this.showSavedOnly;
    this.applyLocalFiltersAndSorting();
  }

  openProfile(profile: ExpertProfile) {
    this.selectedProfile = profile;
  }

  closeProfileModal() {
    this.selectedProfile = null;
  }

  onProfileCreated(newProfile: ExpertProfile) {
    this.rawProfiles.unshift(newProfile);
    this.activeTab = 'explore';
    this.applyLocalFiltersAndSorting();
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
