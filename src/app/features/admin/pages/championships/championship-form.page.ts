// ─────────────────────────────────────────────────────────────
// championship-form.page.ts  —  Angular 20 · Standalone · OnPush
// ─────────────────────────────────────────────────────────────

import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef,
  OnInit, computed, effect, inject, signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, forkJoin, lastValueFrom, of, map } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { ChampionshipService } from '../../../../core/services/championship.service';
import { AuthService } from '../../../../core/services/auth.service';
import { SportService } from '../../../../core/services/sport.service';
import {
  Championship,
  CreateChampionshipDto,
  CreateSocialLinkDto,
  UpdateChampionshipDto,
} from '../../../../core/models/championship.model';

import {
  ChampionshipHeaderComponent,
  ChampionshipHeaderData,
  ChampionshipHeaderSocialLink,
  SocialNetworkOption,
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

interface PendingAssetUpload {
  teamIndex: number;
  playerIndex: number | null;
  key: string;
  file: File;
  target: 'logo' | 'player-photo';
}


// ─────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────

@Component({
  selector: 'app-championship-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatToolbarModule,
    MatButtonModule,
    MatDividerModule,
    ChampionshipHeaderComponent,
    ChampionshipPhasesComponent,
    ChampionshipRulesComponent,
    ChampionshipTeamsComponent,
  ],
  template: `
<div class="min-h-screen flex flex-col bg-[var(--mat-sys-surface)]">

  <!-- ══ TOPBAR ══════════════════════════════════════════════ -->
  <mat-toolbar class="sticky top-0 !h-[52px] !px-7 !bg-[var(--mat-sys-surface-container-highest)]
                      border-b border-[var(--mat-sys-outline-variant)] justify-between">

    <a class="inline-flex items-center gap-1.5 text-[13px] font-medium
              text-[var(--mat-sys-on-surface-variant)] no-underline transition-colors
              hover:text-[var(--mat-sys-on-surface)]"
       routerLink="/admin/championships">
      <mat-icon class="!size-[18px] !text-[18px]">arrow_back</mat-icon>
      Campeonatos
    </a>

    <button
      matButton="filled"
      [disabled]="isSaving()"
      (click)="onActionClick()"
    >
      @if (isSaving()) {
        <mat-spinner [diameter]="16" />
      } @else {
        <mat-icon>{{ actionIcon() }}</mat-icon>
      }
      {{ actionLabel() }}
    </button>
  </mat-toolbar>

  <!-- ══ RETRY BANNER ════════════════════════════════════════ -->
  @if (pendingRetryId()) {
    <div class="flex items-center justify-between gap-3 px-5 py-2.5
                bg-[var(--mat-sys-error-container)] border-b border-[var(--mat-sys-error)]">
      <div class="flex items-center gap-2 text-[13px] text-[var(--mat-sys-on-error-container)]">
        <mat-icon class="!size-[18px] !text-[18px] shrink-0">warning</mat-icon>
        El campeonato fue creado, pero algunas secciones no se guardaron.
      </div>
      <div class="flex items-center gap-2 shrink-0">
        <button matButton (click)="runSaveAllSections(pendingRetryId()!)" [disabled]="isSaving()" type="button"
                class="!text-[var(--mat-sys-on-error-container)] !font-semibold">
          <mat-icon class="!size-[16px] !text-[16px]">refresh</mat-icon>
          Reintentar
        </button>
        <a matButton [routerLink]="['/admin/championships', pendingRetryId()]"
           class="!text-[var(--mat-sys-on-error-container)]">
          Ir de todas formas
          <mat-icon class="!size-[16px] !text-[16px]">arrow_forward</mat-icon>
        </a>
      </div>
    </div>
  }

  <!-- ══ HEADER ══════════════════════════════════════════════ -->
  <app-championship-header
    [data]="headerData()"
    [sports]="sports()"
    [socialNetworkOptions]="socialNetworkOptions()"
    [editable]="isEditable()"
    (dataChange)="onHeaderChange($event)"
    (logoSelected)="onLogoFile($event)"
  />

  <mat-divider />

  <!-- ══ NAV TABS ════════════════════════════════════════════ -->
  <mat-tab-group
    class="championship-tabs flex-1 relative z-[1]"
    [selectedIndex]="activeTabIndex()"
    (selectedIndexChange)="onTabChange($event)"
    animationDuration="150ms"
  >
    @for (tab of navTabs(); track tab.id) {
      <mat-tab>
        <ng-template mat-tab-label>
          <mat-icon class="!size-[15px] !text-[15px] mr-1.5">{{ tab.icon }}</mat-icon>
          {{ tab.label }}
          @if (tab.count !== null) {
            <span class="ml-1.5 inline-flex items-center justify-center min-w-[18px] h-[18px] px-1.5
                         rounded-full text-[10px] font-bold
                         bg-[var(--mat-sys-surface-container-high)]
                         text-[var(--mat-sys-on-surface-variant)]">
              {{ tab.count }}
            </span>
          }
        </ng-template>

        @if (tab.id === 'fases') {
          <app-championship-phases
            [championshipId]="championshipId()"
            [initialPhases]="phases()"
            [initialFormat]="activeFormat()"
            (phasesChange)="onPhasesChange($event)"
            (cancel)="onPhasesCancel()"
          />
        }
        @if (tab.id === 'reglas') {
          <app-championship-rules
            [initialRules]="championshipRules()"
            (save)="onRulesSave($event)"
            (cancel)="activeNavTab.set('fases')"
          />
        }
        @if (tab.id === 'equipos') {
          <app-championship-teams
            [championshipId]="championshipId()"
            [maxTeams]="headerData().maxTeams"
            [maxPlayersPerTeam]="headerData().maxPlayersPerTeam"
            [initialTeams]="teamsData()"
            (teamsChange)="onTeamsChange($event)"
            (dirty)="isDirty.set(true)"
          />
        }
      </mat-tab>
    }
  </mat-tab-group>

  @if (pageMode() === 'edit') {
    <p class="m-0 px-7 pb-3 text-xs" style="color: var(--mat-sys-on-surface-variant); opacity: .65;">
      Los cambios en Fases, Reglas y Equipos se guardan desde cada sección.
    </p>
  }

</div>
  `,
})
export default class ChampionshipFormPage implements OnInit {

