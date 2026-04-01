import { Component } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatTabsModule } from "@angular/material/tabs";
import {
  OverviewComponent,
  MatchesComponent,
  StandingsComponent,
  TeamsComponent,
  PlayersComponent,
  StatisticsComponent
} from "./components";

type AvailableTabs = "overview" | "matches" | "standings" | "players" | "teams" | "statistics";

type Tab = {
  id: AvailableTabs,
  label: string,
  icon: string
}

const DashboardContent = [
  OverviewComponent,
  MatchesComponent,
  StandingsComponent,
  TeamsComponent,
  PlayersComponent,
  StatisticsComponent
] as const;

@Component({
  selector: 'app-dashboard',
  imports: [
    MatIconModule,
    MatTabsModule,
    MatButtonModule,
    DashboardContent
  ],
  template: `
    <div class="flex flex-col">
      <mat-tab-group>
        @for (tab of tabs; track $index) {
          <mat-tab>
            <ng-template mat-tab-label>
              <mat-icon class="mr-2">{{ tab.icon }}</mat-icon>
              {{ tab.label }}
            </ng-template>

            @switch (tab.id) {
              @case ("overview") {
                <app-overview></app-overview>
              }
              @case ("matches") {
                <app-matches></app-matches>
              }
              @case ("standings") {
                <app-standings></app-standings>
              }
              @case ("teams") {
                <app-teams></app-teams>
              }
              @case ("players") {
                <app-players></app-players>
              }
              @case ("statistics") {
                <app-statistics></app-statistics>
              }
            }
          </mat-tab>
        }
      </mat-tab-group>
    </div>
  `,
  styles: `
    .inactive-tab {
      @apply border-transparent!;
      color: var(--mat-sys-on-surface-variant) !important;
    }
  `
})
export default class Dashboard {
  tabs: Tab[] = [
    {
      id: "overview",
      label: "overview",
      icon: "emoji_events"
    },
    {
      id: "matches",
      label: "matches",
      icon: "calendar_today"
    },
    {
      id: "standings",
      label: "standings",
      icon: "leaderboard"
    },
    {
      id: "teams",
      label: "teams",
      icon: "groups"
    },
    {
      id: "players",
      label: "players",
      icon: "people"
    },
    {
      id: "statistics",
      label: "statistics",
      icon: "trending_up"
    }
  ]
}
