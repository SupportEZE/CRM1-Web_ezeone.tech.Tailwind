import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, Inject, ViewChild } from '@angular/core';
import { CalendarModule } from 'angular-calendar';
import { SharedModule } from '../../../../../shared/shared.module';
import { OverlayscrollbarsModule } from 'overlayscrollbars-ngx';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, EventDropArg, EventInput } from '@fullcalendar/core/index.js';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGrigPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import moment from 'moment';
import { SpkNgSelectComponent } from '../../../../../../@spk/spk-ng-select/spk-ng-select.component';
import { MaterialModuleModule } from '../../../../../material-module/material-module.module';
import { ToastrServices } from '../../../../../shared/services/toastr.service ';
import { ApiService } from '../../../../../core/services/api/api.service';
import { CommonModule } from '@angular/common';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { SweetAlertService } from '../../../../../core/services/alert/sweet-alert.service';

@Component({
    selector: 'app-beat-add',
    // schemas: [CUSTOM_ELEMENTS_SCHEMA],
    imports: [
        SharedModule,
        OverlayscrollbarsModule,
        // FormsModule,
        ReactiveFormsModule,
        FullCalendarModule,
        CalendarModule,
        MaterialModuleModule,
        CommonModule,
        
    ],
    templateUrl: './beat-add.component.html',
})
export class BeatAddComponent {
    userBeatForm: FormGroup = new FormGroup({});
    data: any = {};
    updatedEventData : any
    userList: any[] = [];
    skLoading:boolean = false
    @ViewChild('external', { static: false }) external!: ElementRef;
    calendarPlugins = [dayGridPlugin, timeGrigPlugin, interactionPlugin];
    curYear = moment().format('YYYY');
    curMonth = moment().format('MM');
    beatListData:any=[];
    activityList:any=[];
    selectedUserId:any;
    selectedUser: any = {};
    dropDate:any
    searchControl = new FormControl('');
    filteredBeats: any[] = [];
    droppedEvents: Map<string, Set<string>> = new Map()
    filter:any = {};
    constructor(public api: ApiService,public toastr: ToastrServices,public alert : SweetAlertService, private fb: FormBuilder){}
    