  // ── Services ──────────────────────────────────────────────────
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private championshipSvc = inject(ChampionshipService);
  private sportSvc = inject(SportService);
  private authService = inject(AuthService);
  private snackBar = inject(MatSnackBar);
  private cdr = inject(ChangeDetectorRef);
  private destroyRef = inject(DestroyRef);

  // ── Page state ─────────────────────────────────────────────────
  pageMode = signal<PageMode>('create');
  isSaving = signal(false);
  isDirty = signal(false);
  activeNavTab = signal('fases');
  championshipId = signal<string | null>(null);
  logoFile: File | null = null;

  // ── Sports (cargados del servicio) ─────────────────────────────
  sports = signal<SportOption[]>([]);
  socialNetworkOptions = signal<SocialNetworkOption[]>([]);

  // ── Header data ────────────────────────────────────────────────
  headerData = signal<ChampionshipHeaderData>({
    name: '', description: '', sportId: 1, season: '2024-2025',
    location: '', startDate: '', endDate: '',
    registrationStartDate: '', registrationEndDate: '',
    maxTeams: 16, currentTeams: 0, maxPlayersPerTeam: 20, phaseCount: 0,
    status: 'draft', logoUrl: null, socialLinks: [],
  });

  // ── Phase state ─────────────────────────────────────────────────
  phases = signal<PhaseCardData[]>([]);
  activeFormat = signal<ChampionshipFormat | null>(null);

  // ── Rules state ─────────────────────────────────────────────────
  championshipRules = signal<ChampionshipRuleItem[]>([]);

  // ── Retry state (create mode partial failures) ───────────────────
  pendingRetryId = signal<string | null>(null);

  // ── Teams state ──────────────────────────────────────────────────
  teamsData = signal<TeamItem[]>([]);

  // ── Nav tabs (computed — count reacciona a cambios) ─────────────
  navTabs = computed<NavTab[]>(() => [
    { id: 'fases', label: 'Fases', icon: 'layers', count: this.phases().length || null },
    { id: 'reglas', label: 'Reglas', icon: 'gavel', count: null },
    { id: 'equipos', label: 'Equipos', icon: 'group', count: this.headerData().currentTeams || null },
  ]);

  activeTabIndex = computed(() => {
    const idx = this.navTabs().findIndex(t => t.id === this.activeNavTab());
    return idx >= 0 ? idx : 0;
  });

