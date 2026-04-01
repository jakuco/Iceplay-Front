import { Component } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatChipsModule } from "@angular/material/chips";
import { StatCardComponent } from "./statCard.component";

@Component({
  selector: "app-overview",
  imports: [
    MatIconModule,
    MatChipsModule,
    StatCardComponent
  ],
  template: `
    <div class="flex flex-col p-6 gap-8">
      <section class="relative flex flex-col p-4 rounded-2xl bg-linear-to-r from-(--ui-color-primary) to-(--ui-color-primary-dark)">
        <mat-icon class="absolute top-4 right-4 text-[72px]! size-[72px]! opacity-55">emoji_events</mat-icon>
        <div class="bg-(--mat-sys-primary-container)/80 flex items-center gap-2 p-2 px-3 rounded-full w-fit">
          <span class="rounded-full size-2 inline-block animate-pulse bg-green-500"></span>
          Status
        </div>

        <div class="flex flex-col my-4">
          <h3 class="text-3xl"><b>League title</b></h3>
          <p class="text-lg">Lorem ipsum dolor sit amet</p>
        </div>

        <div class="grid not-md:grid-rows-2 not-md:grid-cols-2 md:grid-cols-4 gap-4 h-fit">
          <app-stat-card icon="groups" title="Teams" content="4"/>

          <app-stat-card icon="calendar_today" title="Matches played" content="2"/>

          <app-stat-card icon="gps_fixed" title="Goals scored" content="62"/>

          <app-stat-card icon="trending_up" title="Avg. goals per match" content="31.0"/>
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <h3 class="flex gap-2 items-center">
          <span class="inline-block size-2 rounded-full bg-red-500 animate-pulse"></span>
          <b class="text-xl">Live matches</b>
        </h3>

        <div class="grid not-md:grid-rows-2 md:grid-cols-2 gap-4">
          <div class="grid grid-cols-[1fr_auto] gap-y-4 border-2 border-red-400 rounded-2xl p-4">
            <div class="bg-red-500 flex items-center gap-2 p-1 px-3 rounded-full w-fit">
              <span class="rounded-full size-2 inline-block bg-white"></span>
              <b>LIVE</b>
            </div>

            <span>Time</span>

            <div class="flex gap-2 text-xl">
              <span>🗿</span>
              <span>Team 1 name</span>
            </div>

            <b class="text-xl justify-self-center">-</b>

            <div class="flex gap-2 text-xl">
              <span>🗿</span>
              <span>Team 2 name</span>
            </div>

            <b class="text-xl justify-self-center">-</b>
          </div>

          <div class="grid grid-cols-[1fr_auto] gap-y-4 border-2 border-red-400 rounded-2xl p-4">
            <div class="bg-red-500 flex items-center gap-2 p-1 px-3 rounded-full w-fit">
              <span class="rounded-full size-2 inline-block bg-white"></span>
              <b>LIVE</b>
            </div>

            <span class="self-center">Time</span>

            <div class="flex gap-2 text-xl">
              <span>🗿</span>
              <span>Team 1 name</span>
            </div>

            <b class="text-xl justify-self-center">-</b>

            <div class="flex gap-2 text-xl">
              <span>🗿</span>
              <span>Team 2 name</span>
            </div>

            <b class="text-xl justify-self-center">-</b>
          </div>
        </div>
      </section>

      <div class="grid grid-cols-[0.66fr_0.34fr] gap-6">
        <section>
          <div class="flex justify-between pb-4">
            <h3>
              <b class="text-xl">
                Upcoming matches
              </b>
            </h3>

            <a href="" class="flex gap-2 items-center text-(--ui-color-primary)">
              View all
              <mat-icon>arrow_forward</mat-icon>
            </a>
          </div>

          <div class="border-2 rounded-2xl p-4">
            <div class="flex flex-col">
              <div class="flex justify-between">
                <span>Date</span>
                <span>Time</span>
              </div>

              <div class="mx-auto">
                Team 1 vs Team 2
              </div>
            </div>
          </div>
        </section>
        <section>
          <div class="flex justify-between pb-4">
            <h3>
              <b class="text-xl">
                Top Standings
              </b>
            </h3>

            <a href="" class="flex gap-2 items-center text-(--ui-color-primary)">
              Full table
              <mat-icon>arrow_forward</mat-icon>
            </a>
          </div>

          <div class="border-2 rounded-2xl p-4">
            Standings
          </div>
        </section>
      </div>
    </div>
  `,
})
export class OverviewComponent {}
