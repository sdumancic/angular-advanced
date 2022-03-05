import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsResolverService } from './products-resolver.service';
import { RouteResolverHomeComponent } from './route-resolver-home/route-resolver-home.component';

const routes: Routes = [
  {
    path: '',
    component: RouteResolverHomeComponent,
    resolve: { products: ProductsResolverService },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RouteResolverRoutingModule {}
