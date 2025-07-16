import { Routes } from '@angular/router';
import { BADGES_ROUTES } from './bonus/badges/badges.routes';
import { SPIN_ROUTES } from './bonus/spin/spin.routes';
import { GIFT_ROUTES } from './gift-gallery/gift.routes';
import { QR_ROUTES } from './qr-code/qr.routes';
import { LEADER_BOARD_ROUTES } from './leader-board/leader-board.routes';
import { REDEEM_ROUTES } from './redeem/redeem.routes';
import { REFERRAL_ROUTES } from './referral-program/referral-program.routes';
import { BONUS_ROUTES } from './bonus/aera-bonus/bonus.routes';
import { STOCK_TRANSFER_ROUTES } from './stock-transfer/stock-transfer.routes';
import { authGuard } from '../../../core/auth/auth.guard';
import { PURCHASE_ROUTES } from './purchase/purhcase.routes';

export const LOYALTY_ROUTES: Routes = [
    {path: 'qr-list', children: QR_ROUTES, canActivate: [authGuard]  },
    {path: 'bonus', children: BONUS_ROUTES, canActivate: [authGuard] },
    {path: 'badges-list', children: BADGES_ROUTES, canActivate: [authGuard]  },
    {path: 'spin-win-list', children: SPIN_ROUTES, canActivate: [authGuard]  },
    {path: 'gift-list', children: GIFT_ROUTES, canActivate: [authGuard]  },
    {path: 'leader-board', children: LEADER_BOARD_ROUTES, canActivate: [authGuard]  },
    {path: 'redeem-list/:type', children: REDEEM_ROUTES, canActivate: [authGuard]  },
    {path: 'referral-program', children: REFERRAL_ROUTES, canActivate: [authGuard]  },
    {path: 'purchase', children: PURCHASE_ROUTES, canActivate: [authGuard]  },
    {path: 'stock-transfer-list/:type', children: STOCK_TRANSFER_ROUTES, canActivate: [authGuard] },
];
