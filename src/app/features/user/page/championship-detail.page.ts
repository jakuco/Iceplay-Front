import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-championship-detail',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <div class="page-container">
      <h1>Championship Detail</h1>
    </div>
  `,
  styles: `
    .page-container {
      padding: 1.5rem;
      max-width: 1200px;
      margin: 0 auto;
    }
  `,
})
export default class ChampionshipDetailPage {}
