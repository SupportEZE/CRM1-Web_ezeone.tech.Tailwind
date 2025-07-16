import { Routes } from '@angular/router';
import { ATTENDANCE_ROUTES } from './attendance/attendance.routes';
// import { ENQUIRY_ROUTES } from './enquiry/enquiry.routes';
import { EXPENSE_ROUTES } from './expense/expense.routes';
import { LEAVE_ROUTES } from './leave/leave.routes';
import { FOLLOWUP_ROUTES } from './followup/followup.routes';
import { BEAT_ROUTES } from './beat-plan/beat.routes';
import { CHECKIN_ROUTES } from './checkin/checkin.routes';
import { ANNOUNCEMENT_ROUTES } from './announcement/announcement.routes';
import { TARGET_ROUTES } from './target/target.routes';
import { SITE_ROUTES } from './site/site.routes';
import { QUOTATION_ROUTES } from './quotation/quotation.routes';
import { STOCK_AUDIT_ROUTES } from './stock/stock-audit/stock-audit.routes';
import { PAYMENT_COLLECTION_ROUTES } from './payment-collection/payment-collection.routes';
import { EVENT_PLAN_ROUTES } from './event-plan/event-plan.routes';
import { BRANDING_ROUTES } from './branding/branding.routes';
import { ACCOUNTS_ROUTES } from './accounts/accounts.routes';
import { POP_GIFT_ROUTES } from './pop-gift/pop-gift.routes';
import { SCHEME_ROUTES } from './scheme/scheme.routes';
import { authGuard } from '../../../core/auth/auth.guard';
import {ENQUIRY_ROUTES} from './enquiry/enquiry.routes';
// import { getEnquiryRoutes } from './enquiry/enquiry.routes';

export const SFA_ROUTES: Routes = [
    { path: 'attendance-list', children: ATTENDANCE_ROUTES, canActivate: [authGuard] },
    { path: 'enquiry-list', children: ENQUIRY_ROUTES, canActivate: [authGuard] },
    { path: 'expense-list', children: EXPENSE_ROUTES, canActivate: [authGuard] },
    { path: 'leave-list', children: LEAVE_ROUTES, canActivate: [authGuard] },
    { path: 'follow-up-list', children: FOLLOWUP_ROUTES, canActivate: [authGuard] },
    { path: 'beat-list', children: BEAT_ROUTES, canActivate: [authGuard] },    
    { path: 'checkin-list', children: CHECKIN_ROUTES, canActivate: [authGuard] },
    { path: 'announcement', children: ANNOUNCEMENT_ROUTES, canActivate: [authGuard] },
    { path: 'target', children: TARGET_ROUTES, canActivate: [authGuard] },
    { path: 'site', children: SITE_ROUTES, canActivate: [authGuard] },
    { path: 'quotation-list', children: QUOTATION_ROUTES, canActivate: [authGuard] },
    { path: 'stock-audit', children: STOCK_AUDIT_ROUTES, canActivate: [authGuard] },
    { path: 'payment-collection', children: PAYMENT_COLLECTION_ROUTES, canActivate: [authGuard] },
    { path: 'event-plan', children: EVENT_PLAN_ROUTES, canActivate: [authGuard] },
    { path: 'branding', children: BRANDING_ROUTES, canActivate: [authGuard] },
    { path: 'accounts', children: ACCOUNTS_ROUTES, canActivate: [authGuard] },
    { path: 'pop-gift', children: POP_GIFT_ROUTES, canActivate: [authGuard] },
    { path: 'scheme', children: SCHEME_ROUTES, canActivate: [authGuard] },
];
