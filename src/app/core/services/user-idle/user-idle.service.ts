import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject, fromEvent, merge, timer } from 'rxjs';
import { mapTo, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserIdleService {
  private idle$ = new BehaviorSubject<boolean>(false);
  private idleTimeout = 30 * 60 * 1000; // 30 minutes

  constructor(private zone: NgZone) {
    this.startWatching();
  }

  get isIdle$() {
    return this.idle$.asObservable();
  }

  private startWatching(): void {
    this.zone.runOutsideAngular(() => {
      const activityEvents$ = merge(
        fromEvent(window, 'mousemove'),
        fromEvent(window, 'mousedown'),
        fromEvent(window, 'keypress'),
        fromEvent(window, 'touchstart'),
        fromEvent(window, 'scroll')
      );

      const idleTimeout$ = activityEvents$.pipe(
        switchMap(() => timer(this.idleTimeout)),
        mapTo(true)
      );

      const activityReset$ = activityEvents$.pipe(mapTo(false));

      merge(idleTimeout$, activityReset$).subscribe((isIdle) => {
        this.zone.run(() => this.idle$.next(isIdle));
      });
    });
  }
}
