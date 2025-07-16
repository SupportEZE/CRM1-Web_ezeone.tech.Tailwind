import { NgModule } from '@angular/core';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ContentLayoutComponent } from './layouts/content-layout/content-layout.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SwitcherComponent } from './components/switcher/switcher.component';
import { ColorPickerModule, ColorPickerService } from 'ngx-color-picker';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { AuthenticationLayoutComponent } from './layouts/authentication-layout/authentication-layout.component';
import { TabToTopComponent } from './components/tab-to-top/tab-to-top.component';
import { SvgReplaceDirective } from './directives/svgReplace.directive';
import { OverlayscrollbarsModule } from 'overlayscrollbars-ngx';
import { FullscreenDirective } from './directives/fullscreen.directive';
import { HoverEffectSidebarDirective } from './directives/hover-effect-sidebar.directive copy';
import { FormFieldComponent } from './components/form-field/form-field.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { SpkNgSelectComponent } from "../../@spk/spk-ng-select/spk-ng-select.component";
import { SpkFlatpickrComponent } from "../../@spk/spk-flatpickr/spk-flatpickr.component";
import { NouisliderModule } from 'ng2-nouislider';
import { FilePondModule } from 'ngx-filepond';
import { NgxEditorModule} from 'ngx-editor';
import { SkeletonComponent } from './components/skeleton/skeleton.component';
import { DataNotFoundComponent } from './components/data-not-found/data-not-found.component';
import { PaginationFooterComponent } from './components/pagination-footer/pagination-footer.component';
import { LogsComponent } from './components/logs/logs.component';
import { PageSubHeaderComponent } from './components/page-sub-header/page-sub-header.component';
import { ButtonComponent } from './components/button/button.component';
import { IconButtonComponent } from './components/icon-button/icon-button.component';
import { ToggleComponent } from './components/toggle/toggle.component';
import { ListingTabComponent } from './components/listing-tab/listing-tab.component';
import { SpkInputComponent } from '../../@spk/spk-input/spk-input.component';
import { ModalHeaderComponent } from './components/modal-header/modal-header.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { ErrorImageDirective } from '../core/directives/error-image.directive';
import { SpkInputListingComponent } from '../../@spk/spk-input-listing/spk-input-listing.component';
import * as FilePond from 'filepond';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImageValidateSize from 'filepond-plugin-image-validate-size';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import { CommentsComponent } from './components/comments/comments.component';
import { PointLocationComponent } from './components/point-location/point-location.component';
import { SpkMapsComponent } from '../../@spk/spk-maps/spk-maps.component';
import { MatTooltipModule } from '@angular/material/tooltip';

FilePond.registerPlugin(
  FilePondPluginFileValidateType,
  FilePondPluginImageValidateSize,
  FilePondPluginFileValidateSize
  // FilePondPluginImagePreview
);

@NgModule({
    declarations: [
        HeaderComponent,
        SidebarComponent,
        ContentLayoutComponent,  
        SwitcherComponent,
        PageHeaderComponent,
        TabToTopComponent,
        FooterComponent,
        SvgReplaceDirective,
        AuthenticationLayoutComponent,
        HoverEffectSidebarDirective,
        FormFieldComponent, 
        PageSubHeaderComponent,
        ButtonComponent,
        IconButtonComponent,
        ToggleComponent,
    ],
    
    imports: [
        CommonModule,
        RouterModule,
        OverlayscrollbarsModule,
        FormsModule,
        ReactiveFormsModule,
        FullscreenDirective,
        ColorPickerModule,
        NgSelectModule,
        SpkNgSelectComponent,
        SpkInputComponent,
        SpkMapsComponent,
        SpkInputListingComponent,
        SpkFlatpickrComponent,
        NouisliderModule,
        FilePondModule,
        NgxEditorModule,
        ListingTabComponent,
        ModalHeaderComponent,
        LogsComponent,
        NgxMatSelectSearchModule,
        ErrorImageDirective,
        PaginationFooterComponent,
        SkeletonComponent,  
        DataNotFoundComponent,
        CommentsComponent,
        PointLocationComponent,
        MatTooltipModule
    ],
    exports:[
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SpkInputComponent,
        SpkMapsComponent,
        SpkInputListingComponent,
        SpkNgSelectComponent,
        HeaderComponent,
        SidebarComponent,
        ContentLayoutComponent,
        SwitcherComponent,
        PageHeaderComponent, 
        TabToTopComponent,
        FooterComponent,
        AuthenticationLayoutComponent,
        HoverEffectSidebarDirective,
        FormFieldComponent,
        SkeletonComponent,
        DataNotFoundComponent,
        PaginationFooterComponent,
        PageSubHeaderComponent,
        ButtonComponent,
        IconButtonComponent,
        ToggleComponent,
        ListingTabComponent,
        LogsComponent,
        ErrorImageDirective,
        NgxMatSelectSearchModule,
        CommentsComponent,
        PointLocationComponent,
        MatTooltipModule,
    ],
})

export class SharedModule { }
