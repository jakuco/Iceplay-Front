import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-stat-card',
  standalone: true,
  imports: [MatIconModule],
  template: `
    <div class="flex flex-col justify-between p-4 rounded-2xl h-full bg-(--mat-sys-primary-container)/80">
      <div class="grid grid-cols-[24px_1fr] gap-2 items-center">
        <mat-icon class="size-6! text-[24px]!">{{ icon() }}</mat-icon>
        <span class="text-primary">{{ title() }}</span>
      </div>
      <b class="text-2xl text-primary">{{ content() }}</b>
    </div>
  `
})
export class StatCardComponent {
  icon = input.required<string>();
  title = input.required<string>();
  content = input.required<string | number>();
}
