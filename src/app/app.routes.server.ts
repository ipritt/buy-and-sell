import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'listings',
    renderMode: RenderMode.Client
  },
  {
    path: 'my-listings',
    renderMode: RenderMode.Client
  },
  {
    path: 'listings/:id',
    renderMode: RenderMode.Server
  },
  {
    path: 'contact/:id',
    renderMode: RenderMode.Server
  },
  {
    path: 'edit-listing/:id',
    renderMode: RenderMode.Server
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
