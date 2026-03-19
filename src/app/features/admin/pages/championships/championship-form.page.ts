// ─────────────────────────────────────────────────────────────
// championship-form.page.ts  —  Angular 20 · Standalone · OnPush
// ─────────────────────────────────────────────────────────────

import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef,
  OnInit, computed, effect, inject, signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, forkJoin, of, map } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { ChampionshipService } from '../../../../core/services/championship.service';
import { AuthService }         from '../../../../core/services/auth.service';
import { SportService }        from '../../../../core/services/sport.service';
import {
  Championship, CreateChampionshipDto, UpdateChampionshipDto,
} from '../../../../core/models/championship.model';

import {
  ChampionshipHeaderComponent,
  ChampionshipHeaderData,
  SportOption,
} from './championship-components/championship-header.component';

import {
  ChampionshipPhasesComponent,
  ChampionshipFormat,
} from './championship-components/championship-phases.component';
import { PhaseType } from './championship-components/phase-card.component';

import { PhaseCardData } from './championship-components/phase-card.component';

import {
  ChampionshipRulesComponent,
  ChampionshipRuleItem,
  RulePatchDto,
  MOCK_RULES_FOOTBALL,
} from './championship-components/championship-rules.component';

import {
  ChampionshipTeamsComponent,
  TeamItem,
} from './championship-components/championship-teams.component';

// ─────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────

type PageMode = 'create' | 'edit' | 'view';

interface NavTab { id: string; label: string; icon: string; count: number | null; }


// ─────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────

@Component({
  selector: 'app-championship-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    RouterLink,
    MatIconModule,
    MatProgressSpinnerModule,
    ChampionshipHeaderComponent,
    ChampionshipPhasesComponent,
    ChampionshipRulesComponent,
    ChampionshipTeamsComponent,
  ],
  template: `
<div class="min-h-screen flex flex-col bg-[#f0f2f5]">

  <!-- ══ TOPBAR ══════════════════════════════════════════════ -->
  <nav class="sticky top-0 z-50 flex items-center justify-between h-[52px] px-7
              bg-[#080f1c] border-b border-white/[0.06]">

    <a class="inline-flex items-center gap-1.5 text-[13px] font-medium text-white/50
              no-underline transition-colors hover:text-white/90"
       routerLink="/admin/championships">
      <mat-icon class="!size-[18px] !text-[18px]">arrow_back</mat-icon>
      Campeonatos
    </a>

    <button
      class="inline-flex items-center gap-1.5 h-[34px] px-[18px] rounded-lg
             text-[13px] font-semibold cursor-pointer border-none transition-colors"
      [style.background]="isEditable() ? '#3b82f6' : 'rgba(255,255,255,0.07)'"
      [style.color]="isEditable() ? '#fff' : 'rgba(255,255,255,0.8)'"
      [style.border]="isEditable() ? 'none' : '1px solid rgba(255,255,255,0.15)'"
      [style.opacity]="isSaving() ? '0.5' : '1'"
      [style.cursor]="isSaving() ? 'not-allowed' : 'pointer'"
      [disabled]="isSaving()"
      (click)="onActionClick()"
    >
      @if (isSaving()) {
        <mat-spinner [diameter]="16" />
      } @else {
        <mat-icon class="!size-4 !text-[16px]">{{ actionIcon() }}</mat-icon>
      }
      {{ actionLabel() }}
    </button>
  </nav>

  <!-- ══ HEADER ══════════════════════════════════════════════ -->
  <app-championship-header
    [data]="headerData()"
    [sports]="sports()"
    [editable]="isEditable()"
    (dataChange)="onHeaderChange($event)"
    (logoSelected)="onLogoFile($event)"
  />

  <div class="h-px bg-white/[0.08]"></div>

  <!-- ══ NAV TABS ════════════════════════════════════════════ -->
  <div class="flex px-7 bg-white border-b border-gray-200">
    @for (tab of navTabs(); track tab.id) {
      <button
        class="relative bottom-[-1px] inline-flex items-center gap-1.5 h-[46px] px-[18px]
               text-[12px] font-bold tracking-[.06em] uppercase bg-transparent
               border-none border-b-2 cursor-pointer transition-colors"
        [style.color]="activeNavTab() === tab.id ? '#3b82f6' : '#9ca3af'"
        [style.border-bottom-color]="activeNavTab() === tab.id ? '#3b82f6' : 'transparent'"
        (click)="activeNavTab.set(tab.id)"
      >
        <mat-icon class="!size-[15px] !text-[15px]">{{ tab.icon }}</mat-icon>
        {{ tab.label }}
        @if (tab.count !== null) {
          <span
            class="inline-flex items-center justify-center min-w-[18px] h-[18px] px-1.5
                   rounded-full text-[10px] font-bold"
            [class.bg-gray-200]="activeNavTab() !== tab.id"
            [class.text-gray-500]="activeNavTab() !== tab.id"
            [class.bg-blue-100]="activeNavTab() === tab.id"
            [class.text-blue-700]="activeNavTab() === tab.id"
          >{{ tab.count }}</span>
        }
      </button>
    }
  </div>

  <!-- ══ TAB CONTENT ═════════════════════════════════════════ -->
  <div class="flex-1">

    @if (activeNavTab() === 'fases') {
      <app-championship-phases
        [initialPhases]="phases()"
        [initialFormat]="activeFormat()"
        (phasesChange)="onPhasesChange($event)"
        (save)="onPhasesSave($event)"
        (cancel)="onPhasesCancel()"
      />
    }

    @if (activeNavTab() === 'reglas') {
      <app-championship-rules
        [initialRules]="championshipRules()"
        (save)="onRulesSave($event)"
        (cancel)="activeNavTab.set('fases')"
      />
    }

    @if (activeNavTab() === 'equipos') {
      <app-championship-teams
        [maxTeams]="headerData().maxTeams"
        [maxPlayersPerTeam]="headerData().maxPlayersPerTeam"
        [initialTeams]="teamsData()"
        (save)="onTeamsSave($event)"
        (dirty)="isDirty.set(true)"
      />
    }

  </div>
</div>
  `,
})
export default class ChampionshipFormPage implements OnInit {

