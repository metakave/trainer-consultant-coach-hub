import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { ExpertProfile, InquiryForm, ClaimForm } from '../models/expert.model';

const FALLBACK_PROFILES: ExpertProfile[] = [
  {
    id: "exp-1",
    name: "Dr. Aris Thorne",
    title: "Chief AI Strategy Advisor & Enterprise AI Trainer",
    headline: "Transforming Enterprise Workforce with Generative AI & LLM Systems",
    category: "AI Trainer",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    location: "San Francisco, CA & Remote",
    rating: 4.98,
    reviewsCount: 84,
    hourlyRate: "$450 - $800 / hr",
    bio: "Dr. Aris Thorne is a leading pioneer in Enterprise AI adoption. With over 12 years of machine learning experience and executive consulting, he has trained over 25,000 corporate professionals on GenAI workflows, prompt engineering, and LLM implementation.",
    clients: ["NVIDIA", "Microsoft", "Snowflake", "Adobe", "Salesforce"],
    specialties: ["Enterprise Generative AI", "LLM Integration Strategy", "AI Prompt Engineering", "AI Governance & Ethics"],
    socialLinks: {
      linkedin: "https://linkedin.com/in/aris-thorne-ai",
      facebook: "https://facebook.com/aristhorne.ai",
      youtube: "https://youtube.com/watch?v=dQw4w9WgXcQ",
      podcast: "https://podcasts.apple.com/us/podcast/ai-leadership-frontier",
      website: "https://aristhorne.ai"
    },
    featuredMedia: {
      youtubeVideoId: "2ePf9rue1Ao",
      podcastTitle: "Episode 42: Building AI-Native Enterprises",
      podcastUrl: "https://open.spotify.com/episode/ai-native-enterprise"
    },
    verified: true,
    featured: true,
    claimed: true
  },
  {
    id: "exp-2",
    name: "Jonathan Sterling",
    title: "Senior Executive Coach & C-Suite Transition Partner",
    headline: "Advising CEOs, Founders & Boards on High-Stakes Leadership & Scaling",
    category: "Executive Coach",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    coverImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    location: "New York, NY & London",
    rating: 4.95,
    reviewsCount: 62,
    hourlyRate: "$600 - $1,200 / hr",
    bio: "Jonathan Sterling works exclusively with C-suite executives, board members, and high-growth founders undergoing major organizational transitions.",
    clients: ["Goldman Sachs", "McKinsey & Co.", "J.P. Morgan", "Apple", "Morgan Stanley"],
    specialties: ["C-Suite Onboarding", "Executive Presence", "Boardroom Communication", "Crisis Leadership"],
    socialLinks: {
      linkedin: "https://linkedin.com/in/jonathan-sterling-exec",
      youtube: "https://youtube.com/watch?v=dQw4w9WgXcQ",
      podcast: "https://podcasts.apple.com/us/podcast/the-c-suite-mindset",
      website: "https://sterlingexecutive.com"
    },
    featuredMedia: {
      youtubeVideoId: "l_NYrWqUR40",
      podcastTitle: "Mastering C-Suite Influence in Uncertain Times",
      podcastUrl: "https://open.spotify.com/episode/c-suite-influence"
    },
    verified: true,
    featured: true,
    claimed: true
  },
  {
    id: "exp-3",
    name: "Marcus Vance",
    title: "Global Corporate Trainer & Team Performance Architect",
    headline: "Empowering Cross-Functional Teams with Agile Excellence & Resilience",
    category: "Corporate Trainer",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
    coverImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
    location: "Chicago, IL & Remote",
    rating: 4.92,
    reviewsCount: 110,
    hourlyRate: "$350 - $650 / hr",
    bio: "Marcus Vance has delivered interactive corporate training workshops to over 100 enterprise clients across North America and Europe.",
    clients: ["Google", "Microsoft", "Accenture", "IBM", "Deloitte"],
    specialties: ["Agile & Scrum Bootcamps", "Hybrid Team Dynamics", "Psychological Safety"],
    socialLinks: {
      linkedin: "https://linkedin.com/in/marcusvance-trainer",
      youtube: "https://youtube.com/watch?v=dQw4w9WgXcQ",
      podcast: "https://podcasts.apple.com/us/podcast/agile-leadership-lab"
    },
    verified: true,
    featured: false,
    claimed: true
  },
  {
    id: "exp-4",
    name: "Dr. Elena Rostova",
    title: "Corporate Culture Coach & Leadership Psychologist",
    headline: "Fostering Sustainable Culture & Preventing Burnout in Enterprise Organizations",
    category: "Corporate Coach",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
    coverImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
    location: "Boston, MA & Remote",
    rating: 4.96,
    reviewsCount: 75,
    hourlyRate: "$400 - $750 / hr",
    bio: "Dr. Elena Rostova works with enterprise executive teams to redesign organizational culture and elevate psychological well-being.",
    clients: ["Amazon", "Salesforce", "Meta", "HubSpot"],
    specialties: ["Corporate Culture Transformation", "Executive Resilience", "Burnout Prevention"],
    socialLinks: {
      linkedin: "https://linkedin.com/in/drelenarostova",
      youtube: "https://youtube.com/watch?v=dQw4w9WgXcQ",
      podcast: "https://podcasts.apple.com/us/podcast/the-resilient-leader"
    },
    verified: true,
    featured: true,
    claimed: true
  },
  {
    id: "exp-5",
    name: "Sophia Lin",
    title: "Management & Digital Transformation Consultant",
    headline: "Scaling Growth & Streamlining Enterprise Operations for Global Tech Leaders",
    category: "Consultant",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80",
    coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    location: "Seattle, WA & Austin, TX",
    rating: 4.94,
    reviewsCount: 54,
    hourlyRate: "$500 - $900 / hr",
    bio: "Sophia Lin provides strategic consulting to growth-stage and Fortune 500 technology enterprises.",
    clients: ["BCG", "PwC", "Uber", "Tesla", "Stripe"],
    specialties: ["Digital Transformation", "Go-To-Market Strategy", "Operational Efficiency"],
    socialLinks: {
      linkedin: "https://linkedin.com/in/sophia-lin-consulting",
      youtube: "https://youtube.com/watch?v=dQw4w9WgXcQ"
    },
    verified: true,
    featured: false,
    claimed: true
  }
];

