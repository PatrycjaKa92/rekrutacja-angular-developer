import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./invoice/invoice.component').then((m) => m.InvoiceComponent),
  },
  {
    path: 'invoice-preview',
    loadComponent: () =>
      import('./invoice-preview/invoice-preview.component').then((m) => m.InvoicePreviewComponent),
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
