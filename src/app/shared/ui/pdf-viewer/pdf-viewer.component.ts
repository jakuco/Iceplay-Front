import {
  ChangeDetectionStrategy, Component, computed, inject, input, output,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-pdf-viewer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    <!-- Overlay -->
    <div
      class="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style="background: rgba(0,0,0,0.55);"
      (click)="close.emit()"
      role="dialog"
      [attr.aria-label]="title() || 'Visor de documento'"
      aria-modal="true"
    >
      <!-- Card -->
      <div
        class="flex flex-col bg-white rounded-2xl shadow-2xl w-full overflow-hidden"
        style="max-width: 900px; max-height: 92vh;"
        (click)="$event.stopPropagation()"
      >
        <!-- Header -->
        <div class="flex items-center justify-between px-5 py-3.5 border-b border-gray-100 shrink-0">
          <div class="flex items-center gap-2.5 min-w-0">
            <mat-icon class="!size-5 !text-[20px] text-gray-400 shrink-0">description</mat-icon>
            @if (title()) {
              <h2 class="m-0 text-[15px] font-semibold text-gray-900 truncate">{{ title() }}</h2>
            }
          </div>
          <button
            class="size-8 flex items-center justify-center rounded-lg text-gray-400
                   hover:bg-gray-100 border-none bg-transparent cursor-pointer transition-colors
                   shrink-0 ml-3"
            type="button"
            (click)="close.emit()"
            aria-label="Cerrar visor de documento"
          >
            <mat-icon class="!size-[18px] !text-[18px]">close</mat-icon>
          </button>
        </div>

        <!-- PDF iframe -->
        <iframe
          [src]="safeUrl()"
          class="flex-1 w-full border-none"
          style="min-height: 0; height: 80vh;"
          title="Visor de documento"
        ></iframe>
      </div>
    </div>
  `,
})
export class PdfViewerComponent {
  readonly url   = input.required<string>();
  readonly title = input('');

  readonly close = output<void>();

  private sanitizer = inject(DomSanitizer);

  readonly safeUrl = computed(() =>
    this.sanitizer.bypassSecurityTrustResourceUrl(this.url())
  );
}