  // ── Services ──────────────────────────────────────────────────
  private router          = inject(Router);
  private route           = inject(ActivatedRoute);
  private championshipSvc = inject(ChampionshipService);
  private sportSvc        = inject(SportService);
  private authService     = inject(AuthService);
  private snackBar        = inject(MatSnackBar);
  private cdr             = inject(ChangeDetectorRef);
  private destroyRef      = inject(DestroyRef);

  // ── Page state ─────────────────────────────────────────────────
  pageMode       = signal<PageMode>('create');
  isSaving       = signal(false);
  isDirty        = signal(false);
  activeNavTab   = signal('fases');
  championshipId = signal<string | null>(null);
  logoFile: File | null = null;

  // ── Sports (cargados del servicio) ─────────────────────────────
  sports = signal<SportOption[]>([]);

  // ── Header data ────────────────────────────────────────────────
  headerData = signal<ChampionshipHeaderData>({
    name: '', description: '', sportId: 1, season: '2024-2025',
    location: '', startDate: '', endDate: '',
    registrationStartDate: '', registrationEndDate: '',
    maxTeams: 16, currentTeams: 0, maxPlayersPerTeam: 20, phaseCount: 0,
    status: 'draft', logoUrl: null,
  });

  // ── Phase state ─────────────────────────────────────────────────
  phases       = signal<PhaseCardData[]>([]);
  activeFormat = signal<ChampionshipFormat | null>(null);

  // ── Rules state ─────────────────────────────────────────────────
  championshipRules = signal<ChampionshipRuleItem[]>([]);

  // ── Teams state ──────────────────────────────────────────────────
  teamsData = signal<TeamItem[]>([]);

  // ── Nav tabs (computed — count reacciona a cambios) ─────────────
  navTabs = computed<NavTab[]>(() => [
    { id: 'fases',   label: 'Fases',   icon: 'layers', count: this.phases().length || null },
    { id: 'reglas',  label: 'Reglas',  icon: 'gavel',  count: null },
    { id: 'equipos', label: 'Equipos', icon: 'group',  count: this.headerData().currentTeams || null },
  ]);

