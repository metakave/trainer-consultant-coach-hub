import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExpertService } from '../../services/expert.service';
import { ExpertProfile, ExpertCategory } from '../../models/expert.model';

@Component({
  selector: 'app-add-profile-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-profile-modal.html',
  styleUrls: ['./add-profile-modal.css']
})
export class AddProfileModalComponent {
  @Output() close = new EventEmitter<void>();
  @Output() profileAdded = new EventEmitter<ExpertProfile>();

  name = '';
  title = '';
  headline = '';
  category: ExpertCategory = 'Corporate Trainer';
  location = '';
  hourlyRate = '$400 - $700 / hr';
  bio = '';
  clientsInput = '';
  specialtiesInput = '';
  avatar = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80';
  
  linkedin = '';
  youtube = '';
  podcast = '';
  facebook = '';
  website = '';

  isSubmitting = false;
  success = false;

  categories: ExpertCategory[] = [
    'Corporate Trainer',
    'Corporate Coach',
    'Executive Coach',
    'Consultant',
    'AI Trainer'
  ];

  constructor(private expertService: ExpertService) {}

  submitProfile() {
    if (!this.name || !this.bio) return;
    this.isSubmitting = true;

    const clients = this.clientsInput ? this.clientsInput.split(',').map(c => c.trim()).filter(Boolean) : ['Fortune 500'];
    const specialties = this.specialtiesInput ? this.specialtiesInput.split(',').map(s => s.trim()).filter(Boolean) : [this.category];

    const newProfileData: Partial<ExpertProfile> = {
      name: this.name,
      title: this.title || `${this.category} Specialist`,
      headline: this.headline || `High-Impact ${this.category}`,
      category: this.category,
      avatar: this.avatar,
      location: this.location || 'Remote & Onsite',
      hourlyRate: this.hourlyRate,
      bio: this.bio,
      clients: clients,
      specialties: specialties,
      socialLinks: {
        linkedin: this.linkedin,
        youtube: this.youtube,
        podcast: this.podcast,
        facebook: this.facebook,
        website: this.website
      }
    };

    this.expertService.createProfile(newProfileData).subscribe({
      next: (res) => {
        this.isSubmitting = false;
        if (res.success && res.profile) {
          this.success = true;
          this.profileAdded.emit(res.profile);
        }
      },
      error: () => {
        this.isSubmitting = false;
      }
    });
  }
}
