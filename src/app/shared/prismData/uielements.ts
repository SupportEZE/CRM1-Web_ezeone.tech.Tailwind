// Start of Alerts Prism Code //
export let alertreuse = 
`  @if (visible) {
    <div class="alert alert-dismissible fade show flex" [ngClass]="alertClass" role="alert">
      @if (icon) {
      <div class="alert-icon" [innerHTML]="icon"></div>
      }@else if(image){
        <div class="avatar  me-3 " [ngClass]="avatarClass">
          <img [src]="image" alt="alert image" class="alert-image" />
        </div>
      }
      <div class="sm:flex-shrink-0">{{ message }}</div>
      <div class="ms-auto">
        <button type="button" class="inline-flex rounded-sm focus:outline-none focus:ring-0 focus:ring-offset-0" (click)="dismiss()">
          <span class="sr-only">Dismiss</span>
          <i class="bi bi-x text-xl leading-none"></i>
        </button>
      </div>
    </div>
    }>`;
export let alertTS = ` 
<div class="alert alert-warning  fade show flex" role="alert" id="dismiss-alert1">
  <div class="sm:flex-shrink-0">
    <strong>Holy guacamole!</strong> You should check in on some of those fields
    below.
</div> 
<div class="ms-auto">
    <div class="mx-1 my-1">
        <button type="button"
            class="inline-flex  rounded-sm  focus:outline-none focus:ring-0 focus:ring-offset-0 "
            data-hs-remove-element="#dismiss-alert1">
            <span class="sr-only">Dismiss</span>
            <svg class="h-3 w-3" width="16" height="16" viewBox="0 0 16 16"
                fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path
                    d="M0.92524 0.687069C1.126 0.486219 1.39823 0.373377 1.68209 0.373377C1.96597 0.373377 2.2382 0.486219 2.43894 0.687069L8.10514 6.35813L13.7714 0.687069C13.8701 0.584748 13.9882 0.503105 14.1188 0.446962C14.2494 0.39082 14.3899 0.361248 14.5321 0.360026C14.6742 0.358783 14.8151 0.38589 14.9468 0.439762C15.0782 0.493633 15.1977 0.573197 15.2983 0.673783C15.3987 0.774389 15.4784 0.894026 15.5321 1.02568C15.5859 1.15736 15.6131 1.29845 15.6118 1.44071C15.6105 1.58297 15.5809 1.72357 15.5248 1.85428C15.4688 1.98499 15.3872 2.10324 15.2851 2.20206L9.61883 7.87312L15.2851 13.5441C15.4801 13.7462 15.588 14.0168 15.5854 14.2977C15.5831 14.5787 15.4705 14.8474 15.272 15.046C15.0735 15.2449 14.805 15.3574 14.5244 15.3599C14.2437 15.3623 13.9733 15.2543 13.7714 15.0591L8.10514 9.38812L2.43894 15.0591C2.23704 15.2543 1.96663 15.3623 1.68594 15.3599C1.40526 15.3574 1.13677 15.2449 0.938279 15.046C0.739807 14.8474 0.627232 14.5787 0.624791 14.2977C0.62235 14.0168 0.730236 13.7462 0.92524 13.5441L6.59144 7.87312L0.92524 2.20206C0.724562 2.00115 0.611816 1.72867 0.611816 1.44457C0.611816 1.16047 0.724562 0.887983 0.92524 0.687069Z"
                    fill="currentColor" />
            </svg>
        </button>
    </div>
</div>
</div>`
export let alertTS1 = ` 
<div class="bg-gray-50 border border-gray-200 dark:bg-light dark:border-defaultborder/10 alert mb-0"
role="alert">
<div class="flex">
    <div class="sm:flex-shrink-0">
        <svg class="h-4 w-4 text-gray-500 mt-0.5" xmlns="http://www.w3.org/2000/svg"
            width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path
                d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
        </svg>
    </div>
    <div class="flex-1 md:flex md:justify-between ms-2">
        <p class="text-sm dark:text-defaulttextcolor/80">
            A new software update is available. See what's new in version 3.0.7
        </p>
        <p class="text-sm mt-3 md:mt-0 md:ms-6">
            <a class="dark:text-defaulttextcolor/80 hover:text-gray-500 font-medium whitespace-nowrap"
                href="javascript:void(0);">Details</a>
        </p>
    </div>
</div>
</div>`
export let alertTS2 = `
@for (alert of outlineAlerts; track $index) {
    <spk-alerts [alertClass]="alert.type"
    [message]="alert.message" > 
  </spk-alerts>
}
`
export let alertTS3 = `
@for (alert of solidShadowsAlerts; track $index) {
    <spk-alerts [alertClass]="alert.type"
    [message]="alert.message" > 
  </spk-alerts>
}
`
export let alertTS4 = `
@for (alert of differentShadowsAlerts; track $index) {
    <spk-alerts [alertClass]="alert.type"
    [message]="alert.message" > 
  </spk-alerts>
}
`
export let alertTS5 = `
@for (alert of alertData; track $index) {
    <spk-alerts [alertClass]="alert.color" 
    [message]="alert.title"  > 
  </spk-alerts>
}
`
export let alertTS6 = `
@for (alert of alertData; track $index) {
    <spk-alerts [alertClass]="alert.color" 
    [message]="alert.title"  > 
  </spk-alerts>
}
`
export let alertTS7 = `
<div class="bg-white border border-gray-200 rounded-lg shadow-lg p-4 dark:bg-bodybg dark:border-white/10"
role="alert">
<div class="flex">
    <div class="flex-shrink-0">
        <svg class="flex-shrink-0 size-4 text-blue-600 mt-1" xmlns="http://www.w3.org/2000/svg"
            width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4" />
            <path d="M12 8h.01" />
        </svg>
    </div>
    <div class="ms-3">
        <h6 class="text-gray-800 font-semibold dark:text-white">
            New version published
        </h6>
        <p class="mt-0 text-sm text-gray-700 dark:text-gray-400">
            Chris Lynch published a new version of this page. Refresh to see the changes.
        </p>
    </div>
</div>
</div>
`
export let alertTS8 = `
@for (alert of roundedoutlineAlerts; track $index) {
    <spk-alerts [alertClass]="alert.type"
    [message]="alert.message" > 
  </spk-alerts>
}
`
export let alertTS9 = `
@for(alert of linksAlerts;track $index){
    <div class="alert alert-{{alert.bg}}" role="alert">
        A simple {{alert.bg}} alert with <a href="javascript:void(0);" class="alert-link">an example
            link</a>.
        Give it a click if you like.
    </div>
}
`
export let alertTS10 = `
@for(alert of solidAlerts;track $index){

    <div class="alert alert-solid-{{alert.bg}} alert-dismissible fade show flex" role="alert"
        id="dismiss-alert2">
        <div class="sm:flex-shrink-0">
            A simple solid {{alert.bg}} alert—check it out!
        </div>
        <div class="ms-auto">
            <div class="mx-1 my-1">
                <button type="button"
                    class="inline-flex  rounded-sm  focus:outline-none focus:ring-0 focus:ring-offset-0 "
                    data-hs-remove-element="#dismiss-alert2">
                    <span class="sr-only">Dismiss</span>
                    <svg class="h-3 w-3" width="16" height="16" viewBox="0 0 16 16" fill="none"
                        xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path
                            d="M0.92524 0.687069C1.126 0.486219 1.39823 0.373377 1.68209 0.373377C1.96597 0.373377 2.2382 0.486219 2.43894 0.687069L8.10514 6.35813L13.7714 0.687069C13.8701 0.584748 13.9882 0.503105 14.1188 0.446962C14.2494 0.39082 14.3899 0.361248 14.5321 0.360026C14.6742 0.358783 14.8151 0.38589 14.9468 0.439762C15.0782 0.493633 15.1977 0.573197 15.2983 0.673783C15.3987 0.774389 15.4784 0.894026 15.5321 1.02568C15.5859 1.15736 15.6131 1.29845 15.6118 1.44071C15.6105 1.58297 15.5809 1.72357 15.5248 1.85428C15.4688 1.98499 15.3872 2.10324 15.2851 2.20206L9.61883 7.87312L15.2851 13.5441C15.4801 13.7462 15.588 14.0168 15.5854 14.2977C15.5831 14.5787 15.4705 14.8474 15.272 15.046C15.0735 15.2449 14.805 15.3574 14.5244 15.3599C14.2437 15.3623 13.9733 15.2543 13.7714 15.0591L8.10514 9.38812L2.43894 15.0591C2.23704 15.2543 1.96663 15.3623 1.68594 15.3599C1.40526 15.3574 1.13677 15.2449 0.938279 15.046C0.739807 14.8474 0.627232 14.5787 0.624791 14.2977C0.62235 14.0168 0.730236 13.7462 0.92524 13.5441L6.59144 7.87312L0.92524 2.20206C0.724562 2.00115 0.611816 1.72867 0.611816 1.44457C0.611816 1.16047 0.724562 0.887983 0.92524 0.687069Z"
                            fill="currentColor" />
                    </svg>
                </button>
            </div>
        </div>
    </div>
}
`
export let alertTS11 = `
@for (alert of roundeDefaultAlerts; track $index) {
    <spk-alerts [alertClass]="alert.type"
    [message]="alert.message" > 
  </spk-alerts>
}`
export let alertTS12 = `
@for (alert of CustomeButtonAlerts; track $index) {
    <spk-alerts [alertClass]="alert.type"
    [message]="alert.message" > 
  </spk-alerts>
}
`
export let alertTS13 = `
@for (alert of CustomizedButtonAlerts; track $index) {
    <spk-alerts [alertClass]="alert.type"
    [message]="alert.message" [icon]="getSanitizedSVG(alert.icon)" > 
  </spk-alerts>
} `
export let alertTS14 = `
@for (alert of CustomizedIconAlerts; track $index) {
    <spk-alerts [alertClass]="alert.type"
    [message]="alert.message" [icon]="getSanitizedSVG(alert.icon)" > 
  </spk-alerts>
} `
export let alertTS15 = `
@for (alert of imageAlerts; track $index) {
    <spk-alerts [alertClass]="alert.type" [avatarClass]="alert.avatarClass"
    [message]="alert.message" [image]="alert.image" > 
  </spk-alerts>
} 
`
export let alertTS16 = `
@for (alert of imageSizeAlerts; track $index) {
    <spk-alerts [alertClass]="alert.type" [avatarClass]="alert.avatarClass"
    [message]="alert.message" [image]="alert.image" > 
  </spk-alerts>
} 
`

// End of Alerts Prism Code //

export let badgeTS = 
`<span class="badge bg-primary text-white">Primary</span>
              <span class="badge bg-secondary text-white">Secondary</span>
              <span class="badge bg-success text-white">Success</span>
              <span class="badge bg-danger text-white">Danger</span>
              <span class="badge bg-warning text-white">Warning</span>
              <span class="badge bg-info text-white">Info</span>
              <span class="badge bg-light text-dark">Light</span>
              <span class="badge bg-black text-white">Dark</span>`
export let badgeTS1 = 
`   <span class="badge !rounded-full bg-primary text-white">Primary</span>
<span class="badge !rounded-full bg-secondary text-white">Secondary</span>
<span class="badge !rounded-full bg-success text-white">Success</span>
<span class="badge !rounded-full bg-danger text-white">Danger</span>
<span class="badge !rounded-full bg-warning text-white">Warning</span>
<span class="badge !rounded-full bg-info text-white">Info</span>
<span class="badge !rounded-full bg-light text-dark">Light</span>
<span class="badge !rounded-full bg-black text-white">Dark</span>`
export let badgeTS2 = 
`   <span class="badge bg-primary/10 text-primary">Primary</span>
              <span class="badge bg-secondary/10 text-secondary">Secondary</span>
              <span class="badge bg-success/10 text-success">Success</span>
              <span class="badge bg-danger/10 text-danger">Danger</span>
              <span class="badge bg-warning/10 text-warning">Warning</span>
              <span class="badge bg-info/10 text-info">Info</span>
              <span class="badge bg-light/10 text-black dark:text-defaulttextcolor/80">Light</span>
              <span class="badge bg-black/10 text-black dark:text-defaulttextcolor/80">Dark</span>`

export let badgeTS3 = 
`   <span class="badge !rounded-full bg-primary/10 text-primary">Primary</span>
<span class="badge !rounded-full bg-secondary/10 text-secondary">Secondary</span>
<span class="badge !rounded-full bg-success/10 text-success">Success</span>
<span class="badge !rounded-full bg-danger/10 text-danger">Danger</span>
<span class="badge !rounded-full bg-warning/10 text-warning">Warning</span>
<span class="badge !rounded-full bg-info/10 text-info">Info</span>
<span class="badge !rounded-full bg-light/10 text-dark">Light</span>
<span class="badge !rounded-full bg-black/10">Dark</span>`
export let badgeTS4 = 
`     <button type="button" class="ti-btn ti-btn-outline-primary my-1 me-2">
                  Notifications <span class="badge bg-primary ms-2 text-white">4</span>
              </button>
              <button type="button" class="ti-btn ti-btn-outline-secondary my-1 me-2">
                  Notifications <span class="badge bg-secondary ms-2 text-white">7</span>
              </button>
              <button type="button" class="ti-btn ti-btn-outline-success my-1 me-2">
                  Notifications <span class="badge bg-success ms-2 text-white">12</span>
              </button>
              <button type="button" class="ti-btn ti-btn-outline-info my-1 me-2">
                  Notifications <span class="badge bg-info ms-2 text-white">32</span>
              </button>`
export let badgeTS5 = 
` <span class="badge rounded-full bg-primary-gradient">Primary</span>
<span class="badge rounded-full bg-secondary-gradient">Secondary</span>
<span class="badge rounded-full bg-success-gradient">Success</span>
<span class="badge rounded-full bg-danger-gradient">Danger</span>
<span class="badge rounded-full bg-warning-gradient">Warning</span>
<span class="badge rounded-full bg-info-gradient">Info</span>
<span class="badge rounded-full bg-orange-gradient">orange</span>
<span class="badge rounded-full bg-purple-gradient">purple</span> `
export let badgeTS6 = 
` <span class="badge bg-primary-gradient">Primary</span>
              <span class="badge bg-secondary-gradient">Secondary</span>
              <span class="badge bg-success-gradient">Success</span>
              <span class="badge bg-danger-gradient">Danger</span>
              <span class="badge bg-warning-gradient">Warning</span>
              <span class="badge bg-info-gradient">Info</span>
              <span class="badge bg-orange-gradient">orange</span>
              <span class="badge bg-purple-gradient">purple</span> `
export let badgeTS7 = 
`    <span class="badge !rounded-full bg-outline-primary">Primary</span>
<span class="badge !rounded-full bg-outline-secondary">Secondary</span>
<span class="badge !rounded-full bg-outline-success">Success</span>
<span class="badge !rounded-full bg-outline-danger">Danger</span>
<span class="badge !rounded-full bg-outline-warning">Warning</span>
<span class="badge !rounded-full bg-outline-info">Info</span>
<span class="badge !rounded-full bg-outline-light !text-black dark:!text-defaulttextcolor/70">Light</span>
<span class="badge !rounded-full bg-outline-dark  dark:!text-defaulttextcolor/70">Dark</span> `
export let badgeTS8 = 
`  <button type="button" class="ti-btn bg-primary text-white my-1 me-2">
                  Notifications <span class="badge ms-2 bg-primarytint1color">4</span>
              </button>
              <button type="button" class="ti-btn bg-primarytint1color text-white my-1 me-2">
                  Notifications <span class="badge ms-2 bg-primary">4</span>
              </button>
              <button type="button" class="ti-btn bg-primarytint2color text-white my-1 me-2">
                  Notifications <span class="badge ms-2 bg-warning">4</span>
              </button>
              <button type="button" class="ti-btn bg-primarytint3color text-white my-1 me-2">
                  Notifications <span class="badge ms-2 bg-primarytint1color">4</span>
              </button>
              <button type="button" class="ti-btn bg-secondary text-white my-1 me-2">
                  Notifications <span class="badge ms-2 bg-primary">7</span>
              </button>
              <button type="button" class="ti-btn bg-success text-white my-1 me-2">
                  Notifications <span class="badge ms-2 bg-danger">12</span>
              </button>
              <button type="button" class="ti-btn bg-info text-white my-1 me-2">
                  Notifications <span class="badge ms-2 bg-warning">32</span>
              </button> `
export let badgeTS9 = 
`  <button type="button" class="ti-btn ti-btn-outline-primary my-1 me-2">
Notifications <span class="badge bg-primary ms-2 text-white">4</span>
</button>
<button type="button" class="ti-btn ti-btn-outline-secondary my-1 me-2">
Notifications <span class="badge bg-secondary ms-2 text-white">7</span>
</button>
<button type="button" class="ti-btn ti-btn-outline-success my-1 me-2">
Notifications <span class="badge bg-success ms-2 text-white">12</span>
</button>
<button type="button" class="ti-btn ti-btn-outline-info my-1 me-2">
Notifications <span class="badge bg-info ms-2 text-white">32</span>
</button> `
export let badgeTS10 = 
`  <button type="button" class="ti-btn bg-primary text-white relative">
                          Inbox
                          <span
                              class="absolute -top-2 start-[60%] translate-middle  badge !rounded-full bg-danger">
                              99+
                              <span class="hidden">unread messages</span>
                          </span>
                      </button>
                      <button type="button" class="ti-btn bg-secondary text-white relative">
                          Profile
                          <span
                              class="absolute -top-2 start-[80%] translate-middle p-2 bg-success border border-light !rounded-full">
                              <span class="hidden">New alerts</span>
                          </span>
                      </button>
                      <span class="avatar relative">
                          <img src="./assets/images/faces/2.jpg" alt="img" class="!rounded-md">
                          <span
                              class="absolute -top-1 start-[80%] translate-middle p-1 bg-success border border-light !rounded-full">
                              <span class="hidden">New alerts</span>
                          </span>
                      </span>
                      <span class="avatar avatar-rounded relative">
                          <img src="./assets/images/faces/15.jpg" alt="img">
                          <span
                              class="absolute top-0 start-[80%] translate-middle p-1 bg-success border border-light !rounded-full">
                              <span class="hidden">New alerts</span>
                          </span>
                      </span>
                      <span class="avatar avatar-rounded relative">
                          <img src="./assets/images/faces/10.jpg" alt="img">
                          <span
                              class="absolute -top-2 start-[60%] translate-middle badge bg-secondary !rounded-full shadow-lg text-white">1000+
                              <span class="hidden">New alerts</span>
                          </span>
                      </span>`
export let badgeTS11 = 
`   <div>
                              <span
                                  class="badge border bg-outline-secondary !font-semibold !text-[.9375rem] inline-flex items-center">
                                  <i class="ti ti-flame me-1"></i>
                                  Hot
                              </span>
                          </div>
                          <div>
                              <span class="relative">
                                  <svg class="fill-textmuted dark:fill-textmuted/50 w-8 h-8 text-[2rem]"
                                      xmlns="http://www.w3.org/2000/svg" height="24px"
                                      viewBox="0 0 24 24" width="24px" fill="#000000">
                                      <path
                                          d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z">
                                      </path>
                                  </svg>
                                  <span
                                      class="badge !rounded-full bg-success text-white absolute -end-2 top-0">14</span>
                              </span>
                          </div>
                          <div>
                              <span
                                  class="badge border dark:border-light bg-light text-defaulttextcolor font-semibold font-[.7rem]"><i
                                      class="fe fe-eye me-2 inline-block"></i>13.2k</span>
                          </div>
                          <div>
                              <span class="text-badge relative">
                                  <span class="text text-lg">Inbox</span>
                                  <span class="badge !rounded-full bg-success text-white">32</span>
                              </span>
                          </div>`
export let badgeTS12 = 
`     <h1 class="text-[2.5rem]">Example heading <span
                      class="badge bg-primary text-white !text-[11px] leading-none">New</span></h1>
              <h2 class="text-[2rem]">Example heading <span
                      class="badge bg-primary text-white !text-[11px] leading-none">New</span></h2>
              <h3 class="text-[1.75rem]">Example heading <span
                      class="badge bg-primary text-white !text-[11px] leading-none">New</span></h3>
              <h4 class="text-[1.5rem]">Example heading <span
                      class="badge bg-primary text-white !text-[11px] leading-none">New</span></h4>
              <h5 class="text-[1.25rem]">Example heading <span
                      class="badge bg-primary text-white !text-[11px] leading-none">New</span></h5>
              <h6 class="text-[1rem]">Example heading <span
                      class="badge bg-primary text-white !text-[11px] leading-none">New</span></h6>`
export let badgeTS13 = 
`  <span
class="max-w-40 truncate whitespace-nowrap inline-block py-1.5 px-3 rounded-lg text-xs font-medium bg-primary/10 text-primary/80">This
content is a little bit longer.</span>
<span
class="max-w-40 truncate whitespace-nowrap inline-block py-1.5 px-3 rounded-lg text-xs font-medium bg-secondary/10 text-secondary/80">This
content is a little bit longer.</span>
<span
class="max-w-40 truncate whitespace-nowrap inline-block py-1.5 px-3 rounded-lg text-xs font-medium bg-success/10 text-success/80">This
content is a little bit longer.</span>
<span
class="max-w-40 truncate whitespace-nowrap inline-block py-1.5 px-3 rounded-lg text-xs font-medium bg-danger/10 text-danger/80">This
content is a little bit longer.</span>`
export let badgeTS14 = 
`   <span
class="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-primary/10 text-primary">
<span class="size-1.5 inline-block rounded-full bg-primary/80"></span>
Badge
</span>
<span
class="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-secondary/10 text-secondary">
<span class="size-1.5 inline-block rounded-full bg-secondary/80"></span>
Badge
</span>
<span
class="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-warning/10 text-warning">
<span class="size-1.5 inline-block rounded-full bg-warning/80"></span>
Badge
</span>
<span
class="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-success/10 text-success">
<span class="size-1.5 inline-block rounded-full bg-success/80"></span>
Badge
</span>
<span
class="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-info/10 text-info">
<span class="size-1.5 inline-block rounded-full bg-info/80"></span>
Badge
</span>
<span
class="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-danger/10 text-danger">
<span class="size-1.5 inline-block rounded-full bg-danger/80"></span>
Badge
</span>`
export let badgeTS15 =
` <span
class="py-1 px-2 inline-flex items-center gap-x-1 text-xs font-medium bg-primary/10 text-primary/80 rounded-full">
<svg class="flex-shrink-0 size-3" xmlns="http://www.w3.org/2000/svg" width="24"
    height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path
        d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
    <path d="m9 12 2 2 4-4" />
</svg>
Connected
</span>

<span
class="py-1 px-1.5 inline-flex items-center gap-x-1 text-xs font-medium bg-secondary/10 text-secondary/80 rounded-full">
<svg class="flex-shrink-0 size-3" xmlns="http://www.w3.org/2000/svg" width="24"
    height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path
        d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
    <path d="M12 9v4" />
    <path d="M12 17h.01" />
</svg>
Attention
</span>

<span
class="py-1 px-1.5 inline-flex items-center gap-x-1 text-xs font-medium bg-warning/10 text-warning/80 rounded-full">
<svg class="flex-shrink-0 size-3" xmlns="http://www.w3.org/2000/svg" width="24"
    height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <line x1="12" x2="12" y1="2" y2="6" />
    <line x1="12" x2="12" y1="18" y2="22" />
    <line x1="4.93" x2="7.76" y1="4.93" y2="7.76" />
    <line x1="16.24" x2="19.07" y1="16.24" y2="19.07" />
    <line x1="2" x2="6" y1="12" y2="12" />
    <line x1="18" x2="22" y1="12" y2="12" />
    <line x1="4.93" x2="7.76" y1="19.07" y2="16.24" />
    <line x1="16.24" x2="19.07" y1="7.76" y2="4.93" />
</svg>
Loading
</span>

<span
class="py-1 px-2 inline-flex items-center gap-x-1 text-xs bg-info/10 text-info/80 rounded-full">
<svg class="flex-shrink-0 size-3" xmlns="http://www.w3.org/2000/svg" width="24"
    height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M18.36 6.64a9 9 0 1 1-12.73 0" />
    <line x1="12" x2="12" y1="2" y2="12" />
</svg>
Disabled
</span>

<span
class="py-1 px-1.5 inline-flex items-center gap-x-1 text-xs font-medium bg-success/10 text-success/80 rounded-full">
<svg class="flex-shrink-0 size-3" xmlns="http://www.w3.org/2000/svg" width="24"
    height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
    <polyline points="16 7 22 7 22 13" />
</svg>
14.5%
</span>

<span
class="py-1 px-1.5 inline-flex items-center gap-x-1 text-xs font-medium bg-danger/10 text-danger/80 rounded-full">
<svg class="flex-shrink-0 size-3" xmlns="http://www.w3.org/2000/svg" width="24"
    height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <polyline points="22 17 13.5 8.5 8.5 13.5 2 7" />
    <polyline points="16 17 22 17 22 11" />
</svg>
2%
</span>

<span
class="py-1 px-1.5 inline-flex items-center gap-x-1 text-xs bg-primary/10 text-primary/80 rounded-full">
<svg class="flex-shrink-0 size-3" xmlns="http://www.w3.org/2000/svg" width="24"
    height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
    <polyline points="16 7 22 7 22 13" />
</svg>
37.3%
</span>

<span
class="py-1 px-1.5 inline-flex items-center gap-x-1 text-xs bg-secondary/10 text-secondary/80 rounded-full">
<svg class="flex-shrink-0 size-3" xmlns="http://www.w3.org/2000/svg" width="24"
    height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <polyline points="22 17 13.5 8.5 8.5 13.5 2 7" />
    <polyline points="16 17 22 17 22 11" />
</svg>
56%
</span>`
export let badgeTS16 =
`   <span
class="inline-flex items-center gap-x-1.5 py-1.5 ps-3 pe-2 rounded-full text-xs font-medium bg-primary/10 text-primary/80">
Badge
<button type="button"
    class="flex-shrink-0 size-4 inline-flex items-center justify-center rounded-full hover:bg-primary/20 focus:outline-none focus:bg-primary/20 focus:text-primary/50 dark:hover:bg-primary/90">
    <span class="sr-only">Remove badge</span>
    <i class="ti ti-x size-3"></i>
</button>
</span>
<span
class="inline-flex items-center gap-x-1.5 py-1.5 ps-3 pe-2 rounded-full text-xs font-medium bg-secondary/10 text-secondary/80">
Badge
<button type="button"
    class="flex-shrink-0 size-4 inline-flex items-center justify-center rounded-full hover:bg-secondary/20 focus:outline-none focus:bg-secondary/20 focus:text-secondary/50 dark:hover:bg-secondary/90">
    <span class="sr-only">Remove badge</span>
    <i class="ti ti-x size-3"></i>
</button>
</span>
<span
class="inline-flex items-center gap-x-1.5 py-1.5 ps-3 pe-2 rounded-full text-xs font-medium bg-success/10 text-success/80">
Badge
<button type="button"
    class="flex-shrink-0 size-4 inline-flex items-center justify-center rounded-full hover:bg-success/20 focus:outline-none focus:bg-success/20 focus:text-success/50 dark:hover:bg-success/90">
    <span class="sr-only">Remove badge</span>
    <i class="ti ti-x size-3"></i>
</button>
</span>
<span
class="inline-flex items-center gap-x-1.5 py-1.5 ps-3 pe-2 rounded-full text-xs font-medium bg-warning/10 text-warning/80">
Badge
<button type="button"
    class="flex-shrink-0 size-4 inline-flex items-center justify-center rounded-full hover:bg-warning/20 focus:outline-none focus:bg-warning/20 focus:text-warning/50 dark:hover:bg-warning/90">
    <span class="sr-only">Remove badge</span>
    <i class="ti ti-x size-3"></i>
</button>
</span>
<span
class="inline-flex items-center gap-x-1.5 py-1.5 ps-3 pe-2 rounded-full text-xs font-medium bg-info/10 text-info/80">
Badge
<button type="button"
    class="flex-shrink-0 size-4 inline-flex items-center justify-center rounded-full hover:bg-info/20 focus:outline-none focus:bg-info/20 focus:text-info/50 dark:hover:bg-info/90">
    <span class="sr-only">Remove badge</span>
    <i class="ti ti-x size-3"></i>
</button>
</span>
<span
class="inline-flex items-center gap-x-1.5 py-1.5 ps-3 pe-2 rounded-full text-xs font-medium bg-danger/10 text-danger/80">
Badge
<button type="button"
    class="flex-shrink-0 size-4 inline-flex items-center justify-center rounded-full hover:bg-danger/20 focus:outline-none focus:bg-danger/20 focus:text-danger/50 dark:hover:bg-danger/90">
    <span class="sr-only">Remove badge</span>
    <i class="ti ti-x size-3"></i>
</button>
</span>`
export let badgeTS17 =
`   <div
class="inline-flex flex-nowrap items-center border border-defaultborder rounded-full p-1.5 pe-3 dark:border-white/10">
<img class="me-1.5 mb-0 inline-block avatar avatar-xs avatar-rounded"
    src="./assets/images/faces/10.jpg" alt="Image Description">
<div
    class="whitespace-nowrap text-sm font-medium text-defaulttextcolor dark:text-white">
    Christina
</div>
</div>
<div
class="inline-flex flex-nowrap items-center border border-defaultborder rounded-full p-1.5 dark:border-white/10">
<img class="me-1.5 mb-0 inline-block avatar avatar-xs avatar-rounded"
    src="./assets/images/faces/11.jpg" alt="Image Description">
<div
    class="whitespace-nowrap text-sm font-medium text-defaulttextcolor dark:text-white">
    Mark
</div>
</div>
<div
class="inline-flex flex-nowrap items-center border border-defaultborder rounded-full p-1.5 dark:border-white/10">
<img class="me-1.5 mb-0 inline-block avatar avatar-xs avatar-rounded"
    src="./assets/images/faces/12.jpg" alt="Image Description">
<div
    class="whitespace-nowrap text-sm font-medium text-defaulttextcolor dark:text-white">
    Bhamako
</div>
</div>
<div
class="inline-flex flex-nowrap items-center border border-defaultborder rounded-full p-1.5 dark:border-white/10">
<img class="me-1.5 mb-0 inline-block avatar avatar-xs avatar-rounded"
    src="./assets/images/faces/13.jpg" alt="Image Description">
<div
    class="whitespace-nowrap text-sm font-medium text-defaulttextcolor dark:text-white">
    Wicky cross
</div>
</div>
<div
class="inline-flex flex-nowrap items-center border border-defaultborder rounded-full p-1.5 dark:border-white/10">
<img class="me-1.5 mb-0 inline-block avatar avatar-xs avatar-rounded"
    src="./assets/images/faces/14.jpg" alt="Image Description">
<div
    class="whitespace-nowrap text-sm font-medium text-defaulttextcolor dark:text-white">
    Brodus
</div>
</div>`
export let badgeTS18 =
`      <button type="button"
class="m-1 ms-0 relative flex justify-center items-center size-[35px] text-sm font-semibold rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
<svg class="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24"
    height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="m5 11 4-7" />
    <path d="m19 11-4-7" />
    <path d="M2 11h20" />
    <path d="m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8c.9 0 1.8-.7 2-1.6l1.7-7.4" />
    <path d="m9 11 1 9" />
    <path d="M4.5 15.5h15" />
    <path d="m15 11-1 9" />
</svg>
<span class="flex absolute top-0 end-0 size-3 -mt-1.5 -me-1.5">
    <span
        class="animate-ping absolute inline-flex size-full rounded-full bg-danger/40 opacity-75 dark:bg-danger/60"></span>
    <span class="relative inline-flex rounded-full size-3 bg-danger/50"></span>
</span>
</button>
<button type="button"
class="m-1 ms-0 relative py-1 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 dark:bg-bodybg dark:border-white/10 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
Notification
<span class="flex absolute top-0 end-0 -mt-2 -me-2">
    <span
        class="animate-ping absolute inline-flex size-full rounded-full bg-danger/40 opacity-75"></span>
    <span
        class="relative inline-flex text-xs bg-danger/50 text-white rounded-full py-0.5 px-1.5">
        9+
    </span>
</span>
</button>`
//butytonGroup 
export let buttongroupTS1 = 
`  <div class="inline-flex rounded-md shadow-sm me-5">
                  <button type="button"
                      class="ti-btn-group py-3 px-4 border bg-white dark:bg-bodybg  hover:bg-gray-50 focus:ring-primary dark:bg-bgdark dark:hover:bg-black/20 dark:border-white/10 ">
                      Year
                  </button>
                  <button type="button"
                      class="ti-btn-group py-3 px-4 border bg-white dark:bg-bodybg  hover:bg-gray-50 focus:ring-primary dark:bg-bgdark dark:hover:bg-black/20 dark:border-white/10 ">
                      Month
                  </button>
                  <button type="button"
                      class="ti-btn-group py-3 px-4 border bg-white dark:bg-bodybg  hover:bg-gray-50 focus:ring-primary dark:bg-bgdark dark:hover:bg-black/20 dark:border-white/10 ">
                      Date
                  </button>
              </div>`;
export let buttongroupTS2 = 
`  <div class="ti-btn-group !gap-0 !p-0" role="group" aria-label="Basic mixed styles example">
                  <button type="button" class="ti-btn-group py-3 px-4 border !border-danger ti-btn-danger btn-wave">Year</button>
                  <button type="button" class="ti-btn-group py-3 px-4 border !border-warning ti-btn-warning btn-wave">Month</button>
                  <button type="button" class="ti-btn-group py-3 px-4 border !border-success ti-btn-success btn-wave">Date</button>
              </div>`;
export let buttongroupTS3 = 
`  <div class="flex flex-col md:inline-flex md:flex-row rounded-sm shadow-sm">
                  <button type="button"
                      class="py-2 px-3 inline-flex justify-center items-center gap-2 -mt-px -ms-px first:rounded-t-sm last:rounded-b-sm sm:first:rounded-s-sm sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-sm border font-medium bg-white dark:bg-bodybg  align-middle hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-0 focus:ring-primary transition-all text-sm dark:bg-bgdark dark:hover:bg-black/20 dark:border-white/10 ">
                      Item 1
                  </button>
                  <button type="button"
                      class="py-2 px-3 inline-flex justify-center items-center gap-2 -mt-px -ms-px first:rounded-t-sm last:rounded-b-sm sm:first:rounded-s-sm sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-sm border font-medium bg-white dark:bg-bodybg  align-middle hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-0 focus:ring-primary transition-all text-sm dark:bg-bgdark dark:hover:bg-black/20 dark:border-white/10 ">
                      Item 2
                  </button>
                  <button type="button"
                      class="py-2 px-3 inline-flex justify-center items-center gap-2 -mt-px -ms-px first:rounded-t-sm last:rounded-b-sm sm:first:rounded-s-sm sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-sm border font-medium bg-white dark:bg-bodybg  align-middle hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-0 focus:ring-primary transition-all text-sm dark:bg-bgdark dark:hover:bg-black/20 dark:border-white/10 ">
                      Item 3
                  </button>
              </div>`;
export let buttongroupTS4 = 
`               <div class="inline-flex rounded-md shadow-sm me-6">
                          <button type="button"
                              class="ti-btn-group border py-3 px-4 bg-white dark:bg-bodybg  hover:bg-gray-50 focus:ring-primary dark:bg-bgdark dark:hover:bg-black/20 dark:border-white/10 ">
                              Small
                          </button>
                          <button type="button"
                              class="ti-btn-group border py-3 px-4 bg-white dark:bg-bodybg  hover:bg-gray-50 focus:ring-primary dark:bg-bgdark dark:hover:bg-black/20 dark:border-white/10 ">
                              Small
                          </button>
                          <button type="button"
                              class="ti-btn-group border py-3 px-4 bg-white dark:bg-bodybg  hover:bg-gray-50 focus:ring-primary dark:bg-bgdark dark:hover:bg-black/20 dark:border-white/10 ">
                              Small
                          </button>
                      </div>

                      <div class="inline-flex rounded-md shadow-sm me-6">
                          <button type="button"
                              class="ti-btn-group bg-white dark:bg-bodybg border  hover:bg-gray-50 focus:ring-primary dark:bg-bgdark dark:hover:bg-black/20 dark:border-white/10  sm:p-4 p-3">
                              Default
                          </button>
                          <button type="button"
                              class="ti-btn-group bg-white dark:bg-bodybg border  hover:bg-gray-50 focus:ring-primary dark:bg-bgdark dark:hover:bg-black/20 dark:border-white/10  sm:p-4 p-3">
                              Default
                          </button>
                          <button type="button"
                              class="ti-btn-group bg-white dark:bg-bodybg border  hover:bg-gray-50 focus:ring-primary dark:bg-bgdark dark:hover:bg-black/20 dark:border-white/10  sm:p-4 p-3">
                              Default
                          </button>
                      </div>

                      <div class="inline-flex rounded-md shadow-sm">
                          <button type="button"
                              class="ti-btn-group bg-white dark:bg-bodybg border  hover:bg-gray-50 focus:ring-primary dark:bg-bgdark dark:hover:bg-black/20 dark:border-white/10  p-[1.3125rem]">
                              Large
                          </button>
                          <button type="button"
                              class="ti-btn-group bg-white dark:bg-bodybg border  hover:bg-gray-50 focus:ring-primary dark:bg-bgdark dark:hover:bg-black/20 dark:border-white/10  p-[1.3125rem]">
                              Large
                          </button>
                          <button type="button"
                              class="ti-btn-group bg-white dark:bg-bodybg border  hover:bg-gray-50 focus:ring-primary dark:bg-bgdark dark:hover:bg-black/20 dark:border-white/10  p-[1.3125rem]">
                              Large
                          </button>
                      </div>`;
export let buttongroupTS5 = 
`  <div class="max-w-xs flex flex-col rounded-sm shadow-sm">
                          <button type="button"
                              class="focus-visible:outline-none focus:!outline-none py-2 px-3 inline-flex justify-center items-center gap-2 rounded-t-md border font-medium bg-white dark:bg-bodybg  align-middle hover:bg-gray-50 focus:z-10 focus:ring-0 focus:ring-primary transition-all text-sm dark:bg-bgdark dark:hover:bg-black/20 dark:border-white/10 ">
                              Item 1
                          </button>
                          <button type="button"
                              class="-mt-px focus-visible:outline-none focus:!outline-none py-2 px-3 inline-flex justify-center items-center gap-2 border font-medium bg-white dark:bg-bodybg  align-middle hover:bg-gray-50 focus:z-10 focus:ring-0 focus:ring-primary transition-all text-sm dark:bg-bgdark dark:hover:bg-black/20 dark:border-white/10 ">
                              Item 2
                          </button>
                          <button type="button"
                              class="-mt-px focus-visible:outline-none focus:!outline-none py-2 px-3 inline-flex justify-center items-center gap-2 rounded-b-md border font-medium bg-white dark:bg-bodybg  align-middle hover:bg-gray-50 focus:z-10 focus:ring-0 focus:ring-primary transition-all text-sm dark:bg-bgdark dark:hover:bg-black/20 dark:border-white/10 ">
                              Item 3
                          </button>
                      </div>`;
export let buttongroupTS6 = 
` <div class="inline-flex rounded-md shadow-sm mb-5 me-5">
                  <button type="button" class="ti-btn-group btn-wave py-3 px-4 border bg-white dark:bg-bodybg  hover:bg-gray-50 focus:ring-primary dark:bg-bgdark dark:hover:bg-black/20 dark:border-white/10 ">
                    Year
                  </button>
                  <button type="button" class="ti-btn-group btn-wave py-3 px-4 border bg-white dark:bg-bodybg  hover:bg-gray-50 focus:ring-primary dark:bg-bgdark dark:hover:bg-black/20 dark:border-white/10 ">
                    Month
                  </button>
                  <button type="button" class="ti-btn-group btn-wave py-3 px-4 border bg-white dark:bg-bodybg  hover:bg-gray-50 focus:ring-primary dark:bg-bgdark dark:hover:bg-black/20 dark:border-white/10 ">
                    Date
                  </button>
                </div>
                <div class="inline-flex rounded-md shadow-sm mb-5 me-5">
                  <button type="button" class="ti-btn-group btn-wave py-3 px-4 border ti-btn-primary border-white/10 dark:border-white/10">
                    Year
                  </button>
                  <button type="button" class="ti-btn-group btn-wave py-3 px-4 border ti-btn-primary border-white/10 dark:border-white/10">
                    Month
                  </button>
                  <button type="button" class="ti-btn-group btn-wave py-3 px-4 border ti-btn-primary border-white/10 dark:border-white/10">
                    Date
                  </button>
                </div>
                <div class="inline-flex rounded-md shadow-sm mb-5 me-5">
                  <button type="button" class="ti-btn-group btn-wave py-3 px-4 border ti-btn-secondary border-white/10 dark:border-white/10">
                    Year
                  </button>
                  <button type="button" class="ti-btn-group btn-wave py-3 px-4 border ti-btn-secondary border-white/10 dark:border-white/10">
                    Month
                  </button>
                  <button type="button" class="ti-btn-group btn-wave py-3 px-4 border ti-btn-secondary border-white/10 dark:border-white/10">
                    Date
                  </button>
                </div>
                <div class="inline-flex rounded-md shadow-sm mb-5 me-5">
                  <button type="button" class="ti-btn-group btn-wave py-3 px-4 border ti-btn-warning border-white/10 dark:border-white/10">
                    Year
                  </button>
                  <button type="button" class="ti-btn-group btn-wave py-3 px-4 border ti-btn-warning border-white/10 dark:border-white/10">
                    Month
                  </button>
                  <button type="button" class="ti-btn-group btn-wave py-3 px-4 border ti-btn-warning border-white/10 dark:border-white/10">
                    Date
                  </button>
                </div>
                <div class="inline-flex rounded-md shadow-sm mb-5 me-5">
                  <button type="button" class="ti-btn-group btn-wave py-3 px-4 border ti-btn-danger border-white/10 dark:border-white/10">
                    Year
                  </button>
                  <button type="button" class="ti-btn-group btn-wave py-3 px-4 border ti-btn-danger border-white/10 dark:border-white/10">
                    Month
                  </button>
                  <button type="button" class="ti-btn-group btn-wave py-3 px-4 border ti-btn-danger border-white/10 dark:border-white/10">
                    Date
                  </button>
                </div>
                <div class="inline-flex rounded-md shadow-sm mb-5 me-5">
                  <button type="button" class="ti-btn-group btn-wave py-3 px-4 border ti-btn-info border-white/10 dark:border-white/10">
                    Year
                  </button>
                  <button type="button" class="ti-btn-group btn-wave py-3 px-4 border ti-btn-info border-white/10 dark:border-white/10">
                    Month
                  </button>
                  <button type="button" class="ti-btn-group btn-wave py-3 px-4 border ti-btn-info border-white/10 dark:border-white/10">
                    Date
                  </button>
                </div>
                <div class="inline-flex rounded-md shadow-sm mb-0">
                  <button type="button" class="ti-btn-group btn-wave py-3 px-4 border ti-btn-success border-white/10 dark:border-white/10">
                    Year
                  </button>
                  <button type="button" class="ti-btn-group btn-wave py-3 px-4 border ti-btn-success border-white/10 dark:border-white/10">
                    Month
                  </button>
                  <button type="button" class="ti-btn-group btn-wave py-3 px-4 border ti-btn-success border-white/10 dark:border-white/10">
                    Date
                  </button>
                </div>`;

export let imageTS1 =
`  <p class="box-title mb-4 !text-[0.813rem] !font-normal">Use <code> .img-fluid </code>class to the img tag to get responsive image.</p>
<div class="text-center">
    <img src="./assets/images/media/media-48.jpg" class="img-fluid !inline-flex" alt="...">
</div>` 
export let imageTS2 =
`   <p class="box-title mb-4 !text-[0.813rem] !font-normal">Use <code>.rounded-md</code> class along with <code>.img-fluid</code> to get border radius.</p>
<div class="text-center">
    <img src="./assets/images/media/media-49.jpg" class="img-fluid !rounded-md !inline-flex" alt="...">
</div>` 
export let imageTS3 =
`  <p class="box-title mb-4 !text-[0.813rem] !font-normal">Use <code>.rounded-md</code> class along with <code>.img-fluid</code> to get border radius.</p>
<div class="text-center">
    <img src="./assets/images/media/media-49.jpg" class="img-fluid !rounded-md !inline-flex" alt="...">
</div>` 
export let imageTS4 =
` <p class="box-title mb-4 !text-[0.813rem] !font-normal">Use <code>.rounded-full</code> class to <code>img</code> tag to get rounded image.</p>
<div class="text-center">
    <img src="./assets/images/media/media-50.jpg" class="img-fluid !rounded-full !inline-flex" alt="...">
</div>` 
export let imageTS5 =
`                    <img class="!rounded-md float-start" src="./assets/images/media/media-53.jpg" alt="...">
` 
export let imageTS6 =
`                    <img class="!rounded-md mx-auto block" src="./assets/images/media/media-55.jpg" alt="...">
`
 export let imageTS7 =
`                    <img class="!rounded-md ltr:float-right rtl:float-left" src="./assets/images/media/media-54.jpg" alt="...">
` 
export let imageTS8 =
`    <div class="flex justify-between gap-2">
<figure class="figure inline-block mb-4">
    <img class="m-[0.125rem] leading-none img-fluid rounded-md w-full" src="./assets/images/media/media-56.jpg" alt="...">
    <figcaption class="text-[0.875em] text-textmuted dark:text-white/70 mt-2">A caption for the above image.
    </figcaption>
</figure>
<figure class="figure ltr:float-right rtl:float-left">
    <img class="m-[0.125rem] leading-none img-fluid rounded-md w-full" src="./assets/images/media/media-57.jpg" alt="...">
    <figcaption class="text-[0.875em] text-textmuted dark:text-white/70 text-end mt-2">A caption for the above image.
    </figcaption>
</figure>
</div>` 
export let imageTS9 =
`   <p class="mb-3">Use <code>ti-img-thumbnail</code> to give an image a rounded 1px border.</p>
<div class="text-center">
    <img src="./assets/images/media/media-51.jpg" class="ti-img-thumbnail" alt="...">
</div>` 

export let objectTS1 = 
` <img src="./assets/images/media/media-28.jpg"
class="object-contain border dark:border-defaultborder/10 !rounded-md"
alt="...">`
export let objectTS2 = 
` <img src="./assets/images/media/media-28.jpg"
class="object-cover border dark:border-defaultborder/10 md:!rounded-md" alt="...">`
export let objectTS3 = 
` <img src="./assets/images/media/media-28.jpg"
class="object-fill border dark:border-defaultborder/10 !rounded-md" alt="...">`
export let objectTS4 =
`    <img src="./assets/images/media/media-28.jpg"
class="object-scale-down border dark:border-defaultborder/10 !rounded-md" alt="...">
`
export let objectTS5 =
` <img src="./assets/images/media/media-28.jpg"
class="object-none border dark:border-defaultborder/10 !rounded-md" alt="...">`
export let objectTS6 =
` <img src="./assets/images/media/media-28.jpg"
class="sm:object-contain border dark:border-defaultborder/10 !rounded-md" alt="...">`
export let objectTS7 =
` <img src="./assets/images/media/media-28.jpg"
class="md:object-contain border dark:border-defaultborder/10 !rounded-md" alt="...">`
export let objectTS8 =
`<img src="./assets/images/media/media-28.jpg"
class="lg:object-contain border dark:border-defaultborder/10 !rounded-md" alt="...">`
export let objectTS9 =
`  <img src="./assets/images/media/media-28.jpg"
class="xl:object-contain border dark:border-defaultborder/10 !rounded-md" alt="...">`
export let objectTS10 =
`  <img src="./assets/images/media/media-28.jpg"
class="xxl:object-contain border dark:border-defaultborder/10 !rounded-md"
alt="...">`
export let objectTS11 =
` <video src="./assets/video/1.mp4"
class="object-contain !rounded-md border dark:border-defaultborder/10"
autoplay loop muted></video>`
export let objectTS12 =
` <video src="./assets/video/1.mp4"
class="object-cover !rounded-md border dark:border-defaultborder/10"
autoplay loop muted></video>`
export let objectTS13 =
`<video src="./assets/video/1.mp4"
class="object-fill !rounded-md border dark:border-defaultborder/10"
autoplay loop muted></video>`
export let objectTS14 =
` <video src="./assets/video/1.mp4"
class="object-scale-down !rounded-md border dark:border-defaultborder/10"
autoplay loop muted></video>`
export let objectTS15 =
`  <video src="./assets/video/1.mp4"
class="object-none !rounded-md border dark:border-defaultborder/10"
autoplay loop muted></video>`

export let paginationTS1 = 
`  <nav aria-label="Page navigation">
<ul class="ti-pagination  mb-0">
    <li class="page-item disabled"><a class="page-link px-3 py-[0.375rem]" href="javascript:void(0);">Previous</a></li>
    <li class="page-item"><a class="page-link px-3 py-[0.375rem]" href="javascript:void(0);">1</a></li>
    <li class="page-item"><a class="page-link px-3 py-[0.375rem]" href="javascript:void(0);">2</a></li>
    <li class="page-item"><a class="page-link px-3 py-[0.375rem]" href="javascript:void(0);">Next</a></li>
</ul>
</nav>`
export let paginationTS2 = 
`    <nav aria-label="Page navigation">
<ul class="ti-pagination mb-0">
    <li class="page-item">
        <a class="page-link px-3 py-[0.375rem]" href="javascript:void(0);" aria-label="Previous">
            <span aria-hidden="true"><i class="rtl:rotate-180 bx bx-chevron-left"></i></span>
        </a>
    </li>
    <li class="page-item"><a class="page-link px-3 py-[0.375rem]" href="javascript:void(0);">1</a></li>
    <li class="page-item"><a class="page-link px-3 py-[0.375rem]" href="javascript:void(0);">2</a></li>
    <li class="page-item"><a class="page-link px-3 py-[0.375rem]" href="javascript:void(0);">3</a></li>
    <li class="page-item">
        <a class="page-link  px-3 py-[0.375rem]" href="javascript:void(0);" aria-label="Next">
            <span aria-hidden="true"><i class="rtl:rotate-180 bx bx-chevron-right"></i></span>
        </a>
    </li>
</ul>
</nav>`
export let paginationTS3 = 
`  <div class="box-body flex flex-wrap justify-between gap-2">
<nav aria-label="...">
    <ul class="ti-pagination pagination-sm mb-0">
        <li class="page-item " aria-current="page">
            <span class="page-link  active px-3 py-[0.375rem]">1</span>
        </li>
        <li class="page-item"><a class="page-link px-3 py-[0.375rem]" href="javascript:void(0);">2</a></li>
        <li class="page-item"><a class="page-link px-3 py-[0.375rem]" href="javascript:void(0);">3</a></li>
    </ul>
</nav>
<nav aria-label="...">
    <ul class="ti-pagination mb-0">
        <li class="page-item " aria-current="page">
            <span class="page-link  active px-3 py-[0.375rem]">1</span>
        </li>
        <li class="page-item"><a class="page-link px-3 py-[0.375rem]" href="javascript:void(0);">2</a></li>
        <li class="page-item"><a class="page-link px-3 py-[0.375rem]" href="javascript:void(0);">3</a></li>
    </ul>
</nav>
<nav aria-label="...">
    <ul class="ti-pagination pagination-lg mb-0">
        <li class="page-item " aria-current="page">
            <span class="page-link active px-3 py-[0.375rem]">1</span>
        </li>
        <li class="page-item"><a class="page-link px-3 py-[0.375rem]" href="javascript:void(0);">2</a></li>
        <li class="page-item"><a class="page-link px-3 py-[0.375rem]" href="javascript:void(0);">3</a></li>
    </ul>
</nav>
</div>`
export let paginationTS4 =
`  <div class="box-body">
<nav aria-label="Page navigation" class="mb-4">
    <ul class="ti-pagination justify-center">
        <li class="page-item disabled">
            <a class="page-link px-3 py-[0.375rem]">Previous</a>
        </li>
        <li class="page-item"><a class="page-link px-3 py-[0.375rem]" href="javascript:void(0);">1</a></li>
        <li class="page-item"><a class="page-link px-3 py-[0.375rem]" href="javascript:void(0);">2</a></li>
        <li class="page-item"><a class="page-link px-3 py-[0.375rem]" href="javascript:void(0);">3</a></li>
        <li class="page-item">
            <a class="page-link px-3 py-[0.375rem]" href="javascript:void(0);">Next</a>
        </li>
    </ul>
</nav>
<nav aria-label="Page navigation">
    <ul class="ti-pagination sm:justify-end justify-center mb-0">
        <li class="page-item disabled">
            <a class="page-link px-3 py-[0.375rem]">Previous</a>
        </li>
        <li class="page-item"><a class="page-link px-3 py-[0.375rem]" href="javascript:void(0);">1</a></li>
        <li class="page-item"><a class="page-link px-3 py-[0.375rem]" href="javascript:void(0);">2</a></li>
        <li class="page-item"><a class="page-link px-3 py-[0.375rem]" href="javascript:void(0);">3</a></li>
        <li class="page-item">
            <a class="page-link px-3 py-[0.375rem]" href="javascript:void(0);">Next</a>
        </li>
    </ul>
</nav>
</div>`
export let paginationTS5 =
`   <div class="box-body flex flex-wrap">
<nav aria-label="..." class="me-4">
    <ul class="ti-pagination">
        <li class="page-item disabled">
            <a class="page-link px-3 py-[0.375rem]">Previous</a>
        </li>
        <li class="page-item"><a class="page-link px-3 py-[0.375rem]" href="javascript:void(0);">1</a></li>
        <li class="page-item " aria-current="page">
            <a class="page-link active px-3 py-[0.375rem]" href="javascript:void(0);">2</a>
        </li>
        <li class="page-item">
            <a class="page-link px-3 py-[0.375rem]" href="javascript:void(0);">Next</a>
        </li>
    </ul>
</nav>
<nav aria-label="...">
    <ul class="ti-pagination">
        <li class="page-item disabled">
            <span class="page-link px-3 py-[0.375rem]">Previous</span>
        </li>
        <li class="page-item"><a class="page-link px-3 py-[0.375rem]" href="javascript:void(0);">1</a></li>
        <li class="page-item " aria-current="page">
            <span class="page-link px-3 active py-[0.375rem]">2</span>
        </li>
        <li class="page-item">
            <a class="page-link px-3 py-[0.375rem]" href="javascript:void(0);">Next</a>
        </li>
    </ul>
</nav>
</div>`
export let paginationTS6 =
`    <div class="box-body">
<nav aria-label="Page navigation" class="pagination-style-1">
    <ul class="ti-pagination mb-0">
        <li class="page-item disabled rtl:rotate-180">
            <a aria-label="anchor" class="page-link" href="javascript:void(0);">
                <i class="ri-arrow-left-s-line align-middle"></i>
            </a>
        </li>
        <li class="page-item"><a class="page-link" href="javascript:void(0);">1</a></li>
        <li class="page-item "><a class="page-link active" href="javascript:void(0);">2</a></li>
        <li class="page-item">
            <a aria-label="anchor" class="page-link" href="javascript:void(0);">
                <i class="bi bi-three-dots"></i>
            </a>
        </li>
        <li class="page-item"><a class="page-link" href="javascript:void(0);">21</a></li>
        <li class="page-item rtl:rotate-180">
            <a aria-label="anchor" class="page-link" href="javascript:void(0);">
                <i class="ri-arrow-right-s-line align-middle"></i>
            </a>
        </li>
    </ul>
</nav>
</div>`
export let paginationTS7 =
`   <div class="box-body">
<nav aria-label="Page navigation" class="pagination-style-2">
    <ul class="ti-pagination mb-0 flex-wrap">
        <li class="page-item disabled">
            <a class="page-link px-3 py-[0.375rem] !border-0" href="javascript:void(0);">
                Prev
            </a>
        </li>
        <li class="page-item active"><a class="page-link px-3 py-[0.375rem] !border-0" href="javascript:void(0);">1</a></li>
        <li class="page-item"><a class="page-link px-3 py-[0.375rem] !border-0" href="javascript:void(0);">2</a></li>
        <li class="page-item">
            <a aria-label="anchor" class="page-link px-3 py-[0.375rem] !border-0" href="javascript:void(0);">
                <i class="bi bi-three-dots"></i>
            </a>
        </li>
        <li class="page-item"><a class="page-link px-3 py-[0.375rem] !border-0" href="javascript:void(0);">17</a></li>
        <li class="page-item">
            <a class="page-link px-3 py-[0.375rem] !text-primary !border-0" href="javascript:void(0);">
                next
            </a>
        </li>
    </ul>
</nav>
</div> `
export let paginationTS8 =
` <div class="box-body">
<nav aria-label="Page navigation" class="pagination-style-3">
    <ul class="ti-pagination mb-0 flex-wrap">
        <li class="page-item disabled">
            <a class="page-link" href="javascript:void(0);">
                Prev
            </a>
        </li>
        <li class="page-item "><a class="page-link active" href="javascript:void(0);">1</a></li>
        <li class="page-item"><a class="page-link" href="javascript:void(0);">2</a></li>
        <li class="page-item">
            <a aria-label="anchor" class="page-link" href="javascript:void(0);">
                <i class="bi bi-three-dots"></i>
            </a>
        </li>
        <li class="page-item"><a class="page-link" href="javascript:void(0);">16</a></li>
        <li class="page-item">
            <a class="page-link !text-primary" href="javascript:void(0);">
                next
            </a>
        </li>
    </ul>
</nav>
</div>`
export let paginationTS9 =
`   <div class="box-body">
<nav aria-label="Page navigation" class="pagination-style-4">
    <ul class="ti-pagination mb-0 flex-wrap">
        <li class="page-item disabled">
            <a class="page-link" href="javascript:void(0);">
                Prev
            </a>
        </li>
        <li class="page-item "><a class="page-link active" href="javascript:void(0);">1</a></li>
        <li class="page-item"><a class="page-link" href="javascript:void(0);">2</a></li>
        <li class="page-item">
            <a aria-label="anchor" class="page-link" href="javascript:void(0);">
                <i class="bi bi-three-dots"></i>
            </a>
        </li>
        <li class="page-item"><a class="page-link" href="javascript:void(0);">16</a></li>
        <li class="page-item">
            <a class="page-link !text-primary" href="javascript:void(0);">
                next
            </a>
        </li>
    </ul>
</nav>
</div>`
export let paginationTS10 =`
<!-- Pagination -->
<nav class="flex items-center gap-x-1">
    <button type="button"
        class="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex jusify-center items-center gap-x-2 text-sm rounded-md text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
        <i class="ri-arrow-left-s-line align-middle rtl:rotate-180"></i>
        <span aria-hidden="true" class="sr-only">Previous</span>
    </button>
    <div class="flex items-center gap-x-1">
        <button type="button"
            class="min-h-[38px] min-w-[38px] flex justify-center items-center bg-primary text-white py-2 px-3 text-sm rounded-md focus:outline-none focus:bg-gray-300 disabled:opacity-50 disabled:pointer-events-none dark:bg-primary dark:text-white dark:focus:bg-gray-500"
            aria-current="page">1</button>
        <div class="hs-tooltip ti-main-tooltip">
            <button type="button"
                class="hs-tooltip-toggle group min-h-[38px] min-w-[38px] flex justify-center items-center text-gray-400 hover:text-primary p-2 text-sm rounded-md focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:text-primary dark:focus:bg-white/10">
                <span class="group-hover:hidden text-xs">•••</span>
                <svg class="group-hover:block hidden flex-shrink-0 size-5"
                    xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="m6 17 5-5-5-5" />
                    <path d="m13 17 5-5-5-5" />
                </svg>
                <span
                    class="hs-tooltip-content ti-main-tooltip-content py-1 px-2 bg-gray-900 text-xs font-medium text-white shadow-sm dark:bg-bodybg"
                    role="tooltip">
                    Next 4 pages
                </span>
            </button>
        </div>
        <button type="button"
            class="min-h-[38px] min-w-[38px] flex justify-center items-center text-gray-800 hover:bg-gray-100 py-2 px-3 text-sm rounded-md focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">8</button>
    </div>
    <button type="button"
        class="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex jusify-center items-center gap-x-2 text-sm rounded-md text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
        <span aria-hidden="true" class="sr-only">Next</span>
        <i class="ri-arrow-right-s-line align-middle rtl:rotate-180"></i>
    </button>
</nav>
<!-- End Pagination -->

<!-- Pagination -->
<nav class="flex items-center gap-x-1">
    <button type="button"
        class="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-md border border-transparent text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-transparent dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
        <i class="ri-arrow-left-s-line align-middle rtl:rotate-180"></i>
        <span aria-hidden="true" class="sr-only">Previous</span>
    </button>
    <div class="flex items-center gap-x-1">
        <button type="button"
            class="min-h-[38px] min-w-[38px] flex justify-center items-center border border-primary text-primary py-2 px-3 text-sm rounded-md focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:border-primary dark:text-primary dark:focus:bg-white/10"
            aria-current="page">1</button>
        <div class="hs-tooltip ti-main-tooltip">
            <button type="button"
                class="hs-tooltip-toggle group min-h-[38px] min-w-[38px] flex justify-center items-center text-gray-400 hover:text-primary p-2 text-sm rounded-md focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:text-primary dark:focus:bg-white/10">
                <span class="group-hover:hidden text-xs">•••</span>
                <svg class="group-hover:block hidden flex-shrink-0 size-5"
                    xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="m6 17 5-5-5-5" />
                    <path d="m13 17 5-5-5-5" />
                </svg>
                <span
                    class="hs-tooltip-content ti-main-tooltip-content py-1 px-2 bg-gray-900 text-xs font-medium text-white shadow-sm dark:bg-bodybg"
                    role="tooltip">
                    Next 4 pages
                </span>
            </button>
        </div>
        <button type="button"
            class="min-h-[38px] min-w-[38px] flex justify-center items-center border border-transparent text-gray-800 hover:bg-gray-100 py-2 px-3 text-sm rounded-md focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-transparent dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">8</button>
    </div>
    <button type="button"
        class="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-md border border-transparent text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-transparent dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
        <span aria-hidden="true" class="sr-only">Next</span>
        <i class="ri-arrow-right-s-line align-middle rtl:rotate-180"></i>
    </button>
</nav>
<!-- End Pagination -->

<!-- Pagination -->
<nav class="flex items-center -space-x-px">
    <button type="button"
        class="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm first:rounded-s-md last:rounded-e-md border border-gray-200 text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-white/10 dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
        <i class="ri-arrow-left-s-line align-middle rtl:rotate-180"></i>
        <span aria-hidden="true" class="sr-only">Previous</span>
    </button>
    <button type="button"
        class="min-h-[38px] min-w-[38px] flex justify-center items-center bg-primary text-white border border-gray-200 py-2 px-3 text-sm first:rounded-s-md last:rounded-e-md focus:outline-none focus:bg-gray-300 disabled:opacity-50 disabled:pointer-events-none dark:bg-primary dark:border-white/10 dark:text-white dark:focus:bg-gray-500"
        aria-current="page">1</button>
    <div class="hs-tooltip ti-main-tooltip border border-gray-200 dark:border-white/10">
        <button type="button"
            class="hs-tooltip-toggle group min-h-[36px] min-w-[36px] flex justify-center items-center text-gray-400 hover:text-primary p-2 text-sm focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:text-primary dark:focus:bg-white/10">
            <span class="group-hover:hidden text-xs">•••</span>
            <svg class="group-hover:block hidden flex-shrink-0 size-5"
                xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round">
                <path d="m6 17 5-5-5-5" />
                <path d="m13 17 5-5-5-5" />
            </svg>
            <span
                class="hs-tooltip-content ti-main-tooltip-content py-1 px-2 bg-gray-900 text-xs font-medium text-white shadow-sm dark:bg-bodybg"
                role="tooltip">
                Next 4 pages
            </span>
        </button>
    </div>
    <button type="button"
        class="min-h-[38px] min-w-[38px] flex justify-center items-center border border-gray-200 text-gray-800 hover:bg-gray-100 py-2 px-3 text-sm first:rounded-s-md last:rounded-e-md focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-white/10 dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">8</button>
    <button type="button"
        class="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm first:rounded-s-md last:rounded-e-md border border-gray-200 text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-white/10 dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
        <span aria-hidden="true" class="sr-only">Next</span>
        <i class="ri-arrow-right-s-line align-middle rtl:rotate-180"></i>
    </button>
</nav>
<!-- End Pagination -->`
export let paginationTS11=`   <!-- Pagination Wrapper -->
<div class="grid justify-center sm:flex sm:justify-between sm:items-center gap-1">
    <!-- Pagination Wrapper -->
    <nav class="flex items-center gap-x-1">
        <button type="button"
            class="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex jusify-center items-center gap-x-2 text-sm rounded-md text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
            <i class="ri-arrow-left-s-line align-middle rtl:rotate-180"></i>
            <span aria-hidden="true" class="sr-only">Previous</span>
        </button>
        <div class="flex items-center gap-x-1">
            <button type="button"
                class="min-h-[38px] min-w-[38px] flex justify-center items-center bg-primary text-white py-2 px-3 text-sm rounded-md focus:outline-none focus:bg-gray-300 disabled:opacity-50 disabled:pointer-events-none dark:bg-primary dark:text-white dark:focus:bg-gray-500"
                aria-current="page">1</button>
            <div class="hs-tooltip ti-main-tooltip">
                <button type="button"
                    class="hs-tooltip-toggle group min-h-[38px] min-w-[38px] flex justify-center items-center text-gray-400 hover:text-primary p-2 text-sm rounded-md focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:text-primary dark:focus:bg-white/10">
                    <span class="group-hover:hidden text-xs">•••</span>
                    <svg class="group-hover:block hidden flex-shrink-0 size-5"
                        xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                        viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="m6 17 5-5-5-5" />
                        <path d="m13 17 5-5-5-5" />
                    </svg>
                    <span
                        class="hs-tooltip-content ti-main-tooltip-content py-1 px-2 bg-gray-900 text-xs font-medium text-white shadow-sm dark:bg-bodybg"
                        role="tooltip">
                        Next 4 pages
                    </span>
                </button>
            </div>
            <button type="button"
                class="min-h-[38px] min-w-[38px] flex justify-center items-center text-gray-800 hover:bg-gray-100 py-2 px-3 text-sm rounded-md focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">8</button>
        </div>
        <button type="button"
            class="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex jusify-center items-center gap-x-2 text-sm rounded-md text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
            <span aria-hidden="true" class="sr-only">Next</span>
            <i class="ri-arrow-right-s-line align-middle rtl:rotate-180"></i>
        </button>
    </nav>
    <!-- End Pagination -->

    <!-- Go To Page -->
    <div class="flex justify-center sm:justify-start items-center gap-x-2">
        <span class="text-sm text-gray-800 whitespace-nowrap dark:text-white">
            Go to
        </span>
        <input type="number"
            class="min-h-[38px] py-2 px-2.5 block w-12 border-gray-200 rounded-md text-sm text-center focus:border-primary focus:ring-primary [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-gray-400 dark:focus:ring-gray-600">
        <span class="text-sm text-gray-800 whitespace-nowrap dark:text-white">
            page
        </span>
    </div>
    <!-- End Go To Page -->
</div>
<!-- End Pagination Wrapper -->

<!-- Pagination Wrapper -->
<div class="grid justify-center sm:flex sm:justify-between sm:items-center gap-1">
    <!-- Pagination -->
    <nav class="flex items-center gap-x-1">
        <button type="button"
            class="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-md border border-transparent text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-transparent dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
            <i class="ri-arrow-left-s-line align-middle rtl:rotate-180"></i>
            <span aria-hidden="true" class="sr-only">Previous</span>
        </button>
        <div class="flex items-center gap-x-1">
            <button type="button"
                class="min-h-[38px] min-w-[38px] flex justify-center items-center border border-primary text-primary py-2 px-3 text-sm rounded-md focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:border-primary dark:text-primary dark:focus:bg-white/10"
                aria-current="page">1</button>
            <div class="hs-tooltip ti-main-tooltip">
                <button type="button"
                    class="hs-tooltip-toggle group min-h-[38px] min-w-[38px] flex justify-center items-center text-gray-400 hover:text-primary p-2 text-sm rounded-md focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:text-primary dark:focus:bg-white/10">
                    <span class="group-hover:hidden text-xs">•••</span>
                    <svg class="group-hover:block hidden flex-shrink-0 size-5"
                        xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                        viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="m6 17 5-5-5-5" />
                        <path d="m13 17 5-5-5-5" />
                    </svg>
                    <span
                        class="hs-tooltip-content ti-main-tooltip-content py-1 px-2 bg-gray-900 text-xs font-medium text-white shadow-sm dark:bg-bodybg"
                        role="tooltip">
                        Next 4 pages
                    </span>
                </button>
            </div>
            <button type="button"
                class="min-h-[38px] min-w-[38px] flex justify-center items-center border border-transparent text-gray-800 hover:bg-gray-100 py-2 px-3 text-sm rounded-md focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-transparent dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">8</button>
        </div>
        <button type="button"
            class="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-md border border-transparent text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-transparent dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
            <span aria-hidden="true" class="sr-only">Next</span>
            <i class="ri-arrow-right-s-line align-middle rtl:rotate-180"></i>
        </button>
    </nav>
    <!-- End Pagination -->

    <!-- Go To Page -->
    <div class="flex justify-center sm:justify-start items-center gap-x-2">
        <span class="text-sm text-gray-800 whitespace-nowrap dark:text-white">
            Go to
        </span>
        <input type="number"
            class="min-h-[38px] py-2 px-2.5 block w-12 border-gray-200 rounded-md text-sm text-center focus:border-primary focus:ring-primary [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-gray-400 dark:focus:ring-gray-600">
        <span class="text-sm text-gray-800 whitespace-nowrap dark:text-white">
            page
        </span>
    </div>
    <!-- End Go To Page -->
</div>
<!-- End Pagination Wrapper -->

<!-- Pagination Wrapper -->
<div class="grid justify-center sm:flex sm:justify-between sm:items-center gap-1">
    <!-- Pagination -->
    <nav class="flex items-center -space-x-px">
        <button type="button"
            class="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm first:rounded-s-md last:rounded-e-md border border-gray-200 text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-white/10 dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
            <i class="ri-arrow-left-s-line align-middle rtl:rotate-180"></i>
            <span aria-hidden="true" class="sr-only">Previous</span>
        </button>
        <button type="button"
            class="min-h-[38px] min-w-[38px] flex justify-center items-center bg-primary text-white border border-gray-200 py-2 px-3 text-sm first:rounded-s-md last:rounded-e-md focus:outline-none focus:bg-gray-300 disabled:opacity-50 disabled:pointer-events-none dark:bg-primary dark:border-white/10 dark:text-white dark:focus:bg-gray-500"
            aria-current="page">1</button>
        <div
            class="hs-tooltip ti-main-tooltip border border-gray-200 dark:border-white/10">
            <button type="button"
                class="hs-tooltip-toggle group min-h-[36px] min-w-[36px] flex justify-center items-center text-gray-400 hover:text-primary p-2 text-sm focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:text-primary dark:focus:bg-white/10">
                <span class="group-hover:hidden text-xs">•••</span>
                <svg class="group-hover:block hidden flex-shrink-0 size-5"
                    xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="m6 17 5-5-5-5" />
                    <path d="m13 17 5-5-5-5" />
                </svg>
                <span
                    class="hs-tooltip-content ti-main-tooltip-content py-1 px-2 bg-gray-900 text-xs font-medium text-white shadow-sm dark:bg-bodybg"
                    role="tooltip">
                    Next 4 pages
                </span>
            </button>
        </div>
        <button type="button"
            class="min-h-[38px] min-w-[38px] flex justify-center items-center border border-gray-200 text-gray-800 hover:bg-gray-100 py-2 px-3 text-sm first:rounded-s-md last:rounded-e-md focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-white/10 dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">8</button>
        <button type="button"
            class="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm first:rounded-s-md last:rounded-e-md border border-gray-200 text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-white/10 dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
            <span aria-hidden="true" class="sr-only">Next</span>
            <i class="ri-arrow-right-s-line align-middle rtl:rotate-180"></i>
        </button>
    </nav>
    <!-- End Pagination -->

    <!-- Go To Page -->
    <div class="flex justify-center sm:justify-start items-center gap-x-2">
        <span class="text-sm text-gray-800 whitespace-nowrap dark:text-white">
            Go to
        </span>
        <input type="number"
            class="min-h-[38px] py-2 px-2.5 block w-12 border-gray-200 rounded-md text-sm text-center focus:border-primary focus:ring-primary [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-gray-400 dark:focus:ring-gray-600">
        <span class="text-sm text-gray-800 whitespace-nowrap dark:text-white">
            page
        </span>
    </div>
    <!-- End Go To Page -->
</div>
<!-- End Pagination Wrapper -->`
export let paginationTS12=`
<!-- Pagination Wrapper -->
<div class="grid justify-center sm:flex sm:justify-between sm:items-center gap-1">
    <!-- Pagination Wrapper -->
    <nav class="flex items-center gap-x-1">
        <button type="button"
            class="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex jusify-center items-center gap-x-2 text-sm rounded-md text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
            <i class="ri-arrow-left-s-line align-middle rtl:rotate-180"></i>
            <span aria-hidden="true" class="sr-only">Previous</span>
        </button>
        <div class="flex items-center gap-x-1">
            <button type="button"
                class="min-h-[38px] min-w-[38px] flex justify-center items-center bg-primary text-white py-2 px-3 text-sm rounded-md focus:outline-none focus:bg-gray-300 disabled:opacity-50 disabled:pointer-events-none dark:bg-primary dark:text-white dark:focus:bg-gray-500"
                aria-current="page">1</button>
            <div class="hs-tooltip ti-main-tooltip">
                <button type="button"
                    class="hs-tooltip-toggle group min-h-[38px] min-w-[38px] flex justify-center items-center text-gray-400 hover:text-primary p-2 text-sm rounded-md focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:text-primary dark:focus:bg-white/10">
                    <span class="group-hover:hidden text-xs">•••</span>
                    <svg class="group-hover:block hidden flex-shrink-0 size-5"
                        xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                        viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="m6 17 5-5-5-5" />
                        <path d="m13 17 5-5-5-5" />
                    </svg>
                    <span
                        class="hs-tooltip-content ti-main-tooltip-content py-1 px-2 bg-gray-900 text-xs font-medium text-white shadow-sm dark:bg-bodybg"
                        role="tooltip">
                        Next 4 pages
                    </span>
                </button>
            </div>
            <button type="button"
                class="min-h-[38px] min-w-[38px] flex justify-center items-center text-gray-800 hover:bg-gray-100 py-2 px-3 text-sm rounded-md focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">8</button>
        </div>
        <button type="button"
            class="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex jusify-center items-center gap-x-2 text-sm rounded-md text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
            <span aria-hidden="true" class="sr-only">Next</span>
            <i class="ri-arrow-right-s-line align-middle rtl:rotate-180"></i>
        </button>
    </nav>
    <!-- End Pagination -->

    <!-- Dropdown -->
    <div class="hs-dropdown ti-dropdown [--placement:top-left]">
        <button id="hs-pagination-dropdown" type="button"
            class="hs-dropdown-toggle !py-1.5 !px-2 ti-dropdown-toggle">
            5 page
            <svg class="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg"
                width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round">
                <path d="m6 9 6 6 6-6" />
            </svg>
        </button>
        <div class="hs-dropdown-menu ti-dropdown-menu hidden"
            aria-labelledby="hs-pagination-dropdown">
            <button type="button" class="ti-dropdown-item w-full justify-between">
                5 page
                <i class="ri-check-line text-primary flex-shrink-0 size-4"></i>
            </button>
            <button type="button" class="ti-dropdown-item w-full">
                8 page
            </button>
            <button type="button" class="ti-dropdown-item w-full">
                10 page
            </button>
        </div>
    </div>
    <!-- End Dropdown -->
</div>
<!-- End Pagination Wrapper -->

<!-- Pagination Wrapper -->
<div class="grid justify-center sm:flex sm:justify-between sm:items-center gap-1">
    <!-- Pagination -->
    <nav class="flex items-center gap-x-1">
        <button type="button"
            class="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-md border border-transparent text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-transparent dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
            <i class="ri-arrow-left-s-line align-middle rtl:rotate-180"></i>
            <span aria-hidden="true" class="sr-only">Previous</span>
        </button>
        <div class="flex items-center gap-x-1">
            <button type="button"
                class="min-h-[38px] min-w-[38px] flex justify-center items-center border border-primary text-primary py-2 px-3 text-sm rounded-md focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:border-primary dark:text-primary dark:focus:bg-white/10"
                aria-current="page">1</button>
            <div class="hs-tooltip ti-main-tooltip">
                <button type="button"
                    class="hs-tooltip-toggle group min-h-[38px] min-w-[38px] flex justify-center items-center text-gray-400 hover:text-primary p-2 text-sm rounded-md focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:text-primary dark:focus:bg-white/10">
                    <span class="group-hover:hidden text-xs">•••</span>
                    <svg class="group-hover:block hidden flex-shrink-0 size-5"
                        xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                        viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="m6 17 5-5-5-5" />
                        <path d="m13 17 5-5-5-5" />
                    </svg>
                    <span
                        class="hs-tooltip-content ti-main-tooltip-content py-1 px-2 bg-gray-900 text-xs font-medium text-white shadow-sm dark:bg-bodybg"
                        role="tooltip">
                        Next 4 pages
                    </span>
                </button>
            </div>
            <button type="button"
                class="min-h-[38px] min-w-[38px] flex justify-center items-center border border-transparent text-gray-800 hover:bg-gray-100 py-2 px-3 text-sm rounded-md focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-transparent dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">8</button>
        </div>
        <button type="button"
            class="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-md border border-transparent text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-transparent dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
            <span aria-hidden="true" class="sr-only">Next</span>
            <i class="ri-arrow-right-s-line align-middle rtl:rotate-180"></i>
        </button>
    </nav>
    <!-- End Pagination -->

    <!-- Dropdown -->
    <div class="hs-dropdown ti-dropdown [--placement:top-left]">
        <button id="hs-pagination-dropdown2" type="button"
            class="hs-dropdown-toggle !py-1.5 !px-2 ti-dropdown-toggle">
            5 page
            <svg class="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg"
                width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round">
                <path d="m6 9 6 6 6-6" />
            </svg>
        </button>
        <div class="hs-dropdown-menu ti-dropdown-menu hidden"
            aria-labelledby="hs-pagination-dropdown2">
            <button type="button" class="ti-dropdown-item w-full justify-between">
                5 page
                <i class="ri-check-line text-primary flex-shrink-0 size-4"></i>
            </button>
            <button type="button" class="ti-dropdown-item w-full">
                8 page
            </button>
            <button type="button" class="ti-dropdown-item w-full">
                10 page
            </button>
        </div>
    </div>
    <!-- End Dropdown -->
</div>
<!-- End Pagination Wrapper -->

<!-- Pagination Wrapper -->
<div class="grid justify-center sm:flex sm:justify-between sm:items-center gap-1">
    <!-- Pagination -->
    <nav class="flex items-center -space-x-px">
        <button type="button"
            class="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm first:rounded-s-md last:rounded-e-md border border-gray-200 text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-white/10 dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
            <i class="ri-arrow-left-s-line align-middle rtl:rotate-180"></i>
            <span aria-hidden="true" class="sr-only">Previous</span>
        </button>
        <button type="button"
            class="min-h-[38px] min-w-[38px] flex justify-center items-center bg-primary text-white border border-gray-200 py-2 px-3 text-sm first:rounded-s-md last:rounded-e-md focus:outline-none focus:bg-gray-300 disabled:opacity-50 disabled:pointer-events-none dark:bg-primary dark:border-white/10 dark:text-white dark:focus:bg-gray-500"
            aria-current="page">1</button>
        <div
            class="hs-tooltip ti-main-tooltip border border-gray-200 dark:border-white/10">
            <button type="button"
                class="hs-tooltip-toggle group min-h-[36px] min-w-[36px] flex justify-center items-center text-gray-400 hover:text-primary p-2 text-sm focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:text-primary dark:focus:bg-white/10">
                <span class="group-hover:hidden text-xs">•••</span>
                <svg class="group-hover:block hidden flex-shrink-0 size-5"
                    xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="m6 17 5-5-5-5" />
                    <path d="m13 17 5-5-5-5" />
                </svg>
                <span
                    class="hs-tooltip-content ti-main-tooltip-content py-1 px-2 bg-gray-900 text-xs font-medium text-white shadow-sm dark:bg-bodybg"
                    role="tooltip">
                    Next 4 pages
                </span>
            </button>
        </div>
        <button type="button"
            class="min-h-[38px] min-w-[38px] flex justify-center items-center border border-gray-200 text-gray-800 hover:bg-gray-100 py-2 px-3 text-sm first:rounded-s-md last:rounded-e-md focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-white/10 dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">8</button>
        <button type="button"
            class="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm first:rounded-s-md last:rounded-e-md border border-gray-200 text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-white/10 dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
            <span aria-hidden="true" class="sr-only">Next</span>
            <i class="ri-arrow-right-s-line align-middle rtl:rotate-180"></i>
        </button>
    </nav>
    <!-- End Pagination -->

    <!-- Dropdown -->
    <div class="hs-dropdown ti-dropdown [--placement:top-left]">
        <button id="hs-pagination-dropdown3" type="button"
            class="hs-dropdown-toggle !py-1.5 !px-2 ti-dropdown-toggle">
            5 page
            <svg class="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg"
                width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round">
                <path d="m6 9 6 6 6-6" />
            </svg>
        </button>
        <div class="hs-dropdown-menu ti-dropdown-menu hidden"
            aria-labelledby="hs-pagination-dropdown3">
            <button type="button" class="ti-dropdown-item w-full justify-between">
                5 page
                <i class="ri-check-line text-primary flex-shrink-0 size-4"></i>
            </button>
            <button type="button" class="ti-dropdown-item w-full">
                8 page
            </button>
            <button type="button" class="ti-dropdown-item w-full">
                10 page
            </button>
        </div>
    </div>
    <!-- End Dropdown -->
</div>
<!-- End Pagination Wrapper -->`
export let paginationTS13=`
<!-- Pagination -->
<nav class="flex justify-between items-center gap-x-1">
    <button type="button"
        class="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex jusify-center items-center gap-x-2 text-sm rounded-md text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
        <i class="ri-arrow-left-s-line align-middle rtl:rotate-180"></i>
        <span aria-hidden="true" class="hidden sm:block">Previous</span>
    </button>
    <div class="flex items-center gap-x-1">
        <button type="button"
            class="min-h-[38px] min-w-[38px] flex justify-center items-center bg-primary text-white py-2 px-3 text-sm rounded-md focus:outline-none focus:bg-gray-300 disabled:opacity-50 disabled:pointer-events-none dark:bg-primary dark:text-white dark:focus:bg-gray-500"
            aria-current="page">1</button>
        <button type="button"
            class="min-h-[38px] min-w-[38px] flex justify-center items-center text-gray-800 hover:bg-gray-100 py-2 px-3 text-sm rounded-md focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">2</button>
        <button type="button"
            class="min-h-[38px] min-w-[38px] flex justify-center items-center text-gray-800 hover:bg-gray-100 py-2 px-3 text-sm rounded-md focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">3</button>
    </div>
    <button type="button"
        class="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex jusify-center items-center gap-x-2 text-sm rounded-md text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
        <span aria-hidden="true" class="hidden sm:block">Next</span>
        <i class="ri-arrow-right-s-line align-middle rtl:rotate-180"></i>
    </button>
</nav>
<!-- End Pagination -->

<!-- Pagination -->
<nav class="flex justify-between items-center gap-x-1">
    <button type="button"
        class="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-md border border-transparent text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-transparent dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
        <i class="ri-arrow-left-s-line align-middle rtl:rotate-180"></i>
        <span aria-hidden="true" class="hidden sm:block">Previous</span>
    </button>
    <div class="flex items-center gap-x-1">
        <button type="button"
            class="min-h-[38px] min-w-[38px] flex justify-center items-center border border-primary text-primary py-2 px-3 text-sm rounded-md focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:border-primary dark:text-primary dark:focus:bg-white/10"
            aria-current="page">1</button>
        <button type="button"
            class="min-h-[38px] min-w-[38px] flex justify-center items-center border border-transparent text-gray-800 hover:bg-gray-100 py-2 px-3 text-sm rounded-md focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-transparent dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">2</button>
        <button type="button"
            class="min-h-[38px] min-w-[38px] flex justify-center items-center border border-transparent text-gray-800 hover:bg-gray-100 py-2 px-3 text-sm rounded-md focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-transparent dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">3</button>
    </div>
    <button type="button"
        class="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-md border border-transparent text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-transparent dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
        <span aria-hidden="true" class="hidden sm:block">Next</span>
        <i class="ri-arrow-right-s-line align-middle rtl:rotate-180"></i>
    </button>
</nav>
<!-- End Pagination -->

<!-- Pagination -->
<nav class="flex justify-between items-center gap-x-1">
    <button type="button"
        class="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-md text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
        <i class="ri-arrow-left-s-line align-middle rtl:rotate-180"></i>
        <span aria-hidden="true" class="hidden sm:block">Previous</span>
    </button>
    <div class="flex items-center gap-x-1">
        <span
            class="min-h-[38px] min-w-[38px] flex justify-center items-center border border-primary text-primary py-2 px-3 text-sm rounded-md focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:border-primary dark:text-primary dark:focus:bg-white/10">1</span>
        <span
            class="min-h-[38px] flex justify-center items-center text-gray-500 py-2 px-1.5 text-sm dark:text-white">of</span>
        <span
            class="min-h-[38px] flex justify-center items-center text-gray-500 py-2 px-1.5 text-sm dark:text-white">3</span>
    </div>
    <button type="button"
        class="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-md text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
        <span aria-hidden="true" class="hidden sm:block">Next</span>
        <i class="ri-arrow-right-s-line align-middle rtl:rotate-180"></i>
    </button>
</nav>
<!-- End Pagination -->
`
export let paginationTS14=`
<!-- Pagination Wrapper -->
<div
    class="grid justify-center sm:flex sm:justify-start sm:items-center gap-2 flex-wrap">
    <!-- Pagination Wrapper -->
    <nav class="flex items-center gap-x-1">
        <button type="button"
            class="min-h-[32px] min-w-8 py-2 px-2.5 inline-flex jusify-center items-center gap-x-2 text-sm rounded-md text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
            <i class="ri-arrow-left-s-line align-middle rtl:rotate-180"></i>
            <span aria-hidden="true" class="sr-only">Previous</span>
        </button>
        <div class="flex items-center gap-x-1">
            <button type="button"
                class="min-h-[32px] min-w-8 flex justify-center items-center bg-primary text-white py-1 px-2.5 text-sm rounded-md focus:outline-none focus:bg-gray-300 disabled:opacity-50 disabled:pointer-events-none dark:bg-primary dark:text-white dark:focus:bg-gray-500"
                aria-current="page">1</button>
            <div class="hs-tooltip ti-main-tooltip">
                <button type="button"
                    class="hs-tooltip-toggle group min-h-[32px] min-w-8 flex justify-center items-center text-gray-400 hover:text-primary p-2 text-sm rounded-md focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:text-primary dark:focus:bg-white/10">
                    <span class="group-hover:hidden text-xs">•••</span>
                    <svg class="group-hover:block hidden flex-shrink-0 size-5"
                        xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                        viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="m6 17 5-5-5-5" />
                        <path d="m13 17 5-5-5-5" />
                    </svg>
                    <span
                        class="hs-tooltip-content ti-main-tooltip-content py-1 px-2 bg-gray-900 text-xs font-medium text-white shadow-sm dark:bg-bodybg"
                        role="tooltip">
                        Next 4 pages
                    </span>
                </button>
            </div>
            <button type="button"
                class="min-h-[32px] min-w-8 flex justify-center items-center text-gray-800 hover:bg-gray-100 py-1 px-2.5 text-sm rounded-md focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">8</button>
        </div>
        <button type="button"
            class="min-h-[32px] min-w-8 py-2 px-2.5 inline-flex jusify-center items-center gap-x-2 text-sm rounded-md text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
            <span aria-hidden="true" class="sr-only">Next</span>
            <i class="ri-arrow-right-s-line align-middle rtl:rotate-180"></i>
        </button>
    </nav>
    <!-- End Pagination -->
    <div class="flex justify-center items-center gap-x-5">
        <!-- Dropdown -->
        <div class="hs-dropdown ti-dropdown [--placement:top-left]">
            <button id="hs-pagination-dropdown-basic" type="button"
                class="hs-dropdown-toggle !py-1 !px-2.5 ti-dropdown-toggle">
                5 page
                <svg class="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg"
                    width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round">
                    <path d="m6 9 6 6 6-6" />
                </svg>
            </button>
            <div class="hs-dropdown-menu ti-dropdown-menu hidden"
                aria-labelledby="hs-pagination-dropdown-basic">
                <button type="button" class="ti-dropdown-item w-full justify-between">
                    5 page
                    <i class="ri-check-line text-primary flex-shrink-0 size-4"></i>
                </button>
                <button type="button" class="ti-dropdown-item w-full">
                    8 page
                </button>
                <button type="button" class="ti-dropdown-item w-full">
                    10 page
                </button>
            </div>
        </div>
        <!-- End Dropdown -->

        <!-- Go To Page -->
        <div class="flex justify-center sm:justify-start items-center gap-x-2">
            <span class="text-sm text-gray-800 whitespace-nowrap dark:text-white">
                Go to
            </span>
            <input type="number"
                class="min-h-[32px] py-1 px-2.5  block w-12 border-gray-200 rounded-md text-sm text-center focus:border-primary focus:ring-primary [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-gray-400 dark:focus:ring-gray-600">
            <span class="text-sm text-gray-800 whitespace-nowrap dark:text-white">
                page
            </span>
        </div>
        <!-- End Go To Page -->
    </div>

</div>
<!-- End Pagination Wrapper -->

<!-- Pagination Wrapper -->
<div
    class="grid justify-center sm:flex sm:justify-start sm:items-center gap-2 flex-wrap">
    <!-- Pagination Wrapper -->
    <nav class="flex items-center gap-x-1">
        <button type="button"
            class="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex jusify-center items-center gap-x-2 text-sm rounded-md text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
            <i class="ri-arrow-left-s-line align-middle rtl:rotate-180"></i>
            <span aria-hidden="true" class="sr-only">Previous</span>
        </button>
        <div class="flex items-center gap-x-1">
            <button type="button"
                class="min-h-[38px] min-w-[38px] flex justify-center items-center bg-primary text-white py-1 px-2.5 text-sm rounded-md focus:outline-none focus:bg-gray-300 disabled:opacity-50 disabled:pointer-events-none dark:bg-primary dark:text-white dark:focus:bg-gray-500"
                aria-current="page">1</button>
            <div class="hs-tooltip ti-main-tooltip">
                <button type="button"
                    class="hs-tooltip-toggle group min-h-[38px] min-w-[38px] flex justify-center items-center text-gray-400 hover:text-primary p-2 text-sm rounded-md focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:text-primary dark:focus:bg-white/10">
                    <span class="group-hover:hidden text-xs">•••</span>
                    <svg class="group-hover:block hidden flex-shrink-0 size-5"
                        xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                        viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="m6 17 5-5-5-5" />
                        <path d="m13 17 5-5-5-5" />
                    </svg>
                    <span
                        class="hs-tooltip-content ti-main-tooltip-content py-1 px-2 bg-gray-900 text-xs font-medium text-white shadow-sm dark:bg-bodybg"
                        role="tooltip">
                        Next 4 pages
                    </span>
                </button>
            </div>
            <button type="button"
                class="min-h-[38px] min-w-[38px] flex justify-center items-center text-gray-800 hover:bg-gray-100 py-1 px-2.5 text-sm rounded-md focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">8</button>
        </div>
        <button type="button"
            class="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex jusify-center items-center gap-x-2 text-sm rounded-md text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
            <span aria-hidden="true" class="sr-only">Next</span>
            <i class="ri-arrow-right-s-line align-middle rtl:rotate-180"></i>
        </button>
    </nav>
    <!-- End Pagination -->
    <div class="flex justify-center items-center gap-x-5">
        <!-- Dropdown -->
        <div class="hs-dropdown ti-dropdown [--placement:top-left]">
            <button id="hs-pagination-dropdown-basic1" type="button"
                class="hs-dropdown-toggle !py-2 !px-2.5 ti-dropdown-toggle">
                5 page
                <svg class="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg"
                    width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round">
                    <path d="m6 9 6 6 6-6" />
                </svg>
            </button>
            <div class="hs-dropdown-menu ti-dropdown-menu hidden"
                aria-labelledby="hs-pagination-dropdown-basic1">
                <button type="button" class="ti-dropdown-item w-full justify-between">
                    5 page
                    <i class="ri-check-line text-primary flex-shrink-0 size-4"></i>
                </button>
                <button type="button" class="ti-dropdown-item w-full">
                    8 page
                </button>
                <button type="button" class="ti-dropdown-item w-full">
                    10 page
                </button>
            </div>
        </div>
        <!-- End Dropdown -->

        <!-- Go To Page -->
        <div class="flex justify-center sm:justify-start items-center gap-x-2">
            <span class="text-sm text-gray-800 whitespace-nowrap dark:text-white">
                Go to
            </span>
            <input type="number"
                class="min-h-[38px] py-2 px-2.5 block w-12 border-gray-200 rounded-md text-sm text-center focus:border-primary focus:ring-primary [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-gray-400 dark:focus:ring-gray-600">
            <span class="text-sm text-gray-800 whitespace-nowrap dark:text-white">
                page
            </span>
        </div>
        <!-- End Go To Page -->
    </div>

</div>
<!-- End Pagination Wrapper -->

<!-- Pagination Wrapper -->
<div
    class="grid justify-center sm:flex sm:justify-start sm:items-center gap-2 flex-wrap">
    <!-- Pagination Wrapper -->
    <nav class="flex items-center gap-x-1">
        <button type="button"
            class="min-h-[46px] min-w-[46px] py-2 px-2.5 inline-flex jusify-center items-center gap-x-2 text-sm rounded-md text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
            <i class="ri-arrow-left-s-line align-middle rtl:rotate-180"></i>
            <span aria-hidden="true" class="sr-only">Previous</span>
        </button>
        <div class="flex items-center gap-x-1">
            <button type="button"
                class="min-h-[46px] min-w-[46px] flex justify-center items-center bg-primary text-white py-1 px-2.5 text-sm rounded-md focus:outline-none focus:bg-gray-300 disabled:opacity-50 disabled:pointer-events-none dark:bg-primary dark:text-white dark:focus:bg-gray-500"
                aria-current="page">1</button>

            <div class="hs-tooltip ti-main-tooltip">
                <button type="button"
                    class="hs-tooltip-toggle group min-h-[46px] min-w-[46px] flex justify-center items-center text-gray-400 hover:text-primary p-2 text-sm rounded-md focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:text-primary dark:focus:bg-white/10">
                    <span class="group-hover:hidden text-xs">•••</span>
                    <svg class="group-hover:block hidden flex-shrink-0 size-5"
                        xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                        viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="m6 17 5-5-5-5" />
                        <path d="m13 17 5-5-5-5" />
                    </svg>
                    <span
                        class="hs-tooltip-content ti-main-tooltip-content py-1 px-2 bg-gray-900 text-xs font-medium text-white shadow-sm dark:bg-bodybg"
                        role="tooltip">
                        Next 4 pages
                    </span>
                </button>
            </div>
            <button type="button"
                class="min-h-[46px] min-w-[46px] flex justify-center items-center text-gray-800 hover:bg-gray-100 py-1 px-2.5 text-sm rounded-md focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">8</button>
        </div>
        <button type="button"
            class="min-h-[46px] min-w-[46px] py-2 px-2.5 inline-flex jusify-center items-center gap-x-2 text-sm rounded-md text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
            <span aria-hidden="true" class="sr-only">Next</span>
            <i class="ri-arrow-right-s-line align-middle rtl:rotate-180"></i>
        </button>
    </nav>
    <!-- End Pagination -->
    <div class="flex justify-center items-center gap-x-5">
        <!-- Dropdown -->
        <div class="hs-dropdown ti-dropdown [--placement:top-left]">
            <button id="hs-pagination-dropdown-basic2" type="button"
                class="hs-dropdown-toggle !py-3 !px-3.5 ti-dropdown-toggle">
                5 page
                <svg class="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg"
                    width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round">
                    <path d="m6 9 6 6 6-6" />
                </svg>
            </button>
            <div class="hs-dropdown-menu ti-dropdown-menu hidden"
                aria-labelledby="hs-pagination-dropdown-basic2">
                <button type="button" class="ti-dropdown-item w-full justify-between">
                    5 page
                    <i class="ri-check-line text-primary flex-shrink-0 size-4"></i>
                </button>
                <button type="button" class="ti-dropdown-item w-full">
                    8 page
                </button>
                <button type="button" class="ti-dropdown-item w-full">
                    10 page
                </button>
            </div>
        </div>
        <!-- End Dropdown -->

        <!-- Go To Page -->
        <div class="flex justify-center sm:justify-start items-center gap-x-2">
            <span class="text-sm text-gray-800 whitespace-nowrap dark:text-white">
                Go to
            </span>
            <input type="number"
                class="min-h-[46px] p-3 block w-12 border-gray-200 rounded-md text-sm text-center focus:border-primary focus:ring-primary [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-gray-400 dark:focus:ring-gray-600">
            <span class="text-sm text-gray-800 whitespace-nowrap dark:text-white">
                page
            </span>
        </div>
        <!-- End Go To Page -->
    </div>

</div>
<!-- End Pagination Wrapper -->
`
export let paginationTS15=`
<!-- Pagination Wrapper -->
<div
    class="grid justify-center sm:flex sm:justify-start sm:items-center gap-2 flex-wrap">
    <!-- Pagination Wrapper -->
    <nav class="flex items-center gap-x-1">
        <button type="button"
            class="min-h-[32px] min-w-8 py-2 px-2.5 inline-flex jusify-center items-center gap-x-2 text-sm rounded-full text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
            <i class="ri-arrow-left-s-line align-middle rtl:rotate-180"></i>
            <span aria-hidden="true" class="sr-only">Previous</span>
        </button>
        <div class="flex items-center gap-x-1">
            <button type="button"
                class="min-h-[32px] min-w-8 flex justify-center items-center bg-primary text-white py-1 px-2.5 text-sm rounded-full focus:outline-none focus:bg-gray-300 disabled:opacity-50 disabled:pointer-events-none dark:bg-primary dark:text-white dark:focus:bg-gray-500"
                aria-current="page">1</button>
            <div class="hs-tooltip ti-main-tooltip">
                <button type="button"
                    class="hs-tooltip-toggle group min-h-[32px] min-w-8 flex justify-center items-center text-gray-400 hover:text-primary p-2 text-sm rounded-full focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:text-primary dark:focus:bg-white/10">
                    <span class="group-hover:hidden text-xs">•••</span>
                    <svg class="group-hover:block hidden flex-shrink-0 size-5"
                        xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                        viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="m6 17 5-5-5-5" />
                        <path d="m13 17 5-5-5-5" />
                    </svg>
                    <span
                        class="hs-tooltip-content ti-main-tooltip-content py-1 px-2 bg-gray-900 text-xs font-medium text-white shadow-sm dark:bg-bodybg"
                        role="tooltip">
                        Next 4 pages
                    </span>
                </button>
            </div>
            <button type="button"
                class="min-h-[32px] min-w-8 flex justify-center items-center text-gray-800 hover:bg-gray-100 py-1 px-2.5 text-sm rounded-full focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">8</button>
        </div>
        <button type="button"
            class="min-h-[32px] min-w-8 py-2 px-2.5 inline-flex jusify-center items-center gap-x-2 text-sm rounded-full text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
            <span aria-hidden="true" class="sr-only">Next</span>
            <i class="ri-arrow-right-s-line align-middle rtl:rotate-180"></i>
        </button>
    </nav>
    <!-- End Pagination -->
    <div class="flex justify-center items-center gap-x-5">
        <!-- Dropdown -->
        <div class="hs-dropdown ti-dropdown [--placement:top-left]">
            <button id="hs-pagination-dropdown-rounded" type="button"
                class="hs-dropdown-toggle !py-1 !px-2.5 ti-dropdown-toggle">
                5 page
                <svg class="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg"
                    width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round">
                    <path d="m6 9 6 6 6-6" />
                </svg>
            </button>
            <div class="hs-dropdown-menu ti-dropdown-menu hidden"
                aria-labelledby="hs-pagination-dropdown-rounded">
                <button type="button" class="ti-dropdown-item w-full justify-between">
                    5 page
                    <i class="ri-check-line text-primary flex-shrink-0 size-4"></i>
                </button>
                <button type="button" class="ti-dropdown-item w-full">
                    8 page
                </button>
                <button type="button" class="ti-dropdown-item w-full">
                    10 page
                </button>
            </div>
        </div>
        <!-- End Dropdown -->

        <!-- Go To Page -->
        <div class="flex justify-center sm:justify-start items-center gap-x-2">
            <span class="text-sm text-gray-800 whitespace-nowrap dark:text-white">
                Go to
            </span>
            <input type="number"
                class="min-h-[32px] py-1 px-2.5  block w-12 border-gray-200 rounded-md text-sm text-center focus:border-primary focus:ring-primary [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-gray-400 dark:focus:ring-gray-600">
            <span class="text-sm text-gray-800 whitespace-nowrap dark:text-white">
                page
            </span>
        </div>
        <!-- End Go To Page -->
    </div>
</div>
<!-- End Pagination Wrapper -->

<!-- Pagination Wrapper -->
<div
    class="grid justify-center sm:flex sm:justify-start sm:items-center gap-2 flex-wrap">
    <!-- Pagination Wrapper -->
    <nav class="flex items-center gap-x-1">
        <button type="button"
            class="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex jusify-center items-center gap-x-2 text-sm rounded-full text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
            <i class="ri-arrow-left-s-line align-middle rtl:rotate-180"></i>
            <span aria-hidden="true" class="sr-only">Previous</span>
        </button>
        <div class="flex items-center gap-x-1">
            <button type="button"
                class="min-h-[38px] min-w-[38px] flex justify-center items-center bg-primary text-white py-1 px-2.5 text-sm rounded-full focus:outline-none focus:bg-gray-300 disabled:opacity-50 disabled:pointer-events-none dark:bg-primary dark:text-white dark:focus:bg-gray-500"
                aria-current="page">1</button>
            <div class="hs-tooltip ti-main-tooltip">
                <button type="button"
                    class="hs-tooltip-toggle group min-h-[38px] min-w-[38px] flex justify-center items-center text-gray-400 hover:text-primary p-2 text-sm rounded-full focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:text-primary dark:focus:bg-white/10">
                    <span class="group-hover:hidden text-xs">•••</span>
                    <svg class="group-hover:block hidden flex-shrink-0 size-5"
                        xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                        viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="m6 17 5-5-5-5" />
                        <path d="m13 17 5-5-5-5" />
                    </svg>
                    <span
                        class="hs-tooltip-content ti-main-tooltip-content py-1 px-2 bg-gray-900 text-xs font-medium text-white shadow-sm dark:bg-bodybg"
                        role="tooltip">
                        Next 4 pages
                    </span>
                </button>
            </div>
            <button type="button"
                class="min-h-[38px] min-w-[38px] flex justify-center items-center text-gray-800 hover:bg-gray-100 py-1 px-2.5 text-sm rounded-full focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">8</button>
        </div>
        <button type="button"
            class="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex jusify-center items-center gap-x-2 text-sm rounded-full text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
            <span aria-hidden="true" class="sr-only">Next</span>
            <i class="ri-arrow-right-s-line align-middle rtl:rotate-180"></i>
        </button>
    </nav>
    <!-- End Pagination -->
    <div class="flex justify-center items-center gap-x-5">
        <!-- Dropdown -->
        <div class="hs-dropdown ti-dropdown [--placement:top-left]">
            <button id="hs-pagination-dropdown-rounded1" type="button"
                class="hs-dropdown-toggle !py-2 !px-2.5 ti-dropdown-toggle">
                5 page
                <svg class="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg"
                    width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round">
                    <path d="m6 9 6 6 6-6" />
                </svg>
            </button>
            <div class="hs-dropdown-menu ti-dropdown-menu hidden"
                aria-labelledby="hs-pagination-dropdown-rounded1">
                <button type="button" class="ti-dropdown-item w-full justify-between">
                    5 page
                    <i class="ri-check-line text-primary flex-shrink-0 size-4"></i>
                </button>
                <button type="button" class="ti-dropdown-item w-full">
                    8 page
                </button>
                <button type="button" class="ti-dropdown-item w-full">
                    10 page
                </button>
            </div>
        </div>
        <!-- End Dropdown -->

        <!-- Go To Page -->
        <div class="flex justify-center sm:justify-start items-center gap-x-2">
            <span class="text-sm text-gray-800 whitespace-nowrap dark:text-white">
                Go to
            </span>
            <input type="number"
                class="min-h-[38px] py-2 px-2.5 block w-12 border-gray-200 rounded-md text-sm text-center focus:border-primary focus:ring-primary [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-gray-400 dark:focus:ring-gray-600">
            <span class="text-sm text-gray-800 whitespace-nowrap dark:text-white">
                page
            </span>
        </div>
        <!-- End Go To Page -->
    </div>
</div>
<!-- End Pagination Wrapper -->

<!-- Pagination Wrapper -->
<div
    class="grid justify-center sm:flex sm:justify-start sm:items-center gap-2 flex-wrap">
    <!-- Pagination Wrapper -->
    <nav class="flex items-center gap-x-1">
        <button type="button"
            class="min-h-[46px] min-w-[46px] py-2 px-2.5 inline-flex jusify-center items-center gap-x-2 text-sm rounded-full text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
            <i class="ri-arrow-left-s-line align-middle rtl:rotate-180"></i>
            <span aria-hidden="true" class="sr-only">Previous</span>
        </button>
        <div class="flex items-center gap-x-1">
            <button type="button"
                class="min-h-[46px] min-w-[46px] flex justify-center items-center bg-primary text-white py-1 px-2.5 text-sm rounded-full focus:outline-none focus:bg-gray-300 disabled:opacity-50 disabled:pointer-events-none dark:bg-primary dark:text-white dark:focus:bg-gray-500"
                aria-current="page">1</button>
            <div class="hs-tooltip ti-main-tooltip">
                <button type="button"
                    class="hs-tooltip-toggle group min-h-[46px] min-w-[46px] flex justify-center items-center text-gray-400 hover:text-primary p-2 text-sm rounded-full focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:text-primary dark:focus:bg-white/10">
                    <span class="group-hover:hidden text-xs">•••</span>
                    <svg class="group-hover:block hidden flex-shrink-0 size-5"
                        xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                        viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="m6 17 5-5-5-5" />
                        <path d="m13 17 5-5-5-5" />
                    </svg>
                    <span
                        class="hs-tooltip-content ti-main-tooltip-content py-1 px-2 bg-gray-900 text-xs font-medium text-white shadow-sm dark:bg-bodybg"
                        role="tooltip">
                        Next 4 pages
                    </span>
                </button>
            </div>
            <button type="button"
                class="min-h-[46px] min-w-[46px] flex justify-center items-center text-gray-800 hover:bg-gray-100 py-1 px-2.5 text-sm rounded-full focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">8</button>
        </div>
        <button type="button"
            class="min-h-[46px] min-w-[46px] py-2 px-2.5 inline-flex jusify-center items-center gap-x-2 text-sm rounded-full text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
            <span aria-hidden="true" class="sr-only">Next</span>
            <i class="ri-arrow-right-s-line align-middle rtl:rotate-180"></i>
        </button>
    </nav>
    <!-- End Pagination -->
    <div class="flex justify-center items-center gap-x-5">
        <!-- Dropdown -->
        <div class="hs-dropdown ti-dropdown [--placement:top-left]">
            <button id="hs-pagination-dropdown-rounded2" type="button"
                class="hs-dropdown-toggle !py-3 !px-3.5 ti-dropdown-toggle">
                5 page
                <svg class="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg"
                    width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round">
                    <path d="m6 9 6 6 6-6" />
                </svg>
            </button>
            <div class="hs-dropdown-menu ti-dropdown-menu hidden"
                aria-labelledby="hs-pagination-dropdown-rounded2">
                <button type="button" class="ti-dropdown-item w-full justify-between">
                    5 page
                    <i class="ri-check-line text-primary flex-shrink-0 size-4"></i>
                </button>
                <button type="button" class="ti-dropdown-item w-full">
                    8 page
                </button>
                <button type="button" class="ti-dropdown-item w-full">
                    10 page
                </button>
            </div>
        </div>
        <!-- End Dropdown -->

        <!-- Go To Page -->
        <div class="flex justify-center sm:justify-start items-center gap-x-2">
            <span class="text-sm text-gray-800 whitespace-nowrap dark:text-white">
                Go to
            </span>
            <input type="number"
                class="min-h-[46px] p-3 block w-12 border-gray-200 rounded-md text-sm text-center focus:border-primary focus:ring-primary [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-gray-400 dark:focus:ring-gray-600">
            <span class="text-sm text-gray-800 whitespace-nowrap dark:text-white">
                page
            </span>
        </div>
        <!-- End Go To Page -->
    </div>
</div>
<!-- End Pagination Wrapper -->
`
export let paginationTS16=`
<!-- Pagination Wrapper -->
<div
    class="grid justify-center sm:flex sm:justify-start sm:items-center gap-2 flex-wrap">
    <!-- Pagination Wrapper -->
    <nav class="flex items-center gap-x-1">
        <button type="button"
            class="min-h-[32px] min-w-8 py-2 px-2.5 inline-flex jusify-center items-center gap-x-2 text-sm rounded-md text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
            <i class="ri-arrow-left-s-line align-middle rtl:rotate-180"></i>
            <span aria-hidden="true" class="sr-only">Previous</span>
        </button>
        <div class="flex items-center gap-x-1">
            <button type="button"
                class="min-h-[32px] min-w-8 flex justify-center items-center border border-primary text-primary py-1 px-2.5 text-sm rounded-md focus:outline-none focus:bg-gray-300 disabled:opacity-50 disabled:pointer-events-none dark:border-primary dark:text-primary dark:focus:bg-gray-500"
                aria-current="page">1</button>
            <div class="hs-tooltip ti-main-tooltip">
                <button type="button"
                    class="hs-tooltip-toggle group min-h-[32px] min-w-8 flex justify-center items-center text-gray-400 hover:text-primary p-2 text-sm rounded-md focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:text-primary dark:focus:bg-white/10">
                    <span class="group-hover:hidden text-xs">•••</span>
                    <svg class="group-hover:block hidden flex-shrink-0 size-5"
                        xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                        viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="m6 17 5-5-5-5" />
                        <path d="m13 17 5-5-5-5" />
                    </svg>
                    <span
                        class="hs-tooltip-content ti-main-tooltip-content py-1 px-2 bg-gray-900 text-xs font-medium text-white shadow-sm dark:bg-bodybg"
                        role="tooltip">
                        Next 4 pages
                    </span>
                </button>
            </div>
            <button type="button"
                class="min-h-[32px] min-w-8 flex justify-center items-center text-gray-800 hover:bg-gray-100 py-1 px-2.5 text-sm rounded-md focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">8</button>
        </div>
        <button type="button"
            class="min-h-[32px] min-w-8 py-2 px-2.5 inline-flex jusify-center items-center gap-x-2 text-sm rounded-md text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
            <span aria-hidden="true" class="sr-only">Next</span>
            <i class="ri-arrow-right-s-line align-middle rtl:rotate-180"></i>
        </button>
    </nav>
    <!-- End Pagination -->
    <div class="flex justify-center items-center gap-x-5">
        <!-- Dropdown -->
        <div class="hs-dropdown ti-dropdown [--placement:top-left]">
            <button id="hs-pagination-dropdown-bordered" type="button"
                class="hs-dropdown-toggle !py-1 !px-2.5 ti-dropdown-toggle">
                5 page
                <svg class="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg"
                    width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round">
                    <path d="m6 9 6 6 6-6" />
                </svg>
            </button>
            <div class="hs-dropdown-menu ti-dropdown-menu hidden"
                aria-labelledby="hs-pagination-dropdown-bordered">
                <button type="button" class="ti-dropdown-item w-full justify-between">
                    5 page
                    <i class="ri-check-line text-primary flex-shrink-0 size-4"></i>
                </button>
                <button type="button" class="ti-dropdown-item w-full">
                    8 page
                </button>
                <button type="button" class="ti-dropdown-item w-full">
                    10 page
                </button>
            </div>
        </div>
        <!-- End Dropdown -->

        <!-- Go To Page -->
        <div class="flex justify-center sm:justify-start items-center gap-x-2">
            <span class="text-sm text-gray-800 whitespace-nowrap dark:text-white">
                Go to
            </span>
            <input type="number"
                class="min-h-[32px] py-1 px-2.5  block w-12 border-gray-200 rounded-md text-sm text-center focus:border-primary focus:ring-primary [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-gray-400 dark:focus:ring-gray-600">
            <span class="text-sm text-gray-800 whitespace-nowrap dark:text-white">
                page
            </span>
        </div>
        <!-- End Go To Page -->
    </div>
</div>
<!-- End Pagination Wrapper -->

<!-- Pagination Wrapper -->
<div
    class="grid justify-center sm:flex sm:justify-start sm:items-center gap-2 flex-wrap">
    <!-- Pagination Wrapper -->
    <nav class="flex items-center gap-x-1">
        <button type="button"
            class="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex jusify-center items-center gap-x-2 text-sm rounded-md text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
            <i class="ri-arrow-left-s-line align-middle rtl:rotate-180"></i>
            <span aria-hidden="true" class="sr-only">Previous</span>
        </button>
        <div class="flex items-center gap-x-1">
            <button type="button"
                class="min-h-[38px] min-w-[38px] flex justify-center items-center border border-primary text-primary py-1 px-2.5 text-sm rounded-md focus:outline-none focus:bg-gray-300 disabled:opacity-50 disabled:pointer-events-none dark:border-primary dark:text-primary dark:focus:bg-gray-500"
                aria-current="page">1</button>
            <div class="hs-tooltip ti-main-tooltip">
                <button type="button"
                    class="hs-tooltip-toggle group min-h-[38px] min-w-[38px] flex justify-center items-center text-gray-400 hover:text-primary p-2 text-sm rounded-md focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:text-primary dark:focus:bg-white/10">
                    <span class="group-hover:hidden text-xs">•••</span>
                    <svg class="group-hover:block hidden flex-shrink-0 size-5"
                        xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                        viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="m6 17 5-5-5-5" />
                        <path d="m13 17 5-5-5-5" />
                    </svg>
                    <span
                        class="hs-tooltip-content ti-main-tooltip-content py-1 px-2 bg-gray-900 text-xs font-medium text-white shadow-sm dark:bg-bodybg"
                        role="tooltip">
                        Next 4 pages
                    </span>
                </button>
            </div>
            <button type="button"
                class="min-h-[38px] min-w-[38px] flex justify-center items-center text-gray-800 hover:bg-gray-100 py-1 px-2.5 text-sm rounded-md focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">8</button>
        </div>
        <button type="button"
            class="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex jusify-center items-center gap-x-2 text-sm rounded-md text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
            <span aria-hidden="true" class="sr-only">Next</span>
            <i class="ri-arrow-right-s-line align-middle rtl:rotate-180"></i>
        </button>
    </nav>
    <!-- End Pagination -->
    <div class="flex justify-center items-center gap-x-5">
        <!-- Dropdown -->
        <div class="hs-dropdown ti-dropdown [--placement:top-left]">
            <button id="hs-pagination-dropdown-bordered1" type="button"
                class="hs-dropdown-toggle !py-2 !px-2.5 ti-dropdown-toggle">
                5 page
                <svg class="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg"
                    width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round">
                    <path d="m6 9 6 6 6-6" />
                </svg>
            </button>
            <div class="hs-dropdown-menu ti-dropdown-menu hidden"
                aria-labelledby="hs-pagination-dropdown-bordered1">
                <button type="button" class="ti-dropdown-item w-full justify-between">
                    5 page
                    <i class="ri-check-line text-primary flex-shrink-0 size-4"></i>
                </button>
                <button type="button" class="ti-dropdown-item w-full">
                    8 page
                </button>
                <button type="button" class="ti-dropdown-item w-full">
                    10 page
                </button>
            </div>
        </div>
        <!-- End Dropdown -->

        <!-- Go To Page -->
        <div class="flex justify-center sm:justify-start items-center gap-x-2">
            <span class="text-sm text-gray-800 whitespace-nowrap dark:text-white">
                Go to
            </span>
            <input type="number"
                class="min-h-[38px] py-2 px-2.5 block w-12 border-gray-200 rounded-md text-sm text-center focus:border-primary focus:ring-primary [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-gray-400 dark:focus:ring-gray-600">
            <span class="text-sm text-gray-800 whitespace-nowrap dark:text-white">
                page
            </span>
        </div>
        <!-- End Go To Page -->
    </div>
</div>
<!-- End Pagination Wrapper -->

<!-- Pagination Wrapper -->
<div
    class="grid justify-center sm:flex sm:justify-start sm:items-center gap-2 flex-wrap">
    <!-- Pagination Wrapper -->
    <nav class="flex items-center gap-x-1">
        <button type="button"
            class="min-h-[46px] min-w-[46px] py-2 px-2.5 inline-flex jusify-center items-center gap-x-2 text-sm rounded-md text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
            <i class="ri-arrow-left-s-line align-middle rtl:rotate-180"></i>
            <span aria-hidden="true" class="sr-only">Previous</span>
        </button>
        <div class="flex items-center gap-x-1">
            <button type="button"
                class="min-h-[46px] min-w-[46px] flex justify-center items-center border border-primary text-primary py-1 px-2.5 text-sm rounded-md focus:outline-none focus:bg-gray-300 disabled:opacity-50 disabled:pointer-events-none dark:border-primary dark:text-primary dark:focus:bg-gray-500"
                aria-current="page">1</button>
            <div class="hs-tooltip ti-main-tooltip">
                <button type="button"
                    class="hs-tooltip-toggle group min-h-[46px] min-w-[46px] flex justify-center items-center text-gray-400 hover:text-primary p-2 text-sm rounded-md focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:text-primary dark:focus:bg-white/10">
                    <span class="group-hover:hidden text-xs">•••</span>
                    <svg class="group-hover:block hidden flex-shrink-0 size-5"
                        xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                        viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="m6 17 5-5-5-5" />
                        <path d="m13 17 5-5-5-5" />
                    </svg>
                    <span
                        class="hs-tooltip-content ti-main-tooltip-content py-1 px-2 bg-gray-900 text-xs font-medium text-white shadow-sm dark:bg-bodybg"
                        role="tooltip">
                        Next 4 pages
                    </span>
                </button>
            </div>
            <button type="button"
                class="min-h-[46px] min-w-[46px] flex justify-center items-center text-gray-800 hover:bg-gray-100 py-1 px-2.5 text-sm rounded-md focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">8</button>
        </div>
        <button type="button"
            class="min-h-[46px] min-w-[46px] py-2 px-2.5 inline-flex jusify-center items-center gap-x-2 text-sm rounded-md text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
            <span aria-hidden="true" class="sr-only">Next</span>
            <i class="ri-arrow-right-s-line align-middle rtl:rotate-180"></i>
        </button>
    </nav>
    <!-- End Pagination -->
    <div class="flex justify-center items-center gap-x-5">
        <!-- Dropdown -->
        <div class="hs-dropdown ti-dropdown [--placement:top-left]">
            <button id="hs-pagination-dropdown-bordered2" type="button"
                class="hs-dropdown-toggle !py-3 !px-3.5 ti-dropdown-toggle">
                5 page
                <svg class="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg"
                    width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round">
                    <path d="m6 9 6 6 6-6" />
                </svg>
            </button>
            <div class="hs-dropdown-menu ti-dropdown-menu hidden"
                aria-labelledby="hs-pagination-dropdown-bordered2">
                <button type="button" class="ti-dropdown-item w-full justify-between">
                    5 page
                    <i class="ri-check-line text-primary flex-shrink-0 size-4"></i>
                </button>
                <button type="button" class="ti-dropdown-item w-full">
                    8 page
                </button>
                <button type="button" class="ti-dropdown-item w-full">
                    10 page
                </button>
            </div>
        </div>
        <!-- End Dropdown -->

        <!-- Go To Page -->
        <div class="flex justify-center sm:justify-start items-center gap-x-2">
            <span class="text-sm text-gray-800 whitespace-nowrap dark:text-white">
                Go to
            </span>
            <input type="number"
                class="min-h-[46px] p-3 block w-12 border-gray-200 rounded-md text-sm text-center focus:border-primary focus:ring-primary [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-gray-400 dark:focus:ring-gray-600">
            <span class="text-sm text-gray-800 whitespace-nowrap dark:text-white">
                page
            </span>
        </div>
        <!-- End Go To Page -->
    </div>
</div>
<!-- End Pagination Wrapper -->
`
export let paginationTS17=`
<!-- Pagination Wrapper -->
<div
    class="grid justify-center sm:flex sm:justify-start sm:items-center gap-2 flex-wrap">
    <!-- Pagination Wrapper -->
    <nav class="flex items-center gap-x-1">
        <button type="button"
            class="min-h-[32px] min-w-8 py-2 px-2.5 inline-flex jusify-center items-center gap-x-2 text-sm rounded-full text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
            <i class="ri-arrow-left-s-line align-middle rtl:rotate-180"></i>
            <span aria-hidden="true" class="sr-only">Previous</span>
        </button>
        <div class="flex items-center gap-x-1">
            <button type="button"
                class="min-h-[32px] min-w-8 flex justify-center items-center border border-primary text-primary py-1 px-2.5 text-sm rounded-full focus:outline-none focus:bg-gray-300 disabled:opacity-50 disabled:pointer-events-none dark:border-primary dark:text-primary dark:focus:bg-gray-500"
                aria-current="page">1</button>
            <div class="hs-tooltip ti-main-tooltip">
                <button type="button"
                    class="hs-tooltip-toggle group min-h-[32px] min-w-8 flex justify-center items-center text-gray-400 hover:text-primary p-2 text-sm rounded-full focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:text-primary dark:focus:bg-white/10">
                    <span class="group-hover:hidden text-xs">•••</span>
                    <svg class="group-hover:block hidden flex-shrink-0 size-5"
                        xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                        viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="m6 17 5-5-5-5" />
                        <path d="m13 17 5-5-5-5" />
                    </svg>
                    <span
                        class="hs-tooltip-content ti-main-tooltip-content py-1 px-2 bg-gray-900 text-xs font-medium text-white shadow-sm dark:bg-bodybg"
                        role="tooltip">
                        Next 4 pages
                    </span>
                </button>
            </div>
            <button type="button"
                class="min-h-[32px] min-w-8 flex justify-center items-center text-gray-800 hover:bg-gray-100 py-1 px-2.5 text-sm rounded-full focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">8</button>
        </div>
        <button type="button"
            class="min-h-[32px] min-w-8 py-2 px-2.5 inline-flex jusify-center items-center gap-x-2 text-sm rounded-full text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
            <span aria-hidden="true" class="sr-only">Next</span>
            <i class="ri-arrow-right-s-line align-middle rtl:rotate-180"></i>
        </button>
    </nav>
    <!-- End Pagination -->
    <div class="flex justify-center items-center gap-x-5">
        <!-- Dropdown -->
        <div class="hs-dropdown ti-dropdown [--placement:top-left]">
            <button id="hs-pagination-dropdown-bordered-round" type="button"
                class="hs-dropdown-toggle !py-1 !px-2.5 ti-dropdown-toggle">
                5 page
                <svg class="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg"
                    width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round">
                    <path d="m6 9 6 6 6-6" />
                </svg>
            </button>
            <div class="hs-dropdown-menu ti-dropdown-menu hidden"
                aria-labelledby="hs-pagination-dropdown-bordered-round">
                <button type="button" class="ti-dropdown-item w-full justify-between">
                    5 page
                    <i class="ri-check-line text-primary flex-shrink-0 size-4"></i>
                </button>
                <button type="button" class="ti-dropdown-item w-full">
                    8 page
                </button>
                <button type="button" class="ti-dropdown-item w-full">
                    10 page
                </button>
            </div>
        </div>
        <!-- End Dropdown -->

        <!-- Go To Page -->
        <div class="flex justify-center sm:justify-start items-center gap-x-2">
            <span class="text-sm text-gray-800 whitespace-nowrap dark:text-white">
                Go to
            </span>
            <input type="number"
                class="min-h-[32px] py-1 px-2.5  block w-12 border-gray-200 rounded-md text-sm text-center focus:border-primary focus:ring-primary [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-gray-400 dark:focus:ring-gray-600">
            <span class="text-sm text-gray-800 whitespace-nowrap dark:text-white">
                page
            </span>
        </div>
        <!-- End Go To Page -->
    </div>
</div>
<!-- End Pagination Wrapper -->

<!-- Pagination Wrapper -->
<div
    class="grid justify-center sm:flex sm:justify-start sm:items-center gap-2 flex-wrap">
    <!-- Pagination Wrapper -->
    <nav class="flex items-center gap-x-1">
        <button type="button"
            class="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex jusify-center items-center gap-x-2 text-sm rounded-full text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
            <i class="ri-arrow-left-s-line align-middle rtl:rotate-180"></i>
            <span aria-hidden="true" class="sr-only">Previous</span>
        </button>
        <div class="flex items-center gap-x-1">
            <button type="button"
                class="min-h-[38px] min-w-[38px] flex justify-center items-center border border-primary text-primary py-1 px-2.5 text-sm rounded-full focus:outline-none focus:bg-gray-300 disabled:opacity-50 disabled:pointer-events-none dark:border-primary dark:text-primary dark:focus:bg-gray-500"
                aria-current="page">1</button>
            <div class="hs-tooltip ti-main-tooltip">
                <button type="button"
                    class="hs-tooltip-toggle group min-h-[38px] min-w-[38px] flex justify-center items-center text-gray-400 hover:text-primary p-2 text-sm rounded-full focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:text-primary dark:focus:bg-white/10">
                    <span class="group-hover:hidden text-xs">•••</span>
                    <svg class="group-hover:block hidden flex-shrink-0 size-5"
                        xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                        viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="m6 17 5-5-5-5" />
                        <path d="m13 17 5-5-5-5" />
                    </svg>
                    <span
                        class="hs-tooltip-content ti-main-tooltip-content py-1 px-2 bg-gray-900 text-xs font-medium text-white shadow-sm dark:bg-bodybg"
                        role="tooltip">
                        Next 4 pages
                    </span>
                </button>
            </div>
            <button type="button"
                class="min-h-[38px] min-w-[38px] flex justify-center items-center text-gray-800 hover:bg-gray-100 py-1 px-2.5 text-sm rounded-full focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">8</button>
        </div>
        <button type="button"
            class="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex jusify-center items-center gap-x-2 text-sm rounded-full text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
            <span aria-hidden="true" class="sr-only">Next</span>
            <i class="ri-arrow-right-s-line align-middle rtl:rotate-180"></i>
        </button>
    </nav>
    <!-- End Pagination -->
    <div class="flex justify-center items-center gap-x-5">
        <!-- Dropdown -->
        <div class="hs-dropdown ti-dropdown [--placement:top-left]">
            <button id="hs-pagination-dropdown-bordered-round1" type="button"
                class="hs-dropdown-toggle !py-2 !px-2.5 ti-dropdown-toggle">
                5 page
                <svg class="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg"
                    width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round">
                    <path d="m6 9 6 6 6-6" />
                </svg>
            </button>
            <div class="hs-dropdown-menu ti-dropdown-menu hidden"
                aria-labelledby="hs-pagination-dropdown-bordered-round1">
                <button type="button" class="ti-dropdown-item w-full justify-between">
                    5 page
                    <i class="ri-check-line text-primary flex-shrink-0 size-4"></i>
                </button>
                <button type="button" class="ti-dropdown-item w-full">
                    8 page
                </button>
                <button type="button" class="ti-dropdown-item w-full">
                    10 page
                </button>
            </div>
        </div>
        <!-- End Dropdown -->

        <!-- Go To Page -->
        <div class="flex justify-center sm:justify-start items-center gap-x-2">
            <span class="text-sm text-gray-800 whitespace-nowrap dark:text-white">
                Go to
            </span>
            <input type="number"
                class="min-h-[38px] py-2 px-2.5 block w-12 border-gray-200 rounded-md text-sm text-center focus:border-primary focus:ring-primary [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-gray-400 dark:focus:ring-gray-600">
            <span class="text-sm text-gray-800 whitespace-nowrap dark:text-white">
                page
            </span>
        </div>
        <!-- End Go To Page -->
    </div>
</div>
<!-- End Pagination Wrapper -->

<!-- Pagination Wrapper -->
<div
    class="grid justify-center sm:flex sm:justify-start sm:items-center gap-2 flex-wrap">
    <!-- Pagination Wrapper -->
    <nav class="flex items-center gap-x-1">
        <button type="button"
            class="min-h-[46px] min-w-[46px] py-2 px-2.5 inline-flex jusify-center items-center gap-x-2 text-sm rounded-full text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
            <i class="ri-arrow-left-s-line align-middle rtl:rotate-180"></i>
            <span aria-hidden="true" class="sr-only">Previous</span>
        </button>
        <div class="flex items-center gap-x-1">
            <button type="button"
                class="min-h-[46px] min-w-[46px] flex justify-center items-center border border-primary text-primary py-1 px-2.5 text-sm rounded-full focus:outline-none focus:bg-gray-300 disabled:opacity-50 disabled:pointer-events-none dark:border-primary dark:text-primary dark:focus:bg-gray-500"
                aria-current="page">1</button>
            <div class="hs-tooltip ti-main-tooltip">
                <button type="button"
                    class="hs-tooltip-toggle group min-h-[46px] min-w-[46px] flex justify-center items-center text-gray-400 hover:text-primary p-2 text-sm rounded-full focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:text-primary dark:focus:bg-white/10">
                    <span class="group-hover:hidden text-xs">•••</span>
                    <svg class="group-hover:block hidden flex-shrink-0 size-5"
                        xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                        viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="m6 17 5-5-5-5" />
                        <path d="m13 17 5-5-5-5" />
                    </svg>
                    <span
                        class="hs-tooltip-content ti-main-tooltip-content py-1 px-2 bg-gray-900 text-xs font-medium text-white shadow-sm dark:bg-bodybg"
                        role="tooltip">
                        Next 4 pages
                    </span>
                </button>
            </div>
            <button type="button"
                class="min-h-[46px] min-w-[46px] flex justify-center items-center text-gray-800 hover:bg-gray-100 py-1 px-2.5 text-sm rounded-full focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">8</button>
        </div>
        <button type="button"
            class="min-h-[46px] min-w-[46px] py-2 px-2.5 inline-flex jusify-center items-center gap-x-2 text-sm rounded-full text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
            <span aria-hidden="true" class="sr-only">Next</span>
            <i class="ri-arrow-right-s-line align-middle rtl:rotate-180"></i>
        </button>
    </nav>
    <!-- End Pagination -->
    <div class="flex justify-center items-center gap-x-5">
        <!-- Dropdown -->
        <div class="hs-dropdown ti-dropdown [--placement:top-left]">
            <button id="hs-pagination-dropdown-bordered-round2" type="button"
                class="hs-dropdown-toggle !py-3 !px-3.5 ti-dropdown-toggle">
                5 page
                <svg class="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg"
                    width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round">
                    <path d="m6 9 6 6 6-6" />
                </svg>
            </button>
            <div class="hs-dropdown-menu ti-dropdown-menu hidden"
                aria-labelledby="hs-pagination-dropdown-bordered-round2">
                <button type="button" class="ti-dropdown-item w-full justify-between">
                    5 page
                    <i class="ri-check-line text-primary flex-shrink-0 size-4"></i>
                </button>
                <button type="button" class="ti-dropdown-item w-full">
                    8 page
                </button>
                <button type="button" class="ti-dropdown-item w-full">
                    10 page
                </button>
            </div>
        </div>
        <!-- End Dropdown -->

        <!-- Go To Page -->
        <div class="flex justify-center sm:justify-start items-center gap-x-2">
            <span class="text-sm text-gray-800 whitespace-nowrap dark:text-white">
                Go to
            </span>
            <input type="number"
                class="min-h-[46px] p-3 block w-12 border-gray-200 rounded-md text-sm text-center focus:border-primary focus:ring-primary [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-gray-400 dark:focus:ring-gray-600">
            <span class="text-sm text-gray-800 whitespace-nowrap dark:text-white">
                page
            </span>
        </div>
        <!-- End Go To Page -->
    </div>
</div>
`
export let paginationTS18=`
<!-- Pagination Wrapper -->
<div
    class="grid justify-center sm:flex sm:justify-start sm:items-center gap-2 flex-wrap">
    <!-- Pagination Wrapper -->
    <nav class="flex items-center -space-x-px">
        <button type="button"
            class="min-h-[32px] min-w-8 py-2 px-2 inline-flex justify-center items-center gap-x-1.5 text-sm first:rounded-s-md last:rounded-e-md border border-gray-200 text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-white/10 dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
            <i class="ri-arrow-left-s-line align-middle rtl:rotate-180"></i>
            <span aria-hidden="true" class="sr-only">Previous</span>
        </button>
        <button type="button"
            class="min-h-[32px] min-w-8 flex justify-center items-center bg-primary text-white border border-gray-200 py-1 px-2.5 text-sm first:rounded-s-md last:rounded-e-md focus:outline-none focus:bg-gray-300 disabled:opacity-50 disabled:pointer-events-none dark:bg-primary dark:border-white/10 dark:text-white dark:focus:bg-gray-500"
            aria-current="page">1</button>
        <div
            class="hs-tooltip ti-main-tooltip border border-gray-200 dark:border-white/10">
            <button type="button"
                class="hs-tooltip-toggle group min-h-[30px] min-w-8 flex justify-center items-center text-gray-400 hover:text-primary py-1 px-2.5 text-sm focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:text-primary dark:focus:bg-white/10">
                <span class="group-hover:hidden text-xs">•••</span>
                <svg class="group-hover:block hidden flex-shrink-0 size-5"
                    xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="m6 17 5-5-5-5" />
                    <path d="m13 17 5-5-5-5" />
                </svg>
                <span
                    class="hs-tooltip-content ti-main-tooltip-content py-1 px-2 bg-gray-900 text-xs font-medium text-white shadow-sm dark:bg-bodybg"
                    role="tooltip">
                    Next 4 pages
                </span>
            </button>
        </div>
        <button type="button"
            class="min-h-[32px] min-w-8 flex justify-center items-center border border-gray-200 text-gray-800 hover:bg-gray-100 py-1 px-2.5 text-sm first:rounded-s-md last:rounded-e-md focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-white/10 dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">8</button>
        <button type="button"
            class="min-h-[32px] min-w-8 py-1 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm first:rounded-s-md last:rounded-e-md border border-gray-200 text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-white/10 dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
            <span aria-hidden="true" class="sr-only">Next</span>
            <i class="ri-arrow-right-s-line align-middle rtl:rotate-180"></i>
        </button>
    </nav>
    <!-- End Pagination -->
    <div class="flex justify-center items-center gap-x-5">
        <!-- Dropdown -->
        <div class="hs-dropdown ti-dropdown [--placement:top-left]">
            <button id="hs-pagination-dropdown-bordered-group" type="button"
                class="hs-dropdown-toggle !py-1 !px-2.5 ti-dropdown-toggle">
                5 page
                <svg class="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg"
                    width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round">
                    <path d="m6 9 6 6 6-6" />
                </svg>
            </button>
            <div class="hs-dropdown-menu ti-dropdown-menu hidden"
                aria-labelledby="hs-pagination-dropdown-bordered-group">
                <button type="button" class="ti-dropdown-item w-full justify-between">
                    5 page
                    <i class="ri-check-line text-primary flex-shrink-0 size-4"></i>
                </button>
                <button type="button" class="ti-dropdown-item w-full">
                    8 page
                </button>
                <button type="button" class="ti-dropdown-item w-full">
                    10 page
                </button>
            </div>
        </div>
        <!-- End Dropdown -->

        <!-- Go To Page -->
        <div class="flex justify-center sm:justify-start items-center gap-x-2">
            <span class="text-sm text-gray-800 whitespace-nowrap dark:text-white">
                Go to
            </span>
            <input type="number"
                class="min-h-[32px] py-1 px-2.5  block w-12 border-gray-200 rounded-md text-sm text-center focus:border-primary focus:ring-primary [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-gray-400 dark:focus:ring-gray-600">
            <span class="text-sm text-gray-800 whitespace-nowrap dark:text-white">
                page
            </span>
        </div>
        <!-- End Go To Page -->
    </div>
</div>
<!-- End Pagination Wrapper -->

<!-- Pagination Wrapper -->
<div
    class="grid justify-center sm:flex sm:justify-start sm:items-center gap-2 flex-wrap">
    <!-- Pagination Wrapper -->
    <nav class="flex items-center -space-x-px">
        <button type="button"
            class="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm first:rounded-s-md last:rounded-e-md border border-gray-200 text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-white/10 dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
            <i class="ri-arrow-left-s-line align-middle rtl:rotate-180"></i>
            <span aria-hidden="true" class="sr-only">Previous</span>
        </button>
        <button type="button"
            class="min-h-[38px] min-w-[38px] flex justify-center items-center bg-primary text-white border border-gray-200 py-2 px-3 text-sm first:rounded-s-md last:rounded-e-md focus:outline-none focus:bg-gray-300 disabled:opacity-50 disabled:pointer-events-none dark:bg-primary dark:border-white/10 dark:text-white dark:focus:bg-gray-500"
            aria-current="page">1</button>
        <div
            class="hs-tooltip ti-main-tooltip border border-gray-200 dark:border-white/10">
            <button type="button"
                class="hs-tooltip-toggle group min-h-[36px] min-w-[36px] flex justify-center items-center text-gray-400 hover:text-primary p-2 text-sm focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:text-primary dark:focus:bg-white/10">
                <span class="group-hover:hidden text-xs">•••</span>
                <svg class="group-hover:block hidden flex-shrink-0 size-5"
                    xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="m6 17 5-5-5-5" />
                    <path d="m13 17 5-5-5-5" />
                </svg>
                <span
                    class="hs-tooltip-content ti-main-tooltip-content py-1 px-2 bg-gray-900 text-xs font-medium text-white shadow-sm dark:bg-bodybg"
                    role="tooltip">
                    Next 4 pages
                </span>
            </button>
        </div>
        <button type="button"
            class="min-h-[38px] min-w-[38px] flex justify-center items-center border border-gray-200 text-gray-800 hover:bg-gray-100 py-2 px-3 text-sm first:rounded-s-md last:rounded-e-md focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-white/10 dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">8</button>
        <button type="button"
            class="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm first:rounded-s-md last:rounded-e-md border border-gray-200 text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-white/10 dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
            <span aria-hidden="true" class="sr-only">Next</span>
            <i class="ri-arrow-right-s-line align-middle rtl:rotate-180"></i>
        </button>
    </nav>
    <!-- End Pagination -->
    <div class="flex justify-center items-center gap-x-5">
        <!-- Dropdown -->
        <div class="hs-dropdown ti-dropdown [--placement:top-left]">
            <button id="hs-pagination-dropdown-bordered-group1" type="button"
                class="hs-dropdown-toggle !py-2 !px-2.5 ti-dropdown-toggle">
                5 page
                <svg class="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg"
                    width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round">
                    <path d="m6 9 6 6 6-6" />
                </svg>
            </button>
            <div class="hs-dropdown-menu ti-dropdown-menu hidden"
                aria-labelledby="hs-pagination-dropdown-bordered-group1">
                <button type="button" class="ti-dropdown-item w-full justify-between">
                    5 page
                    <i class="ri-check-line text-primary flex-shrink-0 size-4"></i>
                </button>
                <button type="button" class="ti-dropdown-item w-full">
                    8 page
                </button>
                <button type="button" class="ti-dropdown-item w-full">
                    10 page
                </button>
            </div>
        </div>
        <!-- End Dropdown -->

        <!-- Go To Page -->
        <div class="flex justify-center sm:justify-start items-center gap-x-2">
            <span class="text-sm text-gray-800 whitespace-nowrap dark:text-white">
                Go to
            </span>
            <input type="number"
                class="min-h-[32px] py-2 px-2.5 block w-12 border-gray-200 rounded-md text-sm text-center focus:border-primary focus:ring-primary [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-gray-400 dark:focus:ring-gray-600">
            <span class="text-sm text-gray-800 whitespace-nowrap dark:text-white">
                page
            </span>
        </div>
        <!-- End Go To Page -->
    </div>

</div>
<!-- End Pagination Wrapper -->

<!-- Pagination Wrapper -->
<div
    class="grid justify-center sm:flex sm:justify-start sm:items-center gap-2 flex-wrap">
    <!-- Pagination Wrapper -->
    <nav class="flex items-center -space-x-px">
        <button type="button"
            class="min-h-[46px] min-w-[46px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm first:rounded-s-md last:rounded-e-md border border-gray-200 text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-white/10 dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
            <i class="ri-arrow-left-s-line align-middle rtl:rotate-180"></i>
            <span aria-hidden="true" class="sr-only">Previous</span>
        </button>
        <button type="button"
            class="min-h-[46px] min-w-[46px] flex justify-center items-center bg-primary text-white border border-gray-200 py-2 px-3 text-sm first:rounded-s-md last:rounded-e-md focus:outline-none focus:bg-gray-300 disabled:opacity-50 disabled:pointer-events-none dark:bg-primary dark:border-white/10 dark:text-white dark:focus:bg-gray-500"
            aria-current="page">1</button>
        <div
            class="hs-tooltip ti-main-tooltip border border-gray-200 dark:border-white/10">
            <button type="button"
                class="hs-tooltip-toggle group min-h-[44px] min-w-[46px] flex justify-center items-center text-gray-400 hover:text-primary p-2 text-sm focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:text-primary dark:focus:bg-white/10">
                <span class="group-hover:hidden text-xs">•••</span>
                <svg class="group-hover:block hidden flex-shrink-0 size-5"
                    xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="m6 17 5-5-5-5" />
                    <path d="m13 17 5-5-5-5" />
                </svg>
                <span
                    class="hs-tooltip-content ti-main-tooltip-content py-1 px-2 bg-gray-900 text-xs font-medium text-white shadow-sm dark:bg-bodybg"
                    role="tooltip">
                    Next 4 pages
                </span>
            </button>
        </div>
        <button type="button"
            class="min-h-[46px] min-w-[46px] flex justify-center items-center border border-gray-200 text-gray-800 hover:bg-gray-100 py-2 px-3 text-sm first:rounded-s-md last:rounded-e-md focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-white/10 dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">8</button>
        <button type="button"
            class="min-h-[46px] min-w-[46px]py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm first:rounded-s-md last:rounded-e-md border border-gray-200 text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-white/10 dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
            <span aria-hidden="true" class="sr-only">Next</span>
            <i class="ri-arrow-right-s-line align-middle rtl:rotate-180"></i>
        </button>
    </nav>
    <!-- End Pagination -->
    <div class="flex justify-center items-center gap-x-5">
        <!-- Dropdown -->
        <div class="hs-dropdown ti-dropdown [--placement:top-left]">
            <button id="hs-pagination-dropdown-bordered-group2" type="button"
                class="hs-dropdown-toggle !py-3 !px-3.5 ti-dropdown-toggle">
                5 page
                <svg class="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg"
                    width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round">
                    <path d="m6 9 6 6 6-6" />
                </svg>
            </button>
            <div class="hs-dropdown-menu ti-dropdown-menu hidden"
                aria-labelledby="hs-pagination-dropdown-bordered-group2">
                <button type="button" class="ti-dropdown-item w-full justify-between">
                    5 page
                    <i class="ri-check-line text-primary flex-shrink-0 size-4"></i>
                </button>
                <button type="button" class="ti-dropdown-item w-full">
                    8 page
                </button>
                <button type="button" class="ti-dropdown-item w-full">
                    10 page
                </button>
            </div>
        </div>
        <!-- End Dropdown -->

        <!-- Go To Page -->
        <div class="flex justify-center sm:justify-start items-center gap-x-2">
            <span class="text-sm text-gray-800 whitespace-nowrap dark:text-white">
                Go to
            </span>
            <input type="number"
                class="min-h-[46px] p-3 block w-12 border-gray-200 rounded-md text-sm text-center focus:border-primary focus:ring-primary [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-gray-400 dark:focus:ring-gray-600">
            <span class="text-sm text-gray-800 whitespace-nowrap dark:text-white">
                page
            </span>
        </div>
        <!-- End Go To Page -->
    </div>

</div>
<!-- End Pagination Wrapper -->
`
export let paginationTS19=`
<!-- Pagination Wrapper -->
<div
    class="grid justify-center sm:flex sm:justify-start sm:items-center gap-2 flex-wrap">
    <!-- Pagination Wrapper -->
    <nav class="flex items-center -space-x-px">
        <button type="button"
            class="min-h-[32px] min-w-8 py-2 px-2 inline-flex justify-center items-center gap-x-1.5 text-sm first:rounded-s-full last:rounded-e-full border border-gray-200 text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-white/10 dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
            <i class="ri-arrow-left-s-line align-middle rtl:rotate-180"></i>
            <span aria-hidden="true" class="sr-only">Previous</span>
        </button>
        <button type="button"
            class="min-h-[32px] min-w-8 flex justify-center items-center bg-primary text-white border border-gray-200 py-1 px-2.5 text-sm first:rounded-s-full last:rounded-e-full focus:outline-none focus:bg-gray-300 disabled:opacity-50 disabled:pointer-events-none dark:bg-primary dark:border-white/10 dark:text-white dark:focus:bg-gray-500"
            aria-current="page">1</button>
        <div
            class="hs-tooltip ti-main-tooltip border border-gray-200 dark:border-white/10">
            <button type="button"
                class="hs-tooltip-toggle group min-h-[30px] min-w-8 flex justify-center items-center text-gray-400 hover:text-primary py-1 px-2.5 text-sm focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:text-primary dark:focus:bg-white/10">
                <span class="group-hover:hidden text-xs">•••</span>
                <svg class="group-hover:block hidden flex-shrink-0 size-5"
                    xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="m6 17 5-5-5-5" />
                    <path d="m13 17 5-5-5-5" />
                </svg>
                <span
                    class="hs-tooltip-content ti-main-tooltip-content py-1 px-2 bg-gray-900 text-xs font-medium text-white shadow-sm dark:bg-bodybg"
                    role="tooltip">
                    Next 4 pages
                </span>
            </button>
        </div>
        <button type="button"
            class="min-h-[32px] min-w-8 flex justify-center items-center border border-gray-200 text-gray-800 hover:bg-gray-100 py-1 px-2.5 text-sm first:rounded-s-full last:rounded-e-full focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-white/10 dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">8</button>
        <button type="button"
            class="min-h-[32px] min-w-8 py-1 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm first:rounded-s-full last:rounded-e-full border border-gray-200 text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-white/10 dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
            <span aria-hidden="true" class="sr-only">Next</span>
            <i class="ri-arrow-right-s-line align-middle rtl:rotate-180"></i>
        </button>
    </nav>
    <!-- End Pagination -->
    <div class="flex justify-center items-center gap-x-5">
        <!-- Dropdown -->
        <div class="hs-dropdown ti-dropdown [--placement:top-left]">
            <button id="hs-pagination-dropdown-bordered-group-round" type="button"
                class="hs-dropdown-toggle !py-1 !px-2.5 ti-dropdown-toggle">
                5 page
                <svg class="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg"
                    width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round">
                    <path d="m6 9 6 6 6-6" />
                </svg>
            </button>
            <div class="hs-dropdown-menu ti-dropdown-menu hidden"
                aria-labelledby="hs-pagination-dropdown-bordered-group-round">
                <button type="button" class="ti-dropdown-item w-full justify-between">
                    5 page
                    <i class="ri-check-line text-primary flex-shrink-0 size-4"></i>
                </button>
                <button type="button" class="ti-dropdown-item w-full">
                    8 page
                </button>
                <button type="button" class="ti-dropdown-item w-full">
                    10 page
                </button>
            </div>
        </div>
        <!-- End Dropdown -->

        <!-- Go To Page -->
        <div class="flex justify-center sm:justify-start items-center gap-x-2">
            <span class="text-sm text-gray-800 whitespace-nowrap dark:text-white">
                Go to
            </span>
            <input type="number"
                class="min-h-[32px] py-1 px-2.5  block w-12 border-gray-200 rounded-md text-sm text-center focus:border-primary focus:ring-primary [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-gray-400 dark:focus:ring-gray-600">
            <span class="text-sm text-gray-800 whitespace-nowrap dark:text-white">
                page
            </span>
        </div>
        <!-- End Go To Page -->
    </div>
</div>
<!-- End Pagination Wrapper -->

<!-- Pagination Wrapper -->
<div
    class="grid justify-center sm:flex sm:justify-start sm:items-center gap-2 flex-wrap">
    <!-- Pagination Wrapper -->
    <nav class="flex items-center -space-x-px">
        <button type="button"
            class="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm first:rounded-s-full last:rounded-e-full border border-gray-200 text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-white/10 dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
            <i class="ri-arrow-left-s-line align-middle rtl:rotate-180"></i>
            <span aria-hidden="true" class="sr-only">Previous</span>
        </button>
        <button type="button"
            class="min-h-[38px] min-w-[38px] flex justify-center items-center bg-primary text-white border border-gray-200 py-2 px-3 text-sm first:rounded-s-full last:rounded-e-full focus:outline-none focus:bg-gray-300 disabled:opacity-50 disabled:pointer-events-none dark:bg-primary dark:border-white/10 dark:text-white dark:focus:bg-gray-500"
            aria-current="page">1</button>
        <div
            class="hs-tooltip ti-main-tooltip border border-gray-200 dark:border-white/10">
            <button type="button"
                class="hs-tooltip-toggle group min-h-[36px] min-w-[36px] flex justify-center items-center text-gray-400 hover:text-primary p-2 text-sm focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:text-primary dark:focus:bg-white/10">
                <span class="group-hover:hidden text-xs">•••</span>
                <svg class="group-hover:block hidden flex-shrink-0 size-5"
                    xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="m6 17 5-5-5-5" />
                    <path d="m13 17 5-5-5-5" />
                </svg>
                <span
                    class="hs-tooltip-content ti-main-tooltip-content py-1 px-2 bg-gray-900 text-xs font-medium text-white shadow-sm dark:bg-bodybg"
                    role="tooltip">
                    Next 4 pages
                </span>
            </button>
        </div>
        <button type="button"
            class="min-h-[38px] min-w-[38px] flex justify-center items-center border border-gray-200 text-gray-800 hover:bg-gray-100 py-2 px-3 text-sm first:rounded-s-full last:rounded-e-full focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-white/10 dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">8</button>
        <button type="button"
            class="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm first:rounded-s-full last:rounded-e-full border border-gray-200 text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-white/10 dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
            <span aria-hidden="true" class="sr-only">Next</span>
            <i class="ri-arrow-right-s-line align-middle rtl:rotate-180"></i>
        </button>
    </nav>
    <!-- End Pagination -->
    <div class="flex justify-center items-center gap-x-5">
        <!-- Dropdown -->
        <div class="hs-dropdown ti-dropdown [--placement:top-left]">
            <button id="hs-pagination-dropdown-bordered-group-round1" type="button"
                class="hs-dropdown-toggle !py-2 !px-2.5 ti-dropdown-toggle">
                5 page
                <svg class="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg"
                    width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round">
                    <path d="m6 9 6 6 6-6" />
                </svg>
            </button>
            <div class="hs-dropdown-menu ti-dropdown-menu hidden"
                aria-labelledby="hs-pagination-dropdown-bordered-group-round1">
                <button type="button" class="ti-dropdown-item w-full justify-between">
                    5 page
                    <i class="ri-check-line text-primary flex-shrink-0 size-4"></i>
                </button>
                <button type="button" class="ti-dropdown-item w-full">
                    8 page
                </button>
                <button type="button" class="ti-dropdown-item w-full">
                    10 page
                </button>
            </div>
        </div>
        <!-- End Dropdown -->

        <!-- Go To Page -->
        <div class="flex justify-center sm:justify-start items-center gap-x-2">
            <span class="text-sm text-gray-800 whitespace-nowrap dark:text-white">
                Go to
            </span>
            <input type="number"
                class="min-h-[32px] py-2 px-2.5 block w-12 border-gray-200 rounded-md text-sm text-center focus:border-primary focus:ring-primary [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-gray-400 dark:focus:ring-gray-600">
            <span class="text-sm text-gray-800 whitespace-nowrap dark:text-white">
                page
            </span>
        </div>
        <!-- End Go To Page -->
    </div>

</div>
<!-- End Pagination Wrapper -->

<!-- Pagination Wrapper -->
<div
    class="grid justify-center sm:flex sm:justify-start sm:items-center gap-2 flex-wrap">
    <!-- Pagination Wrapper -->
    <nav class="flex items-center -space-x-px">
        <button type="button"
            class="min-h-[46px] min-w-[46px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm first:rounded-s-full last:rounded-e-full border border-gray-200 text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-white/10 dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
            <i class="ri-arrow-left-s-line align-middle rtl:rotate-180"></i>
            <span aria-hidden="true" class="sr-only">Previous</span>
        </button>
        <button type="button"
            class="min-h-[46px] min-w-[46px] flex justify-center items-center bg-primary text-white border border-gray-200 py-2 px-3 text-sm first:rounded-s-full last:rounded-e-full focus:outline-none focus:bg-gray-300 disabled:opacity-50 disabled:pointer-events-none dark:bg-primary dark:border-white/10 dark:text-white dark:focus:bg-gray-500"
            aria-current="page">1</button>
        <div
            class="hs-tooltip ti-main-tooltip border border-gray-200 dark:border-white/10">
            <button type="button"
                class="hs-tooltip-toggle group min-h-[44px] min-w-[46px] flex justify-center items-center text-gray-400 hover:text-primary p-2 text-sm focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:text-primary dark:focus:bg-white/10">
                <span class="group-hover:hidden text-xs">•••</span>
                <svg class="group-hover:block hidden flex-shrink-0 size-5"
                    xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="m6 17 5-5-5-5" />
                    <path d="m13 17 5-5-5-5" />
                </svg>
                <span
                    class="hs-tooltip-content ti-main-tooltip-content py-1 px-2 bg-gray-900 text-xs font-medium text-white shadow-sm dark:bg-bodybg"
                    role="tooltip">
                    Next 4 pages
                </span>
            </button>
        </div>
        <button type="button"
            class="min-h-[46px] min-w-[46px] flex justify-center items-center border border-gray-200 text-gray-800 hover:bg-gray-100 py-2 px-3 text-sm first:rounded-s-full last:rounded-e-full focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-white/10 dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">8</button>
        <button type="button"
            class="min-h-[46px] min-w-[46px]py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm first:rounded-s-full last:rounded-e-full border border-gray-200 text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-white/10 dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
            <span aria-hidden="true" class="sr-only">Next</span>
            <i class="ri-arrow-right-s-line align-middle rtl:rotate-180"></i>
        </button>
    </nav>
    <!-- End Pagination -->
    <div class="flex justify-center items-center gap-x-5">
        <!-- Dropdown -->
        <div class="hs-dropdown ti-dropdown [--placement:top-left]">
            <button id="hs-pagination-dropdown-bordered-group-round2" type="button"
                class="hs-dropdown-toggle !py-3 !px-3.5 ti-dropdown-toggle">
                5 page
                <svg class="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg"
                    width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round">
                    <path d="m6 9 6 6 6-6" />
                </svg>
            </button>
            <div class="hs-dropdown-menu ti-dropdown-menu hidden"
                aria-labelledby="hs-pagination-dropdown-bordered-group-round2">
                <button type="button" class="ti-dropdown-item w-full justify-between">
                    5 page
                    <i class="ri-check-line text-primary flex-shrink-0 size-4"></i>
                </button>
                <button type="button" class="ti-dropdown-item w-full">
                    8 page
                </button>
                <button type="button" class="ti-dropdown-item w-full">
                    10 page
                </button>
            </div>
        </div>
        <!-- End Dropdown -->

        <!-- Go To Page -->
        <div class="flex justify-center sm:justify-start items-center gap-x-2">
            <span class="text-sm text-gray-800 whitespace-nowrap dark:text-white">
                Go to
            </span>
            <input type="number"
                class="min-h-[46px] p-3 block w-12 border-gray-200 rounded-md text-sm text-center focus:border-primary focus:ring-primary [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none disabled:opacity-50 disabled:pointer-events-none dark:bg-bodybg dark:border-white/10 dark:text-gray-400 dark:focus:ring-gray-600">
            <span class="text-sm text-gray-800 whitespace-nowrap dark:text-white">
                page
            </span>
        </div>
        <!-- End Go To Page -->
    </div>
</div>
<!-- End Pagination Wrapper -->
`
export let popoverTS1 =
`  <div class="ti-btn-list space-x-2 rtl:space-x-reverse">
<div class="hs-tooltip ti-main-tooltip [--trigger:click]">
    <a class="hs-tooltip-toggle ti-main-tooltip-toggle ti-btn ti-btn-outline-primary me-2" href="javascript:void(0);">Popover Top
        <div class="hs-tooltip-content ti-main-tooltip-content dark:bg-bodybg !p-0 !max-w-[276px]" role="tooltip">
            <div  class="!border-b !border-solid dark:border-defaultborder/10 !rounded-t-md !py-2  !px-4 text-defaulttextcolor border-defaultborder text-start w-full text-[1rem]">
            <h6>Popover Top</h6>
            </div>
            <p class="!text-defaulttextcolor !text-[0.8rem] !py-4 !px-4 text-start">And here's some amazing content. It's very engaging. Right?</p>
        </div>
      </a>
  </div>
<div class="hs-tooltip ti-main-tooltip [--trigger:click] [--placement:right]">
    <a class="hs-tooltip-toggle ti-main-tooltip-toggle ti-btn ti-btn-outline-primary me-2" href="javascript:void(0);">Popover Right
        <div class="hs-tooltip-content ti-main-tooltip-content dark:bg-bodybg !p-0 !max-w-[276px]" role="tooltip">
            <div  class="!border-b !border-solid dark:border-defaultborder/10 !rounded-t-md !py-2  !px-4 text-defaulttextcolor border-defaultborder text-start w-full text-[1rem]">
            <h6>Popover Right</h6>
            </div>
            <p class="!text-defaulttextcolor !text-[0.8rem] !py-4 !px-4 text-start">And here's some amazing content. It's very engaging. Right?</p>
        </div>
      </a>
  </div>
  <div class="hs-tooltip ti-main-tooltip [--trigger:click] [--placement:bottom]">
    <a class="hs-tooltip-toggle ti-main-tooltip-toggle ti-btn ti-btn-outline-primary me-2" href="javascript:void(0);">Popover Bottom
        <div class="hs-tooltip-content ti-main-tooltip-content dark:bg-bodybg !p-0 !max-w-[276px]" role="tooltip">
            <div  class="!border-b !border-solid dark:border-defaultborder/10 !rounded-t-md !py-2  !px-4 text-defaulttextcolor border-defaultborder text-start w-full text-[1rem]">
            <h6>Popover Bottom</h6>
            </div>
            <p class="!text-defaulttextcolor !text-[0.8rem] !py-4 !px-4 text-start">And here's some amazing content. It's very engaging. Right?</p>
        </div>
      </a>
  </div>
  <div class="hs-tooltip ti-main-tooltip [--trigger:click] [--placement:left]">
    <a class="hs-tooltip-toggle ti-main-tooltip-toggle ti-btn ti-btn-outline-primary me-2" href="javascript:void(0);">Popover Left
        <div class="hs-tooltip-content ti-main-tooltip-content dark:bg-bodybg !p-0 !max-w-[276px]" role="tooltip">
            <div  class="!border-b !border-solid dark:border-defaultborder/10 !rounded-t-md !py-2  !px-4 text-defaulttextcolor border-defaultborder text-start w-full text-[1rem]">
            <h6>Popover Left</h6>
            </div>
            <p class="!text-defaulttextcolor !text-[0.8rem] !py-4 !px-4 text-start">And here's some amazing content. It's very engaging. Right?</p>
        </div>
      </a>
  </div>
</div>`
export let popoverTS2 =
`  <div class="ti-btn-list space-x-2 rtl:space-x-reverse">
<div class="hs-tooltip ti-main-tooltip [--trigger:click] [--placement:top]">
    <a class="hs-tooltip-toggle ti-main-tooltip-toggle ti-btn ti-btn-outline-primary me-2" href="javascript:void(0);">Header Primary
        <div class="hs-tooltip-content ti-main-tooltip-content dark:bg-bodybg !p-0 !max-w-[276px]" role="tooltip">
            <div  class="!border-b !border-solid dark:border-defaultborder/10 bg-primary !rounded-t-md !py-2  !px-4 text-white border-defaultborder text-start w-full text-[1rem]">
            <h6>Color Header</h6>
            </div>
            <p class="!text-defaulttextcolor  !text-[0.8rem] !py-4 !px-4 text-start">Popover With Primary Header</p>
        </div>
      </a>
</div>
<div class="hs-tooltip ti-main-tooltip [--trigger:click] [--placement:right]">
    <a class="hs-tooltip-toggle ti-main-tooltip-toggle ti-btn ti-btn-outline-secondary me-2" href="javascript:void(0);">Header Secondary
        <div class="hs-tooltip-content ti-main-tooltip-content dark:bg-bodybg !p-0 !max-w-[276px]" role="tooltip">
            <div  class="!border-b !border-solid dark:border-defaultborder/10 bg-secondary !py-2 !rounded-t-md !px-4 text-white border-defaultborder text-start w-full text-[1rem]">
            <h6>Color Header</h6>
            </div>
            <p class="!text-defaulttextcolor !text-[0.8rem] !py-4 !px-4 text-start">Popover With Secondary Header</p>
        </div>
      </a>
</div>
<div class="hs-tooltip ti-main-tooltip [--trigger:click] [--placement:bottom]">
    <a class="hs-tooltip-toggle ti-main-tooltip-toggle ti-btn ti-btn-outline-info me-2" href="javascript:void(0);">Header Info
        <div class="hs-tooltip-content ti-main-tooltip-content dark:bg-bodybg !p-0 !max-w-[276px]" role="tooltip">
            <div  class="!border-b !border-solid dark:border-defaultborder/10 bg-info !py-2 !px-4 !rounded-t-md text-white border-defaultborder text-start w-full text-[1rem]">
            <h6>Color Header</h6>
            </div>
            <p class="!text-defaulttextcolor !text-[0.8rem] !py-4 !px-4 text-start">Popover With Info Header</p>
        </div>
      </a>
</div>
<div class="hs-tooltip ti-main-tooltip [--trigger:click] [--placement:left]">
    <a class="hs-tooltip-toggle ti-main-tooltip-toggle ti-btn ti-btn-outline-warning me-2" href="javascript:void(0);">Header warning
        <div class="hs-tooltip-content ti-main-tooltip-content dark:bg-bodybg !p-0 !max-w-[276px]" role="tooltip">
            <div  class="!border-b !border-solid dark:border-defaultborder/10 bg-warning !py-2 !px-4 !rounded-t-md text-white border-defaultborder text-start w-full text-[1rem]">
            <h6>Color Header</h6>
            </div>
            <p class="!text-defaulttextcolor !text-[0.8rem] !py-4 !px-4 text-start">Popover With warning Header</p>
        </div>
      </a>
</div>
<div class="hs-tooltip ti-main-tooltip [--trigger:click] [--placement:top]">
    <a class="hs-tooltip-toggle ti-main-tooltip-toggle ti-btn ti-btn-outline-success me-2" href="javascript:void(0);">Header succuss
        <div class="hs-tooltip-content ti-main-tooltip-content dark:bg-bodybg !p-0 !max-w-[276px]" role="tooltip">
            <div  class="!border-b !border-solid dark:border-defaultborder/10 bg-success !py-2 !px-4 text-white !rounded-t-md border-defaultborder text-start w-full text-[1rem]">
            <h6>Color Header</h6>
            </div>
            <p class="!text-defaulttextcolor !text-[0.8rem] !py-4 !px-4 text-start">Popover With succuss Header</p>
        </div>
      </a>
</div>
<div class="hs-tooltip ti-main-tooltip [--trigger:click] [--placement:top]">
    <a class="hs-tooltip-toggle ti-main-tooltip-toggle ti-btn ti-btn-outline-danger me-2" href="javascript:void(0);">Header danger
        <div class="hs-tooltip-content ti-main-tooltip-content dark:bg-bodybg !p-0 !max-w-[276px]" role="tooltip">
            <div  class="!border-b !border-solid dark:border-defaultborder/10 bg-danger !py-2 !px-4 text-white border-defaultborder !rounded-t-md text-start w-full text-[1rem]">
            <h6>Color Header</h6>
            </div>
            <p class="!text-defaulttextcolor !text-[0.8rem] !py-4 !px-4 text-start">Popover With danger Header</p>
        </div>
      </a>
</div>
</div>`
export let popoverTS3 =
`   <div class="ti-btn-list space-x-2 rtl:space-x-reverse">
<div class="hs-tooltip ti-main-tooltip  [--trigger:click] [--placement:top]">
    <a class="hs-tooltip-toggle ti-main-tooltip-toggle ti-btn ti-btn-primary-full me-2" href="javascript:void(0);">Primary
        <div class="hs-tooltip-content ti-main-tooltip-content !bg-primary !z-[1000] !p-0 !max-w-[276px] !border-white/10" role="tooltip">
            <div  class="!border-b !border-solid dark:border-white/10 !py-2 !px-4 text-white border-white/10 !rounded-t-md text-start w-full text-[1rem]">
            <h6>Primary Color background</h6>
            </div>
            <p class="!text-white !text-[0.8rem] !py-4 !px-4 text-start">Popover With primary background</p>
        </div>
      </a>
</div>
<div class="hs-tooltip ti-main-tooltip [--trigger:click] [--placement:right]">
    <a class="hs-tooltip-toggle ti-main-tooltip-toggle ti-btn ti-btn-secondary-full me-2" href="javascript:void(0);">Secondary
        <div class="hs-tooltip-content ti-main-tooltip-content !bg-secondary !p-0 !max-w-[276px] !border-white/10" role="tooltip">
            <div  class="!border-b !border-solid dark:border-white/10 !py-2 !px-4 text-white border-white/10 !rounded-t-md text-start w-full text-[1rem]">
            <h6>Secondary Color background</h6>
            </div>
            <p class="!text-white !text-[0.8rem] !py-4 !px-4 text-start">Popover With secondary background</p>
        </div>
      </a>
</div>
<div class="hs-tooltip ti-main-tooltip [--trigger:click] [--placement:top]">
    <a class="hs-tooltip-toggle ti-main-tooltip-toggle ti-btn ti-btn-info-full me-2" href="javascript:void(0);">Info
        <div class="hs-tooltip-content ti-main-tooltip-content !bg-secondary  !p-0 !max-w-[276px]  !border-white/10" role="tooltip">
            <div  class="!border-b dark:border-white/10 !border-solid !py-2 !px-4 text-white border-white/10 !rounded-t-md text-start w-full text-[1rem]">
            <h6>Info Color background</h6>
            </div>
            <p class="!text-white !text-[0.8rem] !py-4 !px-4 text-start">Popover With info background</p>
        </div>
      </a>
</div>
<div class="hs-tooltip ti-main-tooltip [--trigger:click] [--placement:right]">
    <a class="hs-tooltip-toggle ti-main-tooltip-toggle ti-btn ti-btn-warning-full me-2" href="javascript:void(0);">Warning
        <div class="hs-tooltip-content ti-main-tooltip-content !bg-warning  !p-0 !max-w-[276px] !border-white/10" role="tooltip">
            <div  class="!border-b dark:border-white/10 !border-solid !py-2 !px-4 text-white border-white/10 !rounded-t-md text-start w-full text-[1rem]">
            <h6>Warning Color background</h6>
            </div>
            <p class="!text-white !text-[0.8rem] !py-4 !px-4 text-start">Popover With warning background</p>
        </div>
      </a>
</div>
<div class="hs-tooltip ti-main-tooltip [--trigger:click] [--placement:top]">
    <a class="hs-tooltip-toggle ti-main-tooltip-toggle ti-btn ti-btn-success-full me-2" href="javascript:void(0);">Success
        <div class="hs-tooltip-content ti-main-tooltip-content !bg-success  !p-0 !max-w-[276px] !border-white/10" role="tooltip">
            <div  class="!border-b dark:border-white/10 !border-solid !py-2 !px-4 text-white border-white/10 !rounded-t-md text-start w-full text-[1rem]">
            <h6>Success Color background</h6>
            </div>
            <p class="!text-white !text-[0.8rem] !py-4 !px-4 text-start">Popover With success background</p>
        </div>
      </a>
</div>
<div class="hs-tooltip ti-main-tooltip [--trigger:click] [--placement:right]">
    <a class="hs-tooltip-toggle ti-main-tooltip-toggle ti-btn ti-btn-danger-full me-2" href="javascript:void(0);">Danger
        <div class="hs-tooltip-content ti-main-tooltip-content !bg-danger  !p-0 !max-w-[276px] !border-white/10" role="tooltip">
            <div  class="!border-b dark:border-white/10 !border-solid !py-2 !px-4 text-white border-white/10 !rounded-t-md text-start w-full text-[1rem]">
            <h6>Danger Color background</h6>
            </div>
            <p class="!text-white !text-[0.8rem] !py-4 !px-4 text-start">Popover With danger background</p>
        </div>
      </a>
</div>
</div>`
export let popoverTS4 =
` <div class="ti-btn-list space-x-2 rtl:space-x-reverse">
<div class="hs-tooltip ti-main-tooltip [--trigger:click] [--placement:top] ">
    <a class="hs-tooltip-toggle ti-main-tooltip-toggle ti-btn ti-btn-primary me-2" href="javascript:void(0);">Primary
        <div class="hs-tooltip-content ti-main-tooltip-content dark:bg-bodybg !z-[1000] !p-0 !max-w-[276px] overflow-hidden" role="tooltip">
            <div class="!bg-primary/10">
                <div  class="!border-b !border-solid !py-2 !px-4  text-primary !border-primary/20 !rounded-t-md text-start w-full text-[1rem]">
                <h6>Color background</h6>
                </div>
                <p class="!text-primary !text-[0.8rem] !py-4 !px-4 text-start">Popover With primary background</p>

            </div>
        </div>
    </a>
</div>
<div class="hs-tooltip ti-main-tooltip [--trigger:click] [--placement:right]">
    <a class="hs-tooltip-toggle ti-main-tooltip-toggle ti-btn ti-btn-secondary me-2" href="javascript:void(0);">Secondary
        <div class="hs-tooltip-content ti-main-tooltip-content dark:bg-bodybg !z-[1000] !p-0 !max-w-[276px] overflow-hidden" role="tooltip">
            <div class="!bg-secondary/10">
                <div  class="!border-b !border-solid !py-2 !px-4  text-secondary !border-secondary/20 !rounded-t-md text-start w-full text-[1rem]">
                <h6>Color background</h6>
                </div>
                <p class="!text-secondary !text-[0.8rem] !py-4 !px-4 text-start">Popover With secondary background</p>

            </div>
        </div>
      </a>
</div>
<div class="hs-tooltip ti-main-tooltip [--trigger:click] [--placement:top]">
    <a class="hs-tooltip-toggle ti-main-tooltip-toggle ti-btn ti-btn-info me-2" href="javascript:void(0);">Info
        <div class="hs-tooltip-content ti-main-tooltip-content dark:bg-bodybg !z-[1000] !p-0 !max-w-[276px] overflow-hidden" role="tooltip">
            <div class="!bg-info/10">
                <div  class="!border-b !border-solid !py-2 !px-4  text-info !border-info/20 !rounded-t-md text-start w-full text-[1rem]">
                <h6>Color background</h6>
                </div>
                <p class="!text-info !text-[0.8rem] !py-4 !px-4 text-start">Popover With info background</p>

            </div>
        </div>
      </a>
</div>
<div class="hs-tooltip ti-main-tooltip [--trigger:click] [--placement:right]">
    <a class="hs-tooltip-toggle ti-main-tooltip-toggle ti-btn ti-btn-warning me-2" href="javascript:void(0);">Warning
        <div class="hs-tooltip-content ti-main-tooltip-content dark:bg-bodybg !z-[1000] !p-0 !max-w-[276px] overflow-hidden" role="tooltip">
            <div class="!bg-warning/10">
                <div  class="!border-b !border-solid !py-2 !px-4  text-warning !border-warning/20 !rounded-t-md text-start w-full text-[1rem]">
                <h6>Color background</h6>
                </div>
                <p class="!text-warning !text-[0.8rem] !py-4 !px-4 text-start">Popover With warning background</p>
            </div>
        </div>
      </a>
</div>
<div class="hs-tooltip ti-main-tooltip [--trigger:click] [--placement:top]">
    <a class="hs-tooltip-toggle ti-main-tooltip-toggle ti-btn ti-btn-success me-2" href="javascript:void(0);">Success
        <div class="hs-tooltip-content ti-main-tooltip-content dark:bg-bodybg !z-[1000] !p-0 !max-w-[276px] overflow-hidden" role="tooltip">
            <div class="!bg-success/10">
                <div  class="!border-b !border-solid !py-2 !px-4  text-success !border-success/20 !rounded-t-md text-start w-full text-[1rem]">
                <h6>Color background</h6>
                </div>
                <p class="!text-success !text-[0.8rem] !py-4 !px-4 text-start">Popover With success background</p>

            </div>
        </div>
      </a>
</div>
<div class="hs-tooltip ti-main-tooltip [--trigger:click] [--placement:right]">
    <a class="hs-tooltip-toggle ti-main-tooltip-toggle ti-btn ti-btn-danger me-2" href="javascript:void(0);">danger
        <div class="hs-tooltip-content ti-main-tooltip-content dark:bg-bodybg !z-[1000] !p-0 !max-w-[276px] overflow-hidden" role="tooltip">
            <div class="!bg-danger/10">
                <div  class="!border-b !border-solid !py-2 !px-4  text-danger !border-danger/20 !rounded-t-md text-start w-full text-[1rem]">
                <h6>Color background</h6>
                </div>
                <p class="!text-danger !text-[0.8rem] !py-4 !px-4 text-start">Popover With danger background</p>

            </div>
        </div>
      </a>
</div>
</div>`
export let popoverTS5 =
`  <div class="hs-tooltip ti-main-tooltip [--trigger:click] [--placement:top]">
<a class="hs-tooltip-toggle ti-main-tooltip-toggle ti-btn ti-btn-primary-full opacity-60" href="javascript:void(0);">
    Disabled button
  <div class="hs-tooltip-content ti-main-tooltip-content dark:bg-bodybg " role="tooltip">
   Diabled Popover
  </div>
</a>
</div>`
export let popoverTS6 =
`  <div class="hs-tooltip ti-main-tooltip me-6 !max-w-[276px] [--trigger:click] [--placement:top]">
<a class="hs-tooltip-toggle ti-main-tooltip-toggle" href="javascript:void(0);">
    <svg xmlns="http://www.w3.org/2000/svg" class="svg-primary" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z"/></svg>
  <div class="hs-tooltip-content ti-main-tooltip-content !py-4 !px-4 !bg-primary !text-white" role="tooltip">
   <p>The Icon Popover</p>
  </div>
</a>
</div>
<div class="hs-tooltip ti-main-tooltip !max-w-[276px] [--trigger:click] [--placement:left]">
<a class="hs-tooltip-toggle ti-main-tooltip-toggle" href="javascript:void(0);">
<svg xmlns="http://www.w3.org/2000/svg" class="fill-secondary" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>
<div class="hs-tooltip-content ti-main-tooltip-content !bg-secondary !text-white !py-4 !px-4" role="tooltip">
    <p>The Icon Popover</p>
</div>
</a>
</div>`
export let popoverTS7 =
`      <div class="flex justify-center gap-4">
<div class="hs-tooltip ti-main-tooltip [--trigger:click]">
  <a class="hs-tooltip-toggle ti-main-tooltip-toggle" href="javascript:;">
    <span class="w-10 h-10 ti-btn btn-wave  p-0 transition-none focus:outline-none bg-gray-50 border-gray-200 text-gray-600 hover:bg-primary/30 hover:border-primary hover:text-primary dark:bg-bodybg dark:border-white/10 dark:text-white/70 dark:hover:bg-white/[.05] dark:hover:border-white/[.1] dark:hover:text-white">
      <i class="ri-arrow-up-s-line"></i>
    </span>
    <div class="hs-tooltip-content ti-main-tooltip-content" role="tooltip" data-popper-placement="top" style="position: fixed; inset: auto auto 0px 0px; margin: 0px; transform: translate(327px, -338px);">
      Top popover
    </div>
  </a>
</div>

<div class="hs-tooltip ti-main-tooltip [--trigger:click] [--placement:left]">
  <a class="hs-tooltip-toggle ti-main-tooltip-toggle" href="javascript:;">
    <span class="w-10 h-10 ti-btn btn-wave  p-0 transition-none focus:outline-none bg-gray-50 border-gray-200 text-gray-600 hover:bg-primary/30 hover:border-primary hover:text-primary dark:bg-bodybg dark:border-white/10 dark:text-white/70 dark:hover:bg-white/[.05] dark:hover:border-white/[.1] dark:hover:text-white">
      <i class="ri-arrow-left-s-line"></i>
    </span>
    <div class="hs-tooltip-content ti-main-tooltip-content hidden" role="tooltip" style="position: fixed; inset: 0px 0px auto auto; margin: 0px; transform: translate(-1501px, 469px);" data-popper-placement="left">
      Left popover
    </div>
  </a>
</div>

<div class="hs-tooltip ti-main-tooltip [--trigger:click] [--placement:right]">
  <a class="hs-tooltip-toggle ti-main-tooltip-toggle" href="javascript:;">
    <span class="w-10 h-10 ti-btn btn-wave  p-0 transition-none focus:outline-none bg-gray-50 border-gray-200 text-gray-600 hover:bg-primary/30 hover:border-primary hover:text-primary dark:bg-bodybg dark:border-white/10 dark:text-white/70 dark:hover:bg-white/[.05] dark:hover:border-white/[.1] dark:hover:text-white">
      <i class="ri-arrow-right-s-line"></i>
    </span>
    <div class="hs-tooltip-content ti-main-tooltip-content hidden" role="tooltip" style="position: fixed; inset: 0px auto auto 0px; margin: 0px; transform: translate(533px, 469px);" data-popper-placement="right">
      Right popover
    </div>
  </a>
</div>

<div class="hs-tooltip ti-main-tooltip [--trigger:click] [--placement:bottom]">
  <a class="hs-tooltip-toggle ti-main-tooltip-toggle" href="javascript:;">
    <span class="w-10 h-10 ti-btn btn-wave  p-0 transition-none focus:outline-none bg-gray-50 border-gray-200 text-gray-600 hover:bg-primary/30 hover:border-primary hover:text-primary dark:bg-bodybg dark:border-white/10 dark:text-white/70 dark:hover:bg-white/[.05] dark:hover:border-white/[.1] dark:hover:text-white">
      <i class="ri-arrow-down-s-line"></i>
    </span>
    <div class="hs-tooltip-content ti-main-tooltip-content hidden" role="tooltip" style="position: fixed; inset: 0px auto auto 0px; margin: 0px; transform: translate(496px, 521px);" data-popper-placement="bottom">
      Bottom popover
    </div>
  </a>
</div>

</div>`
export let popoverTS8 =
`  <div class="flex justify-center">
<div class="hs-tooltip ti-main-tooltip [--trigger:focus]">
  <a class="hs-tooltip-toggle ti-main-tooltip-toggle" href="javascript:;">
    <span class="w-10 h-10 ti-btn btn-wave  p-0 transition-none focus:outline-none bg-gray-50 border-gray-200 text-gray-600 hover:bg-primary/30 hover:border-primary hover:text-primary dark:bg-bodybg dark:border-white/10 dark:text-white/70 dark:hover:bg-white/[.05] dark:hover:border-white/[.1] dark:hover:text-white">
      <i class="ri-arrow-up-s-line"></i>
    </span>
    <div class="hs-tooltip-content ti-main-tooltip-content hidden" role="tooltip" style="position: fixed; inset: auto auto 0px 0px; margin: 0px; transform: translate(835px, -490px);" data-popper-placement="top">
      Focus me
    </div>
  </a>
</div>
</div>`
export let popoverTS9 =`
<div class="flex justify-center">
<div class="hs-tooltip ti-main-tooltip [--trigger:click]">
  <a class="hs-tooltip-toggle ti-main-tooltip-toggle" href="javascript:;">
    <span class="w-10 h-10 ti-btn btn-wave  p-0 transition-none focus:outline-none bg-gray-50 border-gray-200 text-gray-600 hover:bg-primary/30 hover:border-primary hover:text-primary dark:bg-bodybg dark:border-white/10 dark:text-white/70 dark:hover:bg-white/[.05] dark:hover:border-white/[.1] dark:hover:text-white">
      <i class="ri-arrow-up-s-line"></i>
    </span>
    <div class="hs-tooltip-content ti-main-tooltip-content !p-0 max-w-xs border-gray-200 text-start rounded-sm hidden" role="tooltip" style="position: fixed; inset: auto auto 0px 0px; margin: 0px; transform: translate(1132px, -490px);" data-popper-placement="top">
      <span class="pt-3 px-4 block text-lg font-bold text-gray-800 dark:text-white">Overview</span>
      <div class="py-2 px-3 text-sm text-gray-600 dark:text-white/70">
        <img class="rounded-sm mb-3" src="./assets/images/media/media-28.jpg" alt="Image Description">
        <p>This is a popover body with supporting text below as a natural lead-in to additional content.</p>
        <dl class="mt-3">
          <dt class="font-bold pt-3 first:pt-0 dark:text-white">Assigned to:</dt>
          <dd class="m-0 text-gray-600 dark:text-white/70">Mark Welson</dd>
          <dt class="font-bold pt-3 first:pt-0 dark:text-white">Due:</dt>
          <dd class="m-0 text-gray-600 dark:text-white/70">December 21, 2021</dd>
        </dl>
      </div>
    </div>
  </a>
</div>
</div>`

export let popoverTS10 =`
<div class="flex justify-center">
<div class="hs-tooltip ti-main-tooltip [--trigger:hover]">
  <a class="hs-tooltip-toggle ti-main-tooltip-toggle" href="javascript:;">
    <span class="w-10 h-10 ti-btn btn-wave  p-0 transition-none focus:outline-none bg-gray-50 border-gray-200 text-gray-600 hover:bg-primary/30 hover:border-primary hover:text-primary dark:bg-bodybg dark:border-white/10 dark:text-white/70 dark:hover:bg-white/[.05] dark:hover:border-white/[.1] dark:hover:text-white">
      <i class="ri-arrow-up-s-line"></i>
    </span>
    <div class="hs-tooltip-content ti-main-tooltip-content" role="tooltip" style="position: fixed; inset: auto auto 0px 0px; margin: 0px; transform: translate(427px, -319px);" data-popper-placement="top">
      Hover me
    </div>
  </a>
</div>
</div>`

export let popoverTS11 =`
<!-- Popover -->
<div class="hs-tooltip ti-main-tooltip [--trigger:click]">
  <div class="hs-tooltip-toggle ti-main-tooltip-toggle">
    <button type="button" class="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-primary hover:text-primary/80 disabled:opacity-50 disabled:pointer-events-none dark:text-primary dark:hover:text-primary/80 dark:focus:outline-none dark:focus:ring-0 dark:shadow-none dark:focus:ring-primary">
      Preline review
      <i class="ri-arrow-up-s-line"></i>
    </button>

    <div class="hs-tooltip-content ti-main-tooltip-content max-w-xs w-full hidden" role="tooltip" style="position: fixed; inset: auto auto 0px 0px; margin: 0px; transform: translate(1433px, -490px);" data-popper-placement="top">
      <div class="p-4">
        <!-- Header -->
        <div class="mb-3 flex justify-between items-center gap-x-3">
          <div class="flex items-center gap-x-2">
            <h4 class="font-semibold text-gray-800 dark:text-white">
              5.0
            </h4>

            <!-- Rating -->
            <div class="flex">
              <i class="ri-star-fill text-lg text-warning dark:text-warning"></i>
              <i class="ri-star-fill text-lg text-warning dark:text-warning"></i>
              <i class="ri-star-fill text-lg text-warning dark:text-warning"></i>
              <i class="ri-star-fill text-lg text-warning dark:text-warning"></i>
              <i class="ri-star-fill text-lg text-warning dark:text-warning"></i>
            </div>
            <!-- End Rating -->
          </div>

          <a class="inline-flex items-center gap-x-1 text-xs text-primary decoration-2 hover:underline font-medium dark:focus:outline-none dark:focus:ring-0 dark:focus:shadow-none dark:focus:ring-primary" href="#">
            See all (4)
          </a>
        </div>
        <!-- End Header -->

        <div class="mb-3">
          <!-- Progress -->
          <div class="flex items-center gap-x-3 whitespace-nowrap">
            <div class="w-10 text-end">
              <span class="text-sm text-gray-800 dark:text-white">5 star</span>
            </div>
            <div class="flex w-full h-2 bg-gray-200 rounded-full overflow-hidden dark:bg-bodybg2" role="progressbar" aria-valuenow="78" aria-valuemin="0" aria-valuemax="100">
              <div class="flex flex-col justify-center rounded-full overflow-hidden bg-warning text-xs text-white text-center whitespace-nowrap transition duration-500 dark:bg-yellow-600" style="width: 78%"></div>
            </div>
            <div class="w-10 text-end">
              <span class="text-sm text-gray-800 dark:text-white">78%</span>
            </div>
          </div>
          <!-- End Progress -->

          <!-- Progress -->
          <div class="flex items-center gap-x-3 whitespace-nowrap">
            <div class="w-10 text-end">
              <span class="text-sm text-gray-800 dark:text-white">4 star</span>
            </div>
            <div class="flex w-full h-2 bg-gray-200 rounded-full overflow-hidden dark:bg-bodybg2" role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">
              <div class="flex flex-col justify-center rounded-full overflow-hidden bg-warning text-xs text-white text-center whitespace-nowrap transition duration-500 dark:bg-yellow-600" style="width: 20%"></div>
            </div>
            <div class="w-10 text-end">
              <span class="text-sm text-gray-800 dark:text-white">20%</span>
            </div>
          </div>
          <!-- End Progress -->

          <!-- Progress -->
          <div class="flex items-center gap-x-3 whitespace-nowrap">
            <div class="w-10 text-end">
              <span class="text-sm text-gray-800 dark:text-white">3 star</span>
            </div>
            <div class="flex w-full h-2 bg-gray-200 rounded-full overflow-hidden dark:bg-bodybg2" role="progressbar" aria-valuenow="6" aria-valuemin="0" aria-valuemax="100">
              <div class="flex flex-col justify-center rounded-full overflow-hidden bg-warning text-xs text-white text-center whitespace-nowrap transition duration-500 dark:bg-yellow-600" style="width: 6%"></div>
            </div>
            <div class="w-10 text-end">
              <span class="text-sm text-gray-800 dark:text-white">6%</span>
            </div>
          </div>
          <!-- End Progress -->

          <!-- Progress -->
          <div class="flex items-center gap-x-3 whitespace-nowrap">
            <div class="w-10 text-end">
              <span class="text-sm text-gray-800 dark:text-white">2 star</span>
            </div>
            <div class="flex w-full h-2 bg-gray-200 rounded-full overflow-hidden dark:bg-bodybg2" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
              <div class="flex flex-col justify-center rounded-full overflow-hidden bg-warning text-xs text-white text-center whitespace-nowrap transition duration-500 dark:bg-yellow-600" style="width: 2%"></div>
            </div>
            <div class="w-10 text-end">
              <span class="text-sm text-gray-800 dark:text-white">2%</span>
            </div>
          </div>
          <!-- End Progress -->

          <!-- Progress -->
          <div class="flex items-center gap-x-3 whitespace-nowrap">
            <div class="w-10 text-end">
              <span class="text-sm text-gray-800 dark:text-white">1 star</span>
            </div>
            <div class="flex w-full h-2 bg-gray-200 rounded-full overflow-hidden dark:bg-bodybg2" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
              <div class="flex flex-col justify-center rounded-full overflow-hidden bg-warning text-xs text-white text-center whitespace-nowrap transition duration-500 dark:bg-yellow-600" style="width: 0%"></div>
            </div>
            <div class="w-10 text-end">
              <span class="text-sm text-gray-800 dark:text-white">0%</span>
            </div>
          </div>
          <!-- End Progress -->
        </div>

        <a class="inline-flex items-center gap-x-1 text-xs text-gray-600 decoration-2 hover:underline dark:text-white/70 dark:focus:outline-none dark:focus:ring-0 dark:shadow-none dark:focus:ring-gray-400" href="#">
          How reviews and ratings work
          <i class="ri-arrow-right-s-line rtl:rotate-180"></i>
        </a>
      </div>
    </div>
  </div>
</div>
<!-- End Popover -->`

export let popoverTS12 =`  <div class="hs-tooltip inline-block [--trigger:hover] sm:[--placement:right]">
<div class="hs-tooltip-toggle max-w-xs p-3 flex items-center gap-x-3 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-bodybg dark:border-white/10">
  <img class="inline-block size-9 rounded-full" src="./assets/images/faces/1.jpg" alt="Image Description">
  <!-- User Content -->
  <div class="grow">
    <h4 class="font-semibold text-sm text-gray-800 dark:text-white">
      Amanda Harvey
    </h4>
    <p class="text-sm text-gray-800 md:text-gray-500 dark:text-white md:dark:text-white/70">
      amanda&#64;email.com
    </p>
  </div>
  <!-- End User Content -->
  <!-- Popover Content -->
  <div class="hs-tooltip-content overflow-hidden ti-main-tooltip-content !p-0 max-w-xs w-full after:absolute after:top-0 after:-start-4 after:w-4 after:h-full hidden" role="tooltip" style="position: fixed; inset: 0px auto auto 0px; margin: 0px; transform: translate(929px, 563px);" data-popper-placement="right">
    <!-- Header -->
    <div class="py-3 px-4 border-b border-gray-200 dark:border-white/10">
      <div class="flex items-center gap-x-3">
        <img class="flex-shrink-0 inline-block size-10 rounded-full ring-2 ring-white dark:ring-bodybg" src="./assets/images/faces/1.jpg" alt="Image Description">
        <div class="grow">
          <h6 class="font-semibold text-gray-800 dark:text-white">
            Amanda Harvey
            <span class="ms-0.5 inline-flex items-center align-middle gap-x-1.5 py-0.5 px-1.5 mt-1 rounded-md text-[11px] font-medium bg-gray-800 text-white dark:bg-bodybg dark:text-white">
              PRO
            </span>
          </h6>
          <p class="text-sm text-gray-500 dark:text-white/70">
            Storyteller
          </p>
        </div>
      </div>
    </div>
    <!-- End Header -->
    <!-- List -->
    <ul class="py-3 px-4 space-y-1">
      <li>
        <div class="inline-flex items-center gap-x-3 text-sm text-gray-800 dark:text-white">
          <i class="ri-building-line text-gray-600 dark:text-white/70"></i>
          Pixeel Ltd.
        </div>
      </li>
      <li>
        <div class="inline-flex items-center gap-x-3 text-sm text-gray-800 dark:text-white">
          <i class="ri-smartphone-line text-gray-600 dark:text-white/70"></i>
          (892) 312-5483
        </div>
      </li>
      <li>
        <div class="inline-flex items-center gap-x-3 text-sm text-gray-800 dark:text-white">
          <i class="ri-mail-line text-gray-600 dark:text-white/70"></i>
          amanda&#64;email.com
        </div>
      </li>
    </ul>
    <!-- End List -->
    <!-- Footer -->
    <div class="py-2 px-4 flex justify-between items-center bg-gray-100 dark:bg-bodybg">
      <a class="inline-flex items-center gap-x-1.5 text-xs text-gray-500 hover:text-primary disabled:opacity-50 disabled:pointer-events-none dark:text-white/70 dark:hover:text-white dark:focus:outline-none" href="javascript:void(0);">
        <i class="ri-flag-line"></i>
        Flag
      </a>
      <button type="button" class="py-1.5 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-full border border-transparent bg-primary text-white hover:bg-primary/80 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-primary">
        Follow
      </button>
    </div>
    <!-- End Footer -->
  </div>
  <!-- End Popover Content -->
</div>
</div>`

export let progressTS1 = 
` <div class="box-body">
<div class="progress mb-4 !rounded-full" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
    <div class="progress-bar w-0"></div>
</div>
<div class="progress mb-4 " aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
    <div class="progress-bar !rounded-s-full w-1/4"></div>
</div>
<div class="progress mb-4 !rounded-full" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">
    <div class="progress-bar !rounded-s-full w-1/2"></div>
</div>
<div class="progress mb-4 !rounded-full" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
    <div class="progress-bar !rounded-s-full w-3/4"></div>
</div>
<div class="progress mb-0 !rounded-full" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">
    <div class="progress-bar !rounded-s-full w-full"></div>
</div>
</div>`
export let progressTS2 = 
`    <div class="box-body">
<div class="progress mb-4" aria-valuenow="20" aria-valuemin="0"
aria-valuemax="100">
    <div class="progress-bar !bg-secondary !rounded-s-full w-1/5"></div>
</div>
<div class="progress mb-4"
aria-valuenow="40" aria-valuemin="0" aria-valuemax="100">
    <div class="progress-bar !bg-warning !rounded-s-full w-2/5"></div>
</div>
<div class="progress mb-4"
aria-valuenow="60" aria-valuemin="0" aria-valuemax="100">
    <div class="progress-bar !bg-info !rounded-s-full w-3/5"></div>
</div>
<div class="progress mb-4"
aria-valuenow="80" aria-valuemin="0" aria-valuemax="100">
    <div class="progress-bar !bg-success !rounded-s-full w-4/5"></div>
</div>
<div class="progress"
aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">
    <div class="progress-bar !bg-danger !rounded-s-full w-full"></div>
</div>
</div>`
export let progressTS3 = 
`        <div class="box-body">
<div class="progress mb-4" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100">
    <div class="progress-bar progress-bar-striped w-[10%]">
    </div>
</div>
<div class="progress mb-4" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
    <div class="progress-bar progress-bar-striped !bg-secondary !rounded-s-full w-1/4">
    </div>
</div>
<div class="progress mb-4" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">
    <div class="progress-bar progress-bar-striped !bg-success !rounded-s-full w-2/4">
    </div>
</div>
<div class="progress mb-4" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
    <div class="progress-bar progress-bar-striped !bg-info !rounded-s-full w-3/4">
    </div>
</div>
<div class="progress" aria-valuenow="100" aria-valuemin="0"
aria-valuemax="100">
    <div class="progress-bar progress-bar-striped !bg-warning !rounded-s-full w-full"></div>
</div>
</div>`

export let progressTS4 =
`  <div class="box-body">
<div class="progress progress-xs mb-4" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100">
    <div class="progress-bar bg-primary !rounded-s-full w-[10%]">
    </div>
</div>
<div class="progress progress-sm mb-4" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
    <div class="progress-bar bg-primary !rounded-s-full w-1/4">
    </div>
</div>
<div class="progress mb-4" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">
    <div class="progress-bar bg-primary !rounded-s-full w-2/4">
    </div>
</div>
<div class="progress progress-lg mb-4" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
    <div class="progress-bar bg-primary !rounded-s-full w-3/4">
    </div>
</div>
<div class="progress progress-xl" aria-valuenow="100" aria-valuemin="0"
        aria-valuemax="100">
    <div class="progress-bar bg-primary !rounded-s-full w-full"></div>
</div>
</div>`
export let progressTS5 =
`  <div class="box-body">
<div class="progress mb-4"
aria-valuenow="10" aria-valuemin="0" aria-valuemax="100">
    <div class="progress-bar !rounded-s-full w-[10%]">10%</div>
</div>
<div class="progress mb-4"
        aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">
    <div class="progress-bar !bg-secondary !rounded-s-full w-1/5">20%</div>
</div>
<div class="progress mb-4"
aria-valuenow="40" aria-valuemin="0" aria-valuemax="100">
    <div class="progress-bar !bg-success !rounded-s-full w-2/5">40%</div>
</div>
<div class="progress mb-4"
aria-valuenow="60" aria-valuemin="0" aria-valuemax="100">
    <div class="progress-bar !bg-info !rounded-s-full w-3/5">60%</div>
</div>
<div class="progress mb-0"
aria-valuenow="80" aria-valuemin="0" aria-valuemax="100">
    <div class="progress-bar !bg-warning !rounded-s-full w-4/5">80%</div>
</div>
</div>`
export let progressTS6 =
`  <div class="box-body">
<div class="progress-stacked progress-xs mb-4 flex">
    <div class="progress-bar w-[5%]" aria-valuenow="5" aria-valuemin="0" aria-valuemax="100"></div>
    <div class="progress-bar !bg-secondary !rounded-none w-[10%]" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
    <div class="progress-bar !bg-success !rounded-none w-[15%]" aria-valuenow="15" aria-valuemin="0" aria-valuemax="100"></div>
</div>
<div class="progress-stacked progress-sm mb-4 flex">
    <div class="progress-bar !bg-warning w-[10%]" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
    <div class="progress-bar !bg-info !rounded-none w-[15%]" aria-valuenow="15" aria-valuemin="0" aria-valuemax="100"></div>
    <div class="progress-bar !bg-danger !rounded-none w-[20%]" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100"></div>
</div>
<div class="progress-stacked mb-4 flex">
    <div class="progress-bar !bg-info w-[15%]"
        aria-valuenow="15" aria-valuemin="0" aria-valuemax="100"></div>
    <div class="progress-bar !bg-success !rounded-none w-1/5"
        aria-valuenow="20" aria-valuemin="0" aria-valuemax="100"></div>
    <div class="progress-bar !rounded-none w-1/4"
        aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
</div>
<div class="progress-stacked progress-lg mb-4 flex">
    <div class="progress-bar !bg-purple w-1/5"
        aria-valuenow="20" aria-valuemin="0" aria-valuemax="100"></div>
    <div class="progress-bar !bg-teal !rounded-none w-1/4"
        aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
    <div class="progress-bar !bg-orange !rounded-none w-[30%]"
        aria-valuenow="30" aria-valuemin="0" aria-valuemax="100"></div>
</div>
<div class="progress-stacked progress-xl mb-0 flex">
    <div class="progress-bar !bg-success w-1/4"
        aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
    <div class="progress-bar !bg-danger !rounded-none w-[30%]"
        aria-valuenow="30" aria-valuemin="0" aria-valuemax="100"></div>
    <div class="progress-bar !bg-warning !rounded-none w-[35%]"
        aria-valuenow="35" aria-valuemin="0" aria-valuemax="100"></div>
</div>
</div>`
export let progressTS7 =
`   <div class="box-body">
<div class="progress mb-4" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100">
    <div class="progress-bar progress-bar-striped progress-bar-animated w-[10%]"></div>
</div>
<div class="progress mb-4" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">
    <div class="progress-bar bg-secondary progress-bar-striped progress-bar-animated w-1/5"></div>
</div>
<div class="progress mb-4" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100">
    <div class="progress-bar bg-success progress-bar-striped progress-bar-animated w-2/5"></div>
</div>
<div class="progress mb-4" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100">
    <div class="progress-bar bg-info progress-bar-striped progress-bar-animated w-3/5"></div>
</div>
<div class="progress" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100">
    <div class="progress-bar bg-warning progress-bar-striped progress-bar-animated w-4/5"></div>
</div>
</div>`
export let progressTS8 =
`     <div class="box-body">
<div class="progress mb-4" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100">
    <div class="progress-bar bg-primary-gradient w-[10%]"></div>
</div>
<div class="progress mb-4" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">
    <div class="progress-bar bg-secondary-gradient w-1/5"></div>
</div>
<div class="progress mb-4" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100">
    <div class="progress-bar bg-success-gradient w-2/5"></div>
</div>
<div class="progress mb-4" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100">
    <div class="progress-bar bg-info-gradient w-3/5"></div>
</div>
<div class="progress" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100">
    <div class="progress-bar bg-warning-gradient w-4/5"></div>
</div>
</div>`
export let progressTS9 =
`         <div class="box-body">
<div class="progress mb-4 progress-animate" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100">
    <div class="progress-bar bg-primary-gradient w-[10%]"></div>
</div>
<div class="progress mb-4 progress-animate" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">
    <div class="progress-bar bg-secondary-gradient w-1/5"></div>
</div>
<div class="progress mb-4 progress-animate" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100">
    <div class="progress-bar bg-success-gradient w-2/5"></div>
</div>
<div class="progress mb-4 progress-animate" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100">
    <div class="progress-bar bg-info-gradient w-3/5"></div>
</div>
<div class="progress progress-animate" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100">
    <div class="progress-bar bg-warning-gradient w-4/5"></div>
</div>
</div>`
export let progressTS10 =
`        <div class="box-body">
<div class="progress progress-sm progress-custom mb-[3rem] progress-animate" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">
    <h6 class="progress-bar-title text-[1rem]">Mobiles</h6>
    <div class="progress-bar w-1/2">
        <div class="progress-bar-value !bg-primary">50%</div>
    </div>
</div>
<div class="progress progress-sm progress-custom mb-[3rem] progress-animate" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100">
    <h6 class="progress-bar-title !bg-secondary text-[1rem] after:!border-s-secondary">Watches</h6>
    <div class="progress-bar progress-secondary w-3/5">
        <div class="progress-bar-value !bg-secondary">60%</div>
    </div>
</div>
<div class="progress progress-sm progress-custom progress-animate" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100">
    <h6 class="progress-bar-title !bg-success text-[1rem] after:!border-s-success">Shirts</h6>
    <div class="progress-bar progress-success w-[70%]">
        <div class="progress-bar-value !bg-success">70%</div>
    </div>
</div>
</div>`
export let progressTS11 =
`       <div class="box-body">
<div class="progress progress-sm mb-4" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">
    <div class="progress-item-1 !bg-primary"></div><div class="progress-item-2"></div><div class="progress-item-3"></div>
    <div class="progress-bar w-1/2"></div>
</div>
<div class="progress progress-sm mb-4" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100">
    <div class="progress-item-1 !bg-secondary"></div><div class="progress-item-2 !bg-secondary"></div><div class="progress-item-3"></div>
    <div class="progress-bar !bg-secondary w-3/5"></div>
</div>
<div class="progress progress-sm mb-4" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100">
    <div class="progress-item-1 !bg-success"></div><div class="progress-item-2 !bg-success"></div><div class="progress-item-3"></div>
    <div class="progress-bar !bg-success w-[70%]"></div>
</div>
<div class="progress progress-sm mb-4" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100">
    <div class="progress-item-1 !bg-info"></div><div class="progress-item-2 !bg-info"></div><div class="progress-item-3 !bg-info"></div>
    <div class="progress-bar !bg-info w-4/5"></div>
</div>
<div class="progress progress-sm" aria-valuenow="90" aria-valuemin="0" aria-valuemax="100">
    <div class="progress-item-1 !bg-warning"></div><div class="progress-item-2 !bg-warning"></div><div class="progress-item-3 !bg-warning"></div>
    <div class="progress-bar !bg-warning w-[90%]"></div>
</div>
</div>`
export let progressTS12 =
`      <div class="box-body">
<div class="progress progress-lg mb-[3rem] custom-progress-3 progress-animate" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">
    <div class="progress-bar w-1/2">
        <div class="progress-bar-value">50%</div>
    </div>
</div>
<div class="progress progress-lg mb-[3rem] custom-progress-3 progress-animate" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100">
    <div class="progress-bar !bg-secondary w-3/5">
        <div class="progress-bar-value secondary">60%</div>
    </div>
</div>
<div class="progress progress-lg custom-progress-3 progress-animate" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100">
    <div class="progress-bar !bg-success w-[70%]">
        <div class="progress-bar-value success">70%</div>
    </div>
</div>
</div>`
export let progressTS13 =
`   <div class="box-body">
<div class="progress progress-xl mb-4 progress-animate custom-progress-4" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100">
    <div class="progress-bar bg-primary-gradient !rounded-sm w-[10%]"></div>
    <div class="progress-bar-label">10%</div>
</div>
<div class="progress progress-xl mb-4 progress-animate custom-progress-4 secondary" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">
    <div class="progress-bar bg-secondary-gradient !rounded-sm w-1/5"></div>
        <div class="progress-bar-label">20%</div>
</div>
<div class="progress progress-xl mb-4 progress-animate custom-progress-4 success" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100">
    <div class="progress-bar bg-success-gradient !rounded-sm w-2/5"></div>
        <div class="progress-bar-label">40%</div>
</div>
<div class="progress progress-xl mb-4 progress-animate custom-progress-4 info" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100">
    <div class="progress-bar bg-info-gradient !rounded-sm w-3/5"></div>
        <div class="progress-bar-label">60%</div>
</div>
<div class="progress progress-xl mb-4 progress-animate custom-progress-4 warning" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100">
    <div class="progress-bar bg-warning-gradient !rounded-sm w-4/5"></div>
        <div class="progress-bar-label">80%</div>
</div>
<div class="progress progress-xl progress-animate custom-progress-4 danger" aria-valuenow="90" aria-valuemin="0" aria-valuemax="100">
    <div class="progress-bar bg-danger-gradient !rounded-sm w-[90%]"></div>
        <div class="progress-bar-label">90%</div>
</div>
</div>`
export let progressTS14 =
`     <div class="box-body">
<h6 class="font-semibold mb-2">Project Dependencies</h6>
<div class="progress-stacked progress-xl mb-[3rem] flex">
    <div class="progress-bar w-1/2"
        aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">25%</div>
    <div class="progress-bar !bg-secondary !rounded-none w-[35%]"
        aria-valuenow="35" aria-valuemin="0" aria-valuemax="100">35%</div>
    <div class="progress-bar !bg-danger !rounded-s-none !rounded-e-full w-2/5"
        aria-valuenow="40" aria-valuemin="0" aria-valuemax="100">40%</div>
</div>
<div class="grid grid-cols-12 justify-center">
    <div class="xl:col-span-5 col-span-12">
        <div class="border border-defaultborder dark:border-defaultborder/10 p-4 rounded-md">
            <p class="text-[0.75rem] font-semibold mb-0 text-[#8c9097] dark:text-white/50">Html<span class="ltr:float-right rtl:float-left text-[0.625rem] font-normal">25%</span></p>
            <div class="progress progress-xs mb-4 progress-animate" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                <div class="progress-bar bg-primary w-1/2">
                </div>
            </div>
            <p class="text-[0.75rem] font-semibold mb-0 text-[#8c9097] dark:text-white/50">Css<span class="ltr:float-right rtl:float-left text-[0.625rem] font-normal">35%</span></p>
            <div class="progress progress-xs mb-4 progress-animate " aria-valuenow="35" aria-valuemin="0" aria-valuemax="100">
                <div class="progress-bar !rounded-none !bg-secondary w-[35%]">
                </div>
            </div>
            <p class="text-[0.75rem] font-semibold mb-0 text-[#8c9097] dark:text-white/50">Js<span class="ltr:float-right rtl:float-left text-[0.625rem] font-normal">40%</span></p>
            <div class="progress progress-xs mb-0 progress-animate " aria-valuenow="40" aria-valuemin="0" aria-valuemax="100">
                <div class="progress-bar !rounded-e-full !bg-danger w-2/5">
                </div>
            </div>
        </div>
    </div>
</div>
</div>`
export let progressTS15 =
`      <!-- Progress -->
<div class="flex items-center gap-x-3 whitespace-nowrap w-full mb-4">
    <div class="ti-main-progress w-full progress bg-gray-200 dark:bg-bodybg">
        <div class="ti-main-progress-bar bg-primary text-xs text-white text-center"  style="width: 25%" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
    </div>
    <div class="w-10 text-end">
    <span class="text-sm text-gray-800 dark:text-white">25%</span>
    </div>
</div>
<!-- End Progress -->
<!-- Progress -->
<div class="flex items-center gap-x-3 whitespace-nowrap w-full mb-4">
    <div class="ti-main-progress w-full progress bg-gray-200 dark:bg-bodybg">
        <div class="ti-main-progress-bar bg-primary text-xs text-white text-center"  style="width: 50%" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
    </div>
    <div class="w-10 text-end">
    <span class="text-sm text-gray-800 dark:text-white">50%</span>
    </div>
</div>
<!-- End Progress -->
<!-- Progress -->
<div class="flex items-center gap-x-3 whitespace-nowrap w-full mb-4">
    <div class="ti-main-progress w-full progress bg-gray-200 dark:bg-bodybg">
        <div class="ti-main-progress-bar bg-primary text-xs text-white text-center"  style="width: 75%" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
    </div>
    <div class="w-10 text-end">
    <span class="text-sm text-gray-800 dark:text-white">75%</span>
    </div>
</div>
<!-- End Progress -->
<!-- Progress -->
<div class="flex items-center gap-x-3 whitespace-nowrap w-full mb-4">
    <div class="ti-main-progress w-full progress bg-gray-200 dark:bg-bodybg">
        <div class="ti-main-progress-bar bg-primary text-xs text-white text-center"  style="width: 100%" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
    </div>
    <div class="w-10 text-end">
    <span class="text-sm text-gray-800 dark:text-white">100%</span>
    </div>
</div>
<!-- End Progress -->
<!-- Progress -->
<div class="flex items-center gap-x-3 whitespace-nowrap w-full mb-4">
    <div class="ti-main-progress w-full progress bg-gray-200 dark:bg-bodybg">
        <div class="ti-main-progress-bar bg-danger text-xs text-white text-center"  style="width: 100%" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
    </div>
    <div class="w-10 text-end">
        <span class="flex-shrink-0 ms-auto size-4 flex justify-center items-center rounded-full bg-red-500 !text-white dark:text-white">
            <svg class="flex-shrink-0 size-3 !fill-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 6 6 18"></path>
            <path d="m6 6 12 12"></path>
            </svg>
        </span>
        </div>
</div>
<!-- End Progress -->
<!-- Progress -->
<div class="flex items-center gap-x-3 whitespace-nowrap w-full mb-4">
    <div class="ti-main-progress w-full progress bg-gray-200 dark:bg-bodybg">
        <div class="ti-main-progress-bar bg-success text-xs text-white text-center"  style="width: 100%" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
    </div>
    <div class="w-10 text-end">
        <span class="flex-shrink-0 ms-auto size-4 flex justify-center items-center rounded-full bg-success text-white">
            <svg class="flex-shrink-0 size-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
        </span>
    </div>
</div>
<!-- End Progress -->`
export let progressTS16 =
`  <!-- Progress -->
<div class="">
    <div class="mb-2 flex justify-between items-center">
        <h3 class="text-sm font-semibold text-gray-800 dark:text-white">Progress title</h3>
        <span class="text-sm text-gray-800 dark:text-white">25%</span>
    </div>
    <div class="ti-main-progress w-full h-2 bg-gray-200 dark:bg-bodybg">
        <div class="ti-main-progress-bar bg-primary text-xs text-white text-center"  style="width: 25%" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
    </div>
</div>
<!-- End Progress -->
<!-- Progress -->
<div class="">
    <div class="mb-2 flex justify-between items-center">
        <h3 class="text-sm font-semibold text-gray-800 dark:text-white">Progress title</h3>
        <span class="text-sm text-gray-800 dark:text-white">50%</span>
    </div>
    <div class="ti-main-progress w-full h-2 bg-gray-200 dark:bg-bodybg">
        <div class="ti-main-progress-bar bg-primary text-xs text-white text-center"  style="width: 50%" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
    </div>
</div>
<!-- End Progress -->
<!-- Progress -->
<div class="">
    <div class="mb-2 flex justify-between items-center">
        <h3 class="text-sm font-semibold text-gray-800 dark:text-white">Progress title</h3>
        <span class="text-sm text-gray-800 dark:text-white">75%</span>
    </div>
    <div class="ti-main-progress w-full h-2 bg-gray-200 dark:bg-bodybg">
        <div class="ti-main-progress-bar bg-primary text-xs text-white text-center"  style="width: 75%" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
    </div>
</div>
<!-- End Progress -->
<!-- Progress -->
<div class="">
    <div class="mb-2 flex justify-between items-center">
        <h3 class="text-sm font-semibold text-gray-800 dark:text-white">Progress title</h3>
        <span class="text-sm text-gray-800 dark:text-white">100%</span>
    </div>
    <div class="ti-main-progress w-full h-2 bg-gray-200 dark:bg-bodybg">
        <div class="ti-main-progress-bar bg-primary text-xs text-white text-center"  style="width: 100%" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
    </div>
</div>
<!-- End Progress -->`
export let progressTS17 =
`    <!-- Step Progress -->
<div class="max-w-40 ti-main-progress !h-full items-center gap-x-1">
    <div class="w-full h-2.5 ti-main-progress-bar bg-primary text-xs text-white text-center whitespace-nowrap transition duration-500"  role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
    <div class="w-full h-2.5 ti-main-progress-bar bg-primary text-xs text-white text-center whitespace-nowrap transition duration-500"  role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
    <div class="w-full h-2.5 ti-main-progress-bar bg-gray-200 dark:bg-bodybg text-xs text-white text-center whitespace-nowrap transition duration-500"  role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
    <div class="w-full h-2.5 ti-main-progress-bar bg-gray-200 dark:bg-bodybg text-xs text-white text-center whitespace-nowrap transition duration-500"  role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
    <div>
    <div class="w-10 text-end">
        <span class="text-sm text-gray-800 dark:text-white">50%</span>
    </div>
    </div>
</div>
<!-- End Step Progress -->

<!-- Step Progress -->
<div class="ti-main-progress !h-full items-center gap-x-1">
    <div class="w-full h-2.5 ti-main-progress-bar bg-primary text-xs text-white text-center whitespace-nowrap transition duration-500"  role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
    <div class="w-full h-2.5 ti-main-progress-bar bg-primary text-xs text-white text-center whitespace-nowrap transition duration-500"  role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
    <div class="w-full h-2.5 ti-main-progress-bar bg-gray-200 dark:bg-bodybg text-xs text-white text-center whitespace-nowrap transition duration-500"  role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
    <div class="w-full h-2.5 ti-main-progress-bar bg-gray-200 dark:bg-bodybg text-xs text-white text-center whitespace-nowrap transition duration-500"  role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
    <div>
    <div class="w-10 text-end">
        <span class="text-sm text-gray-800 dark:text-white">50%</span>
    </div>
    </div>
</div>
<!-- End Step Progress -->

<!-- Step Progress -->
<div class="max-w-40 ti-main-progress !h-full items-center gap-x-1">
    <div class="w-full h-2.5 ti-main-progress-bar bg-danger text-xs text-white text-center whitespace-nowrap transition duration-500"  role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
    <div class="w-full h-2.5 ti-main-progress-bar bg-danger/10 text-xs text-white text-center whitespace-nowrap transition duration-500"  role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
    <div class="w-full h-2.5 ti-main-progress-bar bg-danger/10 text-xs text-white text-center whitespace-nowrap transition duration-500"  role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
    <div class="w-full h-2.5 ti-main-progress-bar bg-danger/10 text-xs text-white text-center whitespace-nowrap transition duration-500"  role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
    <div>
        <div class="w-10 text-end">
        <span class="text-sm text-danger">25%</span>
        </div>
    </div>
</div>
<!-- End Step Progress -->

<!-- Step Progress -->
<div class="w-full ti-main-progress !h-full items-center gap-x-1">
    <div class="w-full h-2.5 ti-main-progress-bar bg-danger text-xs text-white text-center whitespace-nowrap transition duration-500"  role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
    <div class="w-full h-2.5 ti-main-progress-bar bg-danger/10 text-xs text-white text-center whitespace-nowrap transition duration-500"  role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
    <div class="w-full h-2.5 ti-main-progress-bar bg-danger/10 text-xs text-white text-center whitespace-nowrap transition duration-500"  role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
    <div class="w-full h-2.5 ti-main-progress-bar bg-danger/10 text-xs text-white text-center whitespace-nowrap transition duration-500"  role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
    <div>
        <div class="w-10 text-end">
        <span class="text-sm text-danger">25%</span>
        </div>
    </div>
</div>
<!-- End Step Progress -->

<!-- Step Progress -->
<div class="max-w-40 ti-main-progress !h-full items-center gap-x-1">
    <div class="w-full h-2.5 ti-main-progress-bar bg-success text-xs text-white text-center whitespace-nowrap transition duration-500"  role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
    <div class="w-full h-2.5 ti-main-progress-bar bg-success text-xs text-white text-center whitespace-nowrap transition duration-500"  role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
    <div class="w-full h-2.5 ti-main-progress-bar bg-success text-xs text-white text-center whitespace-nowrap transition duration-500"  role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
    <div class="w-full h-2.5 ti-main-progress-bar bg-success text-xs text-white text-center whitespace-nowrap transition duration-500"  role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
    <div>
        <div class="w-10 text-end">
            <span class="text-sm text-gray-800 dark:text-white">100%</span>
        </div>
    </div>
</div>
<!-- End Step Progress -->

<!-- Step Progress -->
<div class="ti-main-progress !h-full items-center gap-x-1">
    <div class="w-full h-2.5 ti-main-progress-bar bg-success text-xs text-white text-center whitespace-nowrap transition duration-500"  role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
    <div class="w-full h-2.5 ti-main-progress-bar bg-success text-xs text-white text-center whitespace-nowrap transition duration-500"  role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
    <div class="w-full h-2.5 ti-main-progress-bar bg-success text-xs text-white text-center whitespace-nowrap transition duration-500"  role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
    <div class="w-full h-2.5 ti-main-progress-bar bg-success text-xs text-white text-center whitespace-nowrap transition duration-500"  role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
    <div>
        <div class="w-10 text-end">
            <span class="text-sm text-gray-800 dark:text-white">100%</span>
        </div>
    </div>
</div>
<!-- End Step Progress -->

<!-- Step Progress -->
<div class="max-w-[8.5rem] ti-main-progress !h-full items-center gap-x-1">
    <div class="w-full h-2.5 ti-main-progress-bar bg-success text-xs text-white text-center whitespace-nowrap transition duration-500"  role="progressbar" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
    <div class="w-full h-2.5 ti-main-progress-bar bg-success text-xs text-white text-center whitespace-nowrap transition duration-500"  role="progressbar" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
    <div class="w-full h-2.5 ti-main-progress-bar bg-success text-xs text-white text-center whitespace-nowrap transition duration-500"  role="progressbar" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
    <div class="w-full h-2.5 ti-main-progress-bar bg-success text-xs text-white text-center whitespace-nowrap transition duration-500"  role="progressbar" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
    <div class="w-full h-2.5 ti-main-progress-bar bg-success text-xs text-white text-center whitespace-nowrap transition duration-500"  role="progressbar" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
    <div class="w-full h-2.5 ti-main-progress-bar bg-success text-xs text-white text-center whitespace-nowrap transition duration-500"  role="progressbar" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
    <div class="w-full h-2.5 ti-main-progress-bar bg-success text-xs text-white text-center whitespace-nowrap transition duration-500"  role="progressbar" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
    <div class="w-full h-2.5 ti-main-progress-bar bg-success text-xs text-white text-center whitespace-nowrap transition duration-500"  role="progressbar" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
    <div class="w-full h-2.5 ti-main-progress-bar bg-success text-xs text-white text-center whitespace-nowrap transition duration-500"  role="progressbar" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
    <div class="w-full h-2.5 ti-main-progress-bar bg-success text-xs text-white text-center whitespace-nowrap transition duration-500"  role="progressbar" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
    <div class="ms-1">
        <span class="flex-shrink-0 ms-auto size-4 flex justify-center items-center rounded-full bg-success text-white">
            <svg class="flex-shrink-0 size-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
        </span>
    </div>
</div>
    <!-- End Step Progress -->

<!-- Step Progress -->
<div class="ti-main-progress !h-full items-center gap-x-1">
    <div class="w-full h-2.5 ti-main-progress-bar bg-success text-xs text-white text-center whitespace-nowrap transition duration-500"  role="progressbar" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
    <div class="w-full h-2.5 ti-main-progress-bar bg-success text-xs text-white text-center whitespace-nowrap transition duration-500"  role="progressbar" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
    <div class="w-full h-2.5 ti-main-progress-bar bg-success text-xs text-white text-center whitespace-nowrap transition duration-500"  role="progressbar" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
    <div class="w-full h-2.5 ti-main-progress-bar bg-success text-xs text-white text-center whitespace-nowrap transition duration-500"  role="progressbar" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
    <div class="w-full h-2.5 ti-main-progress-bar bg-success text-xs text-white text-center whitespace-nowrap transition duration-500"  role="progressbar" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
    <div class="w-full h-2.5 ti-main-progress-bar bg-success text-xs text-white text-center whitespace-nowrap transition duration-500"  role="progressbar" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
    <div class="w-full h-2.5 ti-main-progress-bar bg-success text-xs text-white text-center whitespace-nowrap transition duration-500"  role="progressbar" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
    <div class="w-full h-2.5 ti-main-progress-bar bg-success text-xs text-white text-center whitespace-nowrap transition duration-500"  role="progressbar" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
    <div class="w-full h-2.5 ti-main-progress-bar bg-success text-xs text-white text-center whitespace-nowrap transition duration-500"  role="progressbar" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
    <div class="w-full h-2.5 ti-main-progress-bar bg-success text-xs text-white text-center whitespace-nowrap transition duration-500"  role="progressbar" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
    <div class="ms-1">
        <span class="flex-shrink-0 ms-auto size-4 flex justify-center items-center rounded-full bg-success text-white">
            <svg class="flex-shrink-0 size-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
        </span>
    </div>
</div>
<!-- End Step Progress -->`
export let progressTS18 =
`<div class="flex space-x-8 rtl:space-x-reverse">
<div class="ti-main-progress flex-col flex-nowrap justify-end !w-2 !h-[17rem] bg-gray-200 dark:bg-bodybg">
    <div class="bg-primary ti-main-progress-bar"  style="height: 25%" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
</div>
<div class="ti-main-progress flex-col flex-nowrap justify-end !w-2 !h-[17rem] bg-gray-200 dark:bg-bodybg">
    <div class="bg-secondary ti-main-progress-bar"  style="height: 40%" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100"></div>
</div>
<div class="ti-main-progress flex-col flex-nowrap justify-end !w-2 !h-[17rem] bg-gray-200 dark:bg-bodybg">
    <div class="bg-warning ti-main-progress-bar"  style="height: 60%" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"></div>
</div>
<div class="ti-main-progress flex-col flex-nowrap justify-end !w-2 !h-[17rem] bg-gray-200 dark:bg-bodybg">
    <div class="bg-info ti-main-progress-bar"  style="height: 80%" role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>
</div>
<div class="ti-main-progress flex-col flex-nowrap justify-end !w-2 !h-[17rem] bg-gray-200 dark:bg-bodybg">
    <div class="bg-danger ti-main-progress-bar"  style="height: 100%" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
</div>
</div>`
export let progressTS19 =
`  <div class="flex gap-x-5">
<!-- Circular Progress -->
<div class="relative size-40">
    <svg class="size-full" width="36" height="36" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
    <!-- Background Circle -->
    <circle cx="18" cy="18" r="16" fill="none" class="stroke-current text-gray-200 dark:text-white/10" stroke-width="2"></circle>
    <!-- Progress Circle inside a group with rotation -->
    <g class="origin-center -rotate-90 transform">
        <circle cx="18" cy="18" r="16" fill="none" class="stroke-current text-primary" stroke-width="2" stroke-dasharray="100" stroke-dashoffset="75"></circle>
    </g>
    </svg>
</div>
<!-- End Circular Progress -->

<!-- Circular Progress -->
<div class="relative size-40">
    <svg class="size-full" width="36" height="36" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
    <!-- Background Circle -->
    <circle cx="18" cy="18" r="16" fill="none" class="stroke-current text-gray-200 dark:text-white/10" stroke-width="2"></circle>
    <!-- Progress Circle inside a group with rotation -->
    <g class="origin-center -rotate-90 transform">
        <circle cx="18" cy="18" r="16" fill="none" class="stroke-current text-primary" stroke-width="2" stroke-dasharray="100" stroke-dashoffset="75"></circle>
    </g>
    </svg>
    <!-- Percentage Text -->
    <div class="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
    <span class="text-center text-2xl font-bold text-gray-800 dark:text-white">72%</span>
    </div>
</div>
<!-- End Circular Progress -->
</div>`
export let TolltipsTS1 = 
`     <div class="ti-btn-list">
<div class="hs-tooltip ti-main-tooltip">
    <button type="button" class="hs-tooltip-toggle ti-btn ti-btn-primary-full">
        Tooltip on top
        <span
            class="hs-tooltip-content  ti-main-tooltip-content py-1 px-2 !bg-black !text-xs !font-medium !text-white shadow-sm "
            role="tooltip">
            Tooltip on top
        </span>
    </button>
</div>
<div class="hs-tooltip ti-main-tooltip [--placement:right]">
    <button type="button" class="hs-tooltip-toggle ti-btn ti-btn-primary-full">
        Tooltip on right
        <span
            class="hs-tooltip-content ti-main-tooltip-content py-1 px-2 !bg-black !text-xs !font-medium !text-white shadow-sm dark:bg-slate-700"
            role="tooltip">
            Tooltip on right
        </span>
    </button>
</div>
<div class="hs-tooltip ti-main-tooltip [--placement:bottom]">
    <button type="button" class="hs-tooltip-toggle ti-btn ti-btn-primary-full">
        Tooltip on bottom
        <span
            class="hs-tooltip-content ti-main-tooltip-content py-1 px-2 !bg-black !text-xs !font-medium !text-white shadow-sm dark:bg-slate-700"
            role="tooltip">
            Tooltip on bottom
        </span>
    </button>
</div>
<div class="hs-tooltip ti-main-tooltip [--placement:left]">
    <button type="button" class="hs-tooltip-toggle ti-btn ti-btn-primary-full">
        Tooltip on left
        <span
            class="hs-tooltip-content ti-main-tooltip-content py-1 px-2 !bg-black !text-xs !font-medium !text-white shadow-sm dark:bg-slate-700"
            role="tooltip">
            Tooltip on left
        </span>
    </button>
</div>
</div>`
export let TolltipsTS2 = 
` <div class="ti-btn-list">
<div class="hs-tooltip ti-main-tooltip [--placement:top]">
    <button type="button" class="hs-tooltip-toggle ti-btn ti-btn-primary-full">
        Primary Tooltip
        <span
            class="hs-tooltip-content ti-main-tooltip-content py-1 px-2 !bg-primary !text-xs !font-medium !text-white shadow-sm dark:bg-slate-700"
            role="tooltip">
            Primary Tooltip
        </span>
    </button>
</div>
<div class="hs-tooltip ti-main-tooltip [--placement:right]">
    <button type="button" class="hs-tooltip-toggle ti-btn ti-btn-secondary-full">
        Secondary Tooltip
        <span
            class="hs-tooltip-content ti-main-tooltip-content py-1 px-2 !bg-secondary !text-xs !font-medium !text-white shadow-sm dark:bg-slate-700"
            role="tooltip">
            Secondary Tooltip
        </span>
    </button>
</div>
<div class="hs-tooltip ti-main-tooltip [--placement:bottom]">
    <button type="button" class="hs-tooltip-toggle ti-btn ti-btn-warning-full">
        Warning Tooltip
        <span
            class="hs-tooltip-content ti-main-tooltip-content py-1 px-2 !bg-warning !text-xs !font-medium !text-white shadow-sm dark:bg-slate-700"
            role="tooltip">
            Warning Tooltip
        </span>
    </button>
</div>
<div class="hs-tooltip ti-main-tooltip [--placement:left]">
    <button type="button" class="hs-tooltip-toggle ti-btn ti-btn-info-full">
        Info Tooltip
        <span
            class="hs-tooltip-content ti-main-tooltip-content py-1 px-2 !bg-info !text-xs !font-medium !text-white shadow-sm dark:bg-slate-700"
            role="tooltip">
            Info Tooltip
        </span>
    </button>
</div>
<div class="hs-tooltip ti-main-tooltip [--placement:top]">
    <button type="button" class="hs-tooltip-toggle ti-btn ti-btn-success-full">
        Success Tooltip
        <span
            class="hs-tooltip-content ti-main-tooltip-content py-1 px-2 !bg-success !text-xs !font-medium !text-white shadow-sm dark:bg-slate-700"
            role="tooltip">
            Success Tooltip
        </span>
    </button>
</div>
<div class="hs-tooltip ti-main-tooltip [--placement:bottom]">
    <button type="button" class="hs-tooltip-toggle ti-btn ti-btn-danger-full">
        Danger Tooltip
        <span
            class="hs-tooltip-content ti-main-tooltip-content py-1 px-2 !bg-danger !text-xs !font-medium !text-white shadow-sm dark:bg-slate-700"
            role="tooltip">
            Danger Tooltip
        </span>
    </button>
</div>
<div class="hs-tooltip ti-main-tooltip [--placement:bottom]">
    <button type="button" class="hs-tooltip-toggle ti-btn ti-btn-light">
        Light Tooltip
        <span
            class="hs-tooltip-content ti-main-tooltip-content py-1 px-2 !bg-light !text-xs !font-medium !text-defaulttextcolor shadow-sm dark:bg-slate-700"
            role="tooltip">
            Light Tooltip</span>
    </button>
</div>
<div class="hs-tooltip ti-main-tooltip [--placement:bottom]">
    <button type="button" class="hs-tooltip-toggle ti-btn ti-btn-dark">
        Dark Tooltip
        <span
            class="hs-tooltip-content ti-main-tooltip-content py-1 px-2 !bg-black !text-xs !font-medium !text-white shadow-sm dark:bg-slate-700"
            role="tooltip">
            Dark Tooltip
        </span>
    </button>
</div>
</div>`
export let TolltipsTS3 = 
`  <div class="hs-tooltip ti-main-tooltip [--placement:top]">
<p class="text-muted mb-0">
    Hover on the link to view the <a aria-label="anchor" href="javascript:void(0);"
         
        title="Link Tooltip"></a>
    <span class="hs-tooltip-toggle !text-primary">
        Tooltip
        <span
            class="hs-tooltip-content ti-main-tooltip-content !py-1 !px-1 !bg-primary !text-xs !font-medium !text-white shadow-sm dark:bg-slate-700"
            role="tooltip">
            Link Tooltip
        </span>
    </span>
</p>
</div>`
export let TolltipsTS4 =
`     <div class="hs-tooltip ti-main-tooltip [--placement:top]">
<button type="button" class="hs-tooltip-toggle me-4">
    <svg xmlns="http://www.w3.org/2000/svg" class="fill-primary" height="24px"
        viewBox="0 0 24 24" width="24px" fill="#000000">
        <path d="M0 0h24v24H0V0z" fill="none" />
        <path
            d="M12 5.69l5 4.5V18h-2v-6H9v6H7v-7.81l5-4.5M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z" />
    </svg>
    <span
        class="hs-tooltip-content ti-main-tooltip-content !py-1 !px-2 !bg-primary !text-xs !font-medium !text-white shadow-sm dark:bg-slate-700"
        role="tooltip">
        Home
    </span>
</button>
</div>
<div class="hs-tooltip ti-main-tooltip [--placement:top]">
<button type="button" class="hs-tooltip-toggle me-4">
    <svg xmlns="http://www.w3.org/2000/svg" class="fill-secondary" height="24px"
        viewBox="0 0 24 24" width="24px" fill="#000000">
        <path d="M0 0h24v24H0V0z" fill="none" />
        <path
            d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0l-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z" />
    </svg>
    <span
        class="hs-tooltip-content ti-main-tooltip-content !py-1 !px-2 !bg-secondary !text-xs !font-medium !text-white shadow-sm dark:bg-slate-700"
        role="tooltip">
        Message
    </span>
</button>
</div>
<div class="hs-tooltip ti-main-tooltip [--placement:top]">
<button type="button" class="hs-tooltip-toggle me-4">
    <svg xmlns="http://www.w3.org/2000/svg" class="fill-warning"
        enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24"
        width="24px" fill="#000000">
        <g>
            <rect fill="none" height="24" width="24" />
        </g>
        <g>
            <path
                d="M20,9V6h-2v3h-3v2h3v3h2v-3h3V9H20z M9,12c2.21,0,4-1.79,4-4c0-2.21-1.79-4-4-4S5,5.79,5,8C5,10.21,6.79,12,9,12z M9,6 c1.1,0,2,0.9,2,2c0,1.1-0.9,2-2,2S7,9.1,7,8C7,6.9,7.9,6,9,6z M15.39,14.56C13.71,13.7,11.53,13,9,13c-2.53,0-4.71,0.7-6.39,1.56 C1.61,15.07,1,16.1,1,17.22V20h16v-2.78C17,16.1,16.39,15.07,15.39,14.56z M15,18H3v-0.78c0-0.38,0.2-0.72,0.52-0.88 C4.71,15.73,6.63,15,9,15c2.37,0,4.29,0.73,5.48,1.34C14.8,16.5,15,16.84,15,17.22V18z" />
        </g>
    </svg>
    <span
        class="hs-tooltip-content ti-main-tooltip-content !py-1 !px-2 !bg-warning !text-xs !font-medium !text-white shadow-sm dark:bg-slate-700"
        role="tooltip">
        Add User
    </span>
</button>
</div>
<div class="hs-tooltip ti-main-tooltip [--placement:top]">
<button type="button" class="hs-tooltip-toggle me-4">
    <svg xmlns="http://www.w3.org/2000/svg" class="fill-info" height="24px"
        viewBox="0 0 24 24" width="24px" fill="#000000">
        <path d="M0 0h24v24H0V0z" fill="none" />
        <path
            d="M4.01 6.03l7.51 3.22-7.52-1 .01-2.22m7.5 8.72L4 17.97v-2.22l7.51-1M2.01 3L2 10l15 2-15 2 .01 7L23 12 2.01 3z" />
    </svg>
    <span
        class="hs-tooltip-content ti-main-tooltip-content !py-1 !px-2 !bg-info !text-xs !font-medium !text-white shadow-sm dark:bg-slate-700"
        role="tooltip">
        Send File
    </span>
</button>
</div>
<div class="hs-tooltip ti-main-tooltip [--placement:top]">
<button type="button" class="hs-tooltip-toggle me-4">
    <svg xmlns="http://www.w3.org/2000/svg" class="fill-success" height="24px"
        viewBox="0 0 24 24" width="24px" fill="#000000">
        <path d="M0 0h24v24H0V0z" fill="none" />
        <path
            d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
    </svg>
    <span
        class="hs-tooltip-content ti-main-tooltip-content !py-1 !px-2 !bg-success !text-xs !font-medium !text-white shadow-sm dark:bg-slate-700"
        role="tooltip">
        Action
    </span>
</button>
</div>
`
export let TolltipsTS5 =
`     <div class="hs-tooltip ti-main-tooltip">
<button type="button"
    class="hs-tooltip-toggle ti-btn ti-btn-primary-full opacity-[0.6]">
    Disabled button
    <span
        class="hs-tooltip-content  ti-main-tooltip-content py-1 px-2 !bg-black !text-xs !font-medium !text-white shadow-sm "
        role="tooltip">
        Disabled Tooltip
    </span>
</button>
</div>`
export let TolltipsTS6 =
` <div class="hs-tooltip ti-main-tooltip">
<button type="button"
    class="hs-tooltip-toggle avatar avatar-md me-2 online avatar-rounded">
    <img src="./assets/images/faces/12.jpg" alt="img">
</button>
<span
    class="hs-tooltip-content  ti-main-tooltip-content !py-1 !px-2 !bg-primary !text-xs !font-medium !text-white shadow-sm "
    role="tooltip">
    Alex Carey
</span>
</div>
<div class="hs-tooltip ti-main-tooltip">
<button type="button"
    class="hs-tooltip-toggle avatar avatar-lg me-2 online avatar-rounded">
    <img src="./assets/images/faces/3.jpg" alt="img">
</button>
<span
    class="hs-tooltip-content  ti-main-tooltip-content !py-1 !px-1 !bg-primary !text-xs !font-medium !text-white shadow-sm "
    role="tooltip">
    Marina Kai
</span>
</div>
<div class="hs-tooltip ti-main-tooltip">
<button type="button"
    class="hs-tooltip-toggle avatar avatar-xl me-2 offline avatar-rounded">
    <img src="./assets/images/faces/15.jpg" alt="img">
</button>
<span
    class="hs-tooltip-content  ti-main-tooltip-content !py-1 !px-1 !bg-primary !text-xs !font-medium !text-white shadow-sm "
    role="tooltip">
    Marina Kai
</span>
</div>`

export let buttonsTS1 = 
`   <button type="button" class="ti-btn ti-btn-primary-full ti-btn-wave">Primary</button>
<button type="button" class="ti-btn ti-btn-secondary-full ti-btn-wave">Secondary</button>
<button type="button" class="ti-btn ti-btn-success-full ti-btn-wave">Success</button>
<button type="button" class="ti-btn ti-btn-danger-full ti-btn-wave">Danger</button>
<button type="button" class="ti-btn ti-btn-warning-full ti-btn-wave">Warning</button>
<button type="button" class="ti-btn ti-btn-info-full ti-btn-wave">Info</button>
<button type="button" class="ti-btn ti-btn-light ti-btn-wave">Light</button>
<button type="button" class="ti-btn ti-btn-dark ti-btn-wave text-white">Dark</button>
<button type="button" class="ti-btn ti-btn-link ti-btn-wave">Link</button>`
export let buttonsTS2 = 
` <button type="button" class="ti-btn ti-btn-primary-full !rounded-full ti-btn-wave">Primary</button>
<button type="button" class="ti-btn ti-btn-secondary-full !rounded-full ti-btn-wave">Secondary</button>
<button type="button" class="ti-btn ti-btn-success-full !rounded-full ti-btn-wave">Success</button>
<button type="button" class="ti-btn ti-btn-danger-full !rounded-full ti-btn-wave">Danger</button>
<button type="button" class="ti-btn ti-btn-warning-full !rounded-full ti-btn-wave">Warning</button>
<button type="button" class="ti-btn ti-btn-info-full !rounded-full ti-btn-wave">Info</button>
<button type="button" class="ti-btn ti-btn-light !rounded-full ti-btn-wave">Light</button>
<button type="button" class="ti-btn ti-btn-dark !rounded-full ti-btn-wave text-white">Dark</button>
<button type="button" class="ti-btn ti-btn-link !rounded-full ti-btn-wave">Link</button>`
export let buttonsTS3 = 
`  <button type="button" class="ti-btn ti-btn-primary ti-btn-wave">Primary</button>
<button type="button" class="ti-btn ti-btn-secondary ti-btn-wave">Secondary</button>
<button type="button" class="ti-btn ti-btn-success ti-btn-wave">Success</button>
<button type="button" class="ti-btn ti-btn-danger ti-btn-wave">Danger</button>
<button type="button" class="ti-btn ti-btn-warning ti-btn-wave">Warning</button>
<button type="button" class="ti-btn ti-btn-info ti-btn-wave">Info</button>
<button type="button" class="ti-btn ti-btn-purple ti-btn-wave">purple</button>
<button type="button" class="ti-btn ti-btn-teal ti-btn-wave">teal</button>
<button type="button" class="ti-btn ti-btn-orange ti-btn-wave">orange</button>`
export let buttonsTS4 = 
`  <button type="button" class="ti-btn ti-btn-primary !rounded-full ti-btn-wave">Primary</button>
<button type="button" class="ti-btn ti-btn-secondary !rounded-full ti-btn-wave">Secondary</button>
<button type="button" class="ti-btn ti-btn-success !rounded-full ti-btn-wave">Success</button>
<button type="button" class="ti-btn ti-btn-danger !rounded-full ti-btn-wave">Danger</button>
<button type="button" class="ti-btn ti-btn-warning !rounded-full ti-btn-wave">Warning</button>
<button type="button" class="ti-btn ti-btn-info !rounded-full ti-btn-wave">Info</button>
<button type="button" class="ti-btn ti-btn-purple !rounded-full ti-btn-wave">purple</button>
<button type="button" class="ti-btn ti-btn-teal !rounded-full ti-btn-wave">teal</button>
<button type="button" class="ti-btn ti-btn-orange !rounded-full ti-btn-wave">orange</button>`
export let buttonsTS5 = 
`       <button type="button" class="ti-btn ti-btn-outline-primary ti-btn-wave">Primary</button>
<button type="button" class="ti-btn ti-btn-outline-secondary ti-btn-wave">Secondary</button>
<button type="button" class="ti-btn ti-btn-outline-success ti-btn-wave">Success</button>
<button type="button" class="ti-btn ti-btn-outline-danger ti-btn-wave">Danger</button>
<button type="button" class="ti-btn ti-btn-outline-warning ti-btn-wave">Warning</button>
<button type="button" class="ti-btn ti-btn-outline-info ti-btn-wave">Info</button>
<button type="button" class="ti-btn ti-btn-outline-light ti-btn-wave">Light</button>
<button type="button" class="ti-btn ti-btn-outline-dark ti-btn-wave">Dark</button>`
export let buttonsTS6 = 
`  <button type="button" class="ti-btn ti-btn-outline-primary !rounded-full ti-btn-wave">Primary</button>
<button type="button" class="ti-btn ti-btn-outline-secondary !rounded-full ti-btn-wave">Secondary</button>
<button type="button" class="ti-btn ti-btn-outline-success !rounded-full ti-btn-wave">Success</button>
<button type="button" class="ti-btn ti-btn-outline-danger !rounded-full ti-btn-wave">Danger</button>
<button type="button" class="ti-btn ti-btn-outline-warning !rounded-full ti-btn-wave">Warning</button>
<button type="button" class="ti-btn ti-btn-outline-info !rounded-full ti-btn-wave">Info</button>
<button type="button" class="ti-btn ti-btn-outline-light !rounded-full ti-btn-wave">Light</button>
<button type="button" class="ti-btn ti-btn-outline-dark !rounded-full ti-btn-wave">Dark</button>`
export let buttonsTS7 = 
`   <button type="button" class="ti-btn ti-btn-primary-gradient ti-btn-wave">Primary</button>
<button type="button" class="ti-btn ti-btn-secondary-gradient ti-btn-wave">Secondary</button>
<button type="button" class="ti-btn ti-btn-success-gradient ti-btn-wave">Success</button>
<button type="button" class="ti-btn ti-btn-danger-gradient ti-btn-wave">Danger</button>
<button type="button" class="ti-btn ti-btn-warning-gradient ti-btn-wave">Warning</button>
<button type="button" class="ti-btn ti-btn-info-gradient ti-btn-wave">Info</button>
<button type="button" class="ti-btn ti-btn-orange-gradient ti-btn-wave">Orange</button>
<button type="button" class="ti-btn ti-btn-purple-gradient ti-btn-wave">Purple</button>
<button type="button" class="ti-btn ti-btn-teal-gradient ti-btn-wave">Teal</button>`
export let buttonsTS8 = 
`    <button type="button" class="ti-btn ti-btn-primary-gradient !rounded-full ti-btn-wave">Primary</button>
<button type="button" class="ti-btn ti-btn-secondary-gradient !rounded-full ti-btn-wave">Secondary</button>
<button type="button" class="ti-btn ti-btn-success-gradient !rounded-full ti-btn-wave">Success</button>
<button type="button" class="ti-btn ti-btn-danger-gradient !rounded-full ti-btn-wave">Danger</button>
<button type="button" class="ti-btn ti-btn-warning-gradient !rounded-full ti-btn-wave">Warning</button>
<button type="button" class="ti-btn ti-btn-info-gradient !rounded-full ti-btn-wave">Info</button>
<button type="button" class="ti-btn ti-btn-orange-gradient !rounded-full ti-btn-wave">Orange</button>
<button type="button" class="ti-btn ti-btn-purple-gradient !rounded-full ti-btn-wave">Purple</button>
<button type="button" class="ti-btn ti-btn-teal-gradient !rounded-full ti-btn-wave">Teal</button>`
export let buttonsTS9 = 
` <button type="button" class="ti-btn ti-btn-ghost-primary ti-btn-wave">Primary</button>
<button type="button" class="ti-btn ti-btn-ghost-secondary ti-btn-wave">Secondary</button>
<button type="button" class="ti-btn ti-btn-ghost-success ti-btn-wave">Success</button>
<button type="button" class="ti-btn ti-btn-ghost-danger ti-btn-wave">Danger</button>
<button type="button" class="ti-btn ti-btn-ghost-warning ti-btn-wave">Warning</button>
<button type="button" class="ti-btn ti-btn-ghost-info ti-btn-wave">Info</button>
<button type="button" class="ti-btn ti-btn-ghost-orange ti-btn-wave">Orange</button>
<button type="button" class="ti-btn ti-btn-ghost-purple ti-btn-wave">Purple</button>
<button type="button" class="ti-btn ti-btn-ghost-teal ti-btn-wave">Teal</button>`
export let buttonsTS10 = 
`  <button type="button" class="ti-btn ti-btn-ghost-primary !rounded-full ti-btn-wave">Primary</button>
<button type="button" class="ti-btn ti-btn-ghost-secondary !rounded-full ti-btn-wave">Secondary</button>
<button type="button" class="ti-btn ti-btn-ghost-success !rounded-full ti-btn-wave">Success</button>
<button type="button" class="ti-btn ti-btn-ghost-danger !rounded-full ti-btn-wave">Danger</button>
<button type="button" class="ti-btn ti-btn-ghost-warning !rounded-full ti-btn-wave">Warning</button>
<button type="button" class="ti-btn ti-btn-ghost-info !rounded-full ti-btn-wave">Info</button>
<button type="button" class="ti-btn ti-btn-ghost-orange !rounded-full ti-btn-wave">Orange</button>
<button type="button" class="ti-btn ti-btn-ghost-purple !rounded-full ti-btn-wave">Purple</button>
<button type="button" class="ti-btn ti-btn-ghost-teal !rounded-full ti-btn-wave">Teal</button>`
export let buttonsTS11 = 
` <div class="ti-btn-list space-x-2 rtl:space-x-reverse">
<a class="ti-btn ti-btn-primary-full ti-btn-wave" href="javascript:void(0);">Link</a>
<button class="ti-btn ti-btn-secondary-full ti-btn-wave" type="submit">Button</button>
<input class="ti-btn ti-btn-info-full" type="button" value="Input">
<input class="ti-btn ti-btn-warning-full" type="button" value="Submit">
<input class="ti-btn ti-btn-success-full" type="button" value="Reset">
</div>`
export let buttonsTS12 = 
` <div class="ti-btn-list flex">
<div class="mb-4">
    <button type="button" class="ti-btn ti-btn-primary-full ti-btn-disabled">Primary
        button</button>
    <button type="button" class="ti-btn ti-btn-secondary-full ti-btn-disabled">Button</button>
    <button type="button" class="ti-btn ti-btn-outline-primary ti-btn-disabled">Primary
        button</button>
    <button type="button" class="ti-btn ti-btn-outline-secondary ti-btn-disabled">Button</button>
</div>

<div>
    <a class="ti-btn ti-btn-primary ti-btn-disabled" aria-disabled="true">Primary
        link</a>
    <a class="ti-btn ti-btn-secondary ti-btn-disabled" aria-disabled="true">Link</a>
</div>`
export let buttonsTS13 = 
` <div class="ti-btn-list md:flex flex-wrap">
<button type="button" class="ti-btn ti-btn-primary-full ti-btn-loader m-2">
    <span class="me-2">Loading</span>
    <span class="loading"><i class="ri-loader-2-fill text-[1rem] animate-spin"></i></span>
</button>
<button type="button" class="ti-btn ti-btn-outline-secondary ti-btn-loader m-2">
    <span class="me-2">Loading</span>
    <span class="loading"><i class="ri-loader-2-fill text-[1rem] animate-spin"></i></span>
</button>
<button type="button" class="ti-btn bg-info/10 text-info ti-btn-loader m-2">
    <span class="me-2">Loading</span>
    <span class="loading"><i class="ri-loader-4-line text-[1rem] animate-spin"></i></span>
</button>
<button type="button" class="ti-btn bg-warning/10 text-warning ti-btn-loader m-2">
    <span class="me-2">Loading</span>
    <span class="loading"><i class="ri-loader-5-line text-[1rem] animate-spin"></i></span>
</button>
<button type="button" class="ti-btn ti-btn-success-full ti-btn-loader ti-btn-disabled m-2">
    <span class="me-2">Disabled</span>
    <span class="loading"><i class="ri-refresh-line text-[1rem] animate-spin"></i></span>
</button>`
export let buttonsTS14 = 
`    <div class="ti-btn-list md:flex block">
<div class="md:mb-0 mb-2">
    <button type="button" aria-label="button" class="ti-btn ti-btn-icon ti-btn-primary-full ti-btn-wave">
        <i class="ri-bank-fill"></i>
    </button>
    <button type="button" aria-label="button" class="ti-btn ti-btn-icon ti-btn-info-full ti-btn-wave">
        <i class="ri-medal-line"></i>
    </button>
    <button type="button" aria-label="button" class="ti-btn ti-btn-icon ti-btn-danger-full ti-btn-wave">
        <i class="ri-archive-line"></i>
    </button>
    <button type="button" aria-label="button" class="ti-btn ti-btn-icon ti-btn-warning-full ti-btn-wave me-5">
        <i class="ri-calendar-2-line"></i>
    </button>
</div>
<div class="md:mb-0 mb-2">
    <button type="button" aria-label="button" class="ti-btn ti-btn-icon bg-primary/10 text-primary !border hover:bg-primary hover:text-white !rounded-full ti-btn-wave">
        <i class="ri-home-smile-line"></i>
    </button>
    <button type="button" aria-label="button" class="ti-btn ti-btn-icon bg-secondary/10 text-secondary hover:bg-secondary hover:text-white !rounded-full ti-btn-wave">
        <i class="ri-delete-bin-line"></i>
    </button>
    <button type="button" aria-label="button" class="ti-btn ti-btn-icon bg-success/10 text-success hover:bg-success hover:text-white !rounded-full ti-btn-wave">
        <i class="ri-notification-3-line"></i>
    </button>
    <button type="button" aria-label="button" class="ti-btn ti-btn-icon bg-danger/10 text-danger hover:bg-danger hover:text-white !rounded-full ti-btn-wave me-5">
        <i class="ri-chat-settings-line"></i>
    </button>
</div>
<div class="">
    <button type="button" aria-label="button" class="ti-btn ti-btn-icon ti-btn-outline-primary !rounded-full ti-btn-wave">
        <i class="ri-phone-line"></i>
    </button>
    <button type="button" aria-label="button" class="ti-btn ti-btn-icon ti-btn-outline-teal !border-teal !text-teal !rounded-full ti-btn-wave">
        <i class="ri-customer-service-2-line"></i>
    </button>
    <button type="button" aria-label="button" class="ti-btn ti-btn-icon ti-btn-outline-success !rounded-full ti-btn-wave">
        <i class="ri-live-line"></i>
    </button>
    <button type="button" aria-label="button" class="ti-btn ti-btn-icon ti-btn-outline-secondary !rounded-full ti-btn-wave">
        <i class="ri-save-line"></i>
    </button>
</div>
</div>`
export let buttonsTS15 = 
` <div class="ti-btn-list space-x-2 rtl:space-x-reverse">
<button type="button" aria-label="button" class="ti-btn ti-btn-icon ti-btn-facebook ti-btn-wave">
    <i class="ri-facebook-line"></i>
</button>
<button type="button" aria-label="button" class="ti-btn ti-btn-icon ti-btn-twitter ti-btn-wave">
    <i class="ri-twitter-line"></i>
</button>
<button type="button" aria-label="button" class="ti-btn ti-btn-icon ti-btn-instagram ti-btn-wave">
    <i class="ri-instagram-line"></i>
</button>
<button type="button" aria-label="button" class="ti-btn ti-btn-icon ti-btn-github ti-btn-wave">
    <i class="ri-github-line"></i>
</button>
<button type="button" aria-label="button" class="ti-btn ti-btn-icon ti-btn-youtube ti-btn-wave">
    <i class="ri-youtube-line"></i>
</button>
<button type="button" aria-label="button" class="ti-btn ti-btn-icon ti-btn-google ti-btn-wave">
    <i class="ri-google-line"></i>
</button>
</div>`
export let buttonsTS16 = 
`  <div class="ti-btn-list space-x-2 rtl:space-x-reverse">
<button type="button" class="ti-btn ti-btn-primary-full !py-1 !px-2 ti-btn-wave">Small
    button</button>
<button type="button" class="ti-btn ti-btn-secondary-full ti-btn-wave">Default
    button</button>
<button type="button" class="ti-btn ti-btn-success-full ti-btn-lg ti-btn-wave">Large
    button</button>
</div>`
export let buttonsTS17 = 
`    <div class="ti-btn-list space-x-2 rtl:space-x-reverse">
<button type="button" class="ti-btn ti-btn-primary-full ti-btn-w-xs ti-btn-wave">XS</button>
<button type="button" class="ti-btn ti-btn-secondary-full ti-btn-w-sm ti-btn-wave">SM</button>
<button type="button" class="ti-btn ti-btn-warning-full ti-btn-w-md ti-btn-wave">MD</button>
<button type="button" class="ti-btn ti-btn-info-full ti-btn-w-lg ti-btn-wave">LG</button>
</div>`
export let buttonsTS18 = 
`    <div class="ti-btn-list flex">
<div class="me-[3rem]">
    <button type="button" class="ti-btn ti-btn-primary-full shadow-sm ti-btn-wave">Button</button>
    <button type="button" class="ti-btn ti-btn-primary-full shadow ti-btn-wave">Button</button>
    <button type="button" class="ti-btn ti-btn-primary-full shadow-lg ti-btn-wave">Button</button>
</div>
<div>
    <button type="button" class="ti-btn ti-btn-secondary-full !py-1 !px-2 shadow-sm ti-btn-wave">Button</button>
    <button type="button" class="ti-btn ti-btn-info-full shadow ti-btn-wave">Button</button>
    <button type="button" class="ti-btn ti-btn-lg ti-btn-success-full shadow-lg ti-btn-wave">Button</button>
</div>
</div>`
export let buttonsTS19 = 
`  <div class="ti-btn-list space-x-2 rtl:space-x-reverse">
<button type="button" class="ti-btn ti-btn-primary-full shadow-primary ti-btn-wave">Button</button>
<button type="button" class="ti-btn ti-btn-secondary-full shadow-secondary ti-btn-wave">Button</button>
<button type="button" class="ti-btn ti-btn-success-full shadow-success ti-btn-wave">Button</button>
<button type="button" class="ti-btn ti-btn-info-full shadow-info ti-btn-wave">Button</button>
<button type="button" class="ti-btn ti-btn-warning-full shadow-warning ti-btn-wave">Button</button>
<button type="button" class="ti-btn ti-btn-danger-full shadow-danger ti-btn-wave">Button</button>
<button type="button" class="ti-btn ti-btn-purple-full shadow-purple ti-btn-wave">Button</button>
<button type="button" class="ti-btn ti-btn-orange-full shadow-orange ti-btn-wave">Button</button>
</div>`
export let buttonsTS20 = 
`   <div class="ti-btn-list space-x-2 rtl:space-x-reverse">
<button type="button" class="ti-btn ti-btn-primary-full label-ti-btn">
    <i class="ri-chat-smile-line label-ti-btn-icon  me-2"></i>
    Primary
</button>
<button type="button" class="ti-btn ti-btn-secondary-full label-ti-btn">
    <i class="ri-settings-4-line label-ti-btn-icon me-2"></i>
    Secondary
</button>
<button type="button" class="ti-btn ti-btn-warning-full label-ti-btn !rounded-full">
    <i class="ri-spam-2-line label-ti-btn-icon me-2 !rounded-full"></i>
    Warning
</button>
<button type="button" class="ti-btn ti-btn-info-full label-ti-btn !rounded-full">
    <i class="ri-phone-line label-ti-btn-icon me-2 !rounded-full"></i>
    Info
</button>
<button type="button" class="ti-btn ti-btn-success-full label-ti-btn label-end">
    <i class="ri-thumb-up-line label-ti-btn-icon ms-2"></i>
    Success
</button>
<button type="button" class="ti-btn ti-btn-danger-full label-ti-btn label-end !rounded-full">
    <i class="ri-close-line label-ti-btn-icon ms-2 !rounded-full"></i>
    Cancel
</button>
</div>`
export let buttonsTS21 = 
`<div class="ti-btn-list space-x-2 rtl:space-x-reverse">
<button type="button" class="ti-btn ti-btn-info-full custom-button !rounded-full">
    <span class="custom-ti-btn-icons"><i class="ri-twitter-line text-info"></i></span>
    Twitter
</button>
<button type="button" class="ti-btn ti-btn-teal ti-btn-border-down border-0">Border</button>
<button type="button" class="ti-btn ti-btn-secondary ti-btn-border-start">Border</button>
<button type="button" class="ti-btn ti-btn-purple ti-btn-border-end">Border</button>
<button type="button" class="ti-btn ti-btn-warning ti-btn-border-top">Border</button>
<button type="button" class="ti-btn ti-btn-danger-full ti-btn-hover ti-btn-hover-animate">Like</button>
<button type="button" class="ti-btn ti-btn-success-full ti-btn-darken-hover">Hover</button>
<button type="button" class="ti-btn ti-btn-orange-full ti-btn-custom-border">Hover</button>
</div>`
export let buttonsTS22 = 
`  <div class="ti-btn-list space-x-2 rtl:space-x-reverse">
<div class="grid  gap-2 mb-6">
    <button class="ti-btn ti-btn-primary-full ti-btn-wave" type="button">Button</button>
    <button class="ti-btn ti-btn-secondary-full ti-btn-wave" type="button">Button</button>
</div>
<div class="grid gap-2 md:block">
    <button class="ti-btn ti-btn-info-full ti-btn-wave" type="button">Button</button>
    <button class="ti-btn ti-btn-success-full ti-btn-wave" type="button">Button</button>
</div>
<div class="grid !mx-auto gap-2 w-[50%] ">
    <button class="ti-btn ti-btn-danger-full ti-btn-wave" type="button">Button</button>
    <button class="ti-btn ti-btn-warning-full ti-btn-wave" type="button">Button</button>
</div>
<div class="grid gap-2 md:flex md:justify-end">
    <button class="ti-btn ti-btn-teal-full md:me-2 ti-btn-wave" type="button">Button</button>
    <button class="ti-btn ti-btn-purple-full ti-btn-wave" type="button">Button</button>
</div>
</div>`

export let buttonsgroupTS1 = 
`  <div class="inline-flex rounded-md shadow-sm me-5">
<button type="button"
    class="ti-btn-group py-3 px-4 border bg-white dark:bg-bodybg text-gray-700 hover:bg-gray-50 focus:ring-primary dark:bg-bgdark dark:hover:bg-black/20 dark:border-white/10 dark:text-[#8c9097] dark:text-white/50">
    Year
</button>
<button type="button"
    class="ti-btn-group py-3 px-4 border bg-white dark:bg-bodybg text-gray-700 hover:bg-gray-50 focus:ring-primary dark:bg-bgdark dark:hover:bg-black/20 dark:border-white/10 dark:text-[#8c9097] dark:text-white/50">
    Month
</button>
<button type="button"
    class="ti-btn-group py-3 px-4 border bg-white dark:bg-bodybg text-gray-700 hover:bg-gray-50 focus:ring-primary dark:bg-bgdark dark:hover:bg-black/20 dark:border-white/10 dark:text-[#8c9097] dark:text-white/50">
    Date
</button>
</div>`
export let buttonsgroupTS2 = 
`   <div class="ti-btn-group !gap-0" role="group" aria-label="Basic mixed styles example">
<button type="button" class="ti-btn-group py-3 px-4 border border-danger/10 ti-btn-danger-full ti-btn-wave">Year</button>
<button type="button" class="ti-btn-group py-3 px-4 border border-warning ti-btn-warning-full ti-btn-wave">Month</button>
<button type="button" class="ti-btn-group py-3 px-4 border border-success ti-btn-success-full ti-btn-wave">Date</button>
</div>`
export let buttonsgroupTS3 = 
` <div class="flex flex-col md:inline-flex md:flex-row rounded-sm shadow-sm">
<button type="button"
    class="py-2 px-3 inline-flex justify-center items-center gap-2 -mt-px -ms-px first:rounded-t-sm last:rounded-b-sm sm:first:rounded-s-sm sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-sm border font-medium bg-white dark:bg-bodybg text-gray-700 align-middle hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-0 focus:ring-primary transition-all text-sm dark:bg-bgdark dark:hover:bg-black/20 dark:border-white/10 dark:text-[#8c9097] dark:text-white/50">
    Item 1
</button>
<button type="button"
    class="py-2 px-3 inline-flex justify-center items-center gap-2 -mt-px -ms-px first:rounded-t-sm last:rounded-b-sm sm:first:rounded-s-sm sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-sm border font-medium bg-white dark:bg-bodybg text-gray-700 align-middle hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-0 focus:ring-primary transition-all text-sm dark:bg-bgdark dark:hover:bg-black/20 dark:border-white/10 dark:text-[#8c9097] dark:text-white/50">
    Item 2
</button>
<button type="button"
    class="py-2 px-3 inline-flex justify-center items-center gap-2 -mt-px -ms-px first:rounded-t-sm last:rounded-b-sm sm:first:rounded-s-sm sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-sm border font-medium bg-white dark:bg-bodybg text-gray-700 align-middle hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-0 focus:ring-primary transition-all text-sm dark:bg-bgdark dark:hover:bg-black/20 dark:border-white/10 dark:text-[#8c9097] dark:text-white/50">
    Item 3
</button>
</div>`
export let buttonsgroupTS4 = 
`   <div class="inline-flex rounded-md shadow-sm me-6">
<button type="button"
    class="ti-btn-group border py-3 px-4 bg-white dark:bg-bodybg text-gray-700 hover:bg-gray-50 focus:ring-primary dark:bg-bgdark dark:hover:bg-black/20 dark:border-white/10 dark:text-[#8c9097] dark:text-white/50">
    Small
</button>
<button type="button"
    class="ti-btn-group border py-3 px-4 bg-white dark:bg-bodybg text-gray-700 hover:bg-gray-50 focus:ring-primary dark:bg-bgdark dark:hover:bg-black/20 dark:border-white/10 dark:text-[#8c9097] dark:text-white/50">
    Small
</button>
<button type="button"
    class="ti-btn-group border py-3 px-4 bg-white dark:bg-bodybg text-gray-700 hover:bg-gray-50 focus:ring-primary dark:bg-bgdark dark:hover:bg-black/20 dark:border-white/10 dark:text-[#8c9097] dark:text-white/50">
    Small
</button>
</div>

<div class="inline-flex rounded-md shadow-sm me-6">
<button type="button"
    class="ti-btn-group bg-white dark:bg-bodybg border text-gray-700 hover:bg-gray-50 focus:ring-primary dark:bg-bgdark dark:hover:bg-black/20 dark:border-white/10 dark:text-[#8c9097] dark:text-white/50 sm:p-4 p-3">
    Default
</button>
<button type="button"
    class="ti-btn-group bg-white dark:bg-bodybg border text-gray-700 hover:bg-gray-50 focus:ring-primary dark:bg-bgdark dark:hover:bg-black/20 dark:border-white/10 dark:text-[#8c9097] dark:text-white/50 sm:p-4 p-3">
    Default
</button>
<button type="button"
    class="ti-btn-group bg-white dark:bg-bodybg border text-gray-700 hover:bg-gray-50 focus:ring-primary dark:bg-bgdark dark:hover:bg-black/20 dark:border-white/10 dark:text-[#8c9097] dark:text-white/50 sm:p-4 p-3">
    Default
</button>
</div>

<div class="inline-flex rounded-md shadow-sm">
<button type="button"
    class="ti-btn-group bg-white dark:bg-bodybg border text-gray-700 hover:bg-gray-50 focus:ring-primary dark:bg-bgdark dark:hover:bg-black/20 dark:border-white/10 dark:text-[#8c9097] dark:text-white/50 p-[1.3125rem]">
    Large
</button>
<button type="button"
    class="ti-btn-group bg-white dark:bg-bodybg border text-gray-700 hover:bg-gray-50 focus:ring-primary dark:bg-bgdark dark:hover:bg-black/20 dark:border-white/10 dark:text-[#8c9097] dark:text-white/50 p-[1.3125rem]">
    Large
</button>
<button type="button"
    class="ti-btn-group bg-white dark:bg-bodybg border text-gray-700 hover:bg-gray-50 focus:ring-primary dark:bg-bgdark dark:hover:bg-black/20 dark:border-white/10 dark:text-[#8c9097] dark:text-white/50 p-[1.3125rem]">
    Large
</button>
</div>`
export let buttonsgroupTS5 = 
` <div class="max-w-xs flex flex-col rounded-sm shadow-sm">
<button type="button"
    class="focus-visible:outline-none focus:!outline-none py-2 px-3 inline-flex justify-center items-center gap-2 rounded-t-md border font-medium bg-white dark:bg-bodybg text-gray-700 align-middle hover:bg-gray-50 focus:z-10 focus:ring-0 focus:ring-primary transition-all text-sm dark:bg-bgdark dark:hover:bg-black/20 dark:border-white/10 dark:text-[#8c9097] dark:text-white/50">
    Item 1
</button>
<button type="button"
    class="-mt-px focus-visible:outline-none focus:!outline-none py-2 px-3 inline-flex justify-center items-center gap-2 border font-medium bg-white dark:bg-bodybg text-gray-700 align-middle hover:bg-gray-50 focus:z-10 focus:ring-0 focus:ring-primary transition-all text-sm dark:bg-bgdark dark:hover:bg-black/20 dark:border-white/10 dark:text-[#8c9097] dark:text-white/50">
    Item 2
</button>
<button type="button"
    class="-mt-px focus-visible:outline-none focus:!outline-none py-2 px-3 inline-flex justify-center items-center gap-2 rounded-b-md border font-medium bg-white dark:bg-bodybg text-gray-700 align-middle hover:bg-gray-50 focus:z-10 focus:ring-0 focus:ring-primary transition-all text-sm dark:bg-bgdark dark:hover:bg-black/20 dark:border-white/10 dark:text-[#8c9097] dark:text-white/50">
    Item 3
</button>
</div>`
export let buttonsgroupTS6 = 
`  <div class="inline-flex rounded-md shadow-sm mb-5 me-5">
<button type="button" class="ti-btn-group py-3 px-4 border bg-white dark:bg-bodybg text-gray-700 hover:bg-gray-50 focus:ring-primary dark:bg-bgdark dark:hover:bg-black/20 dark:border-white/10 dark:text-[#8c9097] dark:text-white/50">
  Year
</button>
<button type="button" class="ti-btn-group py-3 px-4 border bg-white dark:bg-bodybg text-gray-700 hover:bg-gray-50 focus:ring-primary dark:bg-bgdark dark:hover:bg-black/20 dark:border-white/10 dark:text-[#8c9097] dark:text-white/50">
  Month
</button>
<button type="button" class="ti-btn-group py-3 px-4 border bg-white dark:bg-bodybg text-gray-700 hover:bg-gray-50 focus:ring-primary dark:bg-bgdark dark:hover:bg-black/20 dark:border-white/10 dark:text-[#8c9097] dark:text-white/50">
  Date
</button>
</div>
<div class="inline-flex rounded-md shadow-sm mb-5 me-5">
<button type="button" class="ti-btn-group py-3 px-4 border ti-btn-primary-full border-white/10 dark:border-white/10">
  Year
</button>
<button type="button" class="ti-btn-group py-3 px-4 border ti-btn-primary-full border-white/10 dark:border-white/10">
  Month
</button>
<button type="button" class="ti-btn-group py-3 px-4 border ti-btn-primary-full border-white/10 dark:border-white/10">
  Date
</button>
</div>
<div class="inline-flex rounded-md shadow-sm mb-5 me-5">
<button type="button" class="ti-btn-group py-3 px-4 border ti-btn-secondary-full border-white/10 dark:border-white/10">
  Year
</button>
<button type="button" class="ti-btn-group py-3 px-4 border ti-btn-secondary-full border-white/10 dark:border-white/10">
  Month
</button>
<button type="button" class="ti-btn-group py-3 px-4 border ti-btn-secondary-full border-white/10 dark:border-white/10">
  Date
</button>
</div>
<div class="inline-flex rounded-md shadow-sm mb-5 me-5">
<button type="button" class="ti-btn-group py-3 px-4 border ti-btn-warning-full border-white/10 dark:border-white/10">
  Year
</button>
<button type="button" class="ti-btn-group py-3 px-4 border ti-btn-warning-full border-white/10 dark:border-white/10">
  Month
</button>
<button type="button" class="ti-btn-group py-3 px-4 border ti-btn-warning-full border-white/10 dark:border-white/10">
  Date
</button>
</div>
<div class="inline-flex rounded-md shadow-sm mb-5 me-5">
<button type="button" class="ti-btn-group py-3 px-4 border ti-btn-danger-full border-white/10 dark:border-white/10">
  Year
</button>
<button type="button" class="ti-btn-group py-3 px-4 border ti-btn-danger-full border-white/10 dark:border-white/10">
  Month
</button>
<button type="button" class="ti-btn-group py-3 px-4 border ti-btn-danger-full border-white/10 dark:border-white/10">
  Date
</button>
</div>
<div class="inline-flex rounded-md shadow-sm mb-5 me-5">
<button type="button" class="ti-btn-group py-3 px-4 border ti-btn-info-full border-white/10 dark:border-white/10">
  Year
</button>
<button type="button" class="ti-btn-group py-3 px-4 border ti-btn-info-full border-white/10 dark:border-white/10">
  Month
</button>
<button type="button" class="ti-btn-group py-3 px-4 border ti-btn-info-full border-white/10 dark:border-white/10">
  Date
</button>
</div>
<div class="inline-flex rounded-md shadow-sm mb-0">
<button type="button" class="ti-btn-group py-3 px-4 border ti-btn-success-full border-white/10 dark:border-white/10">
  Year
</button>
<button type="button" class="ti-btn-group py-3 px-4 border ti-btn-success-full border-white/10 dark:border-white/10">
  Month
</button>
<button type="button" class="ti-btn-group py-3 px-4 border ti-btn-success-full border-white/10 dark:border-white/10">
  Date
</button>
</div>`

export let listTS1 = 
` <ul class="ti-list-group">
<li class="ti-list-group-item">
    <div class="flex items-center">
        <span class="avatar avatar-sm">
            <img src="./assets/images/faces/1.jpg" alt="img" class="!rounded-md">
        </span>
        <div class="ms-2 font-semibold">
            Alicia Sierra
        </div>
    </div>
</li>
<li class="ti-list-group-item">
    <div class="flex items-center">
        <span class="avatar avatar-sm">
            <img src="./assets/images/faces/3.jpg" alt="img" class="!rounded-md">
        </span>
        <div class="ms-2 font-semibold">
            Samantha Mery
        </div>
    </div>
</li>
<li class="ti-list-group-item">
    <div class="flex items-center">
        <span class="avatar avatar-sm">
            <img src="./assets/images/faces/6.jpg" alt="img" class="!rounded-md">
        </span>
        <div class="ms-2 font-semibold">
            Juliana Pena
        </div>
    </div>
</li>
<li class="ti-list-group-item">
    <div class="flex items-center">
        <span class="avatar avatar-sm">
            <img src="./assets/images/faces/15.jpg" alt="img" class="!rounded-md">
        </span>
        <div class="ms-2 font-semibold">
            Adam Smith
        </div>
    </div>
</li>
<li class="ti-list-group-item">
    <div class="flex items-center">
        <span class="avatar avatar-sm">
            <img src="./assets/images/faces/13.jpg" alt="img" class="!rounded-md">
        </span>
        <div class="ms-2 font-semibold">
            Farhaan Amhed
        </div>
    </div>
</li>
</ul>`
export let listTS2 = 
` <ul class="ti-list-group">
<li class="ti-list-group-item active" aria-current="true">
    <div class="flex items-center">
        <div>
            <span class="text-[.9375rem]">
                <i class="bi bi-house-door"></i>
            </span>
        </div>
        <div class="ms-2">
            Home
        </div>
    </div>
</li>
<li class="ti-list-group-item">
    <div class="flex items-center">
        <div>
            <span class="text-[.9375rem]">
                <i class="bi bi-bell"></i>
            </span>
        </div>
        <div class="ms-2">
            Notifications
        </div>
    </div>
</li>
<li class="ti-list-group-item">
    <div class="flex items-center">
        <div>
            <span class="text-[.9375rem]">
                <i class="bi bi-gift"></i>
            </span>
        </div>
        <div class="ms-2">
            Sent Messages
        </div>
    </div>
</li>
<li class="ti-list-group-item">
    <div class="flex items-center">
        <div>
            <span class="text-[.9375rem]">
                <i class="bi bi-person"></i>
            </span>
        </div>
        <div class="ms-2">
            New Requests
        </div>
    </div>
</li>
<li class="ti-list-group-item">
    <div class="flex items-center">
        <div>
            <span class="text-[.9375rem]">
                <i class="bi bi-trash3"></i>
            </span>
        </div>
        <div class="ms-2">
            Deleted Messages
        </div>
    </div>
</li>
</ul>`
export let listTS3 = 
`  <ul class="ti-list-group">
<li class="ti-list-group-item disabled" aria-disabled="true">A disabled item meant to be disabled
</li>
<li class="ti-list-group-item">Simply dummy text of the printing</li>
<li class="ti-list-group-item">There are many variations of passages</li>
<li class="ti-list-group-item">All the Lorem Ipsum generators</li>
<li class="ti-list-group-item">Written in 45 BC. This book is a treatise on the theory</li>
</ul>`
export let listTS4 =
` <ul class="ti-list-group ti-list-group-flush">
<li class="ti-list-group-item !border-t-0 !border-l-0 !border-r-0 font-semibold"><i class="bi bi-envelope align-middle me-2 text-[#8c9097] dark:text-white/50"></i>Asish Trivedhi<span class="ms-1 text-[#8c9097] dark:text-white/50 font-normal inline-block">(+1023-84534)</span></li>
<li class="ti-list-group-item !border-l-0 !border-r-0  font-semibold"><i class="bi bi-tiktok align-middle me-2 text-[#8c9097] dark:text-white/50"></i>Alezander Russo<span class="ms-1 text-[#8c9097] dark:text-white/50 font-normal inline-block">(+7546-12342)</span></li>
<li class="ti-list-group-item !border-l-0 !border-r-0  font-semibold"><i class="bi bi-whatsapp align-middle me-2 text-[#8c9097] dark:text-white/50"></i>Karem Smith<span class="ms-1 text-[#8c9097] dark:text-white/50 font-normal inline-block">(+9944-56632)</span></li>
<li class="ti-list-group-item !border-l-0 !border-r-0  font-semibold"><i class="bi bi-facebook align-middle me-2 text-[#8c9097] dark:text-white/50"></i>Melissa Brien<span class="ms-1 text-[#8c9097] dark:text-white/50 font-normal inline-block">(+1023-34323)</span></li>
<li class="ti-list-group-item !border-l-0 !border-r-0 !border-b-0  font-semibold"><i class="bi bi-instagram align-middle me-2 text-[#8c9097] dark:text-white/50"></i>Kamala Harris<span class="ms-1 text-[#8c9097] dark:text-white/50 font-normal inline-block">(+91-63421)</span></li>
</ul>`
export let listTS5 = 
`  <ul class="list-none">
<li class="ti-list-group-item ti-list-group-item-action active">
<a href="javascript:void(0);" 
    aria-current="true">
    <div class="flex items-center">
        <div>
            <span class="avatar avatar-xs bg-white dark:bg-bodybg !text-defaulttextcolor avatar-rounded">
                C
            </span>
        </div>
        <div class="ms-2">California</div>
    </div>
</a>
</li>
<li class="ti-list-group-item ti-list-group-item-action hover:bg-gray-200 dark:hover:bg-light">
    <a href="javascript:void(0);" class="">
        <div class="flex items-center">
            <div>
                <span class="avatar avatar-xs bg-secondary text-white avatar-rounded">
                    N
                </span>
            </div>
            <div class="ms-2">New Jersey</div>
        </div>
    </a>
</li>
<li class="ti-list-group-item ti-list-group-item-action hover:bg-gray-200 dark:hover:bg-light">
    <a href="javascript:void(0);" class="">
        <div class="flex items-center">
            <div>
                <span class="avatar avatar-xs bg-info text-white avatar-rounded">
                    L
                </span>
            </div>
            <div class="ms-2">Los Angeles</div>
        </div>
    </a>
</li>
<li class="ti-list-group-item ti-list-group-item-action hover:bg-gray-200 dark:hover:bg-light">
    <a href="javascript:void(0);" class="">
        <div class="flex items-center">
            <div>
                <span class="avatar avatar-xs bg-warning text-white avatar-rounded">
                    M
                </span>
            </div>
            <div class="ms-2">Miami Florida</div>
        </div>
    </a>
</li>
<li class="ti-list-group-item ti-list-group-item-action disabled">
    <a class=" ">
        <div class="flex items-center">
            <div>
                <span class="avatar avatar-xs bg-success text-white avatar-rounded">
                    W
                </span>
            </div>
            <div class="ms-2">Washington D.C</div>
        </div>
    </a>
</li>
</ul>`
export let listTS6 = 
`
<div class="ti-list-group flex flex-col">
<button type="button" class="ti-list-group-item text-start ti-list-group-item-action active" aria-current="true">Simply dummy text of the printing<span class="badge ltr:float-right rtl:float-left bg-primary text-white">243</span></button>
<button type="button" class="ti-list-group-item text-start ti-list-group-item-action">There are many variations of passages<span class="badge ltr:float-right rtl:float-left bg-secondary/10 text-secondary">35</span></button>
<button type="button" class="ti-list-group-item text-start ti-list-group-item-action">All the Lorem Ipsum generators<span class="badge ltr:float-right rtl:float-left bg-info/10 text-info">132</span></button>
<button type="button" class="ti-list-group-item text-start ti-list-group-item-action">All the Lorem Ipsum generators<span class="badge ltr:float-right rtl:float-left bg-success/10 text-success">2525</span></button>
<button type="button" class="ti-list-group-item text-start ti-list-group-item-action" disabled>A disabled item meant to be disabled<span class="badge ltr:float-right rtl:float-left bg-danger/10 text-danger">21</span></button>
</div>`
export let listTS7 = 
`   <ul class="ti-list-group">
<li class="ti-list-group-item">A simple default list group item</li>

<li class="ti-list-group-item !bg-primary/10 !text-primary">A simple primary list
    group
    item</li>
<li class="ti-list-group-item !bg-secondary/10 !text-secondary">A simple secondary
    list
    group item</li>
<li class="ti-list-group-item !bg-success/10 !text-success">A simple success list
    group
    item</li>
<li class="ti-list-group-item !bg-danger/10 !text-danger">A simple danger list
    group
    item</li>
<li class="ti-list-group-item !bg-warning/10 !text-warning">A simple warning list
    group
    item</li>
<li class="ti-list-group-item !bg-info/10 !text-info">A simple info list group
    item
</li>
<li class="ti-list-group-item !bg-light/10 !text-defaulttextcolor">A simple light list group
    item
</li>
<li class="ti-list-group-item !bg-black/10 dark:!bg-light !text-defaulttextcolor">A simple dark list group
    item
</li>
</ul>`
export let listTS8 = 
`   <div class="ti-list-group flex flex-col">
<a href="javascript:void(0);" class="w-full ti-list-group-item">A simple default list group item</a>
<a href="javascript:void(0);" class="w-full ti-list-group-item !bg-primary/10 !text-primary hover:!bg-primary/20">A simple primary list group item</a>
<a href="javascript:void(0);" class="w-full ti-list-group-item !bg-secondary/10 !text-secondar hover:!bg-secondary/20">A simple secondary list group item</a>
<a href="javascript:void(0);" class="w-full ti-list-group-item !bg-success/10 !text-success hover:!bg-success/20">A simple success list group item</a>
<a href="javascript:void(0);" class="w-full ti-list-group-item !bg-danger/10 !text-danger hover:!bg-danger/20">A simple danger list group item</a>
<a href="javascript:void(0);" class="w-full ti-list-group-item !bg-warning/10 !text-warning hover:!bg-warning/20">A simple warning list group item</a>
<a href="javascript:void(0);" class="w-full ti-list-group-item !bg-info/10 !text-info hover:!bg-info/20">A simple info list group item</a>
<a href="javascript:void(0);" class="w-full ti-list-group-item !bg-light/10 !text-defaulttextcolor hover:!bg-light/20">A simple light list group item</a>
<a href="javascript:void(0);" class="w-full ti-list-group-item !bg-black/10 dark:!bg-light !text-defaulttextcolor hover:!bg-black/20">A simple dark list group item</a>
</div>`
export let listTS9 = 
`   <ul class="ti-list-group ">
<li class="ti-list-group-item">A simple default list group item</li>

<li class="ti-list-group-item !bg-primary !text-white !border-primary">A simple primary list
    group
    item</li>
<li class="ti-list-group-item !bg-secondary !text-white !border-secondary">A simple secondary
    list
    group item</li>
<li class="ti-list-group-item !bg-success !text-white !border-success">A simple success list
    group
    item</li>
<li class="ti-list-group-item !bg-danger !text-white !border-danger">A simple danger list
    group
    item</li>
<li class="ti-list-group-item !bg-warning !text-white !border-warning">A simple warning list
    group
    item</li>
<li class="ti-list-group-item !bg-info !text-white !border-info">A simple info list group
    item
</li>
<li class="ti-list-group-item !bg-light !border-light">A simple light list group
    item
</li>
<li class="ti-list-group-item !bg-black dark:!bg-white dark:!text-black !text-white !border-black">A simple dark list group
    item
</li>
</ul>`
export let listTS10 = 
` <ul class="list-none">
<li class="ti-list-group-item ti-list-group-item-action active">
    <a href="javascript:void(0);" 
    aria-current="true">
    <div class="sm:flex w-full justify-between">
        <h6 class="mb-1 font-semibold">Web page editors now use Lorem Ipsum?</h6>
        <small>3 days ago</small>
    </div>
    <p class="mb-1">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour.</p>
    <small>24,Nov 2022.</small>
   </a>
</li>
<li class="ti-list-group-item ti-list-group-item-action ">
    <a href="javascript:void(0);">
        <div class="flex w-full justify-between">
            <h6 class="mb-1 font-semibold">Richard McClintock, a Latin professor?</h6>
            <small class="text-[#8c9097] dark:text-white/50">4 hrs ago</small>
        </div>
        <p class="mb-1">Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature.</p>
        <small class="text-[#8c9097] dark:text-white/50">30,Nov 2022.</small>
    </a>
</li>
<li class="ti-list-group-item ti-list-group-item-action ">
    <a href="javascript:void(0);">
        <div class="sm:flex w-full justify-between">
            <h6 class="mb-1 font-semibold">It uses a dictionary of over 200 Latin words?</h6>
            <small class="text-[#8c9097] dark:text-white/50">15 hrs ago</small>
        </div>
        <p class="mb-1">Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
        <small class="text-[#8c9097] dark:text-white/50">4,Nov 2022.</small>
    </a>
</li>
<li class="ti-list-group-item ti-list-group-item-action ">
    <a href="javascript:void(0);">
        <div class="sm:flex w-full justify-between">
            <h6 class="mb-1 font-semibold">The standard Lorem Ipsum used since the 1500s?</h6>
            <small class="text-[#8c9097] dark:text-white/50">45 mins ago</small>
        </div>
        <p class="mb-1">All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet.</p>
        <small class="text-[#8c9097] dark:text-white/50">28,Oct 2022.</small>
    </a>
</li>
</ul>`
export let listTS11 = 
` <ol class="ti-list-group !list-decimal">
<li class="ti-list-group-item flex justify-between items-start">
    <div class="ms-2 me-auto text-[#8c9097] dark:text-white/50">
        <div class="font-semibold text-[.875rem] !text-defaulttextcolor">What Happened?</div>
        Many experts have recently suggested may exist.
    </div>
</li>
<li class="ti-list-group-item flex justify-between items-start">
    <div class="ms-2 me-auto text-[#8c9097] dark:text-white/50">
        <div class="font-semibold text-[.875rem] !text-defaulttextcolor">It Was Amazing!</div>
        His idea involved taking red.
    </div>
</li>
<li class="ti-list-group-item flex justify-between items-start">
    <div class="ms-2 me-auto text-[#8c9097] dark:text-white/50">
        <div class="font-semibold text-[.875rem] !text-defaulttextcolor">News Is A Great Weapon.</div>
        News can influence in many ways.
    </div>
</li>
<li class="ti-list-group-item flex justify-between items-start">
    <div class="ms-2 me-auto text-[#8c9097] dark:text-white/50">
        <div class="font-semibold text-[.875rem] !text-defaulttextcolor">majority have suffered.</div>
        If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything.
    </div>
</li>
</ol>`
export let listTS12 = 
`   <ol class="ti-list-group ti-list-group-numbered">
<li class="ti-list-group-item">Simply dummy text of the printing.</li>
<li class="ti-list-group-item">There are many variations of passages.</li>
<li class="ti-list-group-item">All the Lorem Ipsum generators.</li>
<li class="ti-list-group-item">Written in 45 BC. This book is a treatise on the theory.</li>
<li class="ti-list-group-item">Randomised words which don't look.</li>
<li class="ti-list-group-item">Always free from repetition, injected humour.</li>
</ol>`
export let listTS13 = 
`   <ul class="ti-list-group">
<li class="ti-list-group-item">
    <input class="form-check-input me-1 font-semibold" type="checkbox" value=""
        aria-label="..." checked>
        Accurate information at any given point.
</li>
<li class="ti-list-group-item">
    <input class="form-check-input me-1 font-semibold" type="checkbox" value=""
        aria-label="...">
        Hearing the information and responding.
</li>
<li class="ti-list-group-item">
    <input class="form-check-input me-1 font-semibold" type="checkbox" value=""
        aria-label="..." checked>
        Setting up and customizing your own sales.
</li>
<li class="ti-list-group-item">
    <input class="form-check-input me-1 font-semibold" type="checkbox" value=""
        aria-label="..." checked>
        New Admin Launched.
</li>
<li class="ti-list-group-item">
    <input class="form-check-input me-1 font-semibold" type="checkbox" value=""
        aria-label="...">
        To maximize profits and improve productivity.
</li>
<li class="ti-list-group-item">
    <input class="form-check-input me-1 font-semibold" type="checkbox" value=""
        aria-label="...">
        To have a complete 360° overview of sales information, having.
</li>
</ul>`
export let listTS14 = 
`   <ul class="ti-list-group list-none">
<li class="ti-list-group-item">
    <input class="form-check-input me-1" type="radio" value=""
        name="list-radio" checked>
        Accurate information at any given point.
</li>
<li class="ti-list-group-item">
    <input class="form-check-input me-1" type="radio" value=""
        name="list-radio" checked>
        Hearing the information and responding.
</li>
<li class="ti-list-group-item">
    <input class="form-check-input me-1" type="radio" value=""
        name="list-radio" checked>
        Setting up and customizing your own sales.
</li>
<li class="ti-list-group-item">
    <input class="form-check-input me-1" type="radio" value=""
        name="list-radio">
        New Admin Launched.
</li>
<li class="ti-list-group-item">
    <input class="form-check-input me-1" type="radio" value=""
        name="list-radio">
        To maximize profits and improve productivity.
</li>
<li class="ti-list-group-item">
    <input class="form-check-input me-1" type="radio" value=""
        name="list-radio">
        To have a complete 360° overview of sales information, having.
</li>
</ul>`
export let listTS15 = 
`   <ul class="ti-list-group">
<li
    class="ti-list-group-item flex justify-between items-center font-semibold">
    Grocies
    <span class="badge bg-primary text-white">Available</span>
</li>
<li
    class="ti-list-group-item flex justify-between items-center font-semibold">
    Furniture
    <span class="badge bg-secondary text-white">Buy</span>
</li>
<li
    class="ti-list-group-item flex justify-between items-center font-semibold">
    Beauty
    <span class="badge bg-danger !rounded-full text-white">32</span>
</li>
<li
    class="ti-list-group-item flex justify-between items-center font-semibold">
    Books
    <span class="badge bg-light text-default">New</span>
</li>
<li
    class="ti-list-group-item flex justify-between items-center font-semibold">
    Toys
    <span class="badge bg-info-gradient">Hot</span>
</li>
<li
    class="ti-list-group-item flex justify-between items-center font-semibold">
    Mobiles
    <span class="badge bg-warning text-white">Sold Out</span>
</li>
</ul>`
export let dropdownTS1 = 
` <div class="ti-btn-list flex align-center flex-wrap">
<div class="hs-dropdown ti-dropdown me-2">
    <button class="ti-btn ti-btn-primary-full ti-dropdown-toggle !py-2"
        type="button" id="dropdownMenuButton1"
        aria-expanded="false">
        Dropdown button<i
            class="ri-arrow-down-s-line align-middle ms-1 inline-block"></i>
    </button>
    <ul class="hs-dropdown-menu ti-dropdown-menu hidden"
        aria-labelledby="dropdownMenuButton1">
        <li><a class="ti-dropdown-item" href="javascript:void(0);">Action</a></li>
        <li><a class="ti-dropdown-item" href="javascript:void(0);">Another
                action</a></li>
        <li><a class="ti-dropdown-item" href="javascript:void(0);">Something else
                here</a></li>
    </ul>
</div>
<div class="hs-dropdown ti-dropdown">
    <a class="ti-btn ti-btn-secondary-full ti-dropdown-toggle !py-2"
        href="javascript:void(0);" id="dropdownMenuLink" aria-expanded="false">
        Dropdown link<i
            class="ri-arrow-down-s-line align-middle ms-1 inline-block"></i>
    </a>
    <ul class="hs-dropdown-menu ti-dropdown-menu hidden"
        aria-labelledby="dropdownMenuLink">
        <li><a class="ti-dropdown-item" href="javascript:void(0);">Action</a></li>
        <li><a class="ti-dropdown-item" href="javascript:void(0);">Another
                action</a></li>
        <li><a class="ti-dropdown-item" href="javascript:void(0);">Something else
                here</a></li>
    </ul>
</div>
</div>`
export let dropdownTS2 = 
`  <div class="ti-btn-list">
<div class="ti-btn-group">
    <div class="hs-dropdown ti-dropdown">
        <button class="ti-btn ti-btn-primary-full ti-dropdown-toggle" type="button"
            id="dropdownMenuButton2"
            aria-expanded="false">
            Action<i
                class="ri-arrow-down-s-line align-middle ms-1 inline-block"></i>
        </button>
        <ul class="hs-dropdown-menu ti-dropdown-menu hidden"
            aria-labelledby="dropdownMenuButton2">
            <li><a class="ti-dropdown-item" href="javascript:void(0);">Action</a>
            </li>
            <li><a class="ti-dropdown-item" href="javascript:void(0);">Another
                    action</a></li>
            <li><a class="ti-dropdown-item" href="javascript:void(0);">Something
                    else here</a></li>
        </ul>
    </div>
</div>
<div class="ti-btn-group">
    <div class="hs-dropdown ti-dropdown">
        <button class="ti-btn ti-btn-secondary-full ti-dropdown-toggle"
            type="button" id="dropdownMenuButton3"
            aria-expanded="false">
            Action<i
                class="ri-arrow-down-s-line align-middle ms-1 inline-block"></i>
        </button>
        <ul class="hs-dropdown-menu ti-dropdown-menu hidden"
            aria-labelledby="dropdownMenuButton3">
            <li><a class="ti-dropdown-item" href="javascript:void(0);">Action</a>
            </li>
            <li><a class="ti-dropdown-item" href="javascript:void(0);">Another
                    action</a></li>
            <li><a class="ti-dropdown-item" href="javascript:void(0);">Something
                    else here</a></li>
        </ul>
    </div>
</div>
<div class="ti-btn-group">
    <div class="hs-dropdown ti-dropdown">
        <button class="ti-btn ti-btn-success-full ti-dropdown-toggle" type="button"
            id="dropdownMenuButton4"
            aria-expanded="false">
            Action<i
                class="ri-arrow-down-s-line align-middle ms-1 inline-block"></i>
        </button>
        <ul class="hs-dropdown-menu ti-dropdown-menu hidden"
            aria-labelledby="dropdownMenuButton4">
            <li><a class="ti-dropdown-item" href="javascript:void(0);">Action</a>
            </li>
            <li><a class="ti-dropdown-item" href="javascript:void(0);">Another
                    action</a></li>
            <li><a class="ti-dropdown-item" href="javascript:void(0);">Something
                    else here</a></li>
        </ul>
    </div>
</div>
<div class="ti-btn-group">
    <div class="hs-dropdown ti-dropdown">
        <button class="ti-btn ti-btn-info-full ti-dropdown-toggle" type="button"
            id="dropdownMenuButton5"
            aria-expanded="false">
            Action<i
                class="ri-arrow-down-s-line align-middle ms-1 inline-block"></i>
        </button>
        <ul class="hs-dropdown-menu ti-dropdown-menu hidden"
            aria-labelledby="dropdownMenuButton5">
            <li><a class="ti-dropdown-item" href="javascript:void(0);">Action</a>
            </li>
            <li><a class="ti-dropdown-item" href="javascript:void(0);">Another
                    action</a></li>
            <li><a class="ti-dropdown-item" href="javascript:void(0);">Something
                    else here</a></li>
        </ul>
    </div>
</div>
<div class="ti-btn-group">
    <div class="hs-dropdown ti-dropdown">
        <button class="ti-btn ti-btn-warning-full ti-dropdown-toggle" type="button"
            id="dropdownMenuButton6"
            aria-expanded="false">
            Action<i
                class="ri-arrow-down-s-line align-middle ms-1 inline-block"></i>
        </button>
        <ul class="hs-dropdown-menu ti-dropdown-menu hidden"
            aria-labelledby="dropdownMenuButton6">
            <li><a class="ti-dropdown-item" href="javascript:void(0);">Action</a>
            </li>
            <li><a class="ti-dropdown-item" href="javascript:void(0);">Another
                    action</a></li>
            <li><a class="ti-dropdown-item" href="javascript:void(0);">Something
                    else here</a></li>
        </ul>
    </div>
</div>
<div class="ti-btn-group">
    <div class="hs-dropdown ti-dropdown">
        <button class="ti-btn ti-btn-danger-full ti-dropdown-toggle" type="button"
            id="dropdownMenuButton7"
            aria-expanded="false">
            Action<i
                class="ri-arrow-down-s-line align-middle ms-1 inline-block"></i>
        </button>
        <ul class="hs-dropdown-menu ti-dropdown-menu hidden"
            aria-labelledby="dropdownMenuButton7">
            <li><a class="ti-dropdown-item" href="javascript:void(0);">Action</a>
            </li>
            <li><a class="ti-dropdown-item" href="javascript:void(0);">Another
                    action</a></li>
            <li><a class="ti-dropdown-item" href="javascript:void(0);">Something
                    else here</a></li>
        </ul>
    </div>
</div>
</div>`
export let dropdownTS3 = 
`      <div class="ti-btn-list">
<div class="ti-btn-group">
    <div class="hs-dropdown ti-dropdown">
        <button class="ti-btn ti-btn-primary-full ti-dropdown-toggle !rounded-full"
            type="button" id="dropdownMenuButton8"
            aria-expanded="false">
            Action<i
                class="ri-arrow-down-s-line align-middle ms-1 inline-block"></i>
        </button>
        <ul class="hs-dropdown-menu ti-dropdown-menu hidden"
            aria-labelledby="dropdownMenuButton8">
            <li><a class="ti-dropdown-item" href="javascript:void(0);">Action</a>
            </li>
            <li><a class="ti-dropdown-item" href="javascript:void(0);">Another
                    action</a></li>
            <li><a class="ti-dropdown-item" href="javascript:void(0);">Something
                    else here</a></li>
        </ul>
    </div>
</div>
<div class="ti-btn-group">
    <div class="hs-dropdown ti-dropdown">
        <button
            class="ti-btn ti-btn-secondary-full ti-dropdown-toggle !rounded-full"
            type="button" id="dropdownMenuButton9"
            aria-expanded="false">
            Action<i
                class="ri-arrow-down-s-line align-middle ms-1 inline-block"></i>
        </button>
        <ul class="hs-dropdown-menu ti-dropdown-menu hidden"
            aria-labelledby="dropdownMenuButton9">
            <li><a class="ti-dropdown-item" href="javascript:void(0);">Action</a>
            </li>
            <li><a class="ti-dropdown-item" href="javascript:void(0);">Another
                    action</a></li>
            <li><a class="ti-dropdown-item" href="javascript:void(0);">Something
                    else here</a></li>
        </ul>
    </div>
</div>
<div class="ti-btn-group">
    <div class="hs-dropdown ti-dropdown">
        <button class="ti-btn ti-btn-success-full ti-dropdown-toggle !rounded-full"
            type="button" id="dropdownMenuButton11"
            aria-expanded="false">
            Action<i
                class="ri-arrow-down-s-line align-middle ms-1 inline-block"></i>
        </button>
        <ul class="hs-dropdown-menu ti-dropdown-menu hidden"
            aria-labelledby="dropdownMenuButton11">
            <li><a class="ti-dropdown-item" href="javascript:void(0);">Action</a>
            </li>
            <li><a class="ti-dropdown-item" href="javascript:void(0);">Another
                    action</a></li>
            <li><a class="ti-dropdown-item" href="javascript:void(0);">Something
                    else here</a></li>
        </ul>
    </div>
</div>
<div class="ti-btn-group">
    <div class="hs-dropdown ti-dropdown">
        <button class="ti-btn ti-btn-info-full ti-dropdown-toggle !rounded-full"
            type="button" id="dropdownMenuButton10"
            aria-expanded="false">
            Action<i
                class="ri-arrow-down-s-line align-middle ms-1 inline-block"></i>
        </button>
        <ul class="hs-dropdown-menu ti-dropdown-menu hidden"
            aria-labelledby="dropdownMenuButton10">
            <li><a class="ti-dropdown-item" href="javascript:void(0);">Action</a>
            </li>
            <li><a class="ti-dropdown-item" href="javascript:void(0);">Another
                    action</a></li>
            <li><a class="ti-dropdown-item" href="javascript:void(0);">Something
                    else here</a></li>
        </ul>
    </div>
</div>
<div class="ti-btn-group">
    <div class="hs-dropdown ti-dropdown">
        <button class="ti-btn ti-btn-warning-full ti-dropdown-toggle !rounded-full"
            type="button" id="dropdownMenuButton12"
            aria-expanded="false">
            Action<i
                class="ri-arrow-down-s-line align-middle ms-1 inline-block"></i>
        </button>
        <ul class="hs-dropdown-menu ti-dropdown-menu hidden"
            aria-labelledby="dropdownMenuButton12">
            <li><a class="ti-dropdown-item" href="javascript:void(0);">Action</a>
            </li>
            <li><a class="ti-dropdown-item" href="javascript:void(0);">Another
                    action</a></li>
            <li><a class="ti-dropdown-item" href="javascript:void(0);">Something
                    else here</a></li>
        </ul>
    </div>
</div>
<div class="ti-btn-group">
    <div class="hs-dropdown ti-dropdown">
        <button class="ti-btn ti-btn-danger-full ti-dropdown-toggle !rounded-full"
            type="button" id="dropdownMenuButton13"
            aria-expanded="false">
            Action<i
                class="ri-arrow-down-s-line align-middle ms-1 inline-block"></i>
        </button>
        <ul class="hs-dropdown-menu ti-dropdown-menu hidden"
            aria-labelledby="dropdownMenuButton13">
            <li><a class="ti-dropdown-item" href="javascript:void(0);">Action</a>
            </li>
            <li><a class="ti-dropdown-item" href="javascript:void(0);">Another
                    action</a></li>
            <li><a class="ti-dropdown-item" href="javascript:void(0);">Something
                    else here</a></li>
        </ul>
    </div>
</div>
</div>`
export let dropdownTS4 = 
`      <div class="ti-btn-list">
<div class="ti-btn-group">
    <div class="hs-dropdown ti-dropdown">
        <button class="ti-btn ti-btn-outline-primary ti-dropdown-toggle"
            type="button" id="dropdownMenuButton14"
            aria-expanded="false">
            Action<i class="ri-arrow-down-s-line align-middle inline-block"></i>
        </button>
        <ul class="hs-dropdown-menu ti-dropdown-menu hidden"
            aria-labelledby="dropdownMenuButton14">
            <li><a class="ti-dropdown-item" href="javascript:void(0);">Action</a>
            </li>
            <li><a class="ti-dropdown-item" href="javascript:void(0);">Another
                    action</a></li>
            <li><a class="ti-dropdown-item" href="javascript:void(0);">Something
                    else here</a></li>
        </ul>
    </div>
</div>
<div class="ti-btn-group">
    <div class="hs-dropdown ti-dropdown">
        <button class="ti-btn ti-btn-outline-secondary ti-dropdown-toggle"
            type="button" id="dropdownMenuButton15"
            aria-expanded="false">
            Action<i class="ri-arrow-down-s-line align-middle inline-block"></i>
        </button>
        <ul class="hs-dropdown-menu ti-dropdown-menu hidden"
            aria-labelledby="dropdownMenuButton15">
            <li><a class="ti-dropdown-item" href="javascript:void(0);">Action</a>
            </li>
            <li><a class="ti-dropdown-item" href="javascript:void(0);">Another
                    action</a></li>
            <li><a class="ti-dropdown-item" href="javascript:void(0);">Something
                    else here</a></li>
        </ul>
    </div>
</div>
<div class="ti-btn-group">
    <div class="hs-dropdown ti-dropdown">
        <button class="ti-btn ti-btn-outline-success ti-dropdown-toggle"
            type="button" id="dropdownMenuButton16"
            aria-expanded="false">
            Action<i class="ri-arrow-down-s-line align-middle inline-block"></i>
        </button>
        <ul class="hs-dropdown-menu ti-dropdown-menu hidden"
            aria-labelledby="dropdownMenuButton16">
            <li><a class="ti-dropdown-item" href="javascript:void(0);">Action</a>
            </li>
            <li><a class="ti-dropdown-item" href="javascript:void(0);">Another
                    action</a></li>
            <li><a class="ti-dropdown-item" href="javascript:void(0);">Something
                    else here</a></li>
        </ul>
    </div>
</div>
<div class="ti-btn-group">
    <div class="hs-dropdown ti-dropdown">
        <button class="ti-btn ti-btn-outline-info ti-dropdown-toggle" type="button"
            id="dropdownMenuButton17"
            aria-expanded="false">
            Action<i class="ri-arrow-down-s-line align-middle inline-block"></i>
        </button>
        <ul class="hs-dropdown-menu ti-dropdown-menu hidden"
            aria-labelledby="dropdownMenuButton17">
            <li><a class="ti-dropdown-item" href="javascript:void(0);">Action</a>
            </li>
            <li><a class="ti-dropdown-item" href="javascript:void(0);">Another
                    action</a></li>
            <li><a class="ti-dropdown-item" href="javascript:void(0);">Something
                    else here</a></li>
        </ul>
    </div>
</div>
<div class="ti-btn-group">
    <div class="hs-dropdown ti-dropdown">
        <button class="ti-btn ti-btn-outline-warning ti-dropdown-toggle"
            type="button" id="dropdownMenuButton18"
            aria-expanded="false">
            Action<i class="ri-arrow-down-s-line align-middle inline-block"></i>
        </button>
        <ul class="hs-dropdown-menu ti-dropdown-menu hidden"
            aria-labelledby="dropdownMenuButton18">
            <li><a class="ti-dropdown-item" href="javascript:void(0);">Action</a>
            </li>
            <li><a class="ti-dropdown-item" href="javascript:void(0);">Another
                    action</a></li>
            <li><a class="ti-dropdown-item" href="javascript:void(0);">Something
                    else here</a></li>
        </ul>
    </div>
</div>
<div class="ti-btn-group">
    <div class="hs-dropdown ti-dropdown">
        <button class="ti-btn ti-btn-outline-danger ti-dropdown-toggle"
            type="button" id="dropdownMenuButton19"
            aria-expanded="false">
            Action<i class="ri-arrow-down-s-line align-middle inline-block"></i>
        </button>
        <ul class="hs-dropdown-menu ti-dropdown-menu hidden"
            aria-labelledby="dropdownMenuButton19">
            <li><a class="ti-dropdown-item" href="javascript:void(0);">Action</a>
            </li>
            <li><a class="ti-dropdown-item" href="javascript:void(0);">Another
                    action</a></li>
            <li><a class="ti-dropdown-item" href="javascript:void(0);">Something
                    else here</a></li>
        </ul>
    </div>
</div>
</div>`
export let dropdownTS5 = 
`   <div class="ti-btn-list">
<div class="ti-btn-group">
    <div class="hs-dropdown ti-dropdown">
        <button
            class="ti-btn ti-btn-outline-primary ti-dropdown-toggle !rounded-full"
            type="button" id="dropdownMenuButton20"
            aria-expanded="false">
            Action<i class="ri-arrow-down-s-line align-middle inline-block"></i>
        </button>
        <ul class="hs-dropdown-menu ti-dropdown-menu hidden"
            aria-labelledby="dropdownMenuButton20">
            <li><a class="ti-dropdown-item" href="javascript:void(0);">Action</a>
            </li>
            <li><a class="ti-dropdown-item" href="javascript:void(0);">Another
                    action</a></li>
            <li><a class="ti-dropdown-item" href="javascript:void(0);">Something
                    else here</a></li>
        </ul>
    </div>
</div>
<div class="ti-btn-group">
    <div class="hs-dropdown ti-dropdown">
        <button
            class="ti-btn ti-btn-outline-secondary ti-dropdown-toggle !rounded-full"
            type="button" id="dropdownMenuButton21"
            aria-expanded="false">
            Action<i class="ri-arrow-down-s-line align-middle inline-block"></i>
        </button>
        <ul class="hs-dropdown-menu ti-dropdown-menu hidden"
            aria-labelledby="dropdownMenuButton21">
            <li><a class="ti-dropdown-item" href="javascript:void(0);">Action</a>
            </li>
            <li><a class="ti-dropdown-item" href="javascript:void(0);">Another
                    action</a></li>
            <li><a class="ti-dropdown-item" href="javascript:void(0);">Something
                    else here</a></li>
        </ul>
    </div>
</div>
<div class="ti-btn-group">
    <div class="hs-dropdown ti-dropdown">
        <button
            class="ti-btn ti-btn-outline-success ti-dropdown-toggle !rounded-full"
            type="button" id="dropdownMenuButto22"
            aria-expanded="false">
            Action<i class="ri-arrow-down-s-line align-middle inline-block"></i>
        </button>
        <ul class="hs-dropdown-menu ti-dropdown-menu hidden"
            aria-labelledby="dropdownMenuButto22">
            <li><a class="ti-dropdown-item" href="javascript:void(0);">Action</a>
            </li>
            <li><a class="ti-dropdown-item" href="javascript:void(0);">Another
                    action</a></li>
            <li><a class="ti-dropdown-item" href="javascript:void(0);">Something
                    else here</a></li>
        </ul>
    </div>
</div>
<div class="ti-btn-group">
    <div class="hs-dropdown ti-dropdown">
        <button class="ti-btn ti-btn-outline-info ti-dropdown-toggle !rounded-full"
            type="button" id="dropdownMenuButton23"
            aria-expanded="false">
            Action<i class="ri-arrow-down-s-line align-middle inline-block"></i>
        </button>
        <ul class="hs-dropdown-menu ti-dropdown-menu hidden"
            aria-labelledby="dropdownMenuButton23">
            <li><a class="ti-dropdown-item" href="javascript:void(0);">Action</a>
            </li>
            <li><a class="ti-dropdown-item" href="javascript:void(0);">Another
                    action</a></li>
            <li><a class="ti-dropdown-item" href="javascript:void(0);">Something
                    else here</a></li>
        </ul>
    </div>
</div>
<div class="ti-btn-group">
    <div class="hs-dropdown ti-dropdown">
        <button
            class="ti-btn ti-btn-outline-warning ti-dropdown-toggle !rounded-full"
            type="button" id="dropdownMenuButton24"
            aria-expanded="false">
            Action<i class="ri-arrow-down-s-line align-middle inline-block"></i>
        </button>
        <ul class="hs-dropdown-menu ti-dropdown-menu hidden"
            aria-labelledby="dropdownMenuButton24">
            <li><a class="ti-dropdown-item" href="javascript:void(0);">Action</a>
            </li>
            <li><a class="ti-dropdown-item" href="javascript:void(0);">Another
                    action</a></li>
            <li><a class="ti-dropdown-item" href="javascript:void(0);">Something
                    else here</a></li>
        </ul>
    </div>
</div>
<div class="ti-btn-group">
    <div class="hs-dropdown ti-dropdown">
        <button
            class="ti-btn ti-btn-outline-danger ti-dropdown-toggle !rounded-full"
            type="button" id="dropdownMenuButton25"
            aria-expanded="false">
            Action<i class="ri-arrow-down-s-line align-middle inline-block"></i>
        </button>
        <ul class="hs-dropdown-menu ti-dropdown-menu hidden"
            aria-labelledby="dropdownMenuButton25">
            <li><a class="ti-dropdown-item" href="javascript:void(0);">Action</a>
            </li>
            <li><a class="ti-dropdown-item" href="javascript:void(0);">Another
                    action</a></li>
            <li><a class="ti-dropdown-item" href="javascript:void(0);">Something
                    else here</a></li>
        </ul>
    </div>
</div>
</div>`
export let dropdownTS6 = 
`      <div class="ti-btn-list">
<div class="ti-btn-group !m-0">
    <div class="hs-dropdown ti-dropdown">
        <button
            class="ti-btn ti-btn-primary-full !me-0 !rounded-e-none ti-dropdown-toggle"
            type="button" id="dropdownMenuButton26"
            aria-expanded="false">
            Action
        </button>
        <button type="button" aria-label="button"
            class="ti-btn ti-btn-primary-full opacity-[0.85] !rounded-s-none"><i
                class="ri-arrow-down-s-line align-middle inline-block"></i></button>

        <ul class="hs-dropdown-menu ti-dropdown-menu hidden"
            aria-labelledby="dropdownMenuButton26">
            <li><a class="ti-dropdown-item" href="javascript:void(0);">Action</a>
            </li>
            <li><a class="ti-dropdown-item" href="javascript:void(0);">Another
                    action</a></li>
            <li><a class="ti-dropdown-item" href="javascript:void(0);">Something
                    else here</a></li>
        </ul>
    </div>
</div>
<div class="ti-btn-group !m-0">
    <div class="hs-dropdown ti-dropdown">
        <button
            class="ti-btn ti-btn-secondary-full !me-0 !rounded-e-none ti-dropdown-toggle"
            type="button" id="dropdownMenuButton27"
            aria-expanded="false">
            Action
        </button>
        <button type="button" aria-label="button"
            class="ti-btn ti-btn-secondary-full opacity-[0.85] !rounded-s-none"><i
                class="ri-arrow-down-s-line align-middle inline-block"></i></button>

        <ul class="hs-dropdown-menu ti-dropdown-menu hidden"
            aria-labelledby="dropdownMenuButton27">
            <li><a class="ti-dropdown-item" href="javascript:void(0);">Action</a>
            </li>
            <li><a class="ti-dropdown-item" href="javascript:void(0);">Another
                    action</a></li>
            <li><a class="ti-dropdown-item" href="javascript:void(0);">Something
                    else here</a></li>
        </ul>
    </div>
</div>
<div class="ti-btn-group !m-0">
    <div class="hs-dropdown ti-dropdown">
        <button
            class="ti-btn ti-btn-success-full !me-0 !rounded-e-none ti-dropdown-toggle"
            type="button" id="dropdownMenuButton28"
            aria-expanded="false">
            Action
        </button>
        <button type="button" aria-label="button"
            class="ti-btn ti-btn-success-full opacity-[0.85] !rounded-s-none"><i
                class="ri-arrow-down-s-line align-middle inline-block"></i></button>

        <ul class="hs-dropdown-menu ti-dropdown-menu hidden"
            aria-labelledby="dropdownMenuButton28">
            <li><a class="ti-dropdown-item" href="javascript:void(0);">Action</a>
            </li>
            <li><a class="ti-dropdown-item" href="javascript:void(0);">Another
                    action</a></li>
            <li><a class="ti-dropdown-item" href="javascript:void(0);">Something
                    else here</a></li>
        </ul>
    </div>
</div>
<div class="ti-btn-group !m-0">
    <div class="hs-dropdown ti-dropdown">
        <button
            class="ti-btn ti-btn-info-full !me-0 !rounded-e-none ti-dropdown-toggle"
            type="button" id="dropdownMenuButton29"
            aria-expanded="false">
            Action
        </button>
        <button type="button" aria-label="button"
            class="ti-btn ti-btn-info-full opacity-[0.85] !rounded-s-none"><i
                class="ri-arrow-down-s-line align-middle inline-block"></i></button>

        <ul class="hs-dropdown-menu ti-dropdown-menu hidden"
            aria-labelledby="dropdownMenuButton29">
            <li><a class="ti-dropdown-item" href="javascript:void(0);">Action</a>
            </li>
            <li><a class="ti-dropdown-item" href="javascript:void(0);">Another
                    action</a></li>
            <li><a class="ti-dropdown-item" href="javascript:void(0);">Something
                    else here</a></li>
        </ul>
    </div>
</div>
<div class="ti-btn-group !m-0">
    <div class="hs-dropdown ti-dropdown">
        <button
            class="ti-btn ti-btn-warning-full !me-0 !rounded-e-none ti-dropdown-toggle"
            type="button" id="dropdownMenuButton30"
            aria-expanded="false">
            Action
        </button>
        <button type="button" aria-label="button"
            class="ti-btn ti-btn-warning-full opacity-[0.85] !rounded-s-none "><i
                class="ri-arrow-down-s-line align-middle inline-block"></i></button>

        <ul class="hs-dropdown-menu ti-dropdown-menu hidden"
            aria-labelledby="dropdownMenuButton30">
            <li><a class="ti-dropdown-item" href="javascript:void(0);">Action</a>
            </li>
            <li><a class="ti-dropdown-item" href="javascript:void(0);">Another
                    action</a></li>
            <li><a class="ti-dropdown-item" href="javascript:void(0);">Something
                    else here</a></li>
        </ul>
    </div>
</div>
<div class="ti-btn-group !m-0">
    <div class="hs-dropdown ti-dropdown">
        <button
            class="ti-btn ti-btn-danger-full !me-0 !rounded-e-none ti-dropdown-toggle"
            type="button" id="dropdownMenuButton31"
            aria-expanded="false">
            Action
        </button>
        <button type="button" aria-label="button"
            class="ti-btn ti-btn-danger-full opacity-[0.85] !rounded-s-none"><i
                class="ri-arrow-down-s-line align-middle inline-block"></i></button>

        <ul class="hs-dropdown-menu ti-dropdown-menu hidden"
            aria-labelledby="dropdownMenuButton31">
            <li><a class="ti-dropdown-item" href="javascript:void(0);">Action</a>
            </li>
            <li><a class="ti-dropdown-item" href="javascript:void(0);">Another
                    action</a></li>
            <li><a class="ti-dropdown-item" href="javascript:void(0);">Something
                    else here</a></li>
        </ul>
    </div>
</div>
</div>`
export let dropdownTS7 = 
`  <div class="ti-btn-group my-1 me-2 ti-dropdown hs-dropdown">
<button class="ti-btn-primary-full ti-btn-lg ti-dropdown-toggle" type="button"
    aria-expanded="false">
    Large button<i class="ri-arrow-down-s-line align-middle inline-block"></i>
</button>
<ul class="hs-dropdown-menu ti-dropdown-menu hidden">
    <li><a class="ti-dropdown-item" href="javascript:void(0);">Action</a></li>
    <li><a class="ti-dropdown-item" href="javascript:void(0);">Another action</a>
    </li>
    <li><a class="ti-dropdown-item" href="javascript:void(0);">Something else
            here</a></li>
    <li>
        <hr class="dropdown-divider">
    </li>
    <li><a class="ti-dropdown-item" href="javascript:void(0);">Separated link</a>
    </li>
</ul>
</div>
<div class="ti-btn-group my-1 me-2">
<div class="hs-dropdown ti-dropdown">
    <button
        class="ti-btn-lg ti-btn-light !me-0 !rounded-e-none !border-0 ti-dropdown-toggle"
        type="button" id="dropdownMenuButton32"
        aria-expanded="false">
        Large split button
    </button>
    <button type="button" aria-label="button"
        class="ti-btn ti-btn-light opacity-[0.85] !rounded-s-none !mb-0"><i
            class="ri-arrow-down-s-line align-middle inline-block"></i></button>

    <ul class="hs-dropdown-menu ti-dropdown-menu hidden"
        aria-labelledby="dropdownMenuButton32">
        <li><a class="ti-dropdown-item" href="javascript:void(0);">Action</a></li>
        <li><a class="ti-dropdown-item" href="javascript:void(0);">Another
                action</a></li>
        <li><a class="ti-dropdown-item" href="javascript:void(0);">Something else
                here</a></li>
    </ul>
</div>
</div>
<div class="ti-btn-group my-1 me-2">
<div class="ti-btn-group my-1 me-2 ti-dropdown hs-dropdown">
    <button
        class="ti-btn ti-btn-primary-full !py-1 !px-4 !text-[0.75rem] ti-dropdown-toggle"
        type="button" aria-expanded="false">
        Small button<i class="ri-arrow-down-s-line align-middle inline-block"></i>
    </button>
    <ul class="hs-dropdown-menu ti-dropdown-menu hidden">
        <li><a class="ti-dropdown-item" href="javascript:void(0);">Action</a></li>
        <li><a class="ti-dropdown-item" href="javascript:void(0);">Another
                action</a></li>
        <li><a class="ti-dropdown-item" href="javascript:void(0);">Something else
                here</a></li>
        <li>
            <hr class="dropdown-divider">
        </li>
        <li><a class="ti-dropdown-item" href="javascript:void(0);">Separated
                link</a></li>
    </ul>
</div>
</div>
<div class="ti-btn-group my-1 me-2">
<div class="hs-dropdown ti-dropdown">
    <button
        class="ti-btn !py-1 !px-4 !text-[0.75rem]  ti-btn-light !me-0 !rounded-e-none ti-dropdown-toggle"
        type="button" id="dropdownMenuButton33"
        aria-expanded="false">
        Small split button
    </button>
    <button type="button" aria-label="button"
        class="ti-btn !py-1 !px-4 !text-[0.75rem]  ti-btn-light opacity-[0.85] !rounded-s-none"><i
            class="ri-arrow-down-s-line align-middle inline-block"></i></button>

    <ul class="hs-dropdown-menu ti-dropdown-menu hidden"
        aria-labelledby="dropdownMenuButton33">
        <li><a class="ti-dropdown-item" href="javascript:void(0);">Action</a></li>
        <li><a class="ti-dropdown-item" href="javascript:void(0);">Another
                action</a></li>
        <li><a class="ti-dropdown-item" href="javascript:void(0);">Something else
                here</a></li>
    </ul>
</div>
</div>`
export let dropdownTS8 = 
`    <div class="hs-dropdown ti-dropdown [--placement:top-left] m-1">
<button id="hs-dropup" type="button"
    class="hs-dropdown-toggle ti-dropdown-toggle ti-btn ti-btn-primary-full !py-2">
    Dropup
    <svg class="hs-dropdown-open:rotate-180 ti-dropdown-caret !text-white"
        width="16" height="16" viewBox="0 0 16 16" fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
            d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" />
    </svg>
</button>

<div class="hs-dropdown-menu  mt-0 transition-none ti-dropdown-menu hidden"
    aria-labelledby="hs-dropup">
    <a class="ti-dropdown-item" href="javascript:void(0);">
        Action
    </a>
    <a class="ti-dropdown-item" href="javascript:void(0);">
        Another action
    </a>
    <a class="ti-dropdown-item" href="javascript:void(0);">
        Something else here
    </a>
</div>
</div>
<div class="ti-dropdown m-1">
<button type="button" class="relative ti-dropdown-toggle  ti-btn ti-btn-secondary-full !py-1 !rounded-e-none !me-0">
    Split dropup
</button>
<div class="hs-dropdown ti-dropdown [--placement:top-left]">
    <button id="hs-split-dropup" type="button"
        class="hs-dropdown-toggle relative ti-btn ti-btn-secondary-full !opacity-[0.85]  !rounded-s-none ti-dropdown-toggle">
        <span class="sr-only">Toggle Dropdown</span>
        <svg class="hs-dropdown-open:rotate-180 ti-dropdown-caret !text-white"
            width="16" height="16" viewBox="0 0 16 16" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" />
        </svg>
    </button>

    <div class="hs-dropdown-menu  transition-none mt-0 ti-dropdown-menu hidden"
        aria-labelledby="hs-split-dropup">
        <a class="ti-dropdown-item" href="javascript:void(0);">
            Action
        </a>
        <a class="ti-dropdown-item" href="javascript:void(0);">
            Another action
        </a>
        <a class="ti-dropdown-item" href="javascript:void(0);">
            Something else here
        </a>
    </div>
</div>
</div>`
export let dropdownTS9 = 
`  <div class="hs-dropdown ti-dropdown [--placement:right-top] m-1">
<button id="hs-dropright" type="button"
    class="hs-dropdown-toggle ti-dropdown-toggle ti-btn ti-btn-primary-full !py-2">
    Dropright
    <svg class="w-auto h-2.5 ti-dropdown-caret !text-white" width="16" height="16"
        viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M5 1L10.6869 7.16086C10.8637 7.35239 10.8637 7.64761 10.6869 7.83914L5 14"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" />
    </svg>
</button>

<div class="hs-dropdown-menu  ti-dropdown-menu transition-none hidden"
    aria-labelledby="hs-dropright">
    <a class="ti-dropdown-item" href="javascript:void(0);">
        Action
    </a>
    <a class="ti-dropdown-item" href="javascript:void(0);">
        Another action
    </a>
    <a class="ti-dropdown-item" href="javascript:void(0);">
        Something else here
    </a>
    <a aria-label="anchor">
        <hr class="dropdown-divider">
    </a>
    <a class="ti-dropdown-item" href="javascript:void(0);">
        Separated link
    </a>
</div>
</div>
<div class="hs-dropdown ti-dropdown [--placement:right-top] m-1">
<button type="button"
    class="hs-dropdown-toggle relative ti-btn ti-btn-secondary-full  !py-2 !rounded-e-none ti-dropdown-toggle !me-0">
    Split dropright
</button>
<div class="hs-dropdown ti-dropdown [--placement:right-top]">
    <button id="hs-split-dropright" type="button"
        class="hs-dropdown-toggle relative  ti-dropdown-toggle !opacity-[0.85] rounded-none  ti-btn ti-btn-secondary-full !rounded-s-none">
        <span class="sr-only">Toggle Dropdown</span>
        <svg class="w-auto h-2.5 ti-dropdown-caret !text-white" width="16"
            height="16" viewBox="0 0 16 16" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M5 1L10.6869 7.16086C10.8637 7.35239 10.8637 7.64761 10.6869 7.83914L5 14"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" />
        </svg>
    </button>

    <div class="hs-dropdown-menu ti-dropdown-menu transition-none hidden"
        aria-labelledby="hs-split-dropright">
        <a class="ti-dropdown-item" href="javascript:void(0);">
            Action
        </a>
        <a class="ti-dropdown-item" href="javascript:void(0);">
            Another action
        </a>
        <a class="ti-dropdown-item" href="javascript:void(0);">
            Something else here
        </a>
        <a aria-label="anchor">
            <hr class="dropdown-divider">
        </a>
        <a class="ti-dropdown-item" href="javascript:void(0);">
            Separated link
        </a>
    </div>
</div>
</div>`
export let dropdownTS10 = 
`   <div class="hs-dropdown ti-dropdown [--placement:left-top] m-1">
<button id="hs-dropright3" type="button"
    class="hs-dropdown-toggle ti-dropdown-toggle ti-btn ti-btn-primary-full !py-2">
    <svg class="w-auto h-2.5 text-white" width="16" height="16" viewBox="0 0 16 16"
        fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M11 1L5.31305 7.16086C5.13625 7.35239 5.13625 7.64761 5.31305 7.83914L11 14"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" />
    </svg>
    Dropleft
</button>

<div class="hs-dropdown-menu  ti-dropdown-menu transition-none hidden"
    aria-labelledby="hs-dropright">
    <a class="ti-dropdown-item" href="javascript:void(0);">
        Action
    </a>
    <a class="ti-dropdown-item" href="javascript:void(0);">
        Another action
    </a>
    <a class="ti-dropdown-item" href="javascript:void(0);">
        Something else here
    </a>
    <a aria-label="anchor">
        <hr class="dropdown-divider">
    </a>
    <a class="ti-dropdown-item" href="javascript:void(0);">
        Separated link
    </a>
</div>
</div>
<div class="hs-dropdown ti-dropdown [--placement:left-top] m-1">
<div class="hs-dropdown ti-dropdown [--placement:left-top]">
    <button id="hs-split-dropright1" type="button"
        class="hs-dropdown-toggle relative  ti-dropdown-toggle !opacity-[0.85] rounded-none  ti-btn ti-btn-secondary-full !rounded-e-none">
        <span class="sr-only">Toggle Dropdown</span>
        <svg class="w-auto h-2.5 text-white" width="16" height="16"
            viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M11 1L5.31305 7.16086C5.13625 7.35239 5.13625 7.64761 5.31305 7.83914L11 14"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" />
        </svg>
    </button>

    <div class="hs-dropdown-menu ti-dropdown-menu transition-none hidden"
        aria-labelledby="hs-split-dropright">
        <a class="ti-dropdown-item" href="javascript:void(0);">
            Action
        </a>
        <a class="ti-dropdown-item" href="javascript:void(0);">
            Another action
        </a>
        <a class="ti-dropdown-item" href="javascript:void(0);">
            Something else here
        </a>
        <a aria-label="anchor">
            <hr class="dropdown-divider">
        </a>
        <a class="ti-dropdown-item" href="javascript:void(0);">
            Separated link
        </a>
    </div>
</div>
<button type="button"
    class="hs-dropdown-toggle relative ti-btn ti-btn-secondary-full  !py-2 !rounded-s-none ti-dropdown-toggle !me-0">
    Split dropleft
</button>
</div>`
export let dropdownTS11 = 
`     <div class="hs-dropdown ti-dropdown">
<button type="button" class="ti-btn ti-btn-primary-full ti-dropdown-toggle !py-2"
    aria-expanded="false">
    Dropstart<i class="ri-arrow-down-s-line align-middle inline-block"></i>
</button>
<ul class="hs-dropdown-menu ti-dropdown-menu hidden">
    <li><a class="ti-dropdown-item" href="javascript:void(0);">Regular link</a></li>
    <li><a class="ti-dropdown-item active" href="javascript:void(0);"
            aria-current="true">Active
            link</a>
    </li>
    <li><a class="ti-dropdown-item" href="javascript:void(0);">Another link</a></li>
</ul>
</div>`
export let dropdownTS12 = 
`  <div class="hs-dropdown ti-dropdown">
<button type="button" class="ti-btn-primary-full ti-dropdown-toggle !py-2"
    aria-expanded="false">
    Dropstart<i class="ri-arrow-down-s-line align-middle inline-block"></i>
</button>
<ul class="hs-dropdown-menu ti-dropdown-menu hidden">
    <li><a class="ti-dropdown-item" href="javascript:void(0);">Regular link</a></li>
    <li><a class="ti-dropdown-item disabled" href="javascript:void(0);"
            aria-current="true">Active
            link</a></li>
    <li><a class="ti-dropdown-item" href="javascript:void(0);">Another link</a></li>
</ul>
</div>`
export let dropdownTS13 = 
`   <div class="ti-btn-list">
<div class="ti-btn-group">
    <div class="hs-dropdown ti-dropdown">
        <button class="ti-btn ti-btn-primary-full ti-dropdown-toggle" type="button"
            id="defaultDropdown"
            aria-expanded="false">
            Default dropdown<i
                class="ri-arrow-down-s-line align-middle inline-block"></i>
        </button>
        <ul class="hs-dropdown-menu ti-dropdown-menu hidden"
            aria-labelledby="defaultDropdown">
            <li><a class="ti-dropdown-item" href="javascript:void(0);">Menu item</a>
            </li>
            <li><a class="ti-dropdown-item" href="javascript:void(0);">Menu item</a>
            </li>
            <li><a class="ti-dropdown-item" href="javascript:void(0);">Menu item</a>
            </li>
        </ul>
    </div>
</div>
<div class="ti-btn-group">
    <div class="hs-dropdown ti-dropdown">
        <button class="ti-btn ti-btn-secondary-full ti-dropdown-toggle"
            type="button" id="dropdownMenuClickableOutside"
            
            aria-expanded="false">
            Clickable outside<i
                class="ri-arrow-down-s-line align-middle inline-block"></i>
        </button>
        <ul class="hs-dropdown-menu ti-dropdown-menu hidden"
            aria-labelledby="defaultDropdown">
            <li><a class="ti-dropdown-item" href="javascript:void(0);">Menu item</a>
            </li>
            <li><a class="ti-dropdown-item" href="javascript:void(0);">Menu item</a>
            </li>
            <li><a class="ti-dropdown-item" href="javascript:void(0);">Menu item</a>
            </li>
        </ul>
    </div>
</div>
<div class="ti-btn-group">
    <div class="hs-dropdown ti-dropdown">
        <button class="ti-btn ti-btn-info-full ti-dropdown-toggle" type="button"
            id="dropdownMenuClickableInside"
             aria-expanded="false">
            Clickable inside<i
                class="ri-arrow-down-s-line align-middle inline-block"></i>
        </button>
        <ul class="hs-dropdown-menu ti-dropdown-menu hidden"
            aria-labelledby="dropdownMenuClickableInside">
            <li><a class="ti-dropdown-item" href="javascript:void(0);">Menu item</a>
            </li>
            <li><a class="ti-dropdown-item" href="javascript:void(0);">Menu item</a>
            </li>
            <li><a class="ti-dropdown-item" href="javascript:void(0);">Menu item</a>
            </li>
        </ul>
    </div>
</div>
<div class="ti-btn-group">
    <div class="hs-dropdown ti-dropdown">
        <button class="ti-btn ti-btn-warning-full ti-dropdown-toggle" type="button"
            id="dropdownMenuClickable"
             aria-expanded="false">
            Manual close<i
                class="ri-arrow-down-s-line align-middle inline-block"></i>
        </button>
        <ul class="hs-dropdown-menu ti-dropdown-menu hidden"
            aria-labelledby="dropdownMenuClickable">
            <li><a class="ti-dropdown-item" href="javascript:void(0);">Menu item</a>
            </li>
            <li><a class="ti-dropdown-item" href="javascript:void(0);">Menu item</a>
            </li>
            <li><a class="ti-dropdown-item" href="javascript:void(0);">Menu item</a>
            </li>
        </ul>
    </div>
</div>
</div>`
export let dropdownTS14 = 
`   <div class="hs-dropdown ti-dropdown">
<button class="ti-btn ti-btn-secondary-full ti-dropdown-toggle !py-2" type="button"
    id="dropdownMenu2" aria-expanded="false">
    Dropdown<i class="ri-arrow-down-s-line align-middle inline-block"></i>
</button>
<div class="hs-dropdown-menu ti-dropdown-menu hidden">
    <form class="!px-6 !py-4">
        <div class="mb-4">
            <label for="exampleDropdownFormEmail1" class="form-label">Email
                address</label>
            <input type="email" class="form-control w-full !rounded-md"
                id="exampleDropdownFormEmail1" placeholder="email&#64;example.com">
        </div>
        <div class="mb-4">
            <label for="exampleDropdownFormPassword1"
                class="form-label">Password</label>
            <input type="password" class="form-control w-full !rounded-md"
                id="exampleDropdownFormPassword1" placeholder="Password">
        </div>
        <div class="mb-4">
            <div class="form-check !ps-0">
                <input type="checkbox" class="form-check-input" id="dropdownCheck">
                <label class="ps-2 form-check-label" for="dropdownCheck">
                    Remember me
                </label>
            </div>
        </div>
        <button type="submit" class="ti-btn ti-btn-primary-full">Sign in</button>
    </form>
    <div class="dropdown-divider"></div>
    <a class="ti-dropdown-item" href="javascript:void(0);">New around here? Sign
        up</a>
    <a class="ti-dropdown-item" href="javascript:void(0);">Forgot password?</a>
</div>
</div>`
export let dropdownTS15 = 
`   <div class="">
<div class="ti-dropdown hs-dropdown">
    <button class="ti-btn ti-btn-primary-full ti-dropdown-toggle mb-0 !py-2"
        type="button" id="dropdownMenuButton"
        aria-expanded="false">
        Dropdown<i class="ri-arrow-down-s-line align-middle inline-block"></i>
    </button>
    <ul class="hs-dropdown-menu ti-dropdown-menu hidden "
        aria-labelledby="dropdownMenuButton">
        <li><a class="ti-dropdown-item" href="javascript:void(0);">Menu item</a>
        </li>
        <li><a class="ti-dropdown-item" href="javascript:void(0);">Menu item</a>
        </li>
        <li><a class="ti-dropdown-item" href="javascript:void(0);">Menu item</a>
        </li>
    </ul>
</div>
<div class="ti-dropdown hs-dropdown">
    <button type="button"
        class="ti-btn ti-btn-secondary-full ti-dropdown-toggle mb-0 !py-2" aria-expanded="false">
        Right-aligned menu<i
            class="ri-arrow-down-s-line align-middle inline-block"></i>
    </button>
    <ul
        class="hs-dropdown-menu ti-dropdown-menu ti-dropdown-menu-end hidden ">
        <li><a class="ti-dropdown-item" href="javascript:void(0);">Menu item</a>
        </li>
        <li><a class="ti-dropdown-item" href="javascript:void(0);">Menu item</a>
        </li>
        <li><a class="ti-dropdown-item" href="javascript:void(0);">Menu item</a>
        </li>
    </ul>
</div>
<div class="ti-dropdown hs-dropdown" data-hs-dropdown-strategy="absolute">
    <button type="button" id="hs-dropdown-left-but-right-on-lg"
        class="ti-btn ti-btn-info-full ti-dropdown-toggle mb-0 !py-2"  aria-expanded="false">
        Left-aligned, right-aligned lg<i
            class="ri-arrow-down-s-line align-middle inline-block"></i>
    </button>
    <ul class="hs-dropdown-menu ti-dropdown-menu hidden lg:ti-dropdown-menu-end "
        aria-labelledby="hs-dropdown-left-but-right-on-lg">
        <li><a class="ti-dropdown-item" href="javascript:void(0);">Menu item</a>
        </li>
        <li><a class="ti-dropdown-item" href="javascript:void(0);">Menu item</a>
        </li>
        <li><a class="ti-dropdown-item" href="javascript:void(0);">Menu item</a>
        </li>
    </ul>
</div>
<div class="ti-dropdown hs-dropdown" data-hs-dropdown-strategy="absolute">
    <button type="button" id="hs-dropdown-right-but-left-on-lg"
        class="ti-btn ti-btn-warning-full ti-dropdown-toggle mb-0 !py-2"  aria-expanded="false">
        Right-aligned, left-aligned lg<i
            class="ri-arrow-down-s-line align-middle inline-block"></i>
    </button>
    <ul class="hs-dropdown-menu ti-dropdown-menu hidden  ti-dropdown-menu-end lg:ti-dropdown-menu-start"
        aria-labelledby="hs-dropdown-right-but-left-on-lg">
        <li><a class="ti-dropdown-item" href="javascript:void(0);">Menu item</a>
        </li>
        <li><a class="ti-dropdown-item" href="javascript:void(0);">Menu item</a>
        </li>
        <li><a class="ti-dropdown-item" href="javascript:void(0);">Menu item</a>
        </li>
    </ul>
</div>
<div class="hs-dropdown ti-dropdown [--placement:left-top] m-1">
    <button id="hs-dropright2" type="button"
        class="hs-dropdown-toggle ti-dropdown-toggle ti-btn ti-btn-success-full !py-2">
        <svg class="w-auto h-2.5 text-white" width="16" height="16"
            viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M11 1L5.31305 7.16086C5.13625 7.35239 5.13625 7.64761 5.31305 7.83914L11 14"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" />
        </svg>
        Dropstart
    </button>

    <ul class="hs-dropdown-menu  ti-dropdown-menu transition-none hidden"
        aria-labelledby="hs-dropright">
        <li><a class="ti-dropdown-item" href="javascript:void(0);">Menu item</a>
        </li>
        <li><a class="ti-dropdown-item" href="javascript:void(0);">Menu item</a>
        </li>
        <li><a class="ti-dropdown-item" href="javascript:void(0);">Menu item</a>
        </li>
    </ul>
</div>
<div class="hs-dropdown ti-dropdown [--placement:right-top] m-1">
    <button id="hs-dropright1" type="button"
        class="hs-dropdown-toggle ti-dropdown-toggle ti-btn ti-btn-primary-full !py-2">
        Dropend
        <svg class="w-auto h-2.5 ti-dropdown-caret !text-white" width="16"
            height="16" viewBox="0 0 16 16" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M5 1L10.6869 7.16086C10.8637 7.35239 10.8637 7.64761 10.6869 7.83914L5 14"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" />
        </svg>
    </button>

    <ul class="hs-dropdown-menu  ti-dropdown-menu transition-none hidden"
        aria-labelledby="hs-dropright">
        <li><a class="ti-dropdown-item" href="javascript:void(0);">Menu item</a>
        </li>
        <li><a class="ti-dropdown-item" href="javascript:void(0);">Menu item</a>
        </li>
        <li><a class="ti-dropdown-item" href="javascript:void(0);">Menu item</a>
        </li>
    </ul>
</div>
<div class="hs-dropdown ti-dropdown [--placement:top-left] m-1">
    <button id="hs-dropup1" type="button"
        class="hs-dropdown-toggle ti-dropdown-toggle ti-btn ti-btn-success-full !py-2">
        Dropup
        <svg class="hs-dropdown-open:rotate-180 ti-dropdown-caret !text-white"
            width="16" height="16" viewBox="0 0 16 16" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" />
        </svg>
    </button>

    <ul class="hs-dropdown-menu  mt-0 transition-none ti-dropdown-menu hidden"
        aria-labelledby="hs-dropup">
        <li><a class="ti-dropdown-item" href="javascript:void(0);">Menu item</a>
        </li>
        <li><a class="ti-dropdown-item" href="javascript:void(0);">Menu item</a>
        </li>
        <li><a class="ti-dropdown-item" href="javascript:void(0);">Menu item</a>
        </li>
    </ul>
</div>
</div>`
export let dropdownTS16 = 
` <div class="ti-dropdown hs-dropdown">
<button class="ti-btn ti-btn-dark ti-dropdown-toggle !py-2" type="button"
    id="dropdownMenuButton34" aria-expanded="false">
    Dropdown button<i class="ri-arrow-down-s-line align-middle inline-block"></i>
</button>
<ul
    class="hs-dropdown-menu ti-dropdown-menu !bg-black dark:!bg-defaulttextcolor/10 hidden">
    <li><a class="ti-dropdown-item !text-white dark:!text-defaulttextcolor"
            href="javascript:void(0);">Action</a></li>
    <li><a class="ti-dropdown-item !text-white dark:!text-defaulttextcolor"
            href="javascript:void(0);">Another action</a></li>
    <li><a class="ti-dropdown-item !text-white dark:!text-defaulttextcolor"
            href="javascript:void(0);">Something else here</a></li>
</ul>
</div>`
export let dropdownTS17 = 
`  <div class="ti-btn-list">
<div class="ti-dropdown hs-dropdown">
    <button class="ti-btn ti-btn-primary-full ti-dropdown-toggle !py-2"
        type="button" aria-expanded="false">
        Primary<i class="ri-arrow-down-s-line align-middle inline-block"></i>
    </button>
    <ul
        class="hs-dropdown-menu ti-dropdown-menu !bg-primary hidden">
        <li><a class="ti-dropdown-item !text-white"
                href="javascript:void(0);">Action</a></li>
        <li><a class="ti-dropdown-item !text-white"
                href="javascript:void(0);">Another action</a></li>
        <li><a class="ti-dropdown-item !text-white"
                href="javascript:void(0);">Something else here</a></li>
    </ul>
</div>
<div class="ti-dropdown hs-dropdown">
    <button class="ti-btn ti-btn-secondary-full ti-dropdown-toggle !py-2"
        type="button" aria-expanded="false">
        secondary<i class="ri-arrow-down-s-line align-middle inline-block"></i>
    </button>
    <ul
        class="hs-dropdown-menu ti-dropdown-menu !bg-secondary hidden">
        <li><a class="ti-dropdown-item !text-white"
                href="javascript:void(0);">Action</a></li>
        <li><a class="ti-dropdown-item !text-white"
                href="javascript:void(0);">Another action</a></li>
        <li><a class="ti-dropdown-item !text-white"
                href="javascript:void(0);">Something else here</a></li>
    </ul>
</div>
<div class="ti-dropdown hs-dropdown">
    <button class="ti-btn ti-btn-warning-full ti-dropdown-toggle !py-2"
        type="button" aria-expanded="false">
        warning<i class="ri-arrow-down-s-line align-middle inline-block"></i>
    </button>
    <ul class="hs-dropdown-menu ti-dropdown-menu dropmenu-item-warning hidden">
        <li><a class="ti-dropdown-item active" href="javascript:void(0);">Active</a>
        </li>
        <li><a class="ti-dropdown-item" href="javascript:void(0);">Action</a></li>
        <li><a class="ti-dropdown-item" href="javascript:void(0);">Another
                action</a></li>
        <li><a class="ti-dropdown-item" href="javascript:void(0);">Something else
                here</a></li>
    </ul>
</div>
<div class="ti-dropdown hs-dropdown">
    <button class="ti-btn ti-btn-info-full ti-dropdown-toggle !py-2" type="button" aria-expanded="false">
        info<i class="ri-arrow-down-s-line align-middle inline-block"></i>
    </button>
    <ul class="hs-dropdown-menu ti-dropdown-menu dropmenu-item-info hidden">
        <li><a class="ti-dropdown-item active" href="javascript:void(0);">Active</a>
        </li>
        <li><a class="ti-dropdown-item" href="javascript:void(0);">Action</a></li>
        <li><a class="ti-dropdown-item" href="javascript:void(0);">Another
                action</a></li>
        <li><a class="ti-dropdown-item" href="javascript:void(0);">Something else
                here</a></li>
    </ul>
</div>
<div class="ti-dropdown hs-dropdown">
    <button class="ti-btn ti-btn-success ti-dropdown-toggle !py-2" type="button" aria-expanded="false">
        success<i class="ri-arrow-down-s-line align-middle inline-block"></i>
    </button>
    <ul class="hs-dropdown-menu ti-dropdown-menu dropmenu-light-success hidden">
        <li><a class="ti-dropdown-item" href="javascript:void(0);">Action</a></li>
        <li><a class="ti-dropdown-item" href="javascript:void(0);">Another
                action</a></li>
        <li><a class="ti-dropdown-item active" href="javascript:void(0);">Active</a>
        </li>
        <li><a class="ti-dropdown-item" href="javascript:void(0);">Something else
                here</a></li>
    </ul>
</div>
<div class="ti-dropdown hs-dropdown">
    <button class="ti-btn ti-btn-danger ti-dropdown-toggle !py-2" type="button" aria-expanded="false">
        danger<i class="ri-arrow-down-s-line align-middle inline-block"></i>
    </button>
    <ul class="hs-dropdown-menu ti-dropdown-menu dropmenu-light-danger hidden">
        <li><a class="ti-dropdown-item" href="javascript:void(0);">Action</a></li>
        <li><a class="ti-dropdown-item" href="javascript:void(0);">Another
                action</a></li>
        <li><a class="ti-dropdown-item active" href="javascript:void(0);">Active</a>
        </li>
        <li><a class="ti-dropdown-item" href="javascript:void(0);">Something else
                here</a></li>
    </ul>
</div>
</div>`
export let dropdownTS18 = 
` <div class="ti-btn-list">
<div class="ti-dropdown hs-dropdown">
    <button type="button"
        class="ti-btn ti-btn-ghost-primary ti-dropdown-toggle !py-2 !shadow-none" aria-expanded="false">
        Primary<i class="ri-arrow-down-s-line align-middle inline-block"></i>
    </button>
    <ul class="hs-dropdown-menu ti-dropdown-menu hidden">
        <li><a class="ti-dropdown-item" href="javascript:void(0);">Action</a></li>
        <li><a class="ti-dropdown-item" href="javascript:void(0);">Another
                action</a></li>
        <li><a class="ti-dropdown-item" href="javascript:void(0);">Something else
                here</a></li>
        <li>
            <hr class="dropdown-divider">
        </li>
        <li><a class="ti-dropdown-item" href="javascript:void(0);">Separated
                link</a></li>
    </ul>
</div>
<div class="ti-dropdown hs-dropdown">
    <button type="button"
        class="ti-btn ti-btn-ghost-secondary ti-dropdown-toggle !py-2 !shadow-none" aria-expanded="false">
        Secondary<i class="ri-arrow-down-s-line align-middle inline-block"></i>
    </button>
    <ul class="hs-dropdown-menu ti-dropdown-menu hidden">
        <li><a class="ti-dropdown-item" href="javascript:void(0);">Action</a></li>
        <li><a class="ti-dropdown-item" href="javascript:void(0);">Another
                action</a></li>
        <li><a class="ti-dropdown-item" href="javascript:void(0);">Something else
                here</a></li>
        <li>
            <hr class="dropdown-divider">
        </li>
        <li><a class="ti-dropdown-item" href="javascript:void(0);">Separated
                link</a></li>
    </ul>
</div>
<div class="ti-dropdown hs-dropdown">
    <button type="button"
        class="ti-btn ti-btn-ghost-success ti-dropdown-toggle !py-2 !shadow-none" aria-expanded="false">
        Success<i class="ri-arrow-down-s-line align-middle inline-block"></i>
    </button>
    <ul class="hs-dropdown-menu ti-dropdown-menu hidden">
        <li><a class="ti-dropdown-item" href="javascript:void(0);">Action</a></li>
        <li><a class="ti-dropdown-item" href="javascript:void(0);">Another
                action</a></li>
        <li><a class="ti-dropdown-item" href="javascript:void(0);">Something else
                here</a></li>
        <li>
            <hr class="dropdown-divider">
        </li>
        <li><a class="ti-dropdown-item" href="javascript:void(0);">Separated
                link</a></li>
    </ul>
</div>
<div class="ti-dropdown hs-dropdown">
    <button type="button" class="ti-btn ti-btn-ghost-info ti-dropdown-toggle !py-2 !shadow-none" aria-expanded="false">
        Info<i class="ri-arrow-down-s-line align-middle inline-block"></i>
    </button>
    <ul class="hs-dropdown-menu ti-dropdown-menu hidden">
        <li><a class="ti-dropdown-item" href="javascript:void(0);">Action</a></li>
        <li><a class="ti-dropdown-item" href="javascript:void(0);">Another
                action</a></li>
        <li><a class="ti-dropdown-item" href="javascript:void(0);">Something else
                here</a></li>
        <li>
            <hr class="dropdown-divider">
        </li>
        <li><a class="ti-dropdown-item" href="javascript:void(0);">Separated
                link</a></li>
    </ul>
</div>
<div class="ti-dropdown hs-dropdown">
    <button type="button"
        class="ti-btn ti-btn-ghost-warning ti-dropdown-toggle !py-2 !shadow-none" aria-expanded="false">
        Warning<i class="ri-arrow-down-s-line align-middle inline-block"></i>
    </button>
    <ul class="hs-dropdown-menu ti-dropdown-menu hidden">
        <li><a class="ti-dropdown-item" href="javascript:void(0);">Action</a></li>
        <li><a class="ti-dropdown-item" href="javascript:void(0);">Another
                action</a></li>
        <li><a class="ti-dropdown-item" href="javascript:void(0);">Something else
                here</a></li>
        <li>
            <hr class="dropdown-divider">
        </li>
        <li><a class="ti-dropdown-item" href="javascript:void(0);">Separated
                link</a></li>
    </ul>
</div>
<div class="ti-dropdown hs-dropdown">
    <button type="button"
        class="ti-btn ti-btn-ghost-danger ti-dropdown-toggle !py-2 !shadow-none" aria-expanded="false">
        Danger<i class="ri-arrow-down-s-line align-middle inline-block"></i>
    </button>
    <ul class="hs-dropdown-menu ti-dropdown-menu hidden">
        <li><a class="ti-dropdown-item" href="javascript:void(0);">Action</a></li>
        <li><a class="ti-dropdown-item" href="javascript:void(0);">Another
                action</a></li>
        <li><a class="ti-dropdown-item" href="javascript:void(0);">Something else
                here</a></li>
        <li>
            <hr class="dropdown-divider">
        </li>
        <li><a class="ti-dropdown-item" href="javascript:void(0);">Separated
                link</a></li>
    </ul>
</div>
</div>`
export let dropdownTS19 = 
`  <p class=" mb-3">Use <code>.ti-dropdown-item-text.</code> to create non-interactive
dropdown items.</p>
<div class="bd-example">
<ul class="dropdown-menu border dark:border-defaultborder/10 shadow-sm">
    <li><span class="!py-2 !px-4 !text-[0.875rem]">Dropdown item text</span>
    </li>
    <li><a class="ti-dropdown-item" href="javascript:void(0);">Action</a></li>
    <li><a class="ti-dropdown-item" href="javascript:void(0);">Another action</a>
    </li>
    <li><a class="ti-dropdown-item" href="javascript:void(0);">Something else
            here</a>
    </li>
</ul>
</div>`
export let dropdownTS20 = 
`  <p class="card-titlte mb-3">Add a <code>.dropdown-header</code> to label sections of
actions in any dropdown menu.</p>
<div class="bd-example">
<ul class="dropdown-menu border dark:border-defaultborder/10 shadow-sm">
    <li>
        <h6 class="dropdown-header">Dropdown header</h6>
    </li>
    <li><a class="ti-dropdown-item" href="javascript:void(0);">Action</a></li>
    <li><a class="ti-dropdown-item" href="javascript:void(0);">Another action</a>
    </li>
    <li><a class="ti-dropdown-item" href="javascript:void(0);">Something else
            here</a></li>
</ul>
</div>`
export let dropdownTS21 = 
`  <div class="bd-example">
<ul class="dropdown-menu border dark:border-defaultborder/10 shadow-sm">
    <li><a class="dropdown-header" href="javascript:void(0);">Heading</a></li>
    <li><a class="ti-dropdown-item" href="javascript:void(0);">Action</a></li>
    <li><a class="ti-dropdown-item" href="javascript:void(0);">Another action</a>
    </li>
    <li><a class="ti-dropdown-item" href="javascript:void(0);">Something else
            here</a></li>
    <li>
        <hr class="dropdown-divider">
    </li>
    <li><a class="ti-dropdown-item" href="javascript:void(0);">Separated link</a>
    </li>
</ul>
</div>`
export let dropdownTS22 = 
`  <div class="bd-example">
<div class="dropdown-menu border dark:border-defaultborder/10 shadow-sm p-6 text-[#8c9097] dark:text-white/50 text-[0.875rem] max-w-[200px]">
    <p>
        Some example text that's free-flowing within the dropdown menu.
    </p>
    <p class="mb-0">
        And this is more example text.
    </p>
</div>
</div>`
export let breadcrumbTS1 = `<spk-breadcrumb [items]="breadcrumbs1"></spk-breadcrumb>`
export let breadcrumbTS2 = 
`<spk-breadcrumb [items]="breadcrumbs2"></spk-breadcrumb>`
export let breadcrumbTS3 = 
`<spk-breadcrumb [items]="breadcrumbs3"></spk-breadcrumb>`
export let breadcrumbTS4 = 
`<spk-breadcrumb [items]="breadcrumbs4"></spk-breadcrumb>`
export let breadcrumbTS5 = 
`@for (breadcrumbList of breadcrumbLists; track $index) {
    <div>
      <ol class="flex items-center whitespace-nowrap min-w-0 pb-2">
        <li
          *ngFor="let item of breadcrumbList; let last = last"
          [class]="last ? 'text-sm text-gray-500 dark:text-[#8c9097] dark:text-white/50 truncate' : 'text-sm'"
        >
          <a
            *ngIf="!item.isLast; else lastBreadcrumb"
            class="flex items-center text-primary hover:text-primary dark:text-primary"
          >
            <!-- Prefix Icon -->
            <svg
              *ngIf="item.prefixIconPath"
              [class]="item.prefixIconClass"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path [attr.d]="item.prefixIconPath" fill-rule="evenodd"></path>
              <path [attr.d]="item.prefixIconPath1" fill-rule="evenodd"></path>
            </svg>
            {{ item.label }}
            <!-- Separator Icon -->
            <svg
              *ngIf="item.separatorIconPath && !last"
              [class]="item.separatorIconClass"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                [attr.d]="item.separatorIconPath"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
          </a>
          <ng-template #lastBreadcrumb>
            <span>{{ item.label }}</span>
          </ng-template>
        </li>
      </ol>
    </div>
  }`
  export let breadcrumbTS6 = 
`   <spk-breadcrumb [items]="breadcrumbs4"></spk-breadcrumb>`
  export let breadcrumbTS7 = 
`   @for (breadcrumbList of breadcrumbLists; track $index) {
                <div>
                  <ol class="flex items-center whitespace-nowrap min-w-0 pb-2">
                    <li
                      *ngFor="let item of breadcrumbList; let last = last"
                      [class]="last ? 'text-sm text-gray-500 dark:text-[#8c9097] dark:text-white/50 truncate' : 'text-sm'"
                    >
                      <a
                        *ngIf="!item.isLast; else lastBreadcrumb"
                        class="flex items-center text-primary hover:text-primary dark:text-primary"
                      >
                        <!-- Prefix Icon -->
                        <svg
                          *ngIf="item.prefixIconPath"
                          [class]="item.prefixIconClass"
                          width="16"
                          height="16"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                        >
                          <path [attr.d]="item.prefixIconPath" fill-rule="evenodd"></path>
                          <path [attr.d]="item.prefixIconPath1" fill-rule="evenodd"></path>
                        </svg>
                        {{ item.label }}
                        <!-- Separator Icon -->
                        <svg
                          *ngIf="item.separatorIconPath && !last"
                          [class]="item.separatorIconClass"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            [attr.d]="item.separatorIconPath"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                          />
                        </svg>
                      </a>
                      <ng-template #lastBreadcrumb>
                        <span>{{ item.label }}</span>
                      </ng-template>
                    </li>
                  </ol>
                </div>
              }`
//Blackquotes

export const blackquote1 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
 <blockquote className="relative">
<svg className="absolute top-0 ltr:left-0 rtl:right-0 transform -translate-x-6 -translate-y-8 h-16 w-16 text-gray-100 dark:text-white/10"
    width="16" height="16" viewBox="0 0 16 16" fill="none"
    xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path
        d="M7.39762 10.3C7.39762 11.0733 7.14888 11.7 6.6514 12.18C6.15392 12.6333 5.52552 12.86 4.76621 12.86C3.84979 12.86 3.09047 12.5533 2.48825 11.94C1.91222 11.3266 1.62421 10.4467 1.62421 9.29999C1.62421 8.07332 1.96459 6.87332 2.64535 5.69999C3.35231 4.49999 4.33418 3.55332 5.59098 2.85999L6.4943 4.25999C5.81354 4.73999 5.26369 5.27332 4.84476 5.85999C4.45201 6.44666 4.19017 7.12666 4.05926 7.89999C4.29491 7.79332 4.56983 7.73999 4.88403 7.73999C5.61716 7.73999 6.21938 7.97999 6.69067 8.45999C7.16197 8.93999 7.39762 9.55333 7.39762 10.3ZM14.6242 10.3C14.6242 11.0733 14.3755 11.7 13.878 12.18C13.3805 12.6333 12.7521 12.86 11.9928 12.86C11.0764 12.86 10.3171 12.5533 9.71484 11.94C9.13881 11.3266 8.85079 10.4467 8.85079 9.29999C8.85079 8.07332 9.19117 6.87332 9.87194 5.69999C10.5789 4.49999 11.5608 3.55332 12.8176 2.85999L13.7209 4.25999C13.0401 4.73999 12.4903 5.27332 12.0713 5.85999C11.6786 6.44666 11.4168 7.12666 11.2858 7.89999C11.5215 7.79332 11.7964 7.73999 12.1106 7.73999C12.8437 7.73999 13.446 7.97999 13.9173 8.45999C14.3886 8.93999 14.6242 9.55333 14.6242 10.3Z"
        fill="currentColor"></path>
</svg>
<div className="relative z-10">
    <p className="text-gray-800 sm:text-xl dark:text-white"><em>
            I just wanted to say that I'm very happy with my purchase so far. The
            documentation is outstanding - clear and
            detailed.</em>
    </p>
</div>
</blockquote>
// End Prism Code//`;

export const blackquote2 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
  <blockquote className="relative">
<svg className="absolute top-0 ltr:left-0 rtl:right-0 transform -translate-x-6 -translate-y-8 h-16 w-16 text-gray-100 dark:text-white/10"
    width="16" height="16" viewBox="0 0 16 16" fill="none"
    xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path
        d="M7.39762 10.3C7.39762 11.0733 7.14888 11.7 6.6514 12.18C6.15392 12.6333 5.52552 12.86 4.76621 12.86C3.84979 12.86 3.09047 12.5533 2.48825 11.94C1.91222 11.3266 1.62421 10.4467 1.62421 9.29999C1.62421 8.07332 1.96459 6.87332 2.64535 5.69999C3.35231 4.49999 4.33418 3.55332 5.59098 2.85999L6.4943 4.25999C5.81354 4.73999 5.26369 5.27332 4.84476 5.85999C4.45201 6.44666 4.19017 7.12666 4.05926 7.89999C4.29491 7.79332 4.56983 7.73999 4.88403 7.73999C5.61716 7.73999 6.21938 7.97999 6.69067 8.45999C7.16197 8.93999 7.39762 9.55333 7.39762 10.3ZM14.6242 10.3C14.6242 11.0733 14.3755 11.7 13.878 12.18C13.3805 12.6333 12.7521 12.86 11.9928 12.86C11.0764 12.86 10.3171 12.5533 9.71484 11.94C9.13881 11.3266 8.85079 10.4467 8.85079 9.29999C8.85079 8.07332 9.19117 6.87332 9.87194 5.69999C10.5789 4.49999 11.5608 3.55332 12.8176 2.85999L13.7209 4.25999C13.0401 4.73999 12.4903 5.27332 12.0713 5.85999C11.6786 6.44666 11.4168 7.12666 11.2858 7.89999C11.5215 7.79332 11.7964 7.73999 12.1106 7.73999C12.8437 7.73999 13.446 7.97999 13.9173 8.45999C14.3886 8.93999 14.6242 9.55333 14.6242 10.3Z"
        fill="currentColor"></path>
</svg>

<div className="relative z-10">
    <p className="text-gray-800 dark:text-white">
        <em>
            I just wanted to say that I'm very happy with my purchase so far. The
            documentation is outstanding - clear and detailed.
        </em>
    </p>
</div>
</blockquote>
// End Prism Code//`;

export const blackquote3 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<blockquote className="relative">
<svg className="absolute top-0 ltr:left-0 rtl:right-0 transform -translate-x-6 -translate-y-8 h-16 w-16 text-gray-100 dark:text-white/10"
    width="16" height="16" viewBox="0 0 16 16" fill="none"
    xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path
        d="M7.39762 10.3C7.39762 11.0733 7.14888 11.7 6.6514 12.18C6.15392 12.6333 5.52552 12.86 4.76621 12.86C3.84979 12.86 3.09047 12.5533 2.48825 11.94C1.91222 11.3266 1.62421 10.4467 1.62421 9.29999C1.62421 8.07332 1.96459 6.87332 2.64535 5.69999C3.35231 4.49999 4.33418 3.55332 5.59098 2.85999L6.4943 4.25999C5.81354 4.73999 5.26369 5.27332 4.84476 5.85999C4.45201 6.44666 4.19017 7.12666 4.05926 7.89999C4.29491 7.79332 4.56983 7.73999 4.88403 7.73999C5.61716 7.73999 6.21938 7.97999 6.69067 8.45999C7.16197 8.93999 7.39762 9.55333 7.39762 10.3ZM14.6242 10.3C14.6242 11.0733 14.3755 11.7 13.878 12.18C13.3805 12.6333 12.7521 12.86 11.9928 12.86C11.0764 12.86 10.3171 12.5533 9.71484 11.94C9.13881 11.3266 8.85079 10.4467 8.85079 9.29999C8.85079 8.07332 9.19117 6.87332 9.87194 5.69999C10.5789 4.49999 11.5608 3.55332 12.8176 2.85999L13.7209 4.25999C13.0401 4.73999 12.4903 5.27332 12.0713 5.85999C11.6786 6.44666 11.4168 7.12666 11.2858 7.89999C11.5215 7.79332 11.7964 7.73999 12.1106 7.73999C12.8437 7.73999 13.446 7.97999 13.9173 8.45999C14.3886 8.93999 14.6242 9.55333 14.6242 10.3Z"
        fill="currentColor"></path>
</svg>

<div className="relative z-10">
    <p className="text-gray-800 sm:text-xl dark:text-white"><em>
            I just wanted to say that I'm very happy with my purchase so far. The
            documentation is outstanding - clear and detailed.</em>
    </p>
</div>
</blockquote>
// End Prism Code//`;

export const blackquote4 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
 <blockquote className="relative">
<svg className="absolute top-0 ltr:left-0 rtl:right-0 transform -translate-x-6 -translate-y-8 h-16 w-16 text-gray-100 dark:text-white/10"
    width="16" height="16" viewBox="0 0 16 16" fill="none"
    xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path
        d="M7.39762 10.3C7.39762 11.0733 7.14888 11.7 6.6514 12.18C6.15392 12.6333 5.52552 12.86 4.76621 12.86C3.84979 12.86 3.09047 12.5533 2.48825 11.94C1.91222 11.3266 1.62421 10.4467 1.62421 9.29999C1.62421 8.07332 1.96459 6.87332 2.64535 5.69999C3.35231 4.49999 4.33418 3.55332 5.59098 2.85999L6.4943 4.25999C5.81354 4.73999 5.26369 5.27332 4.84476 5.85999C4.45201 6.44666 4.19017 7.12666 4.05926 7.89999C4.29491 7.79332 4.56983 7.73999 4.88403 7.73999C5.61716 7.73999 6.21938 7.97999 6.69067 8.45999C7.16197 8.93999 7.39762 9.55333 7.39762 10.3ZM14.6242 10.3C14.6242 11.0733 14.3755 11.7 13.878 12.18C13.3805 12.6333 12.7521 12.86 11.9928 12.86C11.0764 12.86 10.3171 12.5533 9.71484 11.94C9.13881 11.3266 8.85079 10.4467 8.85079 9.29999C8.85079 8.07332 9.19117 6.87332 9.87194 5.69999C10.5789 4.49999 11.5608 3.55332 12.8176 2.85999L13.7209 4.25999C13.0401 4.73999 12.4903 5.27332 12.0713 5.85999C11.6786 6.44666 11.4168 7.12666 11.2858 7.89999C11.5215 7.79332 11.7964 7.73999 12.1106 7.73999C12.8437 7.73999 13.446 7.97999 13.9173 8.45999C14.3886 8.93999 14.6242 9.55333 14.6242 10.3Z"
        fill="currentColor"></path>
</svg>

<div className="relative z-10">
    <p className="text-xl text-gray-800 md:text-3xl md:leading-normal dark:text-white">
        <em>
            I just wanted to say that I'm very happy with my purchase so far. The
            documentation is outstanding - clear and detailed.</em>
    </p>
</div>
</blockquote>
// End Prism Code//`;

export const blackquote5 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<blockquote className="relative text-center max-w-lg mx-auto">
<div className="relative z-10">
    <p className="text-xl text-gray-800">
        <em className="relative">
            <svg className="absolute top-0 ltr:left-0 rtl:right-0 transform -translate-x-8 -translate-y-8 h-16 w-16 text-gray-100 sm:h-24 sm:w-24 dark:text-white/10"
                width="16" height="16" viewBox="0 0 16 16" fill="none"
                xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path
                    d="M7.39762 10.3C7.39762 11.0733 7.14888 11.7 6.6514 12.18C6.15392 12.6333 5.52552 12.86 4.76621 12.86C3.84979 12.86 3.09047 12.5533 2.48825 11.94C1.91222 11.3266 1.62421 10.4467 1.62421 9.29999C1.62421 8.07332 1.96459 6.87332 2.64535 5.69999C3.35231 4.49999 4.33418 3.55332 5.59098 2.85999L6.4943 4.25999C5.81354 4.73999 5.26369 5.27332 4.84476 5.85999C4.45201 6.44666 4.19017 7.12666 4.05926 7.89999C4.29491 7.79332 4.56983 7.73999 4.88403 7.73999C5.61716 7.73999 6.21938 7.97999 6.69067 8.45999C7.16197 8.93999 7.39762 9.55333 7.39762 10.3ZM14.6242 10.3C14.6242 11.0733 14.3755 11.7 13.878 12.18C13.3805 12.6333 12.7521 12.86 11.9928 12.86C11.0764 12.86 10.3171 12.5533 9.71484 11.94C9.13881 11.3266 8.85079 10.4467 8.85079 9.29999C8.85079 8.07332 9.19117 6.87332 9.87194 5.69999C10.5789 4.49999 11.5608 3.55332 12.8176 2.85999L13.7209 4.25999C13.0401 4.73999 12.4903 5.27332 12.0713 5.85999C11.6786 6.44666 11.4168 7.12666 11.2858 7.89999C11.5215 7.79332 11.7964 7.73999 12.1106 7.73999C12.8437 7.73999 13.446 7.97999 13.9173 8.45999C14.3886 8.93999 14.6242 9.55333 14.6242 10.3Z"
                    fill="currentColor"></path>
            </svg>
            <span className="relative z-10 dark:text-white">I just wanted to say that
                I'm very happy with my purchase so far. The documentation is
                outstanding - clear and detailed.</span>
        </em>
    </p>
</div>
</blockquote>
// End Prism Code//`;

export const blackquote6 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
 <blockquote className="relative text-end">
<div className="relative z-10">
    <p className="text-xl text-gray-800">
        <em className="relative">
            <svg className="absolute top-0 ltr:left-0 rtl:right-0 transform -translate-x-8 -translate-y-8 h-16 w-16 text-gray-100 sm:h-24 sm:w-24 dark:text-white/10"
                width="16" height="16" viewBox="0 0 16 16" fill="none"
                xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path
                    d="M7.39762 10.3C7.39762 11.0733 7.14888 11.7 6.6514 12.18C6.15392 12.6333 5.52552 12.86 4.76621 12.86C3.84979 12.86 3.09047 12.5533 2.48825 11.94C1.91222 11.3266 1.62421 10.4467 1.62421 9.29999C1.62421 8.07332 1.96459 6.87332 2.64535 5.69999C3.35231 4.49999 4.33418 3.55332 5.59098 2.85999L6.4943 4.25999C5.81354 4.73999 5.26369 5.27332 4.84476 5.85999C4.45201 6.44666 4.19017 7.12666 4.05926 7.89999C4.29491 7.79332 4.56983 7.73999 4.88403 7.73999C5.61716 7.73999 6.21938 7.97999 6.69067 8.45999C7.16197 8.93999 7.39762 9.55333 7.39762 10.3ZM14.6242 10.3C14.6242 11.0733 14.3755 11.7 13.878 12.18C13.3805 12.6333 12.7521 12.86 11.9928 12.86C11.0764 12.86 10.3171 12.5533 9.71484 11.94C9.13881 11.3266 8.85079 10.4467 8.85079 9.29999C8.85079 8.07332 9.19117 6.87332 9.87194 5.69999C10.5789 4.49999 11.5608 3.55332 12.8176 2.85999L13.7209 4.25999C13.0401 4.73999 12.4903 5.27332 12.0713 5.85999C11.6786 6.44666 11.4168 7.12666 11.2858 7.89999C11.5215 7.79332 11.7964 7.73999 12.1106 7.73999C12.8437 7.73999 13.446 7.97999 13.9173 8.45999C14.3886 8.93999 14.6242 9.55333 14.6242 10.3Z"
                    fill="currentColor"></path>
            </svg>
            <span className="relative z-10 dark:text-white">I just wanted to say that
                I'm very happy with my purchase so far. The documentation is
                outstanding - clear and detailed.</span>
        </em>
    </p>
</div>
</blockquote>
// End Prism Code//`;

export const blackquote7 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
 <blockquote className="relative">
<svg className="absolute top-0 ltr:left-0 rtl:right-0 transform -translate-x-6 -translate-y-8 h-16 w-16 text-gray-100 dark:text-white/10"
    width="16" height="16" viewBox="0 0 16 16" fill="none"
    xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path
        d="M7.39762 10.3C7.39762 11.0733 7.14888 11.7 6.6514 12.18C6.15392 12.6333 5.52552 12.86 4.76621 12.86C3.84979 12.86 3.09047 12.5533 2.48825 11.94C1.91222 11.3266 1.62421 10.4467 1.62421 9.29999C1.62421 8.07332 1.96459 6.87332 2.64535 5.69999C3.35231 4.49999 4.33418 3.55332 5.59098 2.85999L6.4943 4.25999C5.81354 4.73999 5.26369 5.27332 4.84476 5.85999C4.45201 6.44666 4.19017 7.12666 4.05926 7.89999C4.29491 7.79332 4.56983 7.73999 4.88403 7.73999C5.61716 7.73999 6.21938 7.97999 6.69067 8.45999C7.16197 8.93999 7.39762 9.55333 7.39762 10.3ZM14.6242 10.3C14.6242 11.0733 14.3755 11.7 13.878 12.18C13.3805 12.6333 12.7521 12.86 11.9928 12.86C11.0764 12.86 10.3171 12.5533 9.71484 11.94C9.13881 11.3266 8.85079 10.4467 8.85079 9.29999C8.85079 8.07332 9.19117 6.87332 9.87194 5.69999C10.5789 4.49999 11.5608 3.55332 12.8176 2.85999L13.7209 4.25999C13.0401 4.73999 12.4903 5.27332 12.0713 5.85999C11.6786 6.44666 11.4168 7.12666 11.2858 7.89999C11.5215 7.79332 11.7964 7.73999 12.1106 7.73999C12.8437 7.73999 13.446 7.97999 13.9173 8.45999C14.3886 8.93999 14.6242 9.55333 14.6242 10.3Z"
        fill="currentColor"></path>
</svg>

<div className="relative z-10">
    <p className="text-gray-800 sm:text-xl dark:text-white"><em>
            I just wanted to say that I'm very happy with my purchase so far. The
            documentation is outstanding - clear and detailed.</em>
    </p>
</div>

<footer className="mt-6">
    <div className="text-base font-semibold text-gray-800 dark:text-white/70">Josh
        Grazioso</div>
</footer>
</blockquote>
// End Prism Code//`;

export const blackquote8 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
 <blockquote className="relative">
<svg className="absolute top-0 ltr:left-0 rtl:right-0 transform -translate-x-6 -translate-y-8 h-16 w-16 text-gray-100 dark:text-white/10"
    width="16" height="16" viewBox="0 0 16 16" fill="none"
    xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path
        d="M7.39762 10.3C7.39762 11.0733 7.14888 11.7 6.6514 12.18C6.15392 12.6333 5.52552 12.86 4.76621 12.86C3.84979 12.86 3.09047 12.5533 2.48825 11.94C1.91222 11.3266 1.62421 10.4467 1.62421 9.29999C1.62421 8.07332 1.96459 6.87332 2.64535 5.69999C3.35231 4.49999 4.33418 3.55332 5.59098 2.85999L6.4943 4.25999C5.81354 4.73999 5.26369 5.27332 4.84476 5.85999C4.45201 6.44666 4.19017 7.12666 4.05926 7.89999C4.29491 7.79332 4.56983 7.73999 4.88403 7.73999C5.61716 7.73999 6.21938 7.97999 6.69067 8.45999C7.16197 8.93999 7.39762 9.55333 7.39762 10.3ZM14.6242 10.3C14.6242 11.0733 14.3755 11.7 13.878 12.18C13.3805 12.6333 12.7521 12.86 11.9928 12.86C11.0764 12.86 10.3171 12.5533 9.71484 11.94C9.13881 11.3266 8.85079 10.4467 8.85079 9.29999C8.85079 8.07332 9.19117 6.87332 9.87194 5.69999C10.5789 4.49999 11.5608 3.55332 12.8176 2.85999L13.7209 4.25999C13.0401 4.73999 12.4903 5.27332 12.0713 5.85999C11.6786 6.44666 11.4168 7.12666 11.2858 7.89999C11.5215 7.79332 11.7964 7.73999 12.1106 7.73999C12.8437 7.73999 13.446 7.97999 13.9173 8.45999C14.3886 8.93999 14.6242 9.55333 14.6242 10.3Z"
        fill="currentColor"></path>
</svg>

<div className="relative z-10">
    <p className="text-gray-800 sm:text-xl dark:text-white"><em>
            I just wanted to say that I'm very happy with my purchase so far. The
            documentation is outstanding - clear and detailed.</em>
    </p>
</div>

<footer className="mt-6">
    <div className="flex items-center">
        <div className="flex-shrink-0">
            <img className="h-10 w-10 rounded-full" src={face1}
                alt="Image Description"/>
        </div>
        <div className="ltr:ml-4 rtl:mr-4">
            <div className="text-base font-semibold text-gray-800 dark:text-white/70">
                Josh Grazioso</div>
            <div className="text-xs text-gray-500 dark:text-white/70">Source title</div>
        </div>
    </div>
</footer>
</blockquote>
// End Prism Code//`;

export const blackquote9 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
 <blockquote
className="relative ltr:border-l-4 rtl:border-r-4 ltr:pl-4 rtl:pr-4 ltr:sm:pl-6 rtl:sm:pr-6 dark:border-white/10">
<p className="text-gray-800 sm:text-xl dark:text-white"><em>
        I just wanted to say that I'm very happy with my purchase so far. The
        documentation is outstanding - clear and detailed.</em>
</p>

<footer className="mt-4">
    <div className="flex items-center">
        <div className="flex-shrink-0">
            <img className="h-10 w-10 rounded-full" src={face1}
                alt="Image Description"/>
        </div>
        <div className="ltr:ml-4 rtl:mr-4">
            <div className="text-base font-semibold text-gray-800 dark:text-white/70">
                Josh Grazioso</div>
            <div className="text-xs text-gray-500 dark:text-white/70">Source title</div>
        </div>
    </div>
</footer>
</blockquote>
// End Prism Code//`;

//Typography

export const typography1 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
 <h1 className="font-semibold text-gray-800 dark:text-white text-4xl">h1. Tailwind heading</h1>
<h2 className="font-semibold text-gray-800 dark:text-white text-3xl">h2. Tailwind heading</h2>
<h3 className="font-semibold text-gray-800 dark:text-white text-2xl">h3. Tailwind heading</h3>
<h4 className="font-semibold text-gray-800 dark:text-white text-xl">h4. Tailwind heading</h4>
<h5 className="font-semibold text-gray-800 dark:text-white text-lg">h5. Tailwind heading</h5>
<h6 className="font-semibold text-gray-800 dark:text-white text-base">h6. Tailwind heading</h6>
// End Prism Code//`;

export const typography2 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
 <p className="text-gray-800 dark:text-white">You can use the mark tag to <mark>highlight</mark> text.</p>
<p className="text-gray-800 dark:text-white"><del>This line of text is meant to be treated as deleted text.</del></p>
<p className="text-gray-800 dark:text-white"><s>This line of text is meant to be treated as no longer accurate.</s></p>
<p className="text-gray-800 dark:text-white"><ins>This line of text is meant to be treated as an addition to the document.</ins></p>
<p className="text-gray-800 dark:text-white"><u>This line of text will render as underlined.</u></p>
<p className="text-gray-800 dark:text-white"><small>This line of text is meant to be treated as fine print.</small></p>
<p className="text-gray-800 dark:text-white"><strong>This line rendered as bold text.</strong></p>
<p className="text-gray-800 dark:text-white"><em>This line rendered as italicized text.</em></p>
// End Prism Code//`;

export const typography3 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
   <dl className="grid sm:grid-cols-3 gap-1 sm:gap-3">
<dt className="sm:col-span-1 font-semibold dark:text-white">Description lists</dt>
<dd className="sm:col-span-2 mb-3 sm:mb-0 dark:text-white">A description list is perfect for defining terms.</dd>

<dt className="sm:col-span-1 font-semibold dark:text-white">Term</dt>
<dd className="sm:col-span-2 mb-3 sm:mb-0 dark:text-white">
  <p>Definition for the term.</p>
  <p>And some more placeholder definition text.</p>
</dd>

<dt className="sm:col-span-1 font-semibold dark:text-white">Another term</dt>
<dd className="sm:col-span-2 mb-3 sm:mb-0 dark:text-white">This definition is short, so no extra paragraphs or anything.</dd>

<dt className="sm:col-span-1 font-semibold truncate dark:text-white">Truncated term is truncated</dt>
<dd className="sm:col-span-2 mb-3 sm:mb-0 dark:text-white">This can be useful when space is tight. Adds an ellipsis at the end.</dd>

<dt className="sm:col-span-1 font-semibold dark:text-white">Nesting</dt>
<dd className="sm:col-span-2 mb-3 sm:mb-0 dark:text-white">
  <dl className="grid sm:grid-cols-5 gap-1 sm:gap-3 dark:text-white">
    <dt className="sm:col-span-2 font-semibold dark:text-white">Nested definition list</dt>
    <dd className="sm:col-span-3 mb-3 sm:mb-0 dark:text-white">I heard you like definition lists. Let me put a definition list inside your definition list.</dd>
  </dl>
</dd>
</dl>
// End Prism Code//`;

export const typography4 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<p className="first-line:uppercase first-line:tracking-widest first-letter:text-slate-900 first-letter:text-7xl first-letter:leading-none first-letter:float-start first-letter:font-bold first-letter:me-3 dark:first-letter:text-white">
Well, let me tell you something, funny boy. Y'know that little stamp, the one that says "New York Public Library"? Well that may not mean anything to you, but that means a lot to me. One whole hell of a lot.
</p>
<p className="">
Sure, go ahead, laugh if you want to. I've seen your type before: Flashy, making the scene, flaunting convention. Yeah, I know what you're thinking. What's this guy making such a big stink about old library books? Well, let me give you a hint, junior.
</p>
// End Prism Code//`;

export const typography5 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<p className="text-gray-800 dark:text-white text-xs">text-xs</p>
<p className="text-gray-800 dark:text-white text-sm">text-sm</p>
<p className="text-gray-800 dark:text-white text-base">text-base</p>
<p className="text-gray-800 dark:text-white text-lg">text-lg</p>
<p className="text-gray-800 dark:text-white text-xl">text-xl</p>
<p className="text-gray-800 dark:text-white text-2xl">text-2xl</p>
<p className="text-gray-800 dark:text-white text-3xl">text-3xl</p>
<p className="text-gray-800 dark:text-white text-4xl">text-4xl</p>
<p className="text-gray-800 dark:text-white text-5xl">text-5xl</p>
<p className="text-gray-800 dark:text-white text-6xl">text-6xl</p>
<p className="text-gray-800 dark:text-white text-7xl">text-7xl</p>
<p className="text-gray-800 dark:text-white text-8xl">text-8xl</p>
<p className="text-gray-800 dark:text-white text-[6.5rem] leading-none sm:text-9xl">text-9xl</p>
</Showcode>
// End Prism Code//`;

export const typography6 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="">
<details className="open:bg-white dark:open:bg-bodybg open:ring-1 open:ring-black/5 dark:open:ring-white/10 open:shadow-lg p-6 rounded-lg" open>
  <summary className="text-sm leading-6 text-gray-800 dark:text-white font-semibold select-none">
    Why do they call it Ovaltine?
  </summary>
  <div className="mt-3 text-sm leading-6 text-gray-800 dark:text-gray-300">
    <p>The mug is round. The jar is round. They should call it Roundtine.</p>
  </div>
</details>
</div>
// End Prism Code//`;

export const typography7 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
 <p className="text-gray-800 dark:text-white underline ">This line of text will render as underlined. </p>
<p className="text-gray-800 dark:text-white no-underline ">This line of text will render as Not underlined.. </p>
<p className="text-gray-800 dark:text-white overline">This line of text will render as overline..</p>
<p className="text-gray-800 dark:text-white line-through">This line of text will render as line through.</p>
// End Prism Code//`;

export const typography8 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
 <p className="text-gray-800 dark:text-white lowercase ">Lowercased text. </p>
<p className="text-gray-800 dark:text-white uppercase ">Uppercased text</p>
<p className="text-gray-800 dark:text-white capitalize">Captalized text</p>
<p className="text-gray-800 dark:text-white normal-case">Normal Text</p>
// End Prism Code//`;

//breadcrumb

export const reactbreadcrumb1 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<ol className="flex items-center whitespace-nowrap min-w-0">
<li className="text-sm">
  <Link className="flex items-center text-primary hover:text-primary dark:text-primary" href="#" >
    Home
    <svg className="flex-shrink-0 mx-3 overflow-visible h-2.5 w-2.5 text-gray-300 dark:text-white/10 rtl:rotate-180"
      width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 1L10.6869 7.16086C10.8637 7.35239 10.8637 7.64761 10.6869 7.83914L5 14"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  </Link>
</li>
<li className="text-sm">
  <Link className="flex items-center text-primary hover:text-primary dark:text-primary" href="#" >
    App Center
    <svg className="flex-shrink-0 mx-3 overflow-visible h-2.5 w-2.5 text-gray-300 dark:text-white/10 rtl:rotate-180"
      width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 1L10.6869 7.16086C10.8637 7.35239 10.8637 7.64761 10.6869 7.83914L5 14"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  </Link>
</li>
<li className="text-sm text-gray-500 dark:text-[#8c9097] dark:text-white/50 hover:text-primary truncate" aria-current="page">
  Application
</li>
</ol>
// End Prism Code//`;

export let ToastTS1 = 
`  <div class="lg:flex lg:space-x-3 rtl:space-x-reverse space-y-4 lg:space-y-0">
<div class="ti-toast bg-white dark:bg-bodybg dark:border-white/10" role="alert">
    <div class="flex p-4">
        <div class="flex-shrink-0">
            <svg class="h-4 w-4 text-primary mt-0.5"
                xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                fill="currentColor" viewBox="0 0 16 16">
                <path
                    d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
            </svg>
        </div>
        <div class="ms-3">
            <p class="text-sm text-gray-700 dark:text-[#8c9097] dark:text-white/50">
                This is a normal message.
            </p>
        </div>
    </div>
</div>

<div class="ti-toast bg-white dark:bg-bodybg dark:border-white/10" role="alert">
    <div class="flex p-4">
        <div class="flex-shrink-0">
            <svg class="h-4 w-4 text-green mt-0.5"
                xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                fill="currentColor" viewBox="0 0 16 16">
                <path
                    d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
            </svg>
        </div>
        <div class="ms-3">
            <p class="text-sm text-gray-700 dark:text-[#8c9097] dark:text-white/50">
                This is a success message.
            </p>
        </div>
    </div>
</div>

<div class="ti-toast bg-white dark:bg-bodybg dark:border-white/10" role="alert">
    <div class="flex p-4">
        <div class="flex-shrink-0">
            <svg class="h-4 w-4 text-red mt-0.5" xmlns="http://www.w3.org/2000/svg"
                width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path
                    d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
            </svg>
        </div>
        <div class="ms-3">
            <p class="text-sm text-gray-700 dark:text-[#8c9097] dark:text-white/50">
                This is an error message.
            </p>
        </div>
    </div>
</div>

<div class="ti-toast bg-white dark:bg-bodybg dark:border-white/10" role="alert">
    <div class="flex p-4">
        <div class="flex-shrink-0">
            <svg class="h-4 w-4 text-orange mt-0.5"
                xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                fill="currentColor" viewBox="0 0 16 16">
                <path
                    d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
            </svg>
        </div>
        <div class="ms-3">
            <p class="text-sm text-gray dark:text-[#8c9097] dark:text-white/50">
                This is a warning message.
            </p>
        </div>
    </div>
</div>
</div>`
export let ToastTS2 = 
`   <div class="ti-toast hs-removing:translate-x-5 hs-removing:opacity-0 transition duration-300 bg-white  dark:bg-bodybg dark:border-white/10"
role="alert">
<div class="flex p-4">
    <p class="text-sm text-gray-700 dark:text-[#8c9097] dark:text-white/50">
        Your email has been sent
    </p>

    <div
        class="ms-auto flex items-center space-x-3 rtl:space-x-reverse">
        <button type="button"
            class="inline-flex justify-center items-center gap-2 rounded-sm border-transparent font-medium text-primary hover:underline focus:outline-none focus:ring-0 focus:ring-primary focus:ring-offset-0 transition-all text-sm">
            Undo
        </button>
        <button type="button"
            class="inline-flex flex-shrink-0 justify-center items-center h-4 w-4 rounded-sm text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-0 focus:ring-gray-400 focus:ring-offset-0 focus:ring-offset-white transition-all text-sm dark:focus:ring-white/10 dark:focus:ring-offset-white/10">
            <span class="sr-only">Close</span>
            <svg class="w-3.5 h-3.5" width="16" height="16" viewBox="0 0 16 16"
                fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M0.92524 0.687069C1.126 0.486219 1.39823 0.373377 1.68209 0.373377C1.96597 0.373377 2.2382 0.486219 2.43894 0.687069L8.10514 6.35813L13.7714 0.687069C13.8701 0.584748 13.9882 0.503105 14.1188 0.446962C14.2494 0.39082 14.3899 0.361248 14.5321 0.360026C14.6742 0.358783 14.8151 0.38589 14.9468 0.439762C15.0782 0.493633 15.1977 0.573197 15.2983 0.673783C15.3987 0.774389 15.4784 0.894026 15.5321 1.02568C15.5859 1.15736 15.6131 1.29845 15.6118 1.44071C15.6105 1.58297 15.5809 1.72357 15.5248 1.85428C15.4688 1.98499 15.3872 2.10324 15.2851 2.20206L9.61883 7.87312L15.2851 13.5441C15.4801 13.7462 15.588 14.0168 15.5854 14.2977C15.5831 14.5787 15.4705 14.8474 15.272 15.046C15.0735 15.2449 14.805 15.3574 14.5244 15.3599C14.2437 15.3623 13.9733 15.2543 13.7714 15.0591L8.10514 9.38812L2.43894 15.0591C2.23704 15.2543 1.96663 15.3623 1.68594 15.3599C1.40526 15.3574 1.13677 15.2449 0.938279 15.046C0.739807 14.8474 0.627232 14.5787 0.624791 14.2977C0.62235 14.0168 0.730236 13.7462 0.92524 13.5441L6.59144 7.87312L0.92524 2.20206C0.724562 2.00115 0.611816 1.72867 0.611816 1.44457C0.611816 1.16047 0.724562 0.887983 0.92524 0.687069Z"
                    fill="currentColor" />
            </svg>
        </button>
    </div>
</div>
</div>`
export let ToastTS3 = 
`   <div class="space-y-3">
<div>
    <div class="ti-toast bg-primary text-sm text-white " role="alert">
        <div class="flex p-4">
            Hello, world! This is a toast message.

            <div class="ms-auto">
                <button type="button"
                    class="inline-flex flex-shrink-0 justify-center items-center h-4 w-4 rounded-sm text-white/[.5]  focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-offset-white/10 focus:ring-gray-600 transition-all text-sm dark:focus:ring-offset-white/10 dark:focus:ring-white/10">
                    <span class="sr-only">Close</span>
                    <svg class="w-3.5 h-3.5" width="16" height="16"
                        viewBox="0 0 16 16" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M0.92524 0.687069C1.126 0.486219 1.39823 0.373377 1.68209 0.373377C1.96597 0.373377 2.2382 0.486219 2.43894 0.687069L8.10514 6.35813L13.7714 0.687069C13.8701 0.584748 13.9882 0.503105 14.1188 0.446962C14.2494 0.39082 14.3899 0.361248 14.5321 0.360026C14.6742 0.358783 14.8151 0.38589 14.9468 0.439762C15.0782 0.493633 15.1977 0.573197 15.2983 0.673783C15.3987 0.774389 15.4784 0.894026 15.5321 1.02568C15.5859 1.15736 15.6131 1.29845 15.6118 1.44071C15.6105 1.58297 15.5809 1.72357 15.5248 1.85428C15.4688 1.98499 15.3872 2.10324 15.2851 2.20206L9.61883 7.87312L15.2851 13.5441C15.4801 13.7462 15.588 14.0168 15.5854 14.2977C15.5831 14.5787 15.4705 14.8474 15.272 15.046C15.0735 15.2449 14.805 15.3574 14.5244 15.3599C14.2437 15.3623 13.9733 15.2543 13.7714 15.0591L8.10514 9.38812L2.43894 15.0591C2.23704 15.2543 1.96663 15.3623 1.68594 15.3599C1.40526 15.3574 1.13677 15.2449 0.938279 15.046C0.739807 14.8474 0.627232 14.5787 0.624791 14.2977C0.62235 14.0168 0.730236 13.7462 0.92524 13.5441L6.59144 7.87312L0.92524 2.20206C0.724562 2.00115 0.611816 1.72867 0.611816 1.44457C0.611816 1.16047 0.724562 0.887983 0.92524 0.687069Z"
                            fill="currentColor" />
                    </svg>
                </button>
            </div>
        </div>
    </div>
</div>

<div>
    <div class="ti-toast bg-secondary text-sm text-white " role="alert">
        <div class="flex p-4">
            Hello, world! This is a toast message.

            <div class="ms-auto">
                <button type="button"
                    class="inline-flex flex-shrink-0 justify-center items-center h-4 w-4 rounded-sm text-white/[.5]  focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-offset-gray-600 focus:ring-gray-500 transition-all text-sm dark:focus:ring-offset-white/10 dark:focus:ring-gray-500">
                    <span class="sr-only">Close</span>
                    <svg class="w-3.5 h-3.5" width="16" height="16"
                        viewBox="0 0 16 16" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M0.92524 0.687069C1.126 0.486219 1.39823 0.373377 1.68209 0.373377C1.96597 0.373377 2.2382 0.486219 2.43894 0.687069L8.10514 6.35813L13.7714 0.687069C13.8701 0.584748 13.9882 0.503105 14.1188 0.446962C14.2494 0.39082 14.3899 0.361248 14.5321 0.360026C14.6742 0.358783 14.8151 0.38589 14.9468 0.439762C15.0782 0.493633 15.1977 0.573197 15.2983 0.673783C15.3987 0.774389 15.4784 0.894026 15.5321 1.02568C15.5859 1.15736 15.6131 1.29845 15.6118 1.44071C15.6105 1.58297 15.5809 1.72357 15.5248 1.85428C15.4688 1.98499 15.3872 2.10324 15.2851 2.20206L9.61883 7.87312L15.2851 13.5441C15.4801 13.7462 15.588 14.0168 15.5854 14.2977C15.5831 14.5787 15.4705 14.8474 15.272 15.046C15.0735 15.2449 14.805 15.3574 14.5244 15.3599C14.2437 15.3623 13.9733 15.2543 13.7714 15.0591L8.10514 9.38812L2.43894 15.0591C2.23704 15.2543 1.96663 15.3623 1.68594 15.3599C1.40526 15.3574 1.13677 15.2449 0.938279 15.046C0.739807 14.8474 0.627232 14.5787 0.624791 14.2977C0.62235 14.0168 0.730236 13.7462 0.92524 13.5441L6.59144 7.87312L0.92524 2.20206C0.724562 2.00115 0.611816 1.72867 0.611816 1.44457C0.611816 1.16047 0.724562 0.887983 0.92524 0.687069Z"
                            fill="currentColor" />
                    </svg>
                </button>
            </div>
        </div>
    </div>
</div>

<div>
    <div class="ti-toast bg-info text-sm text-white" role="alert">
        <div class="flex p-4">
            Hello, world! This is a toast message.

            <div class="ms-auto">
                <button type="button"
                    class="inline-flex flex-shrink-0 justify-center items-center h-4 w-4 rounded-sm text-white/[.5]  focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-offset-red-800 focus:ring-red-500 transition-all text-sm dark:focus:ring-offset-red-500 dark:focus:ring-red-700">
                    <span class="sr-only">Close</span>
                    <svg class="w-3.5 h-3.5" width="16" height="16"
                        viewBox="0 0 16 16" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M0.92524 0.687069C1.126 0.486219 1.39823 0.373377 1.68209 0.373377C1.96597 0.373377 2.2382 0.486219 2.43894 0.687069L8.10514 6.35813L13.7714 0.687069C13.8701 0.584748 13.9882 0.503105 14.1188 0.446962C14.2494 0.39082 14.3899 0.361248 14.5321 0.360026C14.6742 0.358783 14.8151 0.38589 14.9468 0.439762C15.0782 0.493633 15.1977 0.573197 15.2983 0.673783C15.3987 0.774389 15.4784 0.894026 15.5321 1.02568C15.5859 1.15736 15.6131 1.29845 15.6118 1.44071C15.6105 1.58297 15.5809 1.72357 15.5248 1.85428C15.4688 1.98499 15.3872 2.10324 15.2851 2.20206L9.61883 7.87312L15.2851 13.5441C15.4801 13.7462 15.588 14.0168 15.5854 14.2977C15.5831 14.5787 15.4705 14.8474 15.272 15.046C15.0735 15.2449 14.805 15.3574 14.5244 15.3599C14.2437 15.3623 13.9733 15.2543 13.7714 15.0591L8.10514 9.38812L2.43894 15.0591C2.23704 15.2543 1.96663 15.3623 1.68594 15.3599C1.40526 15.3574 1.13677 15.2449 0.938279 15.046C0.739807 14.8474 0.627232 14.5787 0.624791 14.2977C0.62235 14.0168 0.730236 13.7462 0.92524 13.5441L6.59144 7.87312L0.92524 2.20206C0.724562 2.00115 0.611816 1.72867 0.611816 1.44457C0.611816 1.16047 0.724562 0.887983 0.92524 0.687069Z"
                            fill="currentColor" />
                    </svg>
                </button>
            </div>
        </div>
    </div>
</div>

<div>
    <div class="ti-toast bg-success text-sm text-white" role="alert">
        <div class="flex p-4">
            Hello, world! This is a toast message.

            <div class="ms-auto">
                <button type="button"
                    class="inline-flex flex-shrink-0 justify-center items-center h-4 w-4 rounded-sm text-white/[.5]  focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-offset-yellow-800 focus:ring-yellow-500 transition-all text-sm dark:focus:ring-offset-yellow-500 dark:focus:ring-yellow-700">
                    <span class="sr-only">Close</span>
                    <svg class="w-3.5 h-3.5" width="16" height="16"
                        viewBox="0 0 16 16" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M0.92524 0.687069C1.126 0.486219 1.39823 0.373377 1.68209 0.373377C1.96597 0.373377 2.2382 0.486219 2.43894 0.687069L8.10514 6.35813L13.7714 0.687069C13.8701 0.584748 13.9882 0.503105 14.1188 0.446962C14.2494 0.39082 14.3899 0.361248 14.5321 0.360026C14.6742 0.358783 14.8151 0.38589 14.9468 0.439762C15.0782 0.493633 15.1977 0.573197 15.2983 0.673783C15.3987 0.774389 15.4784 0.894026 15.5321 1.02568C15.5859 1.15736 15.6131 1.29845 15.6118 1.44071C15.6105 1.58297 15.5809 1.72357 15.5248 1.85428C15.4688 1.98499 15.3872 2.10324 15.2851 2.20206L9.61883 7.87312L15.2851 13.5441C15.4801 13.7462 15.588 14.0168 15.5854 14.2977C15.5831 14.5787 15.4705 14.8474 15.272 15.046C15.0735 15.2449 14.805 15.3574 14.5244 15.3599C14.2437 15.3623 13.9733 15.2543 13.7714 15.0591L8.10514 9.38812L2.43894 15.0591C2.23704 15.2543 1.96663 15.3623 1.68594 15.3599C1.40526 15.3574 1.13677 15.2449 0.938279 15.046C0.739807 14.8474 0.627232 14.5787 0.624791 14.2977C0.62235 14.0168 0.730236 13.7462 0.92524 13.5441L6.59144 7.87312L0.92524 2.20206C0.724562 2.00115 0.611816 1.72867 0.611816 1.44457C0.611816 1.16047 0.724562 0.887983 0.92524 0.687069Z"
                            fill="currentColor" />
                    </svg>
                </button>
            </div>
        </div>
    </div>
</div>

<div>
    <div class="ti-toast bg-warning text-sm text-white" role="alert">
        <div class="flex p-4">
            Hello, world! This is a toast message.

            <div class="ms-auto">
                <button type="button"
                    class="inline-flex flex-shrink-0 justify-center items-center h-4 w-4 rounded-sm text-white/[.5]  focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-offset-green-800 focus:ring-green-500 transition-all text-sm dark:focus:ring-offset-green-500 dark:focus:ring-green-700">
                    <span class="sr-only">Close</span>
                    <svg class="w-3.5 h-3.5" width="16" height="16"
                        viewBox="0 0 16 16" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M0.92524 0.687069C1.126 0.486219 1.39823 0.373377 1.68209 0.373377C1.96597 0.373377 2.2382 0.486219 2.43894 0.687069L8.10514 6.35813L13.7714 0.687069C13.8701 0.584748 13.9882 0.503105 14.1188 0.446962C14.2494 0.39082 14.3899 0.361248 14.5321 0.360026C14.6742 0.358783 14.8151 0.38589 14.9468 0.439762C15.0782 0.493633 15.1977 0.573197 15.2983 0.673783C15.3987 0.774389 15.4784 0.894026 15.5321 1.02568C15.5859 1.15736 15.6131 1.29845 15.6118 1.44071C15.6105 1.58297 15.5809 1.72357 15.5248 1.85428C15.4688 1.98499 15.3872 2.10324 15.2851 2.20206L9.61883 7.87312L15.2851 13.5441C15.4801 13.7462 15.588 14.0168 15.5854 14.2977C15.5831 14.5787 15.4705 14.8474 15.272 15.046C15.0735 15.2449 14.805 15.3574 14.5244 15.3599C14.2437 15.3623 13.9733 15.2543 13.7714 15.0591L8.10514 9.38812L2.43894 15.0591C2.23704 15.2543 1.96663 15.3623 1.68594 15.3599C1.40526 15.3574 1.13677 15.2449 0.938279 15.046C0.739807 14.8474 0.627232 14.5787 0.624791 14.2977C0.62235 14.0168 0.730236 13.7462 0.92524 13.5441L6.59144 7.87312L0.92524 2.20206C0.724562 2.00115 0.611816 1.72867 0.611816 1.44457C0.611816 1.16047 0.724562 0.887983 0.92524 0.687069Z"
                            fill="currentColor" />
                    </svg>
                </button>
            </div>
        </div>
    </div>
</div>

<div>
    <div class="ti-toast bg-danger text-sm text-white" role="alert">
        <div class="flex p-4">
            Hello, world! This is a toast message.

            <div class="ms-auto">
                <button type="button"
                    class="inline-flex flex-shrink-0 justify-center items-center h-4 w-4 rounded-sm text-white/[.5]  focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-offset-primary focus:ring-primary transition-all text-sm dark:focus:ring-offset-primary dark:focus:ring-primary">
                    <span class="sr-only">Close</span>
                    <svg class="w-3.5 h-3.5" width="16" height="16"
                        viewBox="0 0 16 16" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M0.92524 0.687069C1.126 0.486219 1.39823 0.373377 1.68209 0.373377C1.96597 0.373377 2.2382 0.486219 2.43894 0.687069L8.10514 6.35813L13.7714 0.687069C13.8701 0.584748 13.9882 0.503105 14.1188 0.446962C14.2494 0.39082 14.3899 0.361248 14.5321 0.360026C14.6742 0.358783 14.8151 0.38589 14.9468 0.439762C15.0782 0.493633 15.1977 0.573197 15.2983 0.673783C15.3987 0.774389 15.4784 0.894026 15.5321 1.02568C15.5859 1.15736 15.6131 1.29845 15.6118 1.44071C15.6105 1.58297 15.5809 1.72357 15.5248 1.85428C15.4688 1.98499 15.3872 2.10324 15.2851 2.20206L9.61883 7.87312L15.2851 13.5441C15.4801 13.7462 15.588 14.0168 15.5854 14.2977C15.5831 14.5787 15.4705 14.8474 15.272 15.046C15.0735 15.2449 14.805 15.3574 14.5244 15.3599C14.2437 15.3623 13.9733 15.2543 13.7714 15.0591L8.10514 9.38812L2.43894 15.0591C2.23704 15.2543 1.96663 15.3623 1.68594 15.3599C1.40526 15.3574 1.13677 15.2449 0.938279 15.046C0.739807 14.8474 0.627232 14.5787 0.624791 14.2977C0.62235 14.0168 0.730236 13.7462 0.92524 13.5441L6.59144 7.87312L0.92524 2.20206C0.724562 2.00115 0.611816 1.72867 0.611816 1.44457C0.611816 1.16047 0.724562 0.887983 0.92524 0.687069Z"
                            fill="currentColor" />
                    </svg>
                </button>
            </div>
        </div>
    </div>
</div>

<div>
    <div class="ti-toast bg-purple text-sm text-white" role="alert">
        <div class="flex p-4">
            Hello, world! This is a toast message.

            <div class="ms-auto">
                <button type="button"
                    class="inline-flex flex-shrink-0 justify-center items-center h-4 w-4 rounded-sm text-white/[.5]  focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-offset-indigo-800 focus:ring-indigo-500 transition-all text-sm dark:focus:ring-offset-indigo-500 dark:focus:ring-indigo-700">
                    <span class="sr-only">Close</span>
                    <svg class="w-3.5 h-3.5" width="16" height="16"
                        viewBox="0 0 16 16" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M0.92524 0.687069C1.126 0.486219 1.39823 0.373377 1.68209 0.373377C1.96597 0.373377 2.2382 0.486219 2.43894 0.687069L8.10514 6.35813L13.7714 0.687069C13.8701 0.584748 13.9882 0.503105 14.1188 0.446962C14.2494 0.39082 14.3899 0.361248 14.5321 0.360026C14.6742 0.358783 14.8151 0.38589 14.9468 0.439762C15.0782 0.493633 15.1977 0.573197 15.2983 0.673783C15.3987 0.774389 15.4784 0.894026 15.5321 1.02568C15.5859 1.15736 15.6131 1.29845 15.6118 1.44071C15.6105 1.58297 15.5809 1.72357 15.5248 1.85428C15.4688 1.98499 15.3872 2.10324 15.2851 2.20206L9.61883 7.87312L15.2851 13.5441C15.4801 13.7462 15.588 14.0168 15.5854 14.2977C15.5831 14.5787 15.4705 14.8474 15.272 15.046C15.0735 15.2449 14.805 15.3574 14.5244 15.3599C14.2437 15.3623 13.9733 15.2543 13.7714 15.0591L8.10514 9.38812L2.43894 15.0591C2.23704 15.2543 1.96663 15.3623 1.68594 15.3599C1.40526 15.3574 1.13677 15.2449 0.938279 15.046C0.739807 14.8474 0.627232 14.5787 0.624791 14.2977C0.62235 14.0168 0.730236 13.7462 0.92524 13.5441L6.59144 7.87312L0.92524 2.20206C0.724562 2.00115 0.611816 1.72867 0.611816 1.44457C0.611816 1.16047 0.724562 0.887983 0.92524 0.687069Z"
                            fill="currentColor" />
                    </svg>
                </button>
            </div>
        </div>
    </div>
</div>
</div>`
export let ToastTS4 =
`       <div class="space-y-3">
<div>
    <div class="ti-toast bg-primary/10 text-sm text-primary" role="alert">
        <div class="flex p-4">
            Hello, world! This is a toast message.

            <div class="ms-auto">
                <button type="button"
                    class="inline-flex flex-shrink-0 justify-center items-center h-4 w-4 rounded-sm text-primary  focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-offset-white/10 focus:ring-gray-600 transition-all text-sm dark:focus:ring-offset-white/10 dark:focus:ring-white/10">
                    <span class="sr-only">Close</span>
                    <svg class="w-3.5 h-3.5" width="16" height="16"
                        viewBox="0 0 16 16" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M0.92524 0.687069C1.126 0.486219 1.39823 0.373377 1.68209 0.373377C1.96597 0.373377 2.2382 0.486219 2.43894 0.687069L8.10514 6.35813L13.7714 0.687069C13.8701 0.584748 13.9882 0.503105 14.1188 0.446962C14.2494 0.39082 14.3899 0.361248 14.5321 0.360026C14.6742 0.358783 14.8151 0.38589 14.9468 0.439762C15.0782 0.493633 15.1977 0.573197 15.2983 0.673783C15.3987 0.774389 15.4784 0.894026 15.5321 1.02568C15.5859 1.15736 15.6131 1.29845 15.6118 1.44071C15.6105 1.58297 15.5809 1.72357 15.5248 1.85428C15.4688 1.98499 15.3872 2.10324 15.2851 2.20206L9.61883 7.87312L15.2851 13.5441C15.4801 13.7462 15.588 14.0168 15.5854 14.2977C15.5831 14.5787 15.4705 14.8474 15.272 15.046C15.0735 15.2449 14.805 15.3574 14.5244 15.3599C14.2437 15.3623 13.9733 15.2543 13.7714 15.0591L8.10514 9.38812L2.43894 15.0591C2.23704 15.2543 1.96663 15.3623 1.68594 15.3599C1.40526 15.3574 1.13677 15.2449 0.938279 15.046C0.739807 14.8474 0.627232 14.5787 0.624791 14.2977C0.62235 14.0168 0.730236 13.7462 0.92524 13.5441L6.59144 7.87312L0.92524 2.20206C0.724562 2.00115 0.611816 1.72867 0.611816 1.44457C0.611816 1.16047 0.724562 0.887983 0.92524 0.687069Z"
                            fill="currentColor" />
                    </svg>
                </button>
            </div>
        </div>
    </div>
</div>

<div>
    <div class="ti-toast bg-secondary/10 text-sm text-secondary" role="alert">
        <div class="flex p-4">
            Hello, world! This is a toast message.

            <div class="ms-auto">
                <button type="button"
                    class="inline-flex flex-shrink-0 justify-center items-center h-4 w-4 rounded-sm text-secondary  focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-offset-gray-600 focus:ring-gray-500 transition-all text-sm dark:focus:ring-offset-white/10 dark:focus:ring-gray-500">
                    <span class="sr-only">Close</span>
                    <svg class="w-3.5 h-3.5" width="16" height="16"
                        viewBox="0 0 16 16" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M0.92524 0.687069C1.126 0.486219 1.39823 0.373377 1.68209 0.373377C1.96597 0.373377 2.2382 0.486219 2.43894 0.687069L8.10514 6.35813L13.7714 0.687069C13.8701 0.584748 13.9882 0.503105 14.1188 0.446962C14.2494 0.39082 14.3899 0.361248 14.5321 0.360026C14.6742 0.358783 14.8151 0.38589 14.9468 0.439762C15.0782 0.493633 15.1977 0.573197 15.2983 0.673783C15.3987 0.774389 15.4784 0.894026 15.5321 1.02568C15.5859 1.15736 15.6131 1.29845 15.6118 1.44071C15.6105 1.58297 15.5809 1.72357 15.5248 1.85428C15.4688 1.98499 15.3872 2.10324 15.2851 2.20206L9.61883 7.87312L15.2851 13.5441C15.4801 13.7462 15.588 14.0168 15.5854 14.2977C15.5831 14.5787 15.4705 14.8474 15.272 15.046C15.0735 15.2449 14.805 15.3574 14.5244 15.3599C14.2437 15.3623 13.9733 15.2543 13.7714 15.0591L8.10514 9.38812L2.43894 15.0591C2.23704 15.2543 1.96663 15.3623 1.68594 15.3599C1.40526 15.3574 1.13677 15.2449 0.938279 15.046C0.739807 14.8474 0.627232 14.5787 0.624791 14.2977C0.62235 14.0168 0.730236 13.7462 0.92524 13.5441L6.59144 7.87312L0.92524 2.20206C0.724562 2.00115 0.611816 1.72867 0.611816 1.44457C0.611816 1.16047 0.724562 0.887983 0.92524 0.687069Z"
                            fill="currentColor" />
                    </svg>
                </button>
            </div>
        </div>
    </div>
</div>

<div>
    <div class="ti-toast bg-info/10 text-sm text-info" role="alert">
        <div class="flex p-4">
            Hello, world! This is a toast message.

            <div class="ms-auto">
                <button type="button"
                    class="inline-flex flex-shrink-0 justify-center items-center h-4 w-4 rounded-sm text-info  focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-offset-red-800 focus:ring-red-500 transition-all text-sm dark:focus:ring-offset-red-500 dark:focus:ring-red-700">
                    <span class="sr-only">Close</span>
                    <svg class="w-3.5 h-3.5" width="16" height="16"
                        viewBox="0 0 16 16" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M0.92524 0.687069C1.126 0.486219 1.39823 0.373377 1.68209 0.373377C1.96597 0.373377 2.2382 0.486219 2.43894 0.687069L8.10514 6.35813L13.7714 0.687069C13.8701 0.584748 13.9882 0.503105 14.1188 0.446962C14.2494 0.39082 14.3899 0.361248 14.5321 0.360026C14.6742 0.358783 14.8151 0.38589 14.9468 0.439762C15.0782 0.493633 15.1977 0.573197 15.2983 0.673783C15.3987 0.774389 15.4784 0.894026 15.5321 1.02568C15.5859 1.15736 15.6131 1.29845 15.6118 1.44071C15.6105 1.58297 15.5809 1.72357 15.5248 1.85428C15.4688 1.98499 15.3872 2.10324 15.2851 2.20206L9.61883 7.87312L15.2851 13.5441C15.4801 13.7462 15.588 14.0168 15.5854 14.2977C15.5831 14.5787 15.4705 14.8474 15.272 15.046C15.0735 15.2449 14.805 15.3574 14.5244 15.3599C14.2437 15.3623 13.9733 15.2543 13.7714 15.0591L8.10514 9.38812L2.43894 15.0591C2.23704 15.2543 1.96663 15.3623 1.68594 15.3599C1.40526 15.3574 1.13677 15.2449 0.938279 15.046C0.739807 14.8474 0.627232 14.5787 0.624791 14.2977C0.62235 14.0168 0.730236 13.7462 0.92524 13.5441L6.59144 7.87312L0.92524 2.20206C0.724562 2.00115 0.611816 1.72867 0.611816 1.44457C0.611816 1.16047 0.724562 0.887983 0.92524 0.687069Z"
                            fill="currentColor" />
                    </svg>
                </button>
            </div>
        </div>
    </div>
</div>

<div>
    <div class="ti-toast bg-success/10 text-sm text-success" role="alert">
        <div class="flex p-4">
            Hello, world! This is a toast message.

            <div class="ms-auto">
                <button type="button"
                    class="inline-flex flex-shrink-0 justify-center items-center h-4 w-4 rounded-sm text-success  focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-offset-yellow-800 focus:ring-yellow-500 transition-all text-sm dark:focus:ring-offset-yellow-500 dark:focus:ring-yellow-700">
                    <span class="sr-only">Close</span>
                    <svg class="w-3.5 h-3.5" width="16" height="16"
                        viewBox="0 0 16 16" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M0.92524 0.687069C1.126 0.486219 1.39823 0.373377 1.68209 0.373377C1.96597 0.373377 2.2382 0.486219 2.43894 0.687069L8.10514 6.35813L13.7714 0.687069C13.8701 0.584748 13.9882 0.503105 14.1188 0.446962C14.2494 0.39082 14.3899 0.361248 14.5321 0.360026C14.6742 0.358783 14.8151 0.38589 14.9468 0.439762C15.0782 0.493633 15.1977 0.573197 15.2983 0.673783C15.3987 0.774389 15.4784 0.894026 15.5321 1.02568C15.5859 1.15736 15.6131 1.29845 15.6118 1.44071C15.6105 1.58297 15.5809 1.72357 15.5248 1.85428C15.4688 1.98499 15.3872 2.10324 15.2851 2.20206L9.61883 7.87312L15.2851 13.5441C15.4801 13.7462 15.588 14.0168 15.5854 14.2977C15.5831 14.5787 15.4705 14.8474 15.272 15.046C15.0735 15.2449 14.805 15.3574 14.5244 15.3599C14.2437 15.3623 13.9733 15.2543 13.7714 15.0591L8.10514 9.38812L2.43894 15.0591C2.23704 15.2543 1.96663 15.3623 1.68594 15.3599C1.40526 15.3574 1.13677 15.2449 0.938279 15.046C0.739807 14.8474 0.627232 14.5787 0.624791 14.2977C0.62235 14.0168 0.730236 13.7462 0.92524 13.5441L6.59144 7.87312L0.92524 2.20206C0.724562 2.00115 0.611816 1.72867 0.611816 1.44457C0.611816 1.16047 0.724562 0.887983 0.92524 0.687069Z"
                            fill="currentColor" />
                    </svg>
                </button>
            </div>
        </div>
    </div>
</div>

<div>
    <div class="ti-toast bg-warning/10 text-sm text-warning" role="alert">
        <div class="flex p-4">
            Hello, world! This is a toast message.

            <div class="ms-auto">
                <button type="button"
                    class="inline-flex flex-shrink-0 justify-center items-center h-4 w-4 rounded-sm text-warning  focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-offset-green-800 focus:ring-green-500 transition-all text-sm dark:focus:ring-offset-green-500 dark:focus:ring-green-700">
                    <span class="sr-only">Close</span>
                    <svg class="w-3.5 h-3.5" width="16" height="16"
                        viewBox="0 0 16 16" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M0.92524 0.687069C1.126 0.486219 1.39823 0.373377 1.68209 0.373377C1.96597 0.373377 2.2382 0.486219 2.43894 0.687069L8.10514 6.35813L13.7714 0.687069C13.8701 0.584748 13.9882 0.503105 14.1188 0.446962C14.2494 0.39082 14.3899 0.361248 14.5321 0.360026C14.6742 0.358783 14.8151 0.38589 14.9468 0.439762C15.0782 0.493633 15.1977 0.573197 15.2983 0.673783C15.3987 0.774389 15.4784 0.894026 15.5321 1.02568C15.5859 1.15736 15.6131 1.29845 15.6118 1.44071C15.6105 1.58297 15.5809 1.72357 15.5248 1.85428C15.4688 1.98499 15.3872 2.10324 15.2851 2.20206L9.61883 7.87312L15.2851 13.5441C15.4801 13.7462 15.588 14.0168 15.5854 14.2977C15.5831 14.5787 15.4705 14.8474 15.272 15.046C15.0735 15.2449 14.805 15.3574 14.5244 15.3599C14.2437 15.3623 13.9733 15.2543 13.7714 15.0591L8.10514 9.38812L2.43894 15.0591C2.23704 15.2543 1.96663 15.3623 1.68594 15.3599C1.40526 15.3574 1.13677 15.2449 0.938279 15.046C0.739807 14.8474 0.627232 14.5787 0.624791 14.2977C0.62235 14.0168 0.730236 13.7462 0.92524 13.5441L6.59144 7.87312L0.92524 2.20206C0.724562 2.00115 0.611816 1.72867 0.611816 1.44457C0.611816 1.16047 0.724562 0.887983 0.92524 0.687069Z"
                            fill="currentColor" />
                    </svg>
                </button>
            </div>
        </div>
    </div>
</div>

<div>
    <div class="ti-toast bg-danger/10 text-sm text-danger" role="alert">
        <div class="flex p-4">
            Hello, world! This is a toast message.

            <div class="ms-auto">
                <button type="button"
                    class="inline-flex flex-shrink-0 justify-center items-center h-4 w-4 rounded-sm text-danger  focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-offset-primary focus:ring-primary transition-all text-sm dark:focus:ring-offset-primary dark:focus:ring-primary">
                    <span class="sr-only">Close</span>
                    <svg class="w-3.5 h-3.5" width="16" height="16"
                        viewBox="0 0 16 16" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M0.92524 0.687069C1.126 0.486219 1.39823 0.373377 1.68209 0.373377C1.96597 0.373377 2.2382 0.486219 2.43894 0.687069L8.10514 6.35813L13.7714 0.687069C13.8701 0.584748 13.9882 0.503105 14.1188 0.446962C14.2494 0.39082 14.3899 0.361248 14.5321 0.360026C14.6742 0.358783 14.8151 0.38589 14.9468 0.439762C15.0782 0.493633 15.1977 0.573197 15.2983 0.673783C15.3987 0.774389 15.4784 0.894026 15.5321 1.02568C15.5859 1.15736 15.6131 1.29845 15.6118 1.44071C15.6105 1.58297 15.5809 1.72357 15.5248 1.85428C15.4688 1.98499 15.3872 2.10324 15.2851 2.20206L9.61883 7.87312L15.2851 13.5441C15.4801 13.7462 15.588 14.0168 15.5854 14.2977C15.5831 14.5787 15.4705 14.8474 15.272 15.046C15.0735 15.2449 14.805 15.3574 14.5244 15.3599C14.2437 15.3623 13.9733 15.2543 13.7714 15.0591L8.10514 9.38812L2.43894 15.0591C2.23704 15.2543 1.96663 15.3623 1.68594 15.3599C1.40526 15.3574 1.13677 15.2449 0.938279 15.046C0.739807 14.8474 0.627232 14.5787 0.624791 14.2977C0.62235 14.0168 0.730236 13.7462 0.92524 13.5441L6.59144 7.87312L0.92524 2.20206C0.724562 2.00115 0.611816 1.72867 0.611816 1.44457C0.611816 1.16047 0.724562 0.887983 0.92524 0.687069Z"
                            fill="currentColor" />
                    </svg>
                </button>
            </div>
        </div>
    </div>
</div>

<div>
    <div class="ti-toast bg-purple/10 text-sm text-purple" role="alert">
        <div class="flex p-4">
            Hello, world! This is a toast message.

            <div class="ms-auto">
                <button type="button"
                    class="inline-flex flex-shrink-0 justify-center items-center h-4 w-4 rounded-sm text-purple  focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-offset-indigo-800 focus:ring-indigo-500 transition-all text-sm dark:focus:ring-offset-indigo-500 dark:focus:ring-indigo-700">
                    <span class="sr-only">Close</span>
                    <svg class="w-3.5 h-3.5" width="16" height="16"
                        viewBox="0 0 16 16" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M0.92524 0.687069C1.126 0.486219 1.39823 0.373377 1.68209 0.373377C1.96597 0.373377 2.2382 0.486219 2.43894 0.687069L8.10514 6.35813L13.7714 0.687069C13.8701 0.584748 13.9882 0.503105 14.1188 0.446962C14.2494 0.39082 14.3899 0.361248 14.5321 0.360026C14.6742 0.358783 14.8151 0.38589 14.9468 0.439762C15.0782 0.493633 15.1977 0.573197 15.2983 0.673783C15.3987 0.774389 15.4784 0.894026 15.5321 1.02568C15.5859 1.15736 15.6131 1.29845 15.6118 1.44071C15.6105 1.58297 15.5809 1.72357 15.5248 1.85428C15.4688 1.98499 15.3872 2.10324 15.2851 2.20206L9.61883 7.87312L15.2851 13.5441C15.4801 13.7462 15.588 14.0168 15.5854 14.2977C15.5831 14.5787 15.4705 14.8474 15.272 15.046C15.0735 15.2449 14.805 15.3574 14.5244 15.3599C14.2437 15.3623 13.9733 15.2543 13.7714 15.0591L8.10514 9.38812L2.43894 15.0591C2.23704 15.2543 1.96663 15.3623 1.68594 15.3599C1.40526 15.3574 1.13677 15.2449 0.938279 15.046C0.739807 14.8474 0.627232 14.5787 0.624791 14.2977C0.62235 14.0168 0.730236 13.7462 0.92524 13.5441L6.59144 7.87312L0.92524 2.20206C0.724562 2.00115 0.611816 1.72867 0.611816 1.44457C0.611816 1.16047 0.724562 0.887983 0.92524 0.687069Z"
                            fill="currentColor" />
                    </svg>
                </button>
            </div>
        </div>
    </div>
</div>
</div>
`
export let ToastTS5 =
`    <div class="ti-toast bg-white dark:bg-bodybg dark:border-white/10" role="alert">
<div class="flex items-center p-4">
    <div class="ti-spinner w-4 h-4 text-primary" role="status" aria-label="loading">
        <span class="sr-only">Loading...</span>
    </div>
    <p class="ms-3 text-sm text-gray-700 dark:text-[#8c9097] dark:text-white/50">
        Action in progress
    </p>
</div>
</div>`
export let ToastTS6 =
`   <div id="dismiss-toast"
class="hs-removing:translate-x-5 hs-removing:opacity-0 transition duration-300 ti-toast bg-white dark:bg-bodybg dark:border-white/10"
role="alert">
<div class="flex p-4">
    <p class="text-sm text-gray-700 dark:text-[#8c9097] dark:text-white/50">
        Your email has been sent
    </p>

    <div class="ms-auto">
        <button type="button"
            class="inline-flex flex-shrink-0 justify-center items-center h-4 w-4 rounded-sm text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-0 focus:ring-gray-400 focus:ring-offset-0 focus:ring-offset-white text-sm dark:focus:ring-white/10 dark:focus:ring-offset-white/10"
            data-hs-remove-element="#dismiss-toast">
            <span class="sr-only">Close</span>
            <svg class="w-3.5 h-3.5" width="16" height="16" viewBox="0 0 16 16"
                fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M0.92524 0.687069C1.126 0.486219 1.39823 0.373377 1.68209 0.373377C1.96597 0.373377 2.2382 0.486219 2.43894 0.687069L8.10514 6.35813L13.7714 0.687069C13.8701 0.584748 13.9882 0.503105 14.1188 0.446962C14.2494 0.39082 14.3899 0.361248 14.5321 0.360026C14.6742 0.358783 14.8151 0.38589 14.9468 0.439762C15.0782 0.493633 15.1977 0.573197 15.2983 0.673783C15.3987 0.774389 15.4784 0.894026 15.5321 1.02568C15.5859 1.15736 15.6131 1.29845 15.6118 1.44071C15.6105 1.58297 15.5809 1.72357 15.5248 1.85428C15.4688 1.98499 15.3872 2.10324 15.2851 2.20206L9.61883 7.87312L15.2851 13.5441C15.4801 13.7462 15.588 14.0168 15.5854 14.2977C15.5831 14.5787 15.4705 14.8474 15.272 15.046C15.0735 15.2449 14.805 15.3574 14.5244 15.3599C14.2437 15.3623 13.9733 15.2543 13.7714 15.0591L8.10514 9.38812L2.43894 15.0591C2.23704 15.2543 1.96663 15.3623 1.68594 15.3599C1.40526 15.3574 1.13677 15.2449 0.938279 15.046C0.739807 14.8474 0.627232 14.5787 0.624791 14.2977C0.62235 14.0168 0.730236 13.7462 0.92524 13.5441L6.59144 7.87312L0.92524 2.20206C0.724562 2.00115 0.611816 1.72867 0.611816 1.44457C0.611816 1.16047 0.724562 0.887983 0.92524 0.687069Z"
                    fill="currentColor" />
            </svg>
        </button>
    </div>
</div>
</div>`
export let spinnersTS1 = 
`    <div class="ti-spinner" role="status">
<span class="sr-only">Loading...</span>
</div>`
export let spinnersTS2 = 
`  <div class="box-body">
<div class="ti-spinner text-primary" role="status">
    <span class="sr-only">Loading...</span>
</div>
<div class="ti-spinner text-secondary" role="status">
    <span class="sr-only">Loading...</span>
</div>
<div class="ti-spinner text-success" role="status">
    <span class="sr-only">Loading...</span>
</div>
<div class="ti-spinner text-danger" role="status">
    <span class="sr-only">Loading...</span>
</div>
<div class="ti-spinner text-warning" role="status">
    <span class="sr-only">Loading...</span>
</div>
<div class="ti-spinner text-info" role="status">
    <span class="sr-only">Loading...</span>
</div>
<div class="ti-spinner text-light" role="status">
    <span class="sr-only">Loading...</span>
</div>
<div class="ti-spinner" role="status">
    <span class="sr-only">Loading...</span>
</div>
</div>`
export let spinnersTS3 = 
` <div class="ti-spinner !bg-black dark:!bg-light !animate-ping !border-transparent " role="status"
aria-label="loading">
<span class="sr-only">Loading...</span>
</div>`
export let spinnersTS4 =
`     <div class="space-x-6 space-y-4 rtl:space-x-reverse">
<div class="ti-spinner !animate-ping !border-transparent  bg-primary" role="status"
    aria-label="loading">
    <span class="sr-only">Loading...</span>
</div>
<div class="ti-spinner !animate-ping !border-transparent  bg-secondary" role="status"
    aria-label="loading">
    <span class="sr-only">Loading...</span>
</div>
<div class="ti-spinner !animate-ping !border-transparent  bg-warning" role="status"
    aria-label="loading">
    <span class="sr-only">Loading...</span>
</div>
<div class="ti-spinner !animate-ping !border-transparent  bg-danger" role="status"
    aria-label="loading">
    <span class="sr-only">Loading...</span>
</div>
<div class="ti-spinner !animate-ping !border-transparent  bg-success" role="status"
    aria-label="loading">
    <span class="sr-only">Loading...</span>
</div>
<div class="ti-spinner !animate-ping !border-transparent  bg-info" role="status"
    aria-label="loading">
    <span class="sr-only">Loading...</span>
</div>
<div class="ti-spinner !animate-ping !border-transparent  bg-black/20 dark:!bg-light dark:animate-ping "
    role="status" aria-label="loading">
    <span class="sr-only">Loading...</span>
</div>
<div class="ti-spinner !animate-ping !border-transparent  bg-gray-400" role="status"
    aria-label="loading">
    <span class="sr-only">Loading...</span>
</div>
</div>
`
export let spinnersTS5 =
` <div class="flex justify-center mb-6">
<div class="ti-spinner" role="status">
    <span class="sr-only">Loading...</span>
</div>
</div>
<div class="flex items-center justify-between">
<strong>Loading...</strong>
<div class="ti-spinner" role="status">
    <span class="sr-only">Loading...</span>
</div>
</div>`
export let spinnersTS6 =
` <div class="clearfix mb-6">
<div class="ti-spinner ltr:float-right rtl:float-left" role="status">
    <span class="sr-only">Loading...</span>
</div>
</div>
<div class="clearfix">
<div class="ti-spinner ltr:float-left rtl:float-right" role="status">
    <span class="sr-only">Loading...</span>
</div>
</div>`
export let spinnersTS7 =
` <div class="text-center">
<div class="ti-spinner" role="status">
    <span class="sr-only">Loading...</span>
</div>
</div>`
export let spinnersTS8 =
`  <div class="box-body flex items-center">
<div class="ti-spinner !w-[1rem] !h-[1rem] me-6" role="status">
    <span class="sr-only">Loading...</span>
</div>
<div class="ti-spinner !w-[1rem] !h-[1rem] !bg-black dark:!bg-white !animate-ping !border-transparent me-6" role="status">
    <span class="sr-only">Loading...</span>
</div>
<div class="ti-spinner me-6 w-12 h-12"
    role="status">
    <span class="sr-only">Loading...</span>
</div>
<div class="ti-spinner !bg-black dark:!bg-white !animate-ping !border-transparent w-8 h-8" role="status">
    <span class="sr-only">Loading...</span>
</div>
</div>`
export let spinnersTS9 =
`   <div class="ti-spinner m-[3rem]" role="status">
<span class="sr-only">Loading...</span>
</div>`
export let spinnersTS10 =
`          <div class="">
<button type="button" class="ti-btn ti-btn-disabled ti-btn-primary-full" disabled>
    <span class="ti-spinner text-white" role="status" aria-label="loading">
        <span class="sr-only">Loading...</span>
    </span>
</button>
<button type="button" class="ti-btn ti-btn-disabled ti-btn-primary-full" disabled>
    <span class="ti-spinner text-white" role="status" aria-label="loading"></span>
    <span>Loading...</span>
</button>
<button type="button" class="ti-btn ti-btn-disabled ti-btn-secondary-full" disabled>
    <span class="ti-spinner text-white" role="status" aria-label="loading">
        <span class="sr-only">Loading...</span>
    </span>
</button>
<button type="button" class="ti-btn ti-btn-disabled ti-btn-secondary-full" disabled>
    <span class="ti-spinner text-white" role="status" aria-label="loading"></span>
    <span>Loading...</span>
</button>
<button type="button" class="ti-btn ti-btn-disabled ti-btn-warning-full" disabled>
    <span class="ti-spinner text-white" role="status" aria-label="loading">
        <span class="sr-only">Loading...</span>
    </span>
</button>
<button type="button" class="ti-btn ti-btn-disabled ti-btn-warning-full" disabled>
    <span class="ti-spinner text-white" role="status" aria-label="loading"></span>
    <span>Loading...</span>
</button>
<button type="button" class="ti-btn ti-btn-disabled ti-btn-danger-full" disabled>
    <span class="ti-spinner text-white" role="status" aria-label="loading">
        <span class="sr-only">Loading...</span>
    </span>
</button>
<button type="button" class="ti-btn ti-btn-disabled ti-btn-danger-full" disabled>
    <span class="ti-spinner text-white" role="status" aria-label="loading"></span>
    <span>Loading...</span>
</button>
<button type="button" class="ti-btn ti-btn-disabled ti-btn-info-full" disabled>
    <span class="ti-spinner text-white" role="status" aria-label="loading">
        <span class="sr-only">Loading...</span>
    </span>
</button>
<button type="button" class="ti-btn ti-btn-disabled ti-btn-info-full" disabled>
    <span class="ti-spinner text-white" role="status" aria-label="loading"></span>
    <span>Loading...</span>
</button>
<button type="button" class="ti-btn ti-btn-disabled ti-btn-success-full" disabled>
    <span class="ti-spinner text-white" role="status" aria-label="loading">
        <span class="sr-only">Loading...</span>
    </span>
</button>
<button type="button" class="ti-btn ti-btn-disabled ti-btn-success-full" disabled>
    <span class="ti-spinner text-white" role="status" aria-label="loading"></span>
    <span>Loading...</span>
</button>
</div>`