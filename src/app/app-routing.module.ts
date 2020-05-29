import { ProductComponent } from './pages/product/product.component';
import { LoginComponent } from './pages/login/login.component';
import { KontaktComponent } from './pages/kontakt/kontakt.component';
import { KategorierComponent } from './pages/kategorier/kategorier.component';
import { ForsideComponent } from './pages/forside/forside.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: 'forside', pathMatch: 'full' },
  { path: 'forside', component: ForsideComponent, pathMatch: 'full' },
  { path: 'kategorier', component: KategorierComponent, pathMatch: 'full' },
  { path: 'kontakt', component: KontaktComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: 'product/:id', component: ProductComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