  // ── Computed ───────────────────────────────────────────────────
  isEditable = computed(() => this.pageMode() !== 'view');

  actionLabel = computed(() => {
    if (this.isSaving()) return this.pageMode() === 'create' ? 'Creando...' : 'Guardando...';
    if (this.pageMode() === 'create') return 'Crear Campeonato';
    if (this.pageMode() === 'edit')   return 'Guardar Cambios';
    return 'Editar';
  });

  actionIcon = computed(() =>
    this.pageMode() === 'view' ? 'edit' : this.pageMode() === 'create' ? 'add_circle' : 'save'
  );

  // ── Constructor — persist active tab in sessionStorage ─────────
  constructor() {
    effect(() => {
      const id  = this.championshipId() ?? 'new';
      sessionStorage.setItem(`championship_tab_${id}`, this.activeNavTab());
    });
  }

  // ── Lifecycle ──────────────────────────────────────────────────
  ngOnInit(): void {
    // Cargar deportes del servicio (mapeados al formato del header)
    this.sportSvc.getAll().pipe(takeUntilDestroyed(this.destroyRef)).subscribe(list => {
      this.sports.set(list.map(s => ({ id: s.id, label: s.name, icon: s.icon })));
      this.cdr.markForCheck();
    });

    this.route.paramMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(params => {
        const id = params.get('id');
        if (id) {
          this.championshipId.set(id);
          this.pageMode.set('view');
          this.loadChampionship(id);
        } else {
          this.pageMode.set('create');
          // Cargar reglas por defecto del deporte seleccionado
          this.loadDefaultRules(this.headerData().sportId);
        }
        // Restaurar el tab activo desde sessionStorage (sobrevive a cualquier re-init)
        const savedTab = sessionStorage.getItem(`championship_tab_${id ?? 'new'}`);
        if (savedTab) this.activeNavTab.set(savedTab);
      });
  }

  // ── Header ─────────────────────────────────────────────────────
  onHeaderChange(patch: Partial<ChampionshipHeaderData>): void {
    this.headerData.update(d => ({ ...d, ...patch }));
    this.isDirty.set(true);
  }

  onLogoFile(file: File): void {
    this.logoFile = file;
    this.isDirty.set(true);
  }

  // ── Phases ─────────────────────────────────────────────────────
  onPhasesChange(phases: PhaseCardData[]): void {
    this.phases.set(phases);
    this.headerData.update(d => ({ ...d, phaseCount: phases.length }));
    this.isDirty.set(true);
  }

  onPhasesSave(phases: PhaseCardData[]): void {
    this.onPhasesChange(phases);
    const id = this.championshipId();
    if (!id) { this.snackBar.open('Fases guardadas', 'Cerrar', { duration: 2000 }); return; }
    const dtos = phases.map(p => ({
      name:      p.name,
      phaseType: p.phaseType,
      phaseOrder: p.phaseOrder,
    }));
    this.championshipSvc.savePhases(id, dtos).subscribe({
      next: () => this.snackBar.open('Fases guardadas', 'Cerrar', { duration: 2000 }),
      error: () => this.snackBar.open('Error al guardar fases', 'Cerrar', { duration: 3000 }),
    });
  }

  onPhasesCancel(): void {
    // No-op — ChampionshipPhasesComponent maneja su propio estado interno
  }

  // ── Rules ──────────────────────────────────────────────────────
  onRulesSave(patches: RulePatchDto[]): void {
    const id = this.championshipId();
    if (!id) return;
    const dtos = patches.map(p => ({ matchRuleId: p.matchRuleId, sportId: this.headerData().sportId, value: p.value }));
    this.championshipSvc.updateRules(id, dtos).subscribe({
      next: () => this.snackBar.open('Reglas guardadas', 'Cerrar', { duration: 2000 }),
      error: () => this.snackBar.open('Error al guardar reglas', 'Cerrar', { duration: 3000 }),
    });
  }

