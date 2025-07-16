import { Component, ElementRef, HostListener, Renderer2, ViewChild } from '@angular/core';
import { Menu, NavService } from '../../services/nav.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AppStateService } from '../../services/app-state.service';
import { SwitcherComponent } from '../switcher/switcher.component';
import { filter } from 'rxjs';
import { ApiService } from '../../../core/services/api/api.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrServices } from '../../services/toastr.service ';
import { SweetAlertService } from '../../../core/services/alert/sweet-alert.service';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../../services/auth.service';
interface Item {
    id: number;
    name: string;
    type: string;
    title: string;
    // Add other properties as needed
}
@Component({
    selector: 'app-header',
    standalone:false,
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})

export class HeaderComponent {
    @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;
    
    cartItemCount: number = 5;
    notificationCount: number = 5;
    public isCollapsed = true;
    collapse: any;
    closeResult = '';
    themeType: string | undefined;
    
    selectedItem: string  | null ='selectedItem'
    isOpen: boolean = false;
    orgData:any; 
    userData:any; 
    isFocused: boolean = false;
    
    constructor(
        public api: ApiService,
        private appStateService: AppStateService,
        public navServices: NavService,
        private elementRef: ElementRef,
        public renderer: Renderer2,
        private router: Router, 
        private activatedRoute: ActivatedRoute,
        private http: HttpClient,
        public toastr: ToastrServices,
        public alert: SweetAlertService,
        private cookieService: CookieService,
        public authService: AuthService,
    ) {this.localStorageBackUp()
        // let ORG
        // const ORGString = localStorage.getItem('ORG');
        // ORG = ORGString ? JSON.parse(ORGString) : null;
        
    }
    
    toggleDropdown() {
        this.isOpen = !this.isOpen;
    }
    
    closeDropdown() {
        this.isOpen = false;
    }
    
    handleItemClick(title: string) {
        this.selectedItem = title;
        this.isOpen = false;
        localStorage.setItem('selectedItem', title);
    }
    
    // Addding sticky-pin
    scrolled = false;
    
    @HostListener('window:scroll', [])
    onWindowScroll() {
        this.scrolled = window.scrollY > 10;
        
        const sections = document.querySelectorAll('.side-menu__item');
        const scrollPos =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
        
        sections.forEach((ele, i) => {
            const currLink = sections[i];
            const val: any = currLink.getAttribute('value');
            const refElement: any = document.querySelector('#' + val);
            
            // Add a null check here before accessing properties of refElement
            if (refElement !== null) {
                const scrollTopMinus = scrollPos + 73;
                if (
                    refElement.offsetTop <= scrollTopMinus &&
                    refElement.offsetTop + refElement.offsetHeight > scrollTopMinus
                ) {
                    document.querySelector('.nav-scroll')?.classList.remove('active');
                    currLink.classList.add('active');
                } else {
                    currLink.classList.remove('active');
                }
            }
        });
    }
    