  onTabChange(index: number): void {
    const tab = this.navTabs()[index];
    if (tab) this.activeNavTab.set(tab.id);
  }

  // ── Computed ───────────────────────────────────────────────────
  isEditable = computed(() => this.pageMode() !== 'view');

  actionLabel = computed(() => {
    if (this.isSaving()) return this.pageMode() === 'create' ? 'Creando...' : 'Guardando...';
    if (this.pageMode() === 'create') return 'Crear Campeonato';
    if (this.pageMode() === 'edit') return 'Guardar Info General';
    return 'Editar';
  });

  actionIcon = computed(() =>
    this.pageMode() === 'view' ? 'edit' : this.pageMode() === 'create' ? 'add_circle' : 'save'
  );

  // ── Constructor — persist active tab in sessionStorage ─────────
  constructor() {
    effect(() => {
      const id = this.championshipId() ?? 'new';
      sessionStorage.setItem(`championship_tab_${id}`, this.activeNavTab());
    });
  }

  // ── Lifecycle ──────────────────────────────────────────────────
  ngOnInit(): void {
    // Cargar deportes del servicio (mapeados al formato del header)
    this.sportSvc.getAll().pipe(takeUntilDestroyed(this.destroyRef)).subscribe(list => {
      this.sports.set(list.map(s => ({ id: Number(s.id), label: s.name, icon: s.icon })));
      this.cdr.markForCheck();
    });

    this.championshipSvc.loadSocialNetworks();

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
          this.loadDefaultRules(Number(this.headerData().sportId));
        }
        // Restaurar el tab activo desde sessionStorage (sobrevive a cualquier re-init)
        const savedTab = sessionStorage.getItem(`championship_tab_${id ?? 'new'}`);
        if (savedTab) this.activeNavTab.set(savedTab);
      });
  }

  // ── Header ─────────────────────────────────────────────────────
  onHeaderChange(patch: Partial<ChampionshipHeaderData>): void {
    const prevSportId = this.headerData().sportId;
    this.headerData.update(d => ({ ...d, ...patch }));
    this.isDirty.set(true);
    if (patch.sportId !== undefined && patch.sportId !== prevSportId) {
      this.loadDefaultRules(patch.sportId);
    }
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
  onTeamsChange(teams: TeamItem[]): void {
    this.teamsData.set(teams);
    this.headerData.update(d => ({ ...d, currentTeams: teams.filter(t => t.isActive).length }));
    this.isDirty.set(true);
  }

  // ── Action button ──────────────────────────────────────────────
  onActionClick(): void {
    if (this.pageMode() === 'view') { this.pageMode.set('edit'); return; }
    this.save();
  }

  private buildChampionshipLogoFormData(): FormData {
    const fd = new FormData();
    if (this.logoFile) {
      fd.append('logo', this.logoFile, this.logoFile.name);
    }
    return fd;
  }

  private logChampionshipLogoFormData(fd: FormData): void {
    const fields: Array<{ key: string; name: string; type: string; size: number }> = [];
    fd.forEach((value, key) => {
      if (value instanceof File) {
        fields.push({ key, name: value.name, type: value.type, size: value.size });
      }
    });
    console.log('Championship logo FormData (mock):', fields);
  }

  private save(): void {
    const hd = this.headerData();
    if (!hd.name.trim()) {
      this.snackBar.open('El nombre del campeonato es requerido', 'Cerrar', { duration: 3000 });
      return;
    }
    const user = this.authService.currentUser();
    console.log('DEBUG USER:', user);
    if (!user?.organizationId) {
      this.snackBar.open('Organización no disponible', 'Cerrar', { duration: 3000 });
      return;
    }

    const logoFormData = this.buildChampionshipLogoFormData();
    this.logChampionshipLogoFormData(logoFormData);

    this.isSaving.set(true);

    if (this.pageMode() === 'edit' && this.championshipId()) {
      const dto: UpdateChampionshipDto = {
        name: hd.name,
        slug: this.toSlug(hd.name),
        description: hd.description || undefined,
        season: hd.season,
        startDate: hd.startDate ? new Date(hd.startDate) : undefined,
        endDate: hd.endDate ? new Date(hd.endDate) : undefined,
        registrationStartDate: hd.registrationStartDate ? new Date(hd.registrationStartDate) : null,
        registrationEndDate: hd.registrationEndDate ? new Date(hd.registrationEndDate) : null,
        maxTeams: hd.maxTeams,
        maxPlayersPerTeam: hd.maxPlayersPerTeam,
      };
      this.championshipSvc.update(this.championshipId()!, dto).subscribe({
        next: () => {
          const id = this.championshipId()!;
          this.saveAllSections(id, 'edit').subscribe({
            next: () => {
              this.isDirty.set(false);
              this.snackBar.open('Campeonato actualizado', 'Cerrar', { duration: 3000 });
              this.pageMode.set('view');
              this.isSaving.set(false);
            },
            error: () => {
              this.isDirty.set(false);
              this.snackBar.open(
                'Campeonato actualizado. Algunas secciones no pudieron guardarse.',
                'Cerrar',
                { duration: 4000 },
              );
              this.pageMode.set('view');
              this.isSaving.set(false);
            },
          });
        },
        error: () => {
          this.snackBar.open('Error al actualizar', 'Cerrar', { duration: 3000 });
          this.isSaving.set(false);
        },
      });
    } else {
      const dto: CreateChampionshipDto = {
        organizationId: user.organizationId,
        sportId: hd.sportId,
        name: hd.name,
        slug: this.toSlug(hd.name),
        season: hd.season || String(new Date().getFullYear()),
        description: hd.description || undefined,
        startDate: hd.startDate ? new Date(hd.startDate) : undefined,
        endDate: hd.endDate ? new Date(hd.endDate) : undefined,
        registrationStartDate: hd.registrationStartDate ? new Date(hd.registrationStartDate) : undefined,
        registrationEndDate: hd.registrationEndDate ? new Date(hd.registrationEndDate) : undefined,
        maxTeams: hd.maxTeams,
        maxPlayersPerTeam: hd.maxPlayersPerTeam,
      };
      this.championshipSvc.create(dto).subscribe({
        next: (c: any) => {
          const newId = String(c.id);
          this.runSaveAllSections(newId);
        },
        error: () => {
          this.snackBar.open('Error al crear', 'Cerrar', { duration: 3000 });
          this.isSaving.set(false);
        },
      });
    }
  }

  runSaveAllSections(id: string): void {
    this.isSaving.set(true);
    this.uploadPendingTeamAssets(id)
      .then(() => lastValueFrom(this.saveAllSections(id)))
      .then(() => {
        this.pendingRetryId.set(null);
        this.isDirty.set(false);
        this.isSaving.set(false);
        this.snackBar.open('Campeonato creado', 'Cerrar', { duration: 3000 });
        this.router.navigate(['/admin/championships', id]);
      })
      .catch((error: unknown) => {
        this.isSaving.set(false);
        this.pendingRetryId.set(id);
        this.snackBar.open('Error al subir archivos o guardar secciones. Puedes reintentar.', 'Cerrar', { duration: 4000 });
      });
  }

  private async uploadPendingTeamAssets(championshipId: string): Promise<void> {
    const teams = this.teamsData();
    if (teams.length === 0) return;

    const uploads = await this.collectPendingTeamAssetUploads(championshipId, teams);
    if (uploads.length === 0) return;

    const signedByKey = await lastValueFrom(
      this.championshipSvc.requestSignedUploadUrls(
        uploads.map((upload) => ({
          key: upload.key,
          mimeType: upload.file.type || 'application/octet-stream',
        }))
      ),
    );

    const missingKeys = uploads
      .map((upload) => upload.key)
      .filter((key) => !signedByKey[key]);

    if (missingKeys.length > 0) {
      throw new Error(`Missing signed urls for ${missingKeys.length} file(s)`);
    }

    await lastValueFrom(
      forkJoin(
        uploads.map((upload) =>
          this.championshipSvc.uploadFileToSignedUrl(signedByKey[upload.key], upload.file),
        ),
      ),
    );

    const nextTeams = teams.map((team) => ({
      ...team,
      players: team.players.map((player) => ({ ...player })),
    }));

    for (const upload of uploads) {
      const targetTeam = nextTeams[upload.teamIndex];
      if (!targetTeam) continue;

      if (upload.target === 'logo') {
        targetTeam.logoUrl = upload.key;
        continue;
      }

      if (upload.playerIndex === null) continue;
      const targetPlayer = targetTeam.players[upload.playerIndex];
      if (!targetPlayer) continue;
      targetPlayer.photoUrl = upload.key;
    }

    this.teamsData.set(nextTeams);
  }

  private async collectPendingTeamAssetUploads(
    championshipId: string,
    teams: TeamItem[],
  ): Promise<PendingAssetUpload[]> {
    const uploads: PendingAssetUpload[] = [];
    const usedKeys = new Set<string>();

    for (let teamIndex = 0; teamIndex < teams.length; teamIndex++) {
      const team = teams[teamIndex];
      const teamAny = team as TeamItem & { logoFile?: File };
      const teamSegment = this.sanitizePathSegment(team.slug || this.toSlug(team.name) || `team-${teamIndex + 1}`);

      const logoFile = await this.resolveFileFromAssetSource(
        teamAny.logoFile,
        team.logoUrl,
        `${teamSegment}-logo`,
      );
      if (logoFile) {
        const key = this.buildUniqueUploadKey(
          championshipId,
          teamSegment,
          this.sanitizeFileName(logoFile.name),
          usedKeys,
        );
        uploads.push({
          teamIndex,
          playerIndex: null,
          key,
          file: logoFile,
          target: 'logo',
        });
      }

      for (let playerIndex = 0; playerIndex < team.players.length; playerIndex++) {
        const player = team.players[playerIndex] as typeof team.players[number] & { photoFile?: File };
        const playerName = `${player.firstName || 'player'}_${player.lastName || playerIndex + 1}`;
        const playerFile = await this.resolveFileFromAssetSource(
          player.photoFile,
          player.photoUrl ?? null,
          this.sanitizePathSegment(playerName),
        );

        if (!playerFile) continue;

        const key = this.buildUniqueUploadKey(
          championshipId,
          teamSegment,
          this.sanitizeFileName(playerFile.name),
          usedKeys,
        );
        uploads.push({
          teamIndex,
          playerIndex,
          key,
          file: playerFile,
          target: 'player-photo',
        });
      }
    }

    return uploads;
  }

  private async resolveFileFromAssetSource(
    explicitFile: File | undefined,
    currentUrl: string | null | undefined,
    fallbackBaseName: string,
  ): Promise<File | null> {
    if (explicitFile) return explicitFile;
    if (!currentUrl || !currentUrl.startsWith('blob:')) return null;

    const response = await fetch(currentUrl);
    if (!response.ok) {
      throw new Error(`Unable to resolve blob url: ${currentUrl}`);
    }

    const blob = await response.blob();
    const extension = this.mimeToExtension(blob.type);
    const fileName = `${fallbackBaseName}${extension}`;
    return new File([blob], fileName, {
      type: blob.type || 'application/octet-stream',
      lastModified: Date.now(),
    });
  }

  private buildUniqueUploadKey(
    championshipId: string,
    teamSegment: string,
    fileName: string,
    usedKeys: Set<string>,
  ): string {
    const championshipSegment = this.sanitizePathSegment(championshipId);
    const safeFileName = this.sanitizeFileName(fileName);
    const baseKey = `${championshipSegment}/${teamSegment}/${safeFileName}`;

    if (!usedKeys.has(baseKey)) {
      usedKeys.add(baseKey);
      return baseKey;
    }

    const dot = safeFileName.lastIndexOf('.');
    const name = dot >= 0 ? safeFileName.slice(0, dot) : safeFileName;
    const ext = dot >= 0 ? safeFileName.slice(dot) : '';

    let counter = 2;
    while (true) {
      const candidate = `${championshipSegment}/${teamSegment}/${name}-${counter}${ext}`;
      if (!usedKeys.has(candidate)) {
        usedKeys.add(candidate);
        return candidate;
      }
      counter += 1;
    }
  }

  private sanitizePathSegment(value: string): string {
    return value
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-zA-Z0-9._-]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .toLowerCase() || 'asset';
  }

  private sanitizeFileName(fileName: string): string {
    const trimmed = fileName.trim();
    if (!trimmed) return `file-${Date.now()}`;

    const normalized = trimmed
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[\\/]+/g, '-')
      .replace(/\s+/g, '_')
      .replace(/[^a-zA-Z0-9._-]+/g, '-');

    return normalized || `file-${Date.now()}`;
  }

  private mimeToExtension(mimeType: string): string {
    const map: Record<string, string> = {
      'image/jpeg': '.jpg',
      'image/jpg': '.jpg',
      'image/png': '.png',
      'image/webp': '.webp',
      'image/gif': '.gif',
      'image/svg+xml': '.svg',
      'application/pdf': '.pdf',
    };
    return map[mimeType] ?? '';
  }

  private saveAllSections(id: string, mode: 'create' | 'edit' = 'create'): Observable<void> {
    const saves: Observable<unknown>[] = [];

    // Fases y equipos solo en create — en edit cada componente los gestiona directo
    if (mode === 'create') {
      const phases = this.phases();
      if (phases.length > 0) {
        const dtos = phases.map(p => ({
          name: p.name,
          phaseType: p.phaseType,
          phaseOrder: p.phaseOrder,
          status: p.status,
          swissConfig: p.swiss,
        }));
        saves.push(this.championshipSvc.savePhases(id, dtos));
      }

      if (this.teamsData().length > 0) {
        const dtos = this.teamsData().map(t => ({
          name: t.name,
          shortname: t.shortname,
          slug: t.slug,
          logoUrl: t.logoUrl ?? undefined,
          documentUrl: t.documentUrl ?? undefined,
          primaryColor: t.primaryColor ?? undefined,
          secondaryColor: t.secondaryColor ?? undefined,
          location: t.location ?? undefined,
          foundedYear: t.foundedYear ?? undefined,
          homeVenue: t.homeVenue || undefined,
          coachName: t.coachName ?? undefined,
          coachPhone: t.coachPhone ?? undefined,
          players: t.players,
        }));
        saves.push(
          this.championshipSvc.saveTeams(id, dtos).pipe(
            catchError((err: Error) => {
              const msg = err?.message ?? '';
              const isDuplicate = msg.toLowerCase().includes('exist') || msg.includes('409') || msg.includes('duplicate');
              this.snackBar.open(
                isDuplicate
                  ? 'Uno o más equipos ya existen en el sistema y no pudieron guardarse.'
                  : 'Error al guardar los equipos.',
                'Cerrar',
                { duration: 5000 },
              );
              return of([]);
            }),
          ),
        );
      }
    }

    const overriddenRules = this.championshipRules().filter(r => r.isOverridden);
    if (overriddenRules.length > 0) {
      const dtos = overriddenRules.map(r => ({
        matchRuleId: r.matchRuleId,
        sportId: this.headerData().sportId,
        value: r.currentValue,
      }));
      saves.push(
        this.championshipSvc.updateRules(id, dtos).pipe(
          catchError(() => of(null)),
        ),
      );
    }

    const socialDtos = this.toSocialLinkDtos(this.headerData().socialLinks);
    saves.push(this.championshipSvc.replaceSocialLinks(id, socialDtos));

    return saves.length > 0
      ? forkJoin(saves).pipe(map(() => void 0))
      : of(void 0);
  }

  private loadDefaultRules(sportId: number): void {
    this.championshipSvc.getDefaultRules(sportId).subscribe({
      next: (response) => {
        this.championshipRules.set(response.rules.map((rule) => this.toRuleItem(rule)));
        this.cdr.markForCheck();
      },
      error: () => {
        this.championshipRules.set([]);
        this.snackBar.open('No se pudieron cargar las reglas del deporte', 'Cerrar', { duration: 3000 });
        this.cdr.markForCheck();
      },
    });
  }

  private loadChampionship(id: string): void {
    forkJoin({
      detail: this.championshipSvc.getChampionshipById(id),
      phases: this.championshipSvc.getPhases(id),
      localSocialLinks: this.championshipSvc.getSocialLinks(id),
      socialNetworks: this.championshipSvc.getSocialNetworks(),
      rules: this.championshipSvc.getRules(id),
    }).subscribe({
      next: ({ detail: c, phases, localSocialLinks, socialNetworks, rules }) => {
        const socialLinks = localSocialLinks.map(ls => {
          const sn = socialNetworks.find(n => String(n.id) === String(ls.socialNetworkId));
          return {
            id: Number(ls.id),
            socialNetworkId: Number(ls.socialNetworkId),
            link: ls.link,
            name: sn?.name,
            icon: sn?.icon,
          };
        });

        this.socialNetworkOptions.set(
          socialNetworks.map(sn => ({ id: Number(sn.id), name: sn.name, icon: sn.icon }))
        );

        this.headerData.set({
          name: c.name,
          description: c.description ?? '',
          sportId: Number(c.sportId),
          season: c.season,
          location: '',
          startDate: c.startDate ? this.toIsoDate(c.startDate) : '',
          endDate: c.endDate ? this.toIsoDate(c.endDate) : '',
          registrationStartDate: c.registrationStartDate ? this.toIsoDate(c.registrationStartDate) : '',
          registrationEndDate: c.registrationEndDate ? this.toIsoDate(c.registrationEndDate) : '',
          maxTeams: c.maxTeams,
          currentTeams: 0,
          maxPlayersPerTeam: c.maxPlayersPerTeam ?? 20,
          phaseCount: this.phases().length,
          status: (c.status as any) ?? 'active',
          logoUrl: c.logo ?? null,
          socialLinks,
        });

        this.championshipRules.set(rules.rules.map((rule) => this.toRuleItem(rule)));
        // Fases: endpoint dedicado /championships/:id/phases.
        const phasesFromDetail = phases;
        {
          const mapped: PhaseCardData[] = phasesFromDetail.map(p => ({
            id: Number(p.id),
            backendId: Number(p.id),
            name: p.name,
            phaseType: p.phaseType,
            phaseOrder: p.phaseOrder,
            status: p.status,
            league: p.leagueConfig
              ? {
                winsPoints: 3,
                drawPoints: 1,
                lossPoints: 0,
                totalRounds: 10,
                legs: p.leagueConfig.legs,
                advanceCount: p.leagueConfig.advanceCount,
                tiebreakOrder: 'points,goal_difference,goals_for,h2h,fair_play,draw',
              }
              : p.phaseType === PhaseType.League
                ? {
                  winsPoints: 3,
                  drawPoints: 1,
                  lossPoints: 0,
                  totalRounds: 10,
                  legs: 1,
                  advanceCount: 4,
                  tiebreakOrder: 'points,goal_difference,goals_for,h2h,fair_play,draw',
                }
                : undefined,
            knockout: p.knockoutConfig
              ? {
                legs: p.knockoutConfig.legs,
                bracketSize: 8,
                thirdPlaceMatch: p.knockoutConfig.thirdPlaceMatch,
                seeding: p.knockoutConfig.seeding,
                awayGoalsRule: p.knockoutConfig.awayGoalsRule,
                tieBreak: p.knockoutConfig.tieBreak,
              }
              : p.phaseType === PhaseType.Knockout
                ? {
                  legs: 1,
                  bracketSize: 8,
                  thirdPlaceMatch: false,
                  seeding: 'ranking',
                  awayGoalsRule: false,
                  tieBreak: 'penalties',
                }
                : undefined,
            groups: p.groupsConfig
              ? {
                numGroups: p.groupsConfig.numGroups,
                teamsPerGroup: p.groupsConfig.teamsPerGroup,
                legs: p.groupsConfig.legs,
                advancePerGroup: p.groupsConfig.advancePerGroup,
                advanceBestThirds: p.groupsConfig.advanceBestThirds,
                tiebreakOrder: p.groupsConfig.tiebreakOrder,
              }
              : p.phaseType === PhaseType.Groups
                ? {
                  numGroups: 4,
                  teamsPerGroup: 4,
                  legs: 1,
                  advancePerGroup: 2,
                  advanceBestThirds: 0,
                  tiebreakOrder: 'points,diff,gf,h2h,random',
                }
                : undefined,
            swiss: p.swissConfig
              ? {
                numRounds: p.swissConfig.numRounds,
                pairingSystem: p.swissConfig.pairingSystem,
                firstRound: p.swissConfig.firstRound,
                allowRematch: p.swissConfig.allowRematch,
                tiebreakOrder: p.swissConfig.tiebreakOrder,
                directAdvancedCount: p.swissConfig.directAdvancedCount,
                playoffCount: p.swissConfig.playoffCount,
              }
              : p.phaseType === PhaseType.Swiss
                ? {
                  numRounds: 7,
                  pairingSystem: 'random',
                  firstRound: 'random',
                  allowRematch: false,
                  tiebreakOrder: 'points,goal_difference,goals_for,h2h,fair_play,draw',
                  directAdvancedCount: 2,
                  playoffCount: 4,
                }
                : undefined,
          }));
          this.phases.set(mapped);
          this.activeFormat.set(this.inferFormat(mapped));
          this.headerData.update(d => ({ ...d, phaseCount: mapped.length }));
        }
        // Cargar equipos del campeonato
        this.championshipSvc.getTeams(id).subscribe(profiles => {
          console.log('Teams loaded from backend:', profiles);
          const mapped: TeamItem[] = profiles.map((p) => ({
            id: p.id,
            championshipId: p.championshipId,
            name: p.name,
            shortname: p.shortname,
            slug: p.slug,
            logoUrl: p.logoUrl,
            documentUrl: p.documentUrl ?? null,
            primaryColor: p.primaryColor ?? '#1a56db',
            secondaryColor: p.secondaryColor ?? '#e5e7eb',
            location: p.location ?? '',
            foundedYear: p.foundedYear ?? null,
            homeVenue: p.homeVenue ?? '',
            coachName: p.coachName ?? '',
            coachPhone: p.coachPhone ?? '',
            isActive: p.isActive,
            players: (p.players ?? []).map((pl) => ({
              id: pl.id,
              teamId: pl.teamId,
              positionId: pl.positionId,
              firstName: pl.firstName,
              lastName: pl.lastName,
              nickName: pl.nickName ?? null,
              number: pl.number,
              birthDate: pl.birthDate,
              height: pl.height ?? null,
              weight: pl.weight ?? null,
              status: (pl.status as TeamItem['players'][number]['status']) ?? 'active',
              photoUrl: pl.photoUrl ?? null,
              suspensionEndDate: pl.suspensionEndDate ?? null,
              suspensionReason: pl.suspensionReason ?? null,
              isActive: pl.isActive ?? true,
              createdAt: pl.createdAt ?? new Date(),
              updatedAt: pl.updatedAt ?? new Date(),
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
    if (types.has(PhaseType.Swiss)) return 'swiss_playoff';
    if (types.has(PhaseType.Groups)) return 'groups_knockout';
    if (types.has(PhaseType.Knockout) && !types.has(PhaseType.League)) return 'knockout';
    if (types.has(PhaseType.League)) return 'league';
    return null;
  }

  private toSlug = (n: string) =>
    n.toLowerCase().normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

  private toIsoDate = (d: Date | string) =>
    (d instanceof Date ? d : new Date(d)).toISOString().split('T')[0];

  private toSocialLinkDtos(links: ChampionshipHeaderSocialLink[]): CreateSocialLinkDto[] {
    const mapByNetwork = new Map<number, CreateSocialLinkDto>();
    for (const item of links) {
      const url = item.link.trim();
      if (!this.isHttpsUrl(url)) continue;
      const socialNetworkId = Number(item.socialNetworkId);
      if (!mapByNetwork.has(socialNetworkId)) {
        mapByNetwork.set(socialNetworkId, { socialNetworkId, link: url });
      }
    }
    return Array.from(mapByNetwork.values());
  }

  private toRuleItem(rule: {
    matchRuleId: number | string;
    name: string;
    defaultValue: number;
    currentValue: number;
    isOverridden: boolean;
  }): ChampionshipRuleItem {
    const isBoolean = this.isBooleanRule(rule.name);
    const label = this.humanizeRuleName(rule.name);
    return {
      matchRuleId: Number(rule.matchRuleId),
      name: rule.name,
      label,
      description: `Configuracion para ${label.toLowerCase()}.`,
      category: this.getRuleCategory(rule.name),
      categoryLabel: this.getRuleCategoryLabel(rule.name),
      valueType: isBoolean ? 'boolean' : 'number',
      defaultValue: Number(rule.defaultValue),
      currentValue: Number(rule.currentValue),
      isOverridden: Boolean(rule.isOverridden),
      min: isBoolean ? undefined : 0,
      max: isBoolean ? undefined : 999,
    };
  }

  private humanizeRuleName(name: string): string {
    return name
      .replace(/_/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase());
  }

  private isBooleanRule(name: string): boolean {
    return name.startsWith('allow_') || name.startsWith('enable_') || name.includes('penalty') || name.includes('extra_time');
  }

  private getRuleCategory(name: string): string {
    if (name.includes('player') || name.includes('substitution')) return 'players';
    if (name.includes('card') || name.includes('match') || name.includes('duration')) return 'match';
    return 'additional';
  }

  private getRuleCategoryLabel(name: string): string {
    const category = this.getRuleCategory(name);
    if (category === 'players') return 'Jugadores';
    if (category === 'match') return 'Partido';
    return 'Opciones Adicionales';
  }

  private isHttpsUrl(value: string): boolean {
    try {
      const url = new URL(value);
      return url.protocol === 'https:';
    } catch {
      return false;
    }
  }
}