  // ── Teams ──────────────────────────────────────────────────────
  onTeamsSave(teams: TeamItem[]): void {
    const id = this.championshipId();
    if (!id) {
      this.teamsData.set(teams);
      this.headerData.update(d => ({ ...d, currentTeams: teams.filter(t => t.isActive).length }));
      return;
    }
    const dtos = teams.map(t => ({
      name:           t.name,
      shortname:      t.shortname,
      slug:           t.slug,
      logoUrl:        t.logoUrl        ?? undefined,
      primaryColor:   t.primaryColor   ?? undefined,
      secondaryColor: t.secondaryColor ?? undefined,
      location:       t.location       ?? undefined,
      foundedYear:    t.foundedYear    ?? undefined,
      homeVenue:      t.homeVenue      || undefined,
      coachName:      t.coachName      ?? undefined,
      coachPhone:     t.coachPhone     ?? undefined,
      players:        t.players,
    }));
    this.championshipSvc.saveTeams(id, dtos).subscribe({
      next: (saved) => {
        this.isDirty.set(false);
        this.headerData.update(d => ({ ...d, currentTeams: saved.filter(t => t.isActive).length }));
        this.snackBar.open('Equipos guardados', 'Cerrar', { duration: 2000 });
      },
      error: () => this.snackBar.open('Error al guardar equipos', 'Cerrar', { duration: 3000 }),
    });
  }

  // ── Action button ──────────────────────────────────────────────
  onActionClick(): void {
    if (this.pageMode() === 'view') { this.pageMode.set('edit'); return; }
    this.save();
  }

  private save(): void {
    const hd = this.headerData();
    if (!hd.name.trim()) {
      this.snackBar.open('El nombre del campeonato es requerido', 'Cerrar', { duration: 3000 });
      return;
    }
    const user = this.authService.currentUser();
    if (!user?.organizationId) {
      this.snackBar.open('Organización no disponible', 'Cerrar', { duration: 3000 });
      return;
    }

    this.isSaving.set(true);

    if (this.pageMode() === 'edit' && this.championshipId()) {
      const dto: UpdateChampionshipDto = {
        name:             hd.name,
        slug:             this.toSlug(hd.name),
        description:      hd.description || undefined,
        season:           hd.season,
        startDate:            hd.startDate ? new Date(hd.startDate) : undefined,
        endDate:              hd.endDate   ? new Date(hd.endDate)   : undefined,
        registrationStartDate: hd.registrationStartDate ? new Date(hd.registrationStartDate) : null,
        registrationEndDate:   hd.registrationEndDate   ? new Date(hd.registrationEndDate)   : null,
        maxTeams:              hd.maxTeams,
        maxPlayersPerTeam:     hd.maxPlayersPerTeam,
      };
      this.championshipSvc.update(this.championshipId()!, dto).subscribe({
        next: () => {
          this.isDirty.set(false);
          this.snackBar.open('Campeonato actualizado', 'Cerrar', { duration: 3000 });
          this.pageMode.set('view');
          this.isSaving.set(false);
        },
        error: () => {
          this.snackBar.open('Error al actualizar', 'Cerrar', { duration: 3000 });
          this.isSaving.set(false);
        },
      });
    } else {
      const dto: CreateChampionshipDto = {
        organizationId:   +user.organizationId,
        sportId:          hd.sportId,
        name:             hd.name,
        slug:             this.toSlug(hd.name),
        season:           hd.season || String(new Date().getFullYear()),
        description:      hd.description || undefined,
        startDate:            hd.startDate ? new Date(hd.startDate) : undefined,
        endDate:              hd.endDate   ? new Date(hd.endDate)   : undefined,
        registrationStartDate: hd.registrationStartDate ? new Date(hd.registrationStartDate) : undefined,
        registrationEndDate:   hd.registrationEndDate   ? new Date(hd.registrationEndDate)   : undefined,
        maxTeams:              hd.maxTeams,
        maxPlayersPerTeam:     hd.maxPlayersPerTeam,
      };
      this.championshipSvc.create(dto).subscribe({
        next: (c: any) => {
          const newId = String(c.id);
          // Auto-guardar fases y equipos que el admin haya configurado antes de crear
          this.saveAllSections(newId).subscribe({
            next: () => {
              this.isDirty.set(false);
              this.snackBar.open('Campeonato creado', 'Cerrar', { duration: 3000 });
              this.router.navigate(['/admin/championships', newId]);
            },
            error: () => {
              // El campeonato se creó; las secciones fallaron parcialmente
              this.isDirty.set(false);
              this.snackBar.open(
                'Campeonato creado. Algunas secciones no pudieron guardarse.',
                'Cerrar', { duration: 4000 },
              );
              this.router.navigate(['/admin/championships', newId]);
            },
          });
        },
        error: () => {
          this.snackBar.open('Error al crear', 'Cerrar', { duration: 3000 });
          this.isSaving.set(false);
        },
      });
    }
  }

  /** Guarda fases y equipos pendientes para un championship ya existente. */
  private saveAllSections(id: string): Observable<void> {
    const saves: Observable<unknown>[] = [];

    if (this.phases().length > 0) {
      const dtos = this.phases().map(p => ({
        name: p.name, phaseType: p.phaseType, phaseOrder: p.phaseOrder,
      }));
      saves.push(this.championshipSvc.savePhases(id, dtos));
    }

    if (this.teamsData().length > 0) {
      const dtos = this.teamsData().map(t => ({
        name:           t.name,
        shortname:      t.shortname,
        slug:           t.slug,
        logoUrl:        t.logoUrl        ?? undefined,
        primaryColor:   t.primaryColor   ?? undefined,
        secondaryColor: t.secondaryColor ?? undefined,
        location:       t.location       ?? undefined,
        foundedYear:    t.foundedYear    ?? undefined,
        homeVenue:      t.homeVenue      || undefined,
        coachName:      t.coachName      ?? undefined,
        coachPhone:     t.coachPhone     ?? undefined,
        players:        t.players,
      }));
      saves.push(this.championshipSvc.saveTeams(id, dtos));
    }

    return saves.length > 0
      ? forkJoin(saves).pipe(map(() => void 0))
      : of(void 0);
  }

  private loadDefaultRules(_sportId: number): void {
    // Catálogo con valores reseteados a default (sin overrides)
    const defaults = MOCK_RULES_FOOTBALL.map(r => ({
      ...r, currentValue: r.defaultValue, isOverridden: false,
    }));
    this.championshipRules.set(defaults);
    this.cdr.markForCheck();
  }

