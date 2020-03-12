import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { BusinessListComponent } from './business-list/business-list.component';
import { BusinessDetailComponent } from './business-detail/business-detail.component';
import { BusinessService } from './shared/business.service';
import { MainRoutingModule } from './main-routing.module';
import { SharedModule } from '../shared/shared.module';
import { RatingComponent } from './shared/rating/rating.component';
import { ReviewComponent } from './business-detail/review/review.component';

@NgModule({
  declarations: [
    BusinessListComponent,
    BusinessDetailComponent,
    RatingComponent,
    ReviewComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MainRoutingModule,
    SharedModule
  ],
  providers: [
    BusinessService
  ]
})
export class MainModule {
}

