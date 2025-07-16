import { Routes } from '@angular/router';
import { authGuard } from '../../../../core/auth/auth.guard';

export const PRODUCT_ROUTES: Routes = [
  { path: '', loadComponent: () => import('./product-list/product-list.component').then(m => m.ProductListComponent), title: 'Products List', canActivate: [authGuard] },
  { path: 'add-product', loadComponent: () => import('./add-product/add-product.component').then(m => m.AddProductComponent), title: 'Add Product',   canActivate: [authGuard]
 },
  { path: 'product-details/:id', loadComponent: () => import('./product-details/product-details.component').then(m => m.ProductDetailsComponent), title: 'Product Details',   canActivate: [authGuard]
 },
  { path: 'product-details/:id/:edit', loadComponent: () => import('./add-product/add-product.component').then(m => m.AddProductComponent), title: 'Product Edit',   canActivate: [authGuard]
 },
];