  private loadChampionship(id: string): void {
    this.championshipSvc.getById(id).subscribe({
      next: (c: Championship) => {
        this.headerData.set({
          name:         c.name,
          description:  c.description ?? '',
          sportId:      c.sportId,
          season:       c.season,
          location:     '',
          startDate:    c.startDate ? this.toIsoDate(c.startDate) : '',
          endDate:      c.endDate   ? this.toIsoDate(c.endDate)   : '',
          registrationStartDate: c.registrationStartDate ? this.toIsoDate(c.registrationStartDate) : '',
          registrationEndDate:   c.registrationEndDate   ? this.toIsoDate(c.registrationEndDate)   : '',
          maxTeams:           c.maxTeams,
          currentTeams:       0,
          maxPlayersPerTeam:  c.maxPlayersPerTeam ?? 20,
          phaseCount:         this.phases().length,
          status:       (c.status as any) ?? 'active',
          logoUrl:      c.logo ?? null,
        });
        // Cargar reglas guardadas y mezclar con metadatos del catálogo
        this.championshipSvc.getRules(id).subscribe(rulesResp => {
          const overrides = new Map(rulesResp.rules.map(r => [r.matchRuleId, r]));
          const merged = MOCK_RULES_FOOTBALL.map(meta => {
            const saved = overrides.get(meta.matchRuleId);
            return saved
              ? { ...meta, currentValue: saved.currentValue, isOverridden: saved.isOverridden }
              : { ...meta, currentValue: meta.defaultValue, isOverridden: false };
          });
          this.championshipRules.set(merged);
          this.cdr.markForCheck();
        });
        this.championshipSvc.getPhases(id).subscribe(phasesFromSvc => {
          const mapped: PhaseCardData[] = phasesFromSvc.map(p => ({
            id:         p.id,
            name:       p.name,
            phaseType:  p.phaseType,
            phaseOrder: p.phaseOrder,
            status:     p.status,
            league:     p.leagueConfig   ? { winsPoints: 3, drawPoints: 1, lossPoints: 0, totalRounds: p.leagueConfig.advanceCount, legs: p.leagueConfig.legs, advanceCount: p.leagueConfig.advanceCount, tiebreakOrder: p.leagueConfig.tiebreakOrder } : undefined,
            knockout:   p.knockoutConfig ? { legs: p.knockoutConfig.legs, bracketSize: 0, thirdPlaceMatch: p.knockoutConfig.thirdPlaceMatch, seeding: p.knockoutConfig.seeding, awayGoalsRule: p.knockoutConfig.awayGoalsRule, tieBreak: p.knockoutConfig.tieBreak } : undefined,
            groups:     p.groupsConfig   ? { numGroups: p.groupsConfig.numGroups, teamsPerGroup: p.groupsConfig.teamsPerGroup, legs: p.groupsConfig.legs, advancePerGroup: p.groupsConfig.advancePerGroup, advanceBestThirds: p.groupsConfig.advanceBestThirds, tiebreakOrder: p.groupsConfig.tiebreakOrder } : undefined,
            swiss:      p.swissConfig    ? { numRounds: p.swissConfig.numRounds, pairingSystem: p.swissConfig.pairingSystem, firstRound: p.swissConfig.firstRound, allowRematch: p.swissConfig.allowRematch, tiebreakOrder: p.swissConfig.tiebreakOrder, directAdvancedCount: p.swissConfig.directAdvancedCount, playoffCount: p.swissConfig.playoffCount } : undefined,
          }));
          this.phases.set(mapped);
          this.activeFormat.set(this.inferFormat(mapped));
          this.headerData.update(d => ({ ...d, phaseCount: mapped.length }));
        });
        // Cargar equipos del campeonato
        this.championshipSvc.getTeams(id).subscribe(profiles => {
          const mapped: TeamItem[] = profiles.map(p => ({
            id:             p.id,
            championshipId: p.championshipId,
            name:           p.name,
            shortname:      p.shortname,
            slug:           p.slug,
            logoUrl:        p.logoUrl,
            documentUrl:    p.documentUrl    ?? null,
            primaryColor:   p.primaryColor   ?? '#1a56db',
            secondaryColor: p.secondaryColor ?? '#e5e7eb',
            location:       p.location       ?? '',
            foundedYear:    (p as any).foundedYear  ?? null,
            homeVenue:      (p as any).homeVenue    ?? '',
            coachName:      p.coachName      ?? '',
            coachPhone:     p.coachPhone     ?? '',
            isActive:       p.isActive,
            players:        (p.players ?? []).map(pl => ({
              id:         pl.id,
              teamId:     pl.teamId,
              positionId: pl.positionId,
              firstName:  pl.firstName,
              lastName:   pl.lastName,
              nickName:   pl.nickName ?? null,
              number:     pl.number,
              birthDate:  pl.birthDate ? String(pl.birthDate) : null,
              height:     pl.height    ?? null,
              weight:     pl.weight    ?? null,
              status:     (pl.status as TeamItem['players'][number]['status']) ?? 'active',
              photoUrl:   (pl as any).photoUrl ?? null,
            })),
          }));
          this.teamsData.set(mapped);
          this.headerData.update(d => ({ ...d, currentTeams: mapped.filter(t => t.isActive).length }));
        });
        this.cdr.markForCheck();
      },
      error: () => {
        this.snackBar.open('Error al cargar el campeonato', 'Cerrar', { duration: 3000 });
        this.router.navigate(['/admin/championships']);
      },
    });
  }

  // ── Helpers ────────────────────────────────────────────────────
  private inferFormat(phases: PhaseCardData[]): ChampionshipFormat | null {
    const types = new Set(phases.map(p => p.phaseType));
    if (types.has(PhaseType.Swiss))                                     return 'swiss_playoff';
    if (types.has(PhaseType.Groups))                                    return 'groups_knockout';
    if (types.has(PhaseType.Knockout) && !types.has(PhaseType.League)) return 'knockout';
    if (types.has(PhaseType.League))                                    return 'league';
    return null;
  }

  private toSlug = (n: string) =>
    n.toLowerCase().normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

  private toIsoDate = (d: Date | string) =>
    (d instanceof Date ? d : new Date(d)).toISOString().split('T')[0];
}