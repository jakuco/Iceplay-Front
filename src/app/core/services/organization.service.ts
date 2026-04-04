import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { ApiEndpoints } from '@core/constants/endpoints.const';

export interface Organization {
  id: string;
  name: string;
  logo: string;
  contactEmail: string;
  contactPhone: string;
  planLimits: {
    maxTeams: number;
    maxPlayers: number;
    maxChampionships: number;
  };
  colors: {
    primary: string;
    secondary: string;
  };
  status: 'active' | 'inactive';
}

@Injectable({
  providedIn: 'root',
})
export class OrganizationService {
  private api = inject(ApiService);

  getOrganizations(): Observable<Organization[]> {
    return this.api.get<Organization[]>(ApiEndpoints.ORGANIZATIONS.BASE);
  }

  getOrganizationById(id: string): Observable<Organization> {
    return this.api.get<Organization>(ApiEndpoints.ORGANIZATIONS.BY_ID(id));
  }

  createOrganization(org: Omit<Organization, 'id'>): Observable<Organization> {
    return this.api.post<Organization>(ApiEndpoints.ORGANIZATIONS.BASE, org);
  }

  updateOrganization(id: string, org: Partial<Organization>): Observable<Organization> {
    return this.api.patch<Organization>(ApiEndpoints.ORGANIZATIONS.BY_ID(id), org);
  }
}