    ngOnInit(){
        this.getUserList();
        this.searchControl.valueChanges
        .pipe(debounceTime(300), distinctUntilChanged())
        .subscribe(value => {
            if ((value || '').length >= 3) {
                this.getBeatList('');
            } else {
                this.filteredBeats = [];
            }
        });
        this.userBeatForm = this.fb.group({
            selectedUserId: ['', Validators.required],
        });
        
        
        this.userBeatForm.get('selectedUserId')?.valueChanges.subscribe(value => {
            if (value) {
                setTimeout(() => {
                    this.getUserList();
                });
            }
        });
    }
    
    
    ngAfterViewInit(): void {
        const containerEl = this.external.nativeElement;
        new Draggable(containerEl, {
            itemSelector: '.fc-event',
            eventData: (eventEl: HTMLElement) => {
                return {
                    id: eventEl.getAttribute('data-id') || new Date().getTime().toString(),
                    description: eventEl.getAttribute('data-description') || '',
                    title: eventEl.innerText.trim(),
                    className: eventEl.className + ' overflow-hidden',
                };
            },
        });
    }
    
    
    calendarOptions: CalendarOptions = {
        plugins: [dayGridPlugin, interactionPlugin],
        initialView: 'dayGridMonth',
        
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,dayGridWeek',
        },
        datesSet: (info) => {
            const prevButton = document.querySelector('.fc-prev-button') as HTMLButtonElement;
            if (prevButton) {
                const today = new Date();
                const currentMonth = info.view.currentStart.getMonth();
                const currentYear = info.view.currentStart.getFullYear();
                
                if (currentMonth <= today.getMonth() && currentYear <= today.getFullYear()) {
                    prevButton.disabled = true;
                    prevButton.classList.add('fc-disabled-button'); // Optional: Add styles
                } else {
                    prevButton.disabled = false;
                    prevButton.classList.remove('fc-disabled-button');
                }
            }
        },
        navLinks: true, // can click day/week names to navigate views
        businessHours: true, // display business hours
        editable: true,
        selectable: true,
        selectMirror: true,
        droppable: true,
        weekends: true,
        eventReceive: (arg) => this.handleEventReceive(arg),
        // dateClick: (arg) => this.handleDateClick(arg),
        eventClick: (arg) => this.handleEventClick(arg),
        // eventDrop: (arg) => this.handleEventDrop(arg) ,// Handle drag event
        eventAllow: (dropInfo, draggedEvent) => {
            const dropDate = new Date(dropInfo.start);
            // const eventId = draggedEvent.id;
            const today = new Date();
            today.setHours(0, 0, 0, 0); // Normalize to compare dates
            return dropDate >= today; // Allow only future or today’s date
        }
    }; 
    
    handleEventClick(arg: any) {
        // const dropDate = arg.event.startStr; // Get dropped date as string (YYYY-MM-DD)
        // const eventId = arg.event.id; // Get unique event ID
        // const description = arg.event.extendedProps?.description || '';
        
        this.alert.confirm("Are you sure you want to delete this event?")
        .then((result) => {
            if (result.isConfirmed) {
                arg.event.remove();
                
                this.api.patch({ beat_code: arg.event.id, date: arg.event.startStr, user_id: this.selectedUser.user_id, is_delete: 1}, 'beat/unassign-beat-plan').subscribe(result => {
                    if (result['statusCode']  ===  200) {
                        // this.logService.logActivityOnDelete(this.moduleId, this.moduleName, 'delete', rowId, activeTab);
                        this.toastr.success(result['message'], '', 'toast-top-right');
                    }                        
                });
            }
        });
    }
    
    
    // handleDateClick(arg: any) {
    //     const selectedDatePayload = {
    //         selected_date: arg.dateStr, // Send the selected date
    //     };
    //     const title = prompt('Event Title:');
    //     if (title) {
    //         const newEvent = {
    //             id: new Date().getTime().toString(), // Unique ID for event
    //             title: title,
    //             start: arg.date,
    //             allDay: arg.allDay
    //         };
    //         this.calendarEvents = [...this.calendarEvents, newEvent]; // Update state
    //     }
    // }
    
    // handleEventReceive(arg: any) {
    
    //     // const payload = {
    //     //     date: arg.event.start.toISOString(),
    //     // };
    //     // this.saveDraggedEvent(payload);
    // }
    
    // handleEventReceive(arg: EventDropArg) {
    handleEventReceive(arg: any) {
        
        const dropDate = arg.event.startStr; // Get dropped date as string (YYYY-MM-DD)
        const eventId = arg.event.id; // Get unique event ID
        const description = arg.event.extendedProps?.description || '';
        // Check if the dropDate already exists in the Map
        let eventsOnDate = this.droppedEvents.get(dropDate);
        
        if (!eventsOnDate) {
            // If no entry exists, create a new Set
            eventsOnDate = new Set();
            this.droppedEvents.set(dropDate, eventsOnDate);
        }
        
        // Check if the event is already dropped on this date
        if (eventsOnDate.has(eventId)) {
            this.toastr.error(`Event ${eventId} is already dropped on ${dropDate}, reverting.`, '', 'toast-top-right');
            arg.revert(); // Move the event back to its original position
            return;
        }
        // Otherwise, allow drop and store the event
        eventsOnDate.add(eventId);
        
        const payload = {
            date: dropDate,
            description:description,
            beat_code:eventId,
        };
        this.saveDraggedEvent(payload , arg);
    }
    
    saveDraggedEvent(payload: any , arg: any) {
        
        let finalPayload
        finalPayload = {
            ...payload,
            user_id: this.selectedUser.user_id,
            user_name: this.selectedUser.user_name,
            user_code: this.selectedUser.user_code,
            user_mobile: this.selectedUser.user_mobile,
        };
        this.api.post(finalPayload, 'beat/create').subscribe(result => {
            if (result['statusCode'] === 200) {
                this.api.disabled = false;
                this.toastr.success(result['message'], '', 'toast-top-right');
            }
            else
            {
                arg.revert();
            }
        });
    }
    
    private lastSearchTerm: string = '';
    onSearch(search: string) {
        const trimmedSearch = search?.trim() || '';
        if (trimmedSearch === this.lastSearchTerm) {
            return;
        }
        this.lastSearchTerm = trimmedSearch;
        this.getUserList(search)
    }
    
    getUserList(search?:string) {
        this.filter.search = search;
        this.api.post({'filters': this.filter}, 'beat/read-user').subscribe(result => {
            if (result['statusCode'] == 200) {
                this.userList = result['data'];
            }
        });
    }
    
    getBeatList(userId: any){
        this.skLoading = true;
        this.api.post({ user_id: userId}, 'beat/read-beat').subscribe(result => {
            if(result['statusCode'] == 200){
                this.skLoading = false;
                this.beatListData = result['data'];
                const search = this.searchValue?.toLowerCase() || '';
                
                this.filteredBeats = this.beatListData.filter((beat: any) => 
                    (beat.name || '').toLowerCase().includes(search)
            );
        }
    });
}

get searchValue(): string {
    return this.searchControl.value || '';
}

onUserChange(event: any) {
    const selectedValue = this.userList.find((item: any) => item.value === event);
    if (selectedValue) {
        this.selectedUser.user_id = selectedValue.value
        this.selectedUser.user_name = selectedValue.label
        this.selectedUser.user_mobile = selectedValue.user_mobile
    }
    this.getBeatList(event); // Pass selected user ID
    this.getActivityList(event);
}

colorClasses = [
    { bgClass: "bg-success/10 border-success",},
    { bgClass: "bg-warning/10 border-warning",},
    { bgClass: "bg-danger/10 border-danger",},
    { bgClass: "bg-primary/10 border-primary",},
    { bgClass: "bg-secondary/10 border-secondary",},
    { bgClass: "bg-primarytint1color/10 border-primarytint1color",},
    { bgClass: "bg-primarytint2color/10 border-primarytint2color",},
    { bgClass: "bg-primarytint3color/10 border-primarytint3color", }
];

applyDynamicColor(index: number) {
    return this.colorClasses[index % this.colorClasses.length]; // Cyclic rotation
}

getActivityList(userId: any) {
    this.skLoading = true;
    this.api.post({ user_id: userId }, 'beat/read-previous-beat').subscribe(result => {
        if (result['statusCode'] == 200) {
            this.skLoading = false;
            this.activityList = result['data'];
        }
    });
}
}
