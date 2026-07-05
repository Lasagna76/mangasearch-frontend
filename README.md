MangaSearch — Frontend

Interfaccia utente per la ricerca e scoperta di manga completati,
sviluppata come progetto portfolio.

Tecnlogie utilizzate

 Angular 21 : Framework frontend 
 Angular Material M3 : UI Component library 
 RxJS : Gestione reactive degli stream 
 TypeScript : Linguaggio principale 
 SCSS : Styling con Angular Material mixins 

Funzionalità principali

 Home page con gli ultimi manga aggiornati
 Ricerca avanzata con:
  - Selezione generi inclusi/esclusi (chip dialog tri-state)
  - Filtri per rating, anno di pubblicazione, lingua originale
  - Ordinamento dinamico (ASC/DESC)
  - Paginazione
  - Card manga con cover, rating, generi e link a MangaDex
  - Design responsive con CSS Grid auto-fill e container queries
  - Report dialog per segnalazione errori

Deployment

- Frontend: Netlify (free tier)
- Backend: [mangasearch-backend](https://github.com/Lasagna76/mangasearch-backend)

Demo live

 [mangasearch.netlify.app](https://mangasearch.netlify.app)

 Cold start: il backend gira su Google Cloud Run free tier.
 La prima richiesta dopo inattività può richiedere 10-20 secondi.

Struttura del progetto

```
src/
├── app/
│   ├── components/      Componenti standalone Angular
│   ├── services/        HTTP services
│   ├── models/          Interfacce TypeScript
├── environments/
│   └── environment.ts   Configurazione locale
└── assets/
```
