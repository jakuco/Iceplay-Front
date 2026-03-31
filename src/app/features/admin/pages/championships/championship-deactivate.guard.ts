import { CanDeactivateFn } from '@angular/router';
import ChampionshipFormPage from './championship-form.page';

export const canDeactivateChampionshipForm: CanDeactivateFn<ChampionshipFormPage> = (component) => {
  if (!component.isDirty()) return true;
  return window.confirm(
    '¿Deseas salir sin guardar?\nLos cambios que no hayas guardado se perderán.',
  );
};