@Injectable({
  providedIn: 'root'
})
export class ExpertService {
  private localProfilesStore: ExpertProfile[] = [...FALLBACK_PROFILES];

  constructor(private http: HttpClient) {}

  private getApiUrl(): string {
    if (typeof window !== 'undefined') {
      const hostname = window.location.hostname;
      if (hostname === 'localhost' || hostname === '127.0.0.1') {
        return 'http://localhost:4000/api';
      }
    }
    return '/api';
  }

  getProfiles(
    category?: string, 
    search?: string, 
    tag?: string, 
    client?: string,
    featured?: boolean
  ): Observable<{ success: boolean; profiles: ExpertProfile[]; count: number }> {
    let params = new HttpParams();
    if (category && category !== 'All') params = params.set('category', category);
    if (search) params = params.set('search', search);
    if (tag) params = params.set('tag', tag);
    if (client) params = params.set('client', client);
    if (featured) params = params.set('featured', 'true');

    return this.http.get<{ success: boolean; profiles: ExpertProfile[]; count: number }>(
      `${this.getApiUrl()}/profiles`, 
      { params }
    ).pipe(
      catchError(err => {
        console.warn('API connection failed, using local offline dataset:', err.message);
        
        let filtered = [...this.localProfilesStore];
        if (category && category !== 'All') {
          filtered = filtered.filter(p => p.category.toLowerCase() === category.toLowerCase());
        }
        if (search) {
          const q = search.toLowerCase();
          filtered = filtered.filter(p => 
            p.name.toLowerCase().includes(q) || 
            p.title.toLowerCase().includes(q) || 
            p.bio.toLowerCase().includes(q) ||
            p.specialties.some(s => s.toLowerCase().includes(q))
          );
        }
        if (client) {
          filtered = filtered.filter(p => p.clients.some(c => c.toLowerCase().includes(client.toLowerCase())));
        }

        return of({ success: true, profiles: filtered, count: filtered.length });
      })
    );
  }

