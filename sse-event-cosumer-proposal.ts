// // En el componente:

// export class MatchViewerPage {
//     private matchEventService = inject(MatchEventService);
//     private destroyRef = inject(DestroyRef);
//     matchId = input.required<string>();
//     // Signal que el template lee
//     events = signal<MatchEvent[]>([]);


// constructor() {
//     effect(() => {
//       const id = this.matchId();
//       if (!id) return;
  
//       // 1. Carga históricos
//       // 2. Cuando llegan, ENTONCES abre SSE
//       // 3. Cada evento SSE se AGREGA al array que ya tenemos
  
//       this.matchEventService
//         .getMatchEvents(id)
//         .pipe(
//           // switchMap: cuando el GET responde, abre el stream SSE
//           switchMap((historicos) => {
//             // Guardar los históricos
//             this.events.set(historicos);
  
//             // Ahora abrir SSE; cada evento nuevo lo AGREGAMOS
//             return this.matchEventService
//               .streamSingleEvents(id) // <-- emite UN evento a la vez (sin scan)
//               .pipe(
//                 tap((nuevoEvento) => {
//                   // update() lee el valor actual y agrega el nuevo
//                   this.events.update((prev) => [...prev, nuevoEvento]);
//                 }),
//               );
//           }),
//           takeUntilDestroyed(this.destroyRef),
//         )
//         .subscribe({
//           error: (err) => console.error('Error en stream de eventos', err),
//         });
//     });
//   }
// }