    openSearch(search: any) {
        // this.modalService.open(search);
    }
    toggleSidebar() {
        let html = this.elementRef.nativeElement.ownerDocument.documentElement;
        if (html?.getAttribute('data-toggled') == 'true') {
            document.querySelector('html')?.getAttribute('data-toggled') ==
            'icon-overlay-close';
        }
        else if (html?.getAttribute('data-nav-style') == 'menu-click') {
            html?.setAttribute(
                'data-toggled',
                html?.getAttribute('data-toggled') == 'menu-click-closed'
                ? ''
                : 'menu-click-closed'
            );
        } else if (html?.getAttribute('data-nav-style') == 'menu-hover') {
            html?.setAttribute(
                'data-toggled',
                html?.getAttribute('data-toggled') == 'menu-hover-closed'
                ? ''
                : 'menu-hover-closed'
            );
        } else if (html?.getAttribute('data-nav-style') == 'icon-click') {
            html?.setAttribute(
                'data-toggled',
                html?.getAttribute('data-toggled') == 'icon-click-closed'
                ? ''
                : 'icon-click-closed'
            );
        } else if (html?.getAttribute('data-nav-style') == 'icon-hover') {
            html?.setAttribute(
                'data-toggled',
                html?.getAttribute('data-toggled') == 'icon-hover-closed'
                ? ''
                : 'icon-hover-closed'
            );
        }
        else if (html?.getAttribute('data-vertical-style') == 'overlay') {
            html?.setAttribute(
                'data-vertical-style','overlay' 
            );
            html?.setAttribute(
                'data-toggled', html?.getAttribute('data-toggled') == 'icon-overlay-close'
                ? ''
                : 'icon-overlay-close'
            );
        } else if (html?.getAttribute('data-vertical-style')  == 'overlay') {
            document.querySelector('html')?.getAttribute('data-toggled') != null
            ? document.querySelector('html')?.removeAttribute('data-toggled')
            : document
            .querySelector('html')
            ?.setAttribute('data-toggled', 'icon-overlay-close');
        } else if (html?.getAttribute('data-vertical-style') == 'closed') {
            html?.setAttribute(
                'data-toggled',
                html?.getAttribute('data-toggled') == 'close-menu-close'
                ? ''
                : 'close-menu-close'
            );
        } else if (html?.getAttribute('data-vertical-style') == 'icontext') {
            html?.setAttribute(
                'data-toggled',
                html?.getAttribute('data-toggled') == 'icon-text-close'
                ? ''
                : 'icon-text-close'
            );
        } else if (html?.getAttribute('data-vertical-style') == 'detached') {
            html?.setAttribute(
                'data-toggled',
                html?.getAttribute('data-toggled') == 'detached-close'
                ? ''
                : 'detached-close'
            );
        }else if (html?.getAttribute('data-vertical-style') == 'doublemenu') {
            html?.setAttribute('data-toggled', html?.getAttribute('data-toggled') == 'double-menu-close' && document.querySelector(".slide.open")?.classList.contains("has-sub") && document.querySelector('.double-menu-active') ? 'double-menu-open': 'double-menu-close' );
        } 
        
        if (window.innerWidth <= 992) {
            html?.setAttribute(
                'data-toggled',
                html?.getAttribute('data-toggled') == 'open' ? 'close' : 'open'
            );
        }
    }
    updateTheme(theme: string) {
        this.appStateService.updateState({ theme, menuColor: theme, headerColor: theme });
        if (theme == 'light') {
            this.appStateService.updateState({ theme, themeBackground: '', headerColor: 'light', menuColor: 'dark' });
            let html = document.querySelector('html');
            html?.style.removeProperty('--primary-rgb');
            html?.style.removeProperty('--body-bg');
            html?.style.removeProperty('--dark-bg');
            html?.style.removeProperty('--light');
            html?.style.removeProperty('--input-border');
            html?.setAttribute('data-toggled', 'close');
            html?.setAttribute('data-toggled', window.innerWidth <= 992 ? 'close' : '');
            
        }
        if (theme == 'dark') {
            this.appStateService.updateState({ theme, themeBackground: '', headerColor: 'dark', menuColor: 'dark' });
            let html = document.querySelector('html');
            html?.style.removeProperty('--primary-rgb');
            html?.style.removeProperty('--body-bg');
            html?.style.removeProperty('--dark-bg');
            html?.style.removeProperty('--light');
            html?.style.removeProperty('--input-border');
            html?.setAttribute('data-toggled', 'close');
            html?.setAttribute('data-toggled', window.innerWidth <= 992 ? 'close' : '');
        }
    }
    
    @HostListener('window:keydown', ['$event'])
    handleKeyboardShortcut(event: KeyboardEvent) {
        // Ctrl + K or /
        const key = event.key.toLowerCase();
        if ((event.ctrlKey && event.key === 'k')) {
            event.preventDefault(); // Avoid browser default search popup (for '/')
            this.focusSearch();
        }
        
        if (event.ctrlKey && event.shiftKey && key === 'q') {
            console.log('event');
            
            event.preventDefault();
            this.authService.logout(); // Your logout method
        }
    }
    
    focusSearch() {
        if (this.searchInput) {
            this.searchInput.nativeElement.focus();
            this.isFocused = true;
            
        }
    }
    
    onBlur() {
        this.isFocused = false;
    }
    
    localStorageBackUp() {
        let styleId = document.querySelector('#style');
        
        let html = document.querySelector('html');
        //Theme Color Mode:
        if (localStorage.getItem('ezeoneHeader') == 'dark') {
            if (localStorage.getItem('ezeonedarktheme')) {
                const type: any = localStorage.getItem('ezeonedarktheme');
                html?.setAttribute('class', type);
                html?.setAttribute('data-header-styles', type);
                html?.setAttribute('data-menu-styles', type);
            }
            if (localStorage.getItem('ezeonedarktheme') == 'light') {
                const type: any = localStorage.getItem('ezeonedarktheme');
                html?.setAttribute('class', type);
                html?.setAttribute('data-header-styles', type);
                html?.setAttribute('data-menu-styles', type);
            }
        }
    }
    
    isCartEmpty: boolean = false;
    isNotifyEmpty: boolean = false;
    
    removeRow(rowId: string) {
        const rowElement = document.getElementById(rowId);
        if (rowElement) {
            rowElement.remove();
        }
        this.cartItemCount--;
        this.isCartEmpty = this.cartItemCount === 0;
    }
    removeNotify(rowId: string) {
        const rowElement = document.getElementById(rowId);
        if (rowElement) {
            rowElement.remove();
        }
        this.notificationCount--;
        this.isNotifyEmpty = this.notificationCount === 0;
    }
    handleCardClick(event: MouseEvent) {
        // Prevent the click event from propagating to the container
        event.stopPropagation();
    }
    
