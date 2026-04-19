import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MatToolbar } from '@angular/material/toolbar';
import { HeaderActions } from './components/header-actions/header-actions';
import { LanguageSelectorComponent } from './components/language-selector/language-selector';
import { RouterLink } from '@angular/router';
import { SidenavService } from '../../core/services/sidenav.service';
import { TranslatePipe } from '../../core/pipes/translate.pipe';

@Component({
  selector: 'app-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatToolbar,
    MatIconButton,
    MatIcon,
    HeaderActions,
    LanguageSelectorComponent,
    RouterLink,
    TranslatePipe,
  ],
  template: `
    <mat-toolbar class="px-2! shadow-md sm:px-4!">
      <!-- Menu button to open sports sidenav -->
      <button
        matIconButton
        [attr.aria-label]="'header.openSportsMenu' | translate"
        (click)="sidenavService.toggle()"
        class="menu-button"
      >
        <mat-icon>menu</mat-icon>
      </button>

      <!-- Logo ICEPLAY (izquierda) -->
      <a class="logo" routerLink="/">
        <span class="hidden sm:inline"><span class="ice">ICE</span>PLAY</span>
        <span class="sm:hidden"><span class="ice">I</span>P</span>
      </a>

      <span class="flex-1"></span>

      <app-language-selector />

      <app-header-actions />
    </mat-toolbar>
  `,
  styles: `
    :host {
      position: sticky;
      top: 0;
      z-index: 1000;
    }

    ::ng-deep mat-toolbar {
      background: var(--mat-sys-surface-container) !important;
      color: var(--mat-sys-on-secondary-container) !important;

      /* Necesario para centrar FA1LS */
      position: relative;
    }

    .menu-button {
      margin-right: 0.5rem;
    }

    .logo {
      font-family: var(--iceplay-wordmark-font-family);
      font-style: var(--iceplay-wordmark-font-style);
      font-weight: var(--iceplay-wordmark-font-weight);
      font-size: 1.25rem;
      letter-spacing: 0.09em;
      color: inherit;
      text-decoration: none;
      margin-left: 0.5rem;
      cursor: pointer;
      transition: opacity 0.2s ease;

      &:hover {
        opacity: 0.8;
      }

      @media (min-width: 640px) {
        margin-left: 0.75rem;
        font-size: 1.5rem;
      }

      .ice {
        color: #7dd3fc;
        text-shadow: 0 0 10px rgba(125, 211, 252, 0.5);
      }
    }

    /* ===================================================== */
    /* 🔥 ESTILOS LOGO FA1LS (AGREGADO) */
    /* ===================================================== */

    .header-center {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      align-items: center;
      justify-content: center;

      /* evita bloquear botones del header */
      pointer-events: none;
    }

    /* Responsive: ocultar en pantallas pequeñas */
    @media (max-width: 900px) {
      .header-center {
        display: none;
      }
    }

    /* ===================================================== */
  `,
})
export class Header {
  protected readonly sidenavService = inject(SidenavService);
}