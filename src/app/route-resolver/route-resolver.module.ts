import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouteResolverHomeComponent } from './route-resolver-home/route-resolver-home.component';
import { RouteResolverRoutingModule } from './route-resolver-routing.module';

@NgModule({
  declarations: [RouteResolverHomeComponent],
  imports: [CommonModule, RouteResolverRoutingModule],
})
export class RouteResolverModule {}
