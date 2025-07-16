import { Routes } from '@angular/router';
import { CONTENT_MASTER_ROUTES } from './content-master/content-master.routes';
import { PRODUCT_ROUTES } from './product/product.routes';
import { HOLIDAY_ROUTES } from './holiday-master/holiday.routes';
import { LEAVE_MASTER_ROUTES } from './leave-master/leave-master.routes';
import { USER_ROUTES } from './user/user.routes';
import { POINT_CATEGORY_ROUTES } from './point-category/point-category.routes';
import { ROLE_ROUTES } from './role-and-permission/role.routes';
import { LOCATION_ROUTES } from './location-master/location.routes';
import { EXPESNES_POLICY_ROUTES } from './expense-policy/exepense-policy.routes';
import { DISCOUNT_ROUTES } from './discount-master/discount-master.routes';
import { authGuard } from '../../../core/auth/auth.guard';
export const MASTER_ROUTES: Routes = [
  { path: 'content-master/media', children: CONTENT_MASTER_ROUTES , canActivate: [authGuard]  },
  { path: 'products-list', children: PRODUCT_ROUTES , canActivate: [authGuard]  },
  { path: 'holiday/holiday-list', children: HOLIDAY_ROUTES , canActivate: [authGuard]  },
  { path: 'leave/leave-list', children: LEAVE_MASTER_ROUTES, canActivate: [authGuard] },
  { path: 'user/user-list', children: USER_ROUTES, canActivate: [authGuard] },
  { path: 'points-category-list', children: POINT_CATEGORY_ROUTES, canActivate: [authGuard] },
  { path: 'role-and-permission-list', children: ROLE_ROUTES, canActivate: [authGuard] },
  { path: 'location-master', children: LOCATION_ROUTES, canActivate: [authGuard] },
  { path: 'expense-policy-list', children: EXPESNES_POLICY_ROUTES, canActivate: [authGuard] },
  { path: 'discount-master', children: DISCOUNT_ROUTES, canActivate: [authGuard] },
];
