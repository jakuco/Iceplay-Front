import { ChangeDetectionStrategy, Component, computed, effect, input, output } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  MatAutocompleteModule,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { debounce, distinctUntilChanged, map, startWith, timer } from 'rxjs';

/** Item for {@link SearchAutocompleteComponent}: filter runs on `label` and optional `subtitle`. */
export interface UiSearchAutocompleteItem {
  id: string;
  label: string;
  subtitle?: string;
}

@Component({
  selector: 'ui-search-autocomplete',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatAutocompleteModule,
  ],
  template: `
    <mat-form-field appearance="outline" class="field" [class.field-constrain]="constrainWidth()">
      <mat-label>{{ label() }}</mat-label>
      <input
        matInput
        type="text"
        [placeholder]="placeholder()"
        [formControl]="inputCtrl"
        [matAutocomplete]="auto"
        [matAutocompleteDisabled]="disabled()"
      />
      <mat-icon matPrefix aria-hidden="true">search</mat-icon>
      @if (searchText().length > 0) {
        <button
          type="button"
          matIconButton
          matSuffix
          (click)="clear()"
          [attr.aria-label]="clearLabel()"
        >
          <mat-icon>close</mat-icon>
        </button>
      }
      <mat-autocomplete
        #auto="matAutocomplete"
        autoActiveFirstOption
        [displayWith]="displayWith"
        (optionSelected)="onOptionSelected($event)"
      >
        @for (item of filteredItems(); track item.id) {
          <mat-option [value]="item.id">
            <span class="ac-main">{{ item.label }}</span>
            @if (item.subtitle) {
              <span class="ac-sub">{{ item.subtitle }}</span>
            }
          </mat-option>
        }
        @if (filteredItems().length === 0 && queryDebounced().trim().length > 0) {
          <mat-option disabled>{{ noResultsText() }}</mat-option>
        }
      </mat-autocomplete>
    </mat-form-field>
  `,
  styles: `
    :host {
      display: block;
    }

    .field {
      width: 100%;
    }

    .field-constrain {
      max-width: 28rem;
    }

    .ac-main {
      font-weight: 500;
    }

    .ac-sub {
      display: block;
      font-size: 0.75rem;
      color: var(--ui-color-text-secondary, #6b7280);
    }
  `,
})
export class SearchAutocompleteComponent {
  /** Source list (in-memory filter). */
  items = input.required<UiSearchAutocompleteItem[]>();

  label = input<string>('Buscar');
  placeholder = input<string>('');
  /** Pause in ms before applying the filter / opening the panel with results. */
  debounceMs = input(500);
  noResultsText = input('Sin coincidencias');
  clearLabel = input('Limpiar búsqueda');
  disabled = input(false);
  /** When true, applies `max-width` for form layouts; when false, only `width: 100%` of the parent. */
  constrainWidth = input(true);

  readonly selected = output<UiSearchAutocompleteItem>();

  protected inputCtrl = new FormControl<string>('', { nonNullable: true });

  /** Text in the input for the clear button (no debounce). */
  protected searchText = toSignal(
    this.inputCtrl.valueChanges.pipe(
      startWith(this.inputCtrl.value),
      map((v) => this.rawToFilterText(v)),
    ),
    { initialValue: '' },
  );

  /** Debounced query for filtering (panel stays closed until there is text here). */
  protected queryDebounced = toSignal(
    this.inputCtrl.valueChanges.pipe(
      startWith(this.inputCtrl.value),
      map((v) => this.rawToFilterText(v)),
      debounce(() => timer(this.debounceMs())),
      distinctUntilChanged(),
    ),
    { initialValue: '' },
  );

  protected filteredItems = computed(() => {
    const q = this.queryDebounced().trim().toLowerCase();
    if (!q) {
      return [];
    }
    const list = this.items();
    return list.filter(
      (i) => i.label.toLowerCase().includes(q) || (i.subtitle ?? '').toLowerCase().includes(q),
    );
  });

  protected displayWith = (value: string | null): string => {
    if (value == null || value === '') {
      return '';
    }
    const byId = this.items().find((i) => i.id === value);
    if (byId) {
      return byId.label;
    }
    return value;
  };

  constructor() {
    effect(() => {
      if (this.disabled()) {
        this.inputCtrl.disable({ emitEvent: false });
      } else {
        this.inputCtrl.enable({ emitEvent: false });
      }
    });
  }

  protected onOptionSelected(event: MatAutocompleteSelectedEvent): void {
    const id = event.option.value as string;
    const item = this.items().find((i) => i.id === id);
    if (item) {
      this.selected.emit(item);
      this.inputCtrl.setValue(id);
    }
  }

  protected clear(): void {
    this.inputCtrl.setValue('');
  }

  /** Text used for filtering: free typing, or the item label when the value is a known id. */
  private rawToFilterText(raw: string): string {
    if (raw == null || raw === '') {
      return '';
    }
    const byId = this.items().find((i) => i.id === raw);
    if (byId) {
      return byId.label;
    }
    return raw;
  }
}
