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

      <!-- ===================================================== -->
      <!-- 🔥 LOGO FA1LS CENTRADO (AGREGADO) -->
      <!-- Wordmark recreado con HTML + CSS (sin imagen) -->
      <!-- ===================================================== -->
      <div class="header-center">
        <a routerLink="/" class="fa1ls-logo" aria-label="FA1LS CORP">
          <span class="letter">F</span>

          <!-- Pirámide que reemplaza la A -->
          <span class="a-mark" aria-hidden="true">
            <span class="face face-left"></span>
            <span class="face face-right"></span>
            <span class="face face-bottom"></span>
          </span>

          <span class="letter">I</span>
          <span class="letter">L</span>
          <span class="letter">S</span>

          <span class="corp">CORP</span>
        </a>
      </div>
      <!-- ===================================================== -->

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

    .fa1ls-logo {
      pointer-events: auto;
      display: inline-flex;
      align-items: flex-end;
      gap: 0.08rem;
      text-decoration: none;
      user-select: none;
      white-space: nowrap;
    }

    .fa1ls-logo .letter {
      font-weight: 800;
      font-size: 1.2rem;
      line-height: 1;
      letter-spacing: 0.02em;
      color: #251d3a;
    }

    .fa1ls-logo .a-mark {
      position: relative;
      width: 1.05rem;
      height: 1rem;
      margin: 0 0.06rem 0.08rem 0.06rem;
      display: inline-block;
    }

    .fa1ls-logo .face {
      position: absolute;
      inset: 0;
    }

    .fa1ls-logo .face-left {
      background: #f37019;
      clip-path: polygon(50% 0%, 0% 100%, 50% 78%);
    }

    .fa1ls-logo .face-right {
      background: #fc8200;
      clip-path: polygon(50% 0%, 50% 78%, 100% 100%);
    }

    .fa1ls-logo .face-bottom {
      background: #d95a0a;
      clip-path: polygon(0% 100%, 50% 78%, 100% 100%, 50% 92%);
    }

    .fa1ls-logo .corp {
      font-weight: 800;
      font-size: 0.58rem;
      line-height: 1;
      color: #fc8200;
      margin-left: 0.2rem;
      margin-bottom: 0.08rem;
      letter-spacing: 0.06em;
    }

    .fa1ls-logo .letter {
      color: var(--mat-sys-on-surface);
    }

    .fa1ls-logo .corp {
      color: var(--mat-sys-primary);
    }

    .fa1ls-logo .face-left {
      background: color-mix(in srgb, var(--mat-sys-primary) 85%, #f37019 15%);
    }

    .fa1ls-logo .face-right {
      background: var(--mat-sys-primary);
    }

    .fa1ls-logo .face-bottom {
      background: color-mix(in srgb, var(--mat-sys-primary) 70%, black 30%);
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