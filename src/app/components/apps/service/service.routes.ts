import { Routes } from '@angular/router';
import { SPARE_PARTS_ROUTES } from './spare-part/spare-parts.routes';
import { WARRANTY_ROUTES } from './warranty-registration/warranty.routes';
import { SERVICE_INVOICE_ROUTES } from './service-invoice/service-invoice.routes';
import { SERVICE_ATTENDANCE_ROUTES } from './service-attendance/service-attendance.routes';
import { SERVICE_CHECKIN_ROUTES } from './service-checkin/service-checkin.routes';
import { COMPLAINT_ROUTES } from './complaint/complaint.routes';
import { authGuard } from '../../../core/auth/auth.guard';

export const SERVICE_ROUTES: Routes = [
    { path: 'spare-part', children: SPARE_PARTS_ROUTES, canActivate: [authGuard]  },
    { path: 'complaint', children: COMPLAINT_ROUTES, canActivate: [authGuard]  },
    { path: 'warranty-registration', children: WARRANTY_ROUTES, canActivate: [authGuard]  },
    { path: 'service-invoice', children: SERVICE_INVOICE_ROUTES, canActivate: [authGuard]  },
    { path: 'service-attendance', children: SERVICE_ATTENDANCE_ROUTES, canActivate: [authGuard]  },
    { path: 'service-checkin', children: SERVICE_CHECKIN_ROUTES, canActivate: [authGuard]  },
];
