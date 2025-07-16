export const CLIENT_COMPONENT_MAP: any = {
  ozone: {
    list: () => import('./ozone/enquiry-list/enquiry-list.component').then(m => m.OzoneEnquiryListComponent),
    detail: () => import('./ozone/enquiry-detail/enquiry-detail.component').then(m => m.OzoneEnquiryDetailComponent),
    add: () => import('./ozone/enquiry-add/enquiry-add.component').then(m => m.OzoneEnquiryAddComponent),
    edit: () => import('./ozone/enquiry-add/enquiry-add.component').then(m => m.OzoneEnquiryAddComponent),
  },
  default: {
    list: () => import('./default/enquiry-list/enquiry-list.component').then(m => m.EnquiryListComponent),
    detail: () => import('./default/enquiry-detail/enquiry-detail.component').then(m => m.EnquiryDetailComponent),
    add: () => import('./default/enquiry-add/enquiry-add.component').then(m => m.EnquiryAddComponent),
    edit: () => import('./default/enquiry-add/enquiry-add.component').then(m => m.EnquiryAddComponent),
  }
};