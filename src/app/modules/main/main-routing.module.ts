import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusinessListComponent } from './business-list/business-list.component';
import { BusinessDetailComponent } from './business-detail/business-detail.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'business',
    pathMatch: 'full'
  },
  {
    path: 'business',
    component: BusinessListComponent
  },
  {
    path: 'business-detail/:id',
    component: BusinessDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }


