import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { ExpertProfile, InquiryForm, ClaimForm } from '../models/expert.model';

@Injectable({
  providedIn: 'root'
})
export class ExpertService {
  private apiUrl = this.getBaseUrl();

  constructor(private http: HttpClient) {}

  private getBaseUrl(): string {
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
      `${this.apiUrl}/profiles`, 
      { params }
    ).pipe(
      catchError(err => {
        console.error('API Error, using fallback:', err);
        return of({ success: false, profiles: [], count: 0 });
      })
    );
  }

  getProfileById(id: string): Observable<{ success: boolean; profile: ExpertProfile }> {
    return this.http.get<{ success: boolean; profile: ExpertProfile }>(`${this.apiUrl}/profiles/${id}`);
  }

  scrapePublicProfile(urlOrName: string, autoSave: boolean = false): Observable<{ success: boolean; profile: ExpertProfile; message: string }> {
    return this.http.post<{ success: boolean; profile: ExpertProfile; message: string }>(
      `${this.apiUrl}/scrape`, 
      { urlOrName, autoSave }
    );
  }

  createProfile(profile: Partial<ExpertProfile>): Observable<{ success: boolean; profile: ExpertProfile; message: string }> {
    return this.http.post<{ success: boolean; profile: ExpertProfile; message: string }>(
      `${this.apiUrl}/profiles`, 
      profile
    );
  }

  submitInquiry(inquiry: InquiryForm): Observable<{ success: boolean; message: string }> {
    return this.http.post<{ success: boolean; message: string }>(`${this.apiUrl}/inquire`, inquiry);
  }

  claimProfile(claim: ClaimForm): Observable<{ success: boolean; message: string }> {
    return this.http.post<{ success: boolean; message: string }>(`${this.apiUrl}/claim`, claim);
  }
}