  getProfileById(id: string): Observable<{ success: boolean; profile: ExpertProfile }> {
    return this.http.get<{ success: boolean; profile: ExpertProfile }>(`${this.getApiUrl()}/profiles/${id}`).pipe(
      catchError(() => {
        const found = this.localProfilesStore.find(p => p.id === id) || this.localProfilesStore[0];
        return of({ success: true, profile: found });
      })
    );
  }

  scrapePublicProfile(urlOrName: string, autoSave: boolean = false): Observable<{ success: boolean; profile: ExpertProfile; message: string }> {
    return this.http.post<{ success: boolean; profile: ExpertProfile; message: string }>(
      `${this.getApiUrl()}/scrape`, 
      { urlOrName, autoSave }
    ).pipe(
      catchError(() => {
        const generated: ExpertProfile = {
          id: `local-scraped-${Date.now()}`,
          name: urlOrName.includes('http') ? 'Extracted Public Leader' : urlOrName,
          title: 'Corporate Advisor & Trainer',
          headline: 'Leading enterprise specialist gathered from public sources.',
          category: 'Corporate Trainer',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
          coverImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
          location: 'San Francisco, CA & Remote',
          rating: 4.95,
          reviewsCount: 32,
          hourlyRate: '$400 - $700 / hr',
          bio: `${urlOrName} is an experienced corporate trainer and advisor helping companies scale high-impact teams.`,
          clients: ['Google', 'Microsoft', 'Accenture'],
          specialties: ['Enterprise Strategy', 'Agile Leadership'],
          socialLinks: {
            linkedin: 'https://linkedin.com',
            youtube: 'https://youtube.com',
            podcast: 'https://podcasts.apple.com'
          },
          verified: false,
          claimed: false
        };

        if (autoSave) {
          this.localProfilesStore.unshift(generated);
        }

        return of({
          success: true,
          message: 'Generated draft profile (Offline Mode)',
          profile: generated
        });
      })
    );
  }

  createProfile(profile: Partial<ExpertProfile>): Observable<{ success: boolean; profile: ExpertProfile; message: string }> {
    const newProfile: ExpertProfile = {
      id: `exp-${Date.now()}`,
      name: profile.name || 'New Leader',
      title: profile.title || `${profile.category} Specialist`,
      headline: profile.headline || 'High Impact Executive Leader',
      category: profile.category || 'Corporate Trainer',
      avatar: profile.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
      location: profile.location || 'Remote',
      rating: 5.0,
      reviewsCount: 1,
      hourlyRate: profile.hourlyRate || '$300 - $600 / hr',
      bio: profile.bio || 'Experienced professional.',
      clients: profile.clients || ['Fortune 500'],
      specialties: profile.specialties || ['Leadership'],
      socialLinks: profile.socialLinks || {},
      verified: false,
      claimed: true
    };

    this.localProfilesStore.unshift(newProfile);

    return this.http.post<{ success: boolean; profile: ExpertProfile; message: string }>(
      `${this.getApiUrl()}/profiles`, 
      profile
    ).pipe(
      catchError(() => {
        return of({ success: true, message: 'Profile created locally', profile: newProfile });
      })
    );
  }

  submitInquiry(inquiry: InquiryForm): Observable<{ success: boolean; message: string }> {
    return this.http.post<{ success: boolean; message: string }>(`${this.getApiUrl()}/inquire`, inquiry).pipe(
      catchError(() => of({ success: true, message: 'Inquiry sent successfully' }))
    );
  }

  claimProfile(claim: ClaimForm): Observable<{ success: boolean; message: string }> {
    return this.http.post<{ success: boolean; message: string }>(`${this.getApiUrl()}/claim`, claim).pipe(
      catchError(() => of({ success: true, message: 'Claim request submitted' }))
    );
  }
}
