import {
  ChangeDetectionStrategy, Component, computed,
  input, output, signal, viewChild, ElementRef,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

function formatBytes(bytes: number): string {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

@Component({
  selector: 'app-file-upload',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    <div class="flex flex-col gap-1.5">

      @if (selectedFile()) {
        <!-- State B: file selected -->
        <div class="flex items-center gap-2.5 px-3 py-2.5 rounded-lg bg-blue-50
                    border border-blue-200 text-[13px]">
          <mat-icon class="!size-[18px] !text-[18px] text-blue-500 shrink-0">description</mat-icon>
          <span class="flex-1 truncate text-gray-800 font-medium">{{ selectedFile()!.name }}</span>
          <span class="text-[11px] text-gray-400 shrink-0">{{ selectedFileSize() }}</span>
          <button
            class="size-5 flex items-center justify-center rounded text-gray-400
                   bg-transparent border-none cursor-pointer hover:text-red-500 transition-colors"
            type="button"
            (click)="clear()"
            [attr.aria-label]="'Eliminar ' + selectedFile()!.name"
          >
            <mat-icon class="!size-[16px] !text-[16px]">close</mat-icon>
          </button>
        </div>

      } @else if (currentUrl()) {
        <!-- State C: existing URL -->
        <div class="flex items-center gap-2.5 px-3 py-2.5 rounded-lg bg-gray-50
                    border border-gray-200 text-[13px]">
          <mat-icon class="!size-[18px] !text-[18px] text-gray-400 shrink-0">description</mat-icon>
          <a
            [href]="currentUrl()!"
            target="_blank"
            rel="noopener noreferrer"
            class="flex-1 truncate text-blue-600 hover:underline font-medium"
          >Ver documento actual</a>
          <button
            class="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-white border
                   border-gray-300 text-[11.5px] font-medium text-gray-600 cursor-pointer
                   hover:bg-gray-100 transition-colors"
            type="button"
            (click)="triggerFileInput()"
          >
            <mat-icon class="!size-[13px] !text-[13px]">swap_horiz</mat-icon>
            Cambiar
          </button>
        </div>

      } @else {
        <!-- State A: empty -->
        <button
          class="inline-flex items-center gap-2 px-3 py-2.5 rounded-lg bg-white
                 border border-dashed border-gray-300 text-[13px] font-medium
                 text-gray-600 cursor-pointer hover:border-blue-400 hover:bg-blue-50
                 hover:text-blue-600 transition-colors w-full justify-center"
          type="button"
          (click)="triggerFileInput()"
        >
          <mat-icon class="!size-[17px] !text-[17px]">attach_file</mat-icon>
          Seleccionar {{ label() }}...
        </button>
        @if (hint()) {
          <p class="m-0 text-[11px] text-gray-400 text-center">{{ hint() }}</p>
        } @else {
          <p class="m-0 text-[11px] text-gray-400 text-center">Máx {{ maxSizeMb() }} MB</p>
        }
      }

      @if (error()) {
        <p class="m-0 flex items-center gap-1.5 text-[12px] text-red-600">
          <mat-icon class="!size-[14px] !text-[14px]">warning</mat-icon>
          {{ error() }}
        </p>
      }

      <input
        #fileInput
        type="file"
        [attr.accept]="accept()"
        class="sr-only"
        [attr.aria-label]="'Seleccionar ' + label()"
        (change)="onFileSelected($event)"
      />
    </div>
  `,
  styles: `:host { display: block; }
    .sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0,0,0,0); }`,
})
export class FileUploadComponent {
  readonly currentUrl  = input<string | null>(null);
  readonly accept      = input('.pdf');
  readonly maxSizeMb   = input(50);
  readonly label       = input('archivo');
  readonly hint        = input('');

  readonly fileChange = output<File | null>();

  private readonly fileInputRef = viewChild.required<ElementRef<HTMLInputElement>>('fileInput');

  readonly selectedFile     = signal<File | null>(null);
  readonly error            = signal('');
  readonly selectedFileSize = computed(() =>
    this.selectedFile() ? formatBytes(this.selectedFile()!.size) : ''
  );

  triggerFileInput(): void {
    this.fileInputRef().nativeElement.click();
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    (event.target as HTMLInputElement).value = '';
    if (!file) return;

    if (file.size > this.maxSizeMb() * 1024 * 1024) {
      this.error.set(`El archivo no puede superar ${this.maxSizeMb()} MB`);
      return;
    }
    this.error.set('');
    this.selectedFile.set(file);
    this.fileChange.emit(file);
  }

  clear(): void {
    this.selectedFile.set(null);
    this.error.set('');
    this.fileChange.emit(null);
  }
}
