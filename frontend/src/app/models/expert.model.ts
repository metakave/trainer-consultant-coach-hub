export type ExpertCategory = 
  | 'All' 
  | 'Corporate Trainer' 
  | 'Corporate Coach' 
  | 'Executive Coach' 
  | 'Consultant' 
  | 'AI Trainer';

export interface SocialLinks {
  linkedin?: string;
  facebook?: string;
  youtube?: string;
  podcast?: string;
  website?: string;
}

export interface FeaturedMedia {
  youtubeVideoId?: string;
  podcastTitle?: string;
  podcastUrl?: string;
}

export interface ExpertProfile {
  id: string;
  name: string;
  title: string;
  headline: string;
  category: ExpertCategory;
  avatar: string;
  coverImage?: string;
  location: string;
  rating: number;
  reviewsCount: number;
  hourlyRate: string;
  bio: string;
  clients: string[];
  specialties: string[];
  socialLinks: SocialLinks;
  featuredMedia?: FeaturedMedia;
  verified: boolean;
  featured?: boolean;
  claimed?: boolean;
  sourceUrl?: string;
  createdAt?: string;
}

export interface InquiryForm {
  profileId: string;
  clientName: string;
  clientEmail: string;
  organization: string;
  message: string;
  preferredDate?: string;
}

export interface ClaimForm {
  profileId: string;
  claimantName: string;
  claimantEmail: string;
  verificationLink: string;
}