    // Search
    public menuItems!: Menu[];
    public items!: Menu[];
    public text!: string;
    public SearchResultEmpty: boolean = false;
    
    ngOnInit(): void {
        const storedSelectedItem = localStorage.getItem('selectedItem');
        this.orgData = this.authService.getOrg();
        this.userData = this.authService.getUser();
        
        if (!storedSelectedItem) {
            this.selectedItem = "Sales Dashboard"; // You can set any default item here
            localStorage.setItem('selectedItem', this.selectedItem);
        } else {
            this.selectedItem = storedSelectedItem;
        }
        this.navServices.items.subscribe((menuItems) => {
            this.items = menuItems;
        });
        // To clear and close the search field by clicking on body
        document.querySelector('.main-content')?.addEventListener('click', () => {
            this.clearSearch();
        });
        this.text = '';
        this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
            this.updateSelectedItem();
        });
    }
    
    private updateSelectedItem() {
        const dashboard = this.activatedRoute.snapshot.firstChild?.url[0]?.path;
        this.selectedItem = dashboard ? dashboard.charAt(0).toUpperCase() + dashboard.slice(1) + ' Dashboard' : this.selectedItem;
    }
    ngOnDestroy(): void {
        const windowObject: any = window;
        let html = this.elementRef.nativeElement.ownerDocument.documentElement;
        
        window.addEventListener('resize', () => {
            if (localStorage.getItem('ezeoneverticalstyles') != 'icon-text-close') {
                if (windowObject.innerWidth <= '991') {
                    html?.setAttribute('data-toggled', 'open');
                } else {
                    if (!(localStorage.getItem('ezeoneverticalstyles') == 'doublemenu')) {
                        html?.removeAttribute('data-toggled');
                    }
                }
            } else {
                document
                .querySelector('html')
                ?.setAttribute('data-toggled', 'icon-text-close');
            }
        });
        
    }
    Search(searchText: string) {
        if (!searchText) return this.menuItems = [];
        // items array which stores the elements
        const items:Item[] = [];
        // Converting the text to lower case by using toLowerCase() and trim() used to remove the spaces from starting and ending
        searchText = searchText.toLowerCase().trim();
        this.items.filter((menuItems:Menu) => {
            // checking whether menuItems having title property, if there was no title property it will return
            if (!menuItems?.title) return false;
            //  checking wheteher menuitems type is text or string and checking the titles of menuitems
            if (menuItems.type === 'link' && menuItems.title.toLowerCase().includes(searchText)) {
                // Converting the menuitems title to lowercase and checking whether title is starting with same text of searchText
                if( menuItems.title.toLowerCase().startsWith(searchText)){ // If you want to get all the data with matching to letter entered remove this line(condition and leave items.push(menuItems))
                    // If both are matching then the code is pushed to items array
                    items.push(menuItems as Item);
                }
            }
            //  checking whether the menuItems having children property or not if there was no children the return
            if (!menuItems.children) return false;
            menuItems.children.filter((subItems:Menu) => {
                if (!subItems?.title) return false; 
                if (subItems.type === 'link' && subItems.title.toLowerCase().includes(searchText)) {
                    if( subItems.title.toLowerCase().startsWith(searchText)){         // If you want to get all the data with matching to letter entered remove this line(condition and leave items.push(subItems))
                        items.push(subItems as Item);
                    }
                    
                }
                if (!subItems.children) return false;
                subItems.children.filter((subSubItems:Menu) => {
                    if (subSubItems.title?.toLowerCase().includes(searchText)) {
                        if( subSubItems.title.toLowerCase().startsWith(searchText)){ // If you want to get all the data with matching to letter entered remove this line(condition and leave items.push(subSubItems))
                            items.push(subSubItems as Item);
                            
                        }
                    }
                });
                return true;
            });
            return this.menuItems = items;
        });
        // Used to show the No search result found box if the length of the items is 0
        if(!items.length){
            this.SearchResultEmpty = true;
        }
        else{
            this.SearchResultEmpty = false;
        }
        return true;
    }
    
    //  Used to clear previous search result
    clearSearch() {    
        const headerSearch = document.querySelector('.header-search');
        if (headerSearch) {
            headerSearch.classList.remove('searchdrop');
        }
        this.text = '';
        this.menuItems = [];
        this.SearchResultEmpty = false;
        return this.text, this.menuItems;
        
    }
    SearchHeader() {
        document
        .querySelector('.header-search')
        ?.classList.toggle('searchdrop');
    }
    isInputFocused: boolean = false;
    
    onInputFocus() {
        this.isInputFocused = true;
    }
    
    onInputBlur() {
        this.isInputFocused = false;
    }
    
    // isFullscreen = false;
    
    // fullScreenToggle() {
    //   this.isFullscreen = !this.isFullscreen;
    // }
    isFullscreen: boolean = false;
    toggleFullscreen() {
        this.isFullscreen = !this.isFullscreen;
    }
    
}
