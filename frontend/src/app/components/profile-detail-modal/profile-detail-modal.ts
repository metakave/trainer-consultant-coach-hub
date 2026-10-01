import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExpertProfile } from '../../models/expert.model';
import { ExpertService } from '../../services/expert.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-profile-detail-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile-detail-modal.html',
  styleUrls: ['./profile-detail-modal.css']
})
export class ProfileDetailModalComponent {
  @Input() profile: ExpertProfile | null = null;
  @Output() close = new EventEmitter<void>();

  activeTab: 'overview' | 'media' | 'inquire' | 'claim' = 'overview';
  
  // Inquiry form model
  clientName = '';
  clientEmail = '';
  organization = '';
  message = '';
  preferredDate = '';
  inquirySuccess = false;
  inquirySubmitting = false;

  // Claim form model
  claimantName = '';
  claimantEmail = '';
  verificationLink = '';
  claimSuccess = false;
  claimSubmitting = false;

  constructor(
    private expertService: ExpertService,
    private sanitizer: DomSanitizer
  ) {}

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

  getSafeYoutubeUrl(videoId?: string): SafeResourceUrl | null {
    if (!videoId) return null;
    return this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${videoId}`);
  }

  submitInquiry() {
    if (!this.profile || !this.clientEmail || !this.message) return;
    this.inquirySubmitting = true;
    
    this.expertService.submitInquiry({
      profileId: this.profile.id,
      clientName: this.clientName,
      clientEmail: this.clientEmail,
      organization: this.organization,
      message: this.message,
      preferredDate: this.preferredDate
    }).subscribe({
      next: () => {
        this.inquirySubmitting = false;
        this.inquirySuccess = true;
      },
      error: () => {
        this.inquirySubmitting = false;
      }
    });
  }

  submitClaim() {
    if (!this.profile || !this.claimantEmail || !this.claimantName) return;
    this.claimSubmitting = true;

    this.expertService.claimProfile({
      profileId: this.profile.id,
      claimantName: this.claimantName,
      claimantEmail: this.claimantEmail,
      verificationLink: this.verificationLink
    }).subscribe({
      next: () => {
        this.claimSubmitting = false;
        this.claimSuccess = true;
      },
      error: () => {
        this.claimSubmitting = false;
      }
    });
  }
}
