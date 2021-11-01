import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PoolingModule } from './pooling/pooling.module';
import { StateService } from './state.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdvancedSearchControlModule } from './advanced-search-control/advanced-search-control.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { environment } from 'src/environments/environment';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { AkitaNgEffectsModule } from '@datorama/akita-ng-effects';
import { OrderItemEffects } from './order-entry/order-items/state/order-items.effects';

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [
    environment.production ? [] : AkitaNgDevtools.forRoot(),
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    PoolingModule.forRoot(),
    BrowserAnimationsModule,
    AdvancedSearchControlModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    AkitaNgEffectsModule.forRoot([OrderItemEffects]),
  ],
  bootstrap: [AppComponent],
  exports: [HomeComponent],
  providers: [StateService],
})
export class AppModule {}
