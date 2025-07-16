import { Injectable, OnDestroy } from '@angular/core';
import { Subject, BehaviorSubject, fromEvent } from 'rxjs';
import { takeUntil, debounceTime } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
// Menu
export interface Menu {
    headTitle?: string;
    headTitle2?: string;
    path?: string;
    title?: string;
    icon?: string;
    type?: string;
    badgeValue?: string;
    badgeClass?: string;
    badgeText?: string;
    active?: boolean;
    selected?: boolean;
    bookmark?: boolean;
    children?: Menu[];
    children2?: Menu[];
    Menusub?: boolean;
    target?: boolean;
    menutype?:string;
    dirchange?: boolean;
    nochild?: any;
    [key: string]: any;
    
}

@Injectable({
    providedIn: 'root',
})
export class NavService implements OnDestroy {
    modules:any =[];
    MENUITEMS: Menu[] = []
    public items: BehaviorSubject<Menu[]> = new BehaviorSubject<Menu[]>([]);

    private unsubscriber: Subject<any> = new Subject();
    public screenWidth: BehaviorSubject<number> = new BehaviorSubject(
        window.innerWidth
    );
    
    // Search Box
    public search = false;
    
    // Language
    public language = false;
    
    // Mega Menu
    public megaMenu = false;
    public levelMenu = false;
    public megaMenuColapse: boolean = window.innerWidth < 1199 ? true : false;
    
    // Collapse Sidebar
    public collapseSidebar: boolean = window.innerWidth < 991 ? true : false;
    
    // For Horizontal Layout Mobile
    public horizontal: boolean = window.innerWidth < 991 ? false : true;
    
    // Full screen
    public fullScreen = false;
    active: any;
    // public items: BehaviorSubject<Menu[]> = new BehaviorSubject<Menu[]>(this.MENUITEMS);
    
    constructor(private router: Router, private authService: AuthService) {
        
        this.setScreenWidth(window.innerWidth);
        fromEvent(window, 'resize')
        .pipe(debounceTime(1000), takeUntil(this.unsubscriber))
        .subscribe((evt: any) => {
            this.setScreenWidth(evt.target.innerWidth);
            if (evt.target.innerWidth < 991) {
                this.collapseSidebar = true;
                this.megaMenu = false;
                this.levelMenu = false;
            }
            if (evt.target.innerWidth < 1199) {
                this.megaMenuColapse = true;
            }
        });
        if (window.innerWidth < 991) {
            this.router.events.subscribe((event) => {
                this.collapseSidebar = true;
                this.megaMenu = false;
                this.levelMenu = false;
            });
        }
    }
    
    ngOnDestroy() {
        this.unsubscriber.next;
        this.unsubscriber.complete();
    }
    
    private setScreenWidth(width: number): void {
        this.screenWidth.next(width);
    }
    
    loadModules(): void {
        const localModules = this.authService.getModule();
        this.modules = localModules || [];
        this.MENUITEMS = [...this.modules];
        this.items.next(this.MENUITEMS);
    }
    
    refreshMenuItems(): void {
        this.MENUITEMS = [];
        this.items.next([]);
    }
    
